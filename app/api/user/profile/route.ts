import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import { hash as hashPassword } from '@/lib/crypto';

export async function PUT(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await verifyJWT(token);
    const body = await req.json();

    const updateData: any = {};
    if (body.name) updateData.name = body.name;
    if (body.bio) updateData.bio = body.bio;
    if (body.avatar) updateData.avatar = body.avatar;
    if (body.password) updateData.password = await hashPassword(body.password);

    const user = await prisma.user.update({
      where: { id: decoded.userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        bio: true
      }
    });

    return NextResponse.json({ user, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Profile API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
