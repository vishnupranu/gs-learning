import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { signJWT, verifyJWT } from '@/lib/jwt';
import { z } from 'zod';

// In-memory magic link store (use Redis/DB in production)
const magicLinkStore = new Map<string, { email: string; expiresAt: number }>();

function generateToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, email, token } = body;

    if (action === 'send') {
      z.string().email().parse(email);

      const user = await prisma.user.findUnique({ where: { email } });
      // Don't reveal if user doesn't exist
      if (user) {
        const linkToken = generateToken();
        magicLinkStore.set(linkToken, {
          email,
          expiresAt: Date.now() + 15 * 60 * 1000, // 15 min
        });

        const magicUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/magic?token=${linkToken}`;

        const { sendEmail } = await import('@/lib/email');
        await sendEmail({
          to: email,
          subject: '[Guide Soft IT Solutions] Your Magic Sign-In Link',
          html: `<div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:40px;">
            <h2 style="color:#00C853;">Sign In to Guide Soft</h2>
            <p>Click the button below to sign in. This link expires in 15 minutes and can only be used once.</p>
            <div style="text-align:center;margin:32px 0;">
              <a href="${magicUrl}" style="background:linear-gradient(135deg,#00C853,#00a846);color:white;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:16px;">
                Sign In Securely →
              </a>
            </div>
            <p style="color:#64748b;font-size:13px;">If you didn't request this, you can safely ignore this email.</p>
            <p style="color:#94a3b8;font-size:12px;">Or copy this link: ${magicUrl}</p>
          </div>`,
        });
      }

      return NextResponse.json({
        success: true,
        message: 'If that email exists, a sign-in link has been sent.',
      });
    }

    if (action === 'verify' && token) {
      const entry = magicLinkStore.get(token);
      if (!entry || Date.now() > entry.expiresAt) {
        return NextResponse.json({ error: 'Invalid or expired magic link' }, { status: 401 });
      }

      magicLinkStore.delete(token); // Single use
      const user = await prisma.user.findUnique({ where: { email: entry.email } });
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      const jwtToken = await signJWT({
        userId: user.id,
        email: user.email,
        role: (user as any).role || 'CUSTOMER',
      });

      const response = NextResponse.json({
        success: true,
        user: { id: user.id, email: user.email, name: user.name },
      });
      response.cookies.set('token', jwtToken, {
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
    console.error('[Magic Link API]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
