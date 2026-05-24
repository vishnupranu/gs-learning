import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const payload = await verifyJWT(token) as any;
    if (!['SUPER_ADMIN', 'ADMIN', 'MANAGER'].includes(payload.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    const bookings = await prisma.booking.findMany({});
    let filtered = bookings as any[];
    if (status) filtered = filtered.filter((b: any) => b.status === status);

    return NextResponse.json({ bookings: filtered });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const payload = await verifyJWT(token) as any;
    if (!['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'STAFF'].includes(payload.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { bookingId, status } = await req.json();
    if (!bookingId || !status) {
      return NextResponse.json({ error: 'bookingId and status required' }, { status: 400 });
    }

    const validStatuses = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'RESCHEDULED'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const booking = await prisma.booking.update?.({
      where: { id: bookingId },
      data: { status },
    }).catch(() => null);

    return NextResponse.json({ success: true, booking });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
