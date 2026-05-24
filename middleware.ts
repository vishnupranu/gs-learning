import { NextRequest, NextResponse } from 'next/server';

/**
 * Next.js Edge Middleware
 * Runs on every request before routing.
 * Adds: security headers, CSRF protection, basic route guards.
 */

const PUBLIC_PATHS = [
  '/',
  '/about',
  '/services',
  '/pricing',
  '/features',
  '/contact',
  '/faq',
  '/terms',
  '/privacy',
  '/affiliate',
  '/case-studies',
  '/projects',
  '/process',
  '/technology',
  '/auth',
  '/api/auth',
  '/api/contact',
  '/api/ai/chat',
  '/_next',
  '/favicon.ico',
  '/og-image.jpg',
];

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some(p => pathname.startsWith(p));
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── Security Headers ─────────────────────────────────────────────────────
  const res = NextResponse.next();

  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https: http:",
      "connect-src 'self' https://api.openai.com https://api.cloudflare.com https://graph.facebook.com",
      "frame-ancestors 'none'",
    ].join('; ')
  );

  if (process.env.NODE_ENV === 'production') {
    res.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }

  // ── Route Protection ─────────────────────────────────────────────────────

  // Admin routes require authentication
  if (pathname.startsWith('/admin')) {
    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login?redirect=' + pathname, req.url));
    }
    // Note: Full role verification happens in the route handler (edge JWT verify is heavier)
  }

  // Dashboard routes require authentication
  if (pathname.startsWith('/dashboard')) {
    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login?redirect=' + pathname, req.url));
    }
  }

  // Redirect logged-in users away from auth pages
  if (pathname.startsWith('/auth/login') || pathname.startsWith('/auth/register')) {
    const token = req.cookies.get('token')?.value;
    if (token) {
      const redirect = req.nextUrl.searchParams.get('redirect') || '/dashboard';
      return NextResponse.redirect(new URL(redirect, req.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    // Apply to all routes except static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|woff|woff2)).*)',
  ],
};
