/**
 * Business Logic Unit Tests
 * Tests utility functions, data transformations, and pure business logic
 */

// --- Date Utilities ---
describe('Date Formatting', () => {
  it('formats dates to readable strings', () => {
    const date = new Date('2025-01-15T10:30:00Z');
    const formatted = date.toLocaleDateString('en-IN', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
    expect(formatted).toContain('2025');
    expect(formatted).toContain('January');
  });

  it('calculates days since date correctly', () => {
    const past = new Date();
    past.setDate(past.getDate() - 7);
    const diffMs = Date.now() - past.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    expect(diffDays).toBeGreaterThanOrEqual(6);
    expect(diffDays).toBeLessThanOrEqual(8);
  });

  it('detects expired OTP correctly', () => {
    const issuedAt = Date.now() - 10 * 60 * 1000; // 10 min ago
    const ttlMs = 5 * 60 * 1000; // 5 min TTL
    const isExpired = Date.now() > issuedAt + ttlMs;
    expect(isExpired).toBe(true);
  });

  it('detects valid OTP (not expired)', () => {
    const issuedAt = Date.now() - 2 * 60 * 1000; // 2 min ago
    const ttlMs = 5 * 60 * 1000; // 5 min TTL
    const isExpired = Date.now() > issuedAt + ttlMs;
    expect(isExpired).toBe(false);
  });
});

// --- Currency Formatting ---
describe('Currency Formatting', () => {
  const formatINR = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  it('formats small amounts correctly', () => {
    expect(formatINR(25000)).toContain('25,000');
  });

  it('formats lakh amounts correctly', () => {
    expect(formatINR(100000)).toContain('1,00,000');
  });

  it('formats with rupee symbol', () => {
    expect(formatINR(50000)).toContain('₹');
  });
});

// --- Role Authorization Logic ---
describe('Role Authorization', () => {
  const ADMIN_ROLES = ['SUPER_ADMIN', 'ADMIN', 'MANAGER'];

  it('allows admin access to SUPER_ADMIN', () => {
    expect(ADMIN_ROLES.includes('SUPER_ADMIN')).toBe(true);
  });

  it('allows admin access to ADMIN', () => {
    expect(ADMIN_ROLES.includes('ADMIN')).toBe(true);
  });

  it('denies admin access to USER', () => {
    expect(ADMIN_ROLES.includes('USER')).toBe(false);
  });

  it('denies admin access to STAFF', () => {
    expect(ADMIN_ROLES.includes('STAFF')).toBe(false);
  });
});

// --- Pagination Logic ---
describe('Pagination', () => {
  const paginate = <T,>(items: T[], page: number, pageSize: number) => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  };

  const items = Array.from({ length: 25 }, (_, i) => i + 1);

  it('returns correct first page', () => {
    expect(paginate(items, 1, 10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('returns correct second page', () => {
    expect(paginate(items, 2, 10)).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  });

  it('returns partial last page', () => {
    expect(paginate(items, 3, 10)).toEqual([21, 22, 23, 24, 25]);
  });

  it('returns empty for out-of-range page', () => {
    expect(paginate(items, 10, 10)).toEqual([]);
  });
});

// --- Slug Generation ---
describe('Slug Generation', () => {
  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();

  it('converts title to slug', () => {
    expect(generateSlug('Hello World')).toBe('hello-world');
  });

  it('removes special characters', () => {
    expect(generateSlug('AI/ML Solutions!')).toBe('aiml-solutions');
  });

  it('collapses multiple dashes', () => {
    expect(generateSlug('Guide  Soft   IT')).toBe('guide-soft-it');
  });
});

// --- OTP Generation ---
describe('OTP Generation', () => {
  const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

  it('generates 6-digit OTP', () => {
    const otp = generateOTP();
    expect(otp).toHaveLength(6);
  });

  it('generates numeric OTP', () => {
    const otp = generateOTP();
    expect(/^\d{6}$/.test(otp)).toBe(true);
  });

  it('generates OTP in valid range', () => {
    for (let i = 0; i < 10; i++) {
      const otp = parseInt(generateOTP(), 10);
      expect(otp).toBeGreaterThanOrEqual(100000);
      expect(otp).toBeLessThanOrEqual(999999);
    }
  });
});
