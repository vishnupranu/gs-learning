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

    // Gather all data in parallel
    const [users, bookings, payments] = await Promise.all([
      prisma.user.findMany({}).catch(() => []),
      prisma.booking.findMany({}).catch(() => []),
      prisma.payment.findMany({}).catch(() => []),
    ]);

    const u = users as any[];
    const b = bookings as any[];
    const p = payments as any[];

    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const revenue = p.filter((x: any) => x.status === 'COMPLETED').reduce((s: number, x: any) => s + (x.amount || 0), 0);
    const revenueThisMonth = p.filter((x: any) => x.status === 'COMPLETED' && new Date(x.createdAt) >= thisMonth).reduce((s: number, x: any) => s + (x.amount || 0), 0);

    const bookingsThisMonth = b.filter((x: any) => new Date(x.createdAt) >= thisMonth).length;
    const bookingsLastMonth = b.filter((x: any) => {
      const d = new Date(x.createdAt);
      return d >= lastMonth && d < thisMonth;
    }).length;

    // Bookings by status
    const bookingsByStatus = b.reduce((acc: any, bk: any) => {
      acc[bk.status] = (acc[bk.status] || 0) + 1;
      return acc;
    }, {});

    // Revenue by month (last 6 months)
    const revenueByMonth = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      const next = new Date(d.getFullYear(), d.getMonth() + 1, 1);
      const amount = p.filter((x: any) => {
        const cd = new Date(x.createdAt);
        return x.status === 'COMPLETED' && cd >= d && cd < next;
      }).reduce((s: number, x: any) => s + (x.amount || 0), 0);
      return {
        month: d.toLocaleString('en-US', { month: 'short' }),
        revenue: amount,
        bookings: b.filter((x: any) => {
          const cd = new Date(x.createdAt);
          return cd >= d && cd < next;
        }).length,
      };
    });

    // New users by month
    const userGrowth = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      const next = new Date(d.getFullYear(), d.getMonth() + 1, 1);
      return {
        month: d.toLocaleString('en-US', { month: 'short' }),
        users: u.filter((x: any) => {
          const cd = new Date(x.createdAt);
          return cd >= d && cd < next;
        }).length,
      };
    });

    return NextResponse.json({
      overview: {
        totalUsers: u.length,
        totalBookings: b.length,
        totalRevenue: revenue,
        revenueThisMonth,
        bookingsThisMonth,
        bookingsLastMonth,
        pendingBookings: bookingsByStatus['PENDING'] || 0,
        confirmedBookings: bookingsByStatus['CONFIRMED'] || 0,
      },
      charts: {
        revenueByMonth,
        userGrowth,
        bookingsByStatus,
      },
    });
  } catch (error) {
    console.error('[Admin Analytics]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
