import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { checkRateLimit, getClientIP } from '@/lib/middleware/rateLimit';

// In-memory OTP store (use Redis in production)
const otpStore = new Map<string, { code: string; expiresAt: number; attempts: number }>();

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export async function POST(req: NextRequest) {
  const ip = getClientIP(req);
  const rl = checkRateLimit({ key: `otp:${ip}`, max: 5, windowMs: 600_000 });
  if (!rl.success) {
    return NextResponse.json({ error: 'Too many OTP requests' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const { action, email, code } = body;

    if (action === 'generate') {
      const emailSchema = z.string().email();
      emailSchema.parse(email);

      const otp = generateOTP();
      const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
      otpStore.set(email, { code: otp, expiresAt, attempts: 0 });

      // Send OTP via email
      const { sendEmail } = await import('@/lib/email');
      await sendEmail({
        to: email,
        subject: '[Guide Soft IT Solutions] Your OTP Code',
        html: `<div style="font-family:sans-serif;max-width:400px;margin:0 auto;padding:40px;">
          <h2 style="color:#00C853;">Your OTP Code</h2>
          <p>Use this code to verify your identity. It expires in 10 minutes.</p>
          <div style="background:#f8fafc;border:2px solid #00C853;border-radius:12px;padding:24px;text-align:center;margin:24px 0;">
            <span style="font-size:36px;font-weight:800;letter-spacing:12px;color:#0f172a;">${otp}</span>
          </div>
          <p style="color:#64748b;font-size:13px;">If you didn't request this, please ignore this email.</p>
        </div>`,
      });

      return NextResponse.json({ success: true, message: 'OTP sent to your email' });
    }

    if (action === 'verify') {
      const entry = otpStore.get(email);
      if (!entry) {
        return NextResponse.json({ error: 'No OTP found. Please request a new one.' }, { status: 400 });
      }
      if (Date.now() > entry.expiresAt) {
        otpStore.delete(email);
        return NextResponse.json({ error: 'OTP has expired. Please request a new one.' }, { status: 400 });
      }
      entry.attempts++;
      if (entry.attempts > 5) {
        otpStore.delete(email);
        return NextResponse.json({ error: 'Too many attempts. Request a new OTP.' }, { status: 429 });
      }
      if (entry.code !== code) {
        return NextResponse.json({ error: 'Invalid OTP code' }, { status: 401 });
      }

      // OTP valid — issue session
      otpStore.delete(email);
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return NextResponse.json({ error: 'Account not found' }, { status: 404 });
      }

      const { signJWT } = await import('@/lib/jwt');
      const token = await signJWT({ userId: user.id, email: user.email, role: (user as any).role || 'CUSTOMER' });

      const response = NextResponse.json({
        success: true,
        user: { id: user.id, email: user.email, name: user.name },
      });
      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
      });
      return response;
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    console.error('[OTP API]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
