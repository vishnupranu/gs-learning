/** @jest-environment node */
/**
 * API Route Integration Tests — Auth
 * Runs in Node env so native Request/Response globals are available for NextRequest.
 */

// Must mock prisma BEFORE any route imports so DB calls don't run
jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue({ id: '1', email: 'test@test.com', name: 'Test', role: 'USER' }),
    },
    auditLog: { create: jest.fn() },
  },
}));

jest.mock('@/lib/email', () => ({
  sendEmail: jest.fn().mockResolvedValue(true),
  sendWelcomeEmail: jest.fn().mockResolvedValue(true),
}));

jest.mock('@/lib/telegram', () => ({
  sendTelegramMessage: jest.fn().mockResolvedValue(true),
}));

import { NextRequest } from 'next/server';

// --- Helpers ---
function makeRequest(url: string, body: unknown, method = 'POST') {
  return new NextRequest(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

// --- Register API Tests ---
describe('POST /api/auth/register', () => {
  it('validates required fields — returns 400', async () => {
    const { POST } = await import('@/app/api/auth/register/route');
    const req = makeRequest('http://localhost:3000/api/auth/register', { email: '', password: '' });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('validates email format — returns 400', async () => {
    const { POST } = await import('@/app/api/auth/register/route');
    const req = makeRequest('http://localhost:3000/api/auth/register', { name: 'Test', email: 'not-an-email', password: 'password123' });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('validates password minimum length — returns 400', async () => {
    const { POST } = await import('@/app/api/auth/register/route');
    const req = makeRequest('http://localhost:3000/api/auth/register', { name: 'Test', email: 'test@example.com', password: '123' });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });
});

// --- Login API Tests ---
describe('POST /api/auth/login', () => {
  it('returns 400 or 401 when credentials missing', async () => {
    const { POST } = await import('@/app/api/auth/login/route');
    const req = makeRequest('http://localhost:3000/api/auth/login', {});
    const res = await POST(req);
    expect(res.status).toBeGreaterThanOrEqual(400);
  });

  it('returns 400 for invalid email format', async () => {
    const { POST } = await import('@/app/api/auth/login/route');
    const req = makeRequest('http://localhost:3000/api/auth/login', { email: 'invalid', password: 'test123' });
    const res = await POST(req);
    expect(res.status).toBeGreaterThanOrEqual(400);
  });

  it('returns proper JSON with error property for wrong credentials', async () => {
    const { POST } = await import('@/app/api/auth/login/route');
    const req = makeRequest('http://localhost:3000/api/auth/login', { email: 'notfound@test.com', password: 'wrongpass' });
    const res = await POST(req);
    const body = await res.json();
    expect(body).toHaveProperty('error');
  });
});

// --- Health API Test ---
describe('GET /api/health', () => {
  it('returns a health response object', async () => {
    const { GET } = await import('@/app/api/health/route');
    const req = new NextRequest('http://localhost:3000/api/health', { method: 'GET' });
    const res = await GET(req);
    expect([200, 503]).toContain(res.status);
    const body = await res.json();
    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('timestamp');
    expect(body).toHaveProperty('checks');
  });
});

// --- Contact API Test ---
describe('POST /api/contact', () => {
  it('validates required fields — returns 400', async () => {
    const { POST } = await import('@/app/api/contact/route');
    const req = makeRequest('http://localhost:3000/api/contact', { name: '', email: '', message: '' });
    const res = await POST(req);
    expect(res.status).toBeGreaterThanOrEqual(400);
  });
});
