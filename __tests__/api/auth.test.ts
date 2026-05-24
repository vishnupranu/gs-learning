/**
 * API Route Integration Tests — Auth
 * Tests the full request/response cycle for auth endpoints
 */

import { NextRequest } from 'next/server';

// --- Helpers ---
function makeRequest(body: unknown, method = 'POST', headers: Record<string, string> = {}) {
  return new NextRequest('http://localhost:3000/api/auth/login', {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  });
}

// --- Register API Tests ---
describe('POST /api/auth/register', () => {
  it('validates required fields', async () => {
    const { POST } = await import('@/app/api/auth/register/route');
    const req = makeRequest({ email: '', password: '' });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('validates email format', async () => {
    const { POST } = await import('@/app/api/auth/register/route');
    const req = makeRequest({ name: 'Test', email: 'not-an-email', password: 'password123' });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('validates password minimum length', async () => {
    const { POST } = await import('@/app/api/auth/register/route');
    const req = makeRequest({ name: 'Test', email: 'test@example.com', password: '123' });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });
});

// --- Login API Tests ---
describe('POST /api/auth/login', () => {
  it('returns 400 when body is missing', async () => {
    const { POST } = await import('@/app/api/auth/login/route');
    const req = new NextRequest('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const res = await POST(req);
    expect(res.status).toBeGreaterThanOrEqual(400);
  });

  it('returns 400 for invalid email format', async () => {
    const { POST } = await import('@/app/api/auth/login/route');
    const req = makeRequest({ email: 'invalid', password: 'test123' });
    const res = await POST(req);
    expect(res.status).toBeGreaterThanOrEqual(400);
  });

  it('returns proper JSON response', async () => {
    const { POST } = await import('@/app/api/auth/login/route');
    const req = makeRequest({ email: 'notfound@test.com', password: 'wrongpass' });
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
  it('validates required fields', async () => {
    const { POST } = await import('@/app/api/contact/route');
    const req = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '', email: '', message: '' }),
    });
    const res = await POST(req);
    expect(res.status).toBeGreaterThanOrEqual(400);
  });
});
