import { NextRequest, NextResponse } from 'next/server';
import { hash } from '@/lib/crypto';
import { prisma } from '@/lib/prisma';
import { signJWT } from '@/lib/jwt';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, name } = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      }
    });

    // Trigger onboarding workflow (welcome email, Telegram alert, audit log)
    try {
      const { workflows } = await import('@/lib/workflows');
      workflows.handleUserSignup(user.id).catch(console.error);
    } catch (e) {
      console.error('Failed to trigger user signup workflow:', e);
    }

    // Generate JWT token for auto-login
    const token = await signJWT({
      userId: user.id,
      email: user.email,
      role: user.role || 'CUSTOMER',
    });

    const response = NextResponse.json(
      { 
        message: 'User created successfully',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role || 'CUSTOMER',
        }
      },
      { status: 201 }
    );

    // Set HTTP-only cookie for auto-login
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
