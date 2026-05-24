/**
 * Rate limiting middleware - compatible wrapper
 * Supports both object-style and positional argument calls.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up expired entries every 60 seconds
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    store.forEach((entry, key) => {
      if (entry.resetAt < now) {
        store.delete(key);
      }
    });
  }, 60_000);
}

interface RateLimitOptions {
  key: string;
  max: number;
  windowMs: number;
}

/**
 * Check rate limit.
 * Supports two calling conventions:
 *   checkRateLimit({ key, max, windowMs })  — object style
 *   checkRateLimit(key, prefix, max, windowSec) — positional style
 */
export function checkRateLimit(
  keyOrOpts: string | RateLimitOptions,
  prefix?: string,
  max?: number,
  windowSec?: number
): { success: boolean; remaining: number; resetAt: number } {
  let key: string;
  let limit: number;
  let windowMs: number;

  if (typeof keyOrOpts === 'object') {
    key = keyOrOpts.key;
    limit = keyOrOpts.max;
    windowMs = keyOrOpts.windowMs;
  } else {
    key = prefix ? `${prefix}:${keyOrOpts}` : keyOrOpts;
    limit = max ?? 10;
    windowMs = (windowSec ?? 60) * 1000;
  }

  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt < now) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return { success: true, remaining: limit - 1, resetAt };
  }

  if (entry.count >= limit) {
    return { success: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  return { success: true, remaining: limit - entry.count, resetAt: entry.resetAt };
}

/** Get client IP from request headers */
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const real = request.headers.get('x-real-ip');
  if (real) return real;
  return '127.0.0.1';
}
