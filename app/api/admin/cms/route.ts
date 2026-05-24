import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/jwt';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const decoded = await verifyJWT(token) as any;
    if (!['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'STAFF'].includes(decoded.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
      include: { author: { select: { name: true } } },
    });
    return NextResponse.json({ posts });
  } catch (err) {
    console.error('CMS GET error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const decoded = await verifyJWT(token) as any;
    if (!['SUPER_ADMIN', 'ADMIN', 'MANAGER'].includes(decoded.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const post = await prisma.blogPost.create({
      data: {
        title: body.title,
        slug: body.slug,
        content: body.content,
        status: body.status || 'DRAFT',
        authorId: decoded.userId,
        published: body.status === 'PUBLISHED' ? new Date() : null,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: decoded.userId,
        action: 'CREATED_POST',
        details: `Created blog post: ${post.title}`,
        ipAddress: req.headers.get('x-forwarded-for') || 'unknown',
      },
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (err) {
    console.error('CMS POST error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const decoded = await verifyJWT(token) as any;
    if (!['SUPER_ADMIN', 'ADMIN', 'MANAGER'].includes(decoded.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const post = await prisma.blogPost.update({
      where: { id: body.id },
      data: {
        title: body.title,
        slug: body.slug,
        content: body.content,
        status: body.status,
        published: body.status === 'PUBLISHED' ? new Date() : null,
      },
    });
    return NextResponse.json({ post });
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const decoded = await verifyJWT(token) as any;
    if (!['SUPER_ADMIN', 'ADMIN'].includes(decoded.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    await prisma.blogPost.delete({ where: { id: body.id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
