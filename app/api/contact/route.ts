import { NextRequest, NextResponse } from 'next/server';
import { sendContactFormEmails } from '@/lib/email';
import { sendContactWhatsApp, sendAdminAlert } from '@/lib/notifications';
import { prisma } from '@/lib/prisma';
import { checkRateLimit, getClientIP } from '@/lib/middleware/rateLimit';
import { z } from 'zod';
import { appendToGoogleSheet } from '@/lib/google-sheets';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject required'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
  company: z.string().optional(),
  service: z.string().optional(),
});

export async function POST(req: NextRequest) {
  // Rate limit: 5 contact submissions per 15 minutes per IP
  const ip = getClientIP(req);
  const rl = checkRateLimit({ key: `contact:${ip}`, max: 5, windowMs: 900_000 });
  if (!rl.success) {
    return NextResponse.json(
      { error: 'Too many submissions. Please wait before trying again.' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Remaining': String(rl.remaining),
          'X-RateLimit-Reset': String(rl.resetAt),
        },
      }
    );
  }

  try {
    const body = await req.json();
    const data = contactSchema.parse(body);
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // Save to database
    const contact = await (prisma as any).contact?.create?.({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        company: data.company,
        service: data.service,
        ip,
        createdAt: new Date(),
      },
    }).catch(() => ({ id: 'mem-' + Date.now() })); // Graceful fallback

    // Sync with Google Sheets
    if (process.env.SPREADSHEET_ID) {
      appendToGoogleSheet(
        process.env.SPREADSHEET_ID,
        'Leads!A:E',
        [[
          new Date().toISOString(),
          data.name,
          data.email,
          data.phone || 'N/A',
          data.message
        ]]
      ).catch(console.error);
    }

    // Send emails (non-blocking)
    sendContactFormEmails({ ...data, timestamp }).catch(console.error);

    // WhatsApp notification to admin
    sendContactWhatsApp({ name: data.name, subject: data.subject }).catch(console.error);

    // Telegram alert
    sendAdminAlert('New Contact Form Submission', {
      Name: data.name,
      Email: data.email,
      Subject: data.subject,
      Time: timestamp,
    }).catch(console.error);

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! We will get back to you within 24 hours.',
        id: contact?.id,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    console.error('[Contact API]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  // Admin only — fetch contact submissions
  try {
    const { verifyJWT } = await import('@/lib/jwt');
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const payload = await verifyJWT(token) as any;
    if (!['SUPER_ADMIN', 'ADMIN', 'MANAGER'].includes(payload.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const contacts = await (prisma as any).contact?.findMany?.({
      orderBy: { createdAt: 'desc' },
      take: 100,
    }).catch(() => []);

    return NextResponse.json({ contacts: contacts || [] });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
