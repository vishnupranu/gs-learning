import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { signJWT } from '@/lib/jwt';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID || 'dummy_client_id',
  process.env.GOOGLE_CLIENT_SECRET || 'dummy_client_secret',
  `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/auth/google/callback`
);

// Step 1 — Redirect user to Google consent screen
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const redirect = searchParams.get('redirect') || '/dashboard';

  const authUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: ['profile', 'email'],
    state: encodeURIComponent(redirect),
    prompt: 'select_account',
  });

  return NextResponse.redirect(authUrl);
}

// Step 2 — Handle Google callback (at /api/auth/google/callback)
export async function POST(req: NextRequest) {
  try {
    const { code, state } = await req.json();
    const redirect = state ? decodeURIComponent(state) : '/dashboard';

    if (!code) {
      return NextResponse.json({ error: 'Missing authorization code' }, { status: 400 });
    }

    // Exchange code for tokens
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    // Get user info from Google
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return NextResponse.json({ error: 'Failed to get user info from Google' }, { status: 400 });
    }

    const { email, name, picture, sub: googleId } = payload;

    // Upsert user — create if new, update if existing
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name: name || undefined,
        googleId,
        emailVerified: true,
        avatar: picture,
      },
      create: {
        email,
        name: name || email.split('@')[0],
        googleId,
        emailVerified: true,
        avatar: picture,
        role: 'USER',
        password: '', // No password for OAuth users
      },
    });

    // Issue JWT
    const token = await signJWT({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      redirect,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Google OAuth error:', error);
    return NextResponse.json({ error: 'Google authentication failed' }, { status: 500 });
  }
}
