import { z } from 'zod';

// ─── Auth Schemas ─────────────────────────────────────────

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

export const otpSchema = z.object({
  email: z.string().email('Invalid email address'),
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

// ─── Course Schemas ───────────────────────────────────────

export const courseSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Category is required'),
  price: z.number().min(0, 'Price must be non-negative'),
  originalPrice: z.number().min(0).optional(),
  duration: z.string().min(1, 'Duration is required'),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Beginner to Advanced']),
  image: z.string().url('Invalid image URL').optional(),
  skills: z.array(z.string()).optional(),
  lessons: z.number().int().min(0).optional(),
});

// ─── Booking Schemas ──────────────────────────────────────

export const bookingSchema = z.object({
  serviceId: z.number().int().positive(),
  date: z.string().refine((d) => !isNaN(Date.parse(d)), 'Invalid date'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Time must be in HH:MM format'),
  notes: z.string().max(500).optional(),
});

// ─── Contact Schema ───────────────────────────────────────

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  phone: z.string().optional(),
});

// ─── Support Ticket Schema ────────────────────────────────

export const supportTicketSchema = z.object({
  subject: z.string().min(3).max(200),
  message: z.string().min(10).max(5000),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
  category: z.string().optional(),
});

// ─── Profile Schema ───────────────────────────────────────

export const profileSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  bio: z.string().max(500).optional(),
  avatar: z.string().url().optional(),
  phone: z.string().optional(),
});

// ─── Payment Schema ───────────────────────────────────────

export const paymentSchema = z.object({
  courseId: z.string().min(1),
  amount: z.number().positive(),
});

// Helper to safely parse and return errors
export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; errors: z.ZodIssue[] } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error.issues };
}
