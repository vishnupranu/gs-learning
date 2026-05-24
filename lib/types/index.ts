import { Role } from '@/lib/constants/roles';

// ─── User ────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatar?: string | null;
  bio?: string | null;
  createdAt: string | Date;
}

export interface UserWithPassword extends User {
  password: string;
}

// ─── Course ──────────────────────────────────────────────────────────────────

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number;
  level: string;
  duration: string;
  lessons: number;
  rating: number;
  students: number;
  image: string;
  featured: boolean;
  instructorId: string;
  instructor?: User;
  createdAt: string | Date;
}

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  content?: string;
  videoUrl?: string;
  duration?: number;
  order: number;
  courseId: string;
}

// ─── Enrollment ──────────────────────────────────────────────────────────────

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  progress?: number;
  completed?: boolean;
  enrolledAt: string | Date;
  course?: Course;
}

// ─── Booking ─────────────────────────────────────────────────────────────────

export interface Booking {
  id: string;
  userId: string;
  serviceId: number;
  date: string | Date;
  time: string;
  notes?: string | null;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  createdAt: string | Date;
}

// ─── Payment ─────────────────────────────────────────────────────────────────

export interface Payment {
  id: string;
  userId: string;
  courseId: string;
  amount: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  stripeSessionId: string;
  createdAt: string | Date;
}

// ─── Blog ────────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  category: string;
  tags: string[];
  published: boolean;
  authorId: string;
  author?: User;
  createdAt: string | Date;
  updatedAt: string | Date;
}

// ─── Support ─────────────────────────────────────────────────────────────────

export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  message: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  createdAt: string | Date;
}

// ─── Notification ────────────────────────────────────────────────────────────

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string | Date;
}

// ─── API Response ────────────────────────────────────────────────────────────

export interface ApiError {
  error: string;
  code?: string;
  details?: unknown;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
