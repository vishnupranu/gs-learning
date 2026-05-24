import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/middleware/rbac';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const payload = await verifyJWT(token) as any;
    const role = payload.role || 'CUSTOMER';

    // Admins see all users; customers can't access this endpoint
    if (!['SUPER_ADMIN', 'ADMIN', 'MANAGER'].includes(role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const roleFilter = searchParams.get('role') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const users = await prisma.user.findMany({});

    // Filter in memory (works without full Prisma)
    let filtered = users as any[];
    if (search) {
      filtered = filtered.filter((u: any) =>
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (roleFilter) {
      filtered = filtered.filter((u: any) => u.role === roleFilter);
    }

    const total = filtered.length;
    const paginated = filtered.slice((page - 1) * limit, page * limit);

    // Never return passwords
    const safe = paginated.map(({ password, ...rest }: any) => rest);

    return NextResponse.json({
      users: safe,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
