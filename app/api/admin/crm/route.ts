import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await verifyJWT(token);
    if (!['SUPER_ADMIN', 'ADMIN', 'MANAGER'].includes(decoded.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const leads = await prisma.cRMLead.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ leads });
  } catch (error) {
    console.error('CRM API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await verifyJWT(token);
    if (!['SUPER_ADMIN', 'ADMIN', 'MANAGER'].includes(decoded.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const lead = await prisma.cRMLead.create({
      data: {
        name: body.name,
        email: body.email,
        company: body.company,
        phone: body.phone,
        value: body.value ? parseFloat(body.value) : null,
      }
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: decoded.userId,
        action: 'CREATED_LEAD',
        details: `Created CRM Lead: ${lead.id}`,
        ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
      }
    });

    return NextResponse.json({ lead }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await verifyJWT(token);
    if (!['SUPER_ADMIN', 'ADMIN', 'MANAGER'].includes(decoded.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const lead = await prisma.cRMLead.update({
      where: { id: body.id },
      data: { status: body.status, updatedAt: new Date() },
    });

    return NextResponse.json({ lead });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
