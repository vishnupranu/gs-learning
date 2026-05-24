/**
 * Database abstraction layer.
 * Uses @prisma/client when available (production with DATABASE_URL set).
 * Falls back to an in-memory store for local development without a database.
 */

// ─── In-memory store (development fallback) ──────────────────────────────────

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  avatar: string | null;
  bio: string | null;
  createdAt: Date;
};

type Course = {
  id: string;
  title: string;
  description: string;
  category: string;
  instructorId: string;
  createdAt: Date;
};

type Enrollment = {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: Date;
};

type Booking = {
  id: string;
  userId: string;
  serviceId: number;
  date: Date;
  time: string;
  notes: string | null;
  status: string;
  createdAt: Date;
};

type Payment = {
  id: string;
  userId: string;
  courseId: string;
  amount: number;
  status: string;
  stripeSessionId: string;
  createdAt: Date;
};

// Shared in-memory storage (persists for the lifetime of the dev server process)
const store = {
  users: [] as User[],
  courses: [] as Course[],
  enrollments: [] as Enrollment[],
  bookings: [] as Booking[],
  payments: [] as Payment[],
};

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// ─── In-memory DB client (same shape as Prisma client methods used in routes) ─

const memoryDB = {
  user: {
    findMany: async ({ where, skip, take, select, orderBy }: any = {}) => {
      let results = [...store.users];
      if (where?.role) results = results.filter(u => u.role === where.role);
      if (where?.OR) {
        const term = (where.OR[0]?.name?.contains || where.OR[0]?.email?.contains || '').toLowerCase();
        if (term) {
          results = results.filter(u =>
            u.name.toLowerCase().includes(term) ||
            u.email.toLowerCase().includes(term)
          );
        }
      }
      if (orderBy) {
        const key = Object.keys(orderBy)[0];
        const dir = orderBy[key];
        results.sort((a: any, b: any) => {
          if (dir === 'desc') return a[key] > b[key] ? -1 : 1;
          return a[key] > b[key] ? 1 : -1;
        });
      }
      const total = results.length;
      if (skip) results = results.slice(skip);
      if (take) results = results.slice(0, take);
      if (select) {
        return results.map(u => Object.fromEntries(
          Object.keys(select).filter(k => select[k]).map(k => [k, (u as any)[k]])
        ));
      }
      return results;
    },
    count: async ({ where }: any = {}) => {
      let results = [...store.users];
      if (where?.role) results = results.filter(u => u.role === where.role);
      return results.length;
    },
    findUnique: async ({ where, select }: any) => {
      const user = store.users.find(u =>
        (where.id && u.id === where.id) ||
        (where.email && u.email === where.email)
      );
      if (!user) return null;
      if (!select) return user;
      return Object.fromEntries(
        Object.keys(select).filter(k => select[k]).map(k => [k, (user as any)[k]])
      );
    },
    create: async ({ data, select }: any) => {
      const user: User = {
        id: generateId(),
        name: data.name || '',
        email: data.email,
        password: data.password,
        role: data.role || 'student',
        avatar: data.avatar || null,
        bio: data.bio || null,
        createdAt: new Date(),
      };
      store.users.push(user);
      if (!select) return user;
      return Object.fromEntries(
        Object.keys(select).filter(k => select[k]).map(k => [k, (user as any)[k]])
      );
    },
    update: async ({ where, data, select }: any) => {
      const idx = store.users.findIndex(u => u.id === where.id);
      if (idx === -1) throw new Error('User not found');
      store.users[idx] = { ...store.users[idx], ...data };
      const user = store.users[idx];
      if (!select) return user;
      return Object.fromEntries(
        Object.keys(select).filter(k => select[k]).map(k => [k, (user as any)[k]])
      );
    },
    delete: async ({ where }: any) => {
      store.users = store.users.filter(u => u.id !== where.id);
    },
  },

  course: {
    findMany: async ({ where, skip, take, include, orderBy }: any) => {
      let results = [...store.courses];
      if (where?.category) results = results.filter(c => c.category === where.category);
      if (where?.OR) {
        const term = where.OR[0]?.title?.contains?.toLowerCase() || '';
        results = results.filter(c =>
          c.title.toLowerCase().includes(term) ||
          c.description.toLowerCase().includes(term)
        );
      }
      if (skip) results = results.slice(skip);
      if (take) results = results.slice(0, take);
      return results;
    },
    count: async ({ where }: any) => {
      let results = [...store.courses];
      if (where?.category) results = results.filter(c => c.category === where.category);
      return results.length;
    },
    findUnique: async ({ where, include }: any) => {
      return store.courses.find(c => c.id === where.id) || null;
    },
    create: async ({ data, include }: any) => {
      const course: Course = { id: generateId(), createdAt: new Date(), ...data };
      store.courses.push(course);
      return course;
    },
    update: async ({ where, data }: any) => {
      const idx = store.courses.findIndex(c => c.id === where.id);
      if (idx === -1) throw new Error('Course not found');
      store.courses[idx] = { ...store.courses[idx], ...data };
      return store.courses[idx];
    },
    delete: async ({ where }: any) => {
      store.courses = store.courses.filter(c => c.id !== where.id);
    },
  },

  enrollment: {
    findMany: async ({ where, include, orderBy }: any) => {
      return store.enrollments.filter(e =>
        (!where?.userId || e.userId === where.userId)
      );
    },
    findUnique: async ({ where }: any) => {
      if (where?.userId_courseId) {
        return store.enrollments.find(
          e => e.userId === where.userId_courseId.userId &&
               e.courseId === where.userId_courseId.courseId
        ) || null;
      }
      return store.enrollments.find(e => e.id === where.id) || null;
    },
    create: async ({ data, include }: any) => {
      const enrollment: Enrollment = {
        id: generateId(),
        userId: data.userId,
        courseId: data.courseId,
        enrolledAt: new Date(),
      };
      store.enrollments.push(enrollment);
      return enrollment;
    },
  },

  booking: {
    create: async ({ data }: any) => {
      const booking: Booking = {
        id: generateId(),
        userId: data.userId,
        serviceId: data.serviceId,
        date: data.date,
        time: data.time,
        notes: data.notes || null,
        status: data.status || 'PENDING',
        createdAt: new Date(),
      };
      store.bookings.push(booking);
      return booking;
    },
    findMany: async ({ where }: any) => {
      return store.bookings.filter(b =>
        (!where?.userId || b.userId === where.userId)
      );
    },
  },

  payment: {
    create: async ({ data }: any) => {
      const payment: Payment = {
        id: generateId(),
        userId: data.userId,
        courseId: data.courseId,
        amount: data.amount,
        status: data.status || 'PENDING',
        stripeSessionId: data.stripeSessionId,
        createdAt: new Date(),
      };
      store.payments.push(payment);
      return payment;
    },
    findMany: async ({ where }: any) => {
      return store.payments.filter(p =>
        (!where?.userId || p.userId === where.userId)
      );
    },
  },
};

// ─── Try to use real Prisma if available ──────────────────────────────────────

let _prisma: any = null;

function getDB() {
  if (_prisma) return _prisma;

  try {
    // Dynamic require so the module doesn't crash at compile time when @prisma/client is absent
    const { PrismaClient } = require('@prisma/client');
    const globalForPrisma = global as any;
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = new PrismaClient();
    }
    _prisma = globalForPrisma.prisma;
    return _prisma;
  } catch {
    // @prisma/client not installed or DATABASE_URL not configured — use in-memory fallback
    return memoryDB;
  }
}

export const prisma = new Proxy({} as any, {
  get(_target, prop: string) {
    const db = getDB();
    return db[prop];
  }
});
