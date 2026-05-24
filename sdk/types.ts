export interface SDKConfig {
  apiKey?: string;
  baseUrl: string;
  timeout?: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  role: string;
  createdAt: string;
}

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
  instructor?: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  progress: number;
  completed: boolean;
  enrolledAt: string;
  course?: Course;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  price: string;
  features: string[];
}

export interface Booking {
  id: string;
  userId: string;
  serviceId: number;
  date: string;
  time: string;
  notes?: string;
  status: string;
}

export interface Payment {
  id: string;
  userId: string;
  courseId: string;
  amount: number;
  status: string;
  stripeSessionId: string;
}
