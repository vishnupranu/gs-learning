import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyJWT } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import { sendBookingConfirmation, sendAdminBookingAlert } from '@/lib/email';
import { sendBookingWhatsApp, sendAdminAlert } from '@/lib/notifications';
import { checkRateLimit, getClientIP } from '@/lib/middleware/rateLimit';

const SERVICE_NAMES: Record<number, string> = {
  1: 'Software Development',
  2: 'AI/ML Development',
  3: 'UX/UI Design',
  4: 'Testing Services',
  5: 'Mobile Applications',
  6: 'LMS Platform',
};

const bookingSchema = z.object({
  serviceId: z.number().int().min(1).max(6),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
  time: z.string().min(1),
  notes: z.string().max(500).optional(),
  phone: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const ip = getClientIP(req);
  const rl = checkRateLimit({ key: `booking:${ip}`, max: 10, windowMs: 3_600_000 });
  if (!rl.success) {
    return NextResponse.json({ error: 'Too many booking requests. Try again later.' }, { status: 429 });
  }

  try {
    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const payload = await verifyJWT(token) as any;
    const body = await req.json();
    const { serviceId, date, time, notes, phone } = bookingSchema.parse(body);

    const booking = await prisma.booking.create({
      data: {
        userId: payload.userId,
        serviceId,
        date: new Date(date),
        time,
        notes,
        status: 'PENDING',
      },
    });

    const serviceName = SERVICE_NAMES[serviceId] || 'Consultation';
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    const formattedDate = new Date(date).toLocaleDateString('en-IN', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });

    // Notify user via email
    if (user) {
      sendBookingConfirmation(user.email, {
        name: user.name,
        service: serviceName,
        date: formattedDate,
        time,
        bookingId: booking.id,
        notes,
      }).catch(console.error);

      // WhatsApp confirmation
      if (phone || (user as any).phone) {
        sendBookingWhatsApp(phone || (user as any).phone, {
          name: user.name,
          service: serviceName,
          date: formattedDate,
          time,
          bookingId: booking.id,
        }).catch(console.error);
      }

      // Admin notifications
      sendAdminBookingAlert({
        userName: user.name,
        userEmail: user.email,
        service: serviceName,
        date: formattedDate,
        time,
        bookingId: booking.id,
        notes,
      }).catch(console.error);

      sendAdminAlert('New Booking', {
        Customer: user.name,
        Service: serviceName,
        Date: `${formattedDate} at ${time}`,
        'Booking ID': `#${booking.id}`,
      }).catch(console.error);
    }

    return NextResponse.json(
      { success: true, message: 'Booking created successfully', booking },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.errors }, { status: 400 });
    }
    console.error('[Booking API]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const payload = await verifyJWT(token) as any;
    const bookings = await prisma.booking.findMany({
      where: { userId: payload.userId },
    });

    return NextResponse.json({ bookings });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
