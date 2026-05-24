import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { prisma } from '@/lib/prisma';
import { signJWT } from '@/lib/jwt';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`
);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state') || '/dashboard';
  const errorParam = searchParams.get('error');
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  if (errorParam) {
    return NextResponse.redirect(`${appUrl}/auth/login?error=google_cancelled`);
  }

  if (!code) {
    return NextResponse.redirect(`${appUrl}/auth/login?error=no_code`);
  }

  try {
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload?.email) {
      return NextResponse.redirect(`${appUrl}/auth/login?error=no_email`);
    }

    const { email, name, picture, sub: googleId } = payload;

    const user = await prisma.user.upsert({
      where: { email },
      update: { googleId, emailVerified: true, avatar: picture || undefined },
      create: {
        email,
        name: name || email.split('@')[0],
        googleId,
        emailVerified: true,
        avatar: picture || undefined,
        role: 'USER',
        password: '',
      },
    });

    const token = await signJWT({ userId: user.id, email: user.email, role: user.role });
    const redirect = decodeURIComponent(state);

    const response = NextResponse.redirect(`${appUrl}${redirect.startsWith('/') ? redirect : '/dashboard'}`);
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Google callback error:', error);
    return NextResponse.redirect(`${appUrl}/auth/login?error=oauth_failed`);
  }
}
