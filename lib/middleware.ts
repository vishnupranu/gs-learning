import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from './jwt';

export async function authMiddleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
  }

  try {
    const payload = await verifyJWT(token);
    return payload;
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }
}

export async function adminMiddleware(req: NextRequest) {
  const auth = await authMiddleware(req);
  
  if (auth instanceof NextResponse) {
    return auth;
  }

  if (auth.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Not authorized' },
      { status: 403 }
    );
  }

  return auth;
}
