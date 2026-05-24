import { SDKConfig, Course, Enrollment, User, Service, Booking, Payment } from './types';

export class GuideSoftSDK {
  private config: SDKConfig;
  private token: string | null = null;

  constructor(config: SDKConfig) {
    this.config = {
      timeout: 30000,
      ...config,
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    if (this.config.apiKey) {
      headers['X-API-Key'] = this.config.apiKey;
    }

    const response = await fetch(url, {
      ...options,
      headers,
      signal: AbortSignal.timeout(this.config.timeout!),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || 'Request failed');
    }

    return response.json();
  }

  setToken(token: string) {
    this.token = token;
  }

  clearToken() {
    this.token = null;
  }

  // Authentication
  async login(email: string, password: string) {
    const response = await this.request<{ user: User; token: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.token = response.token;
    return response;
  }

  async register(email: string, password: string, name: string) {
    return this.request<{ user: User }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  async logout() {
    await this.request('/api/auth/logout', { method: 'POST' });
    this.clearToken();
  }

  async getCurrentUser(): Promise<User> {
    const response = await this.request<{ user: User }>('/api/auth/me');
    return response.user;
  }

  // Courses
  courses = {
    list: (params?: { category?: string; search?: string; page?: number; limit?: number }) => {
      const searchParams = new URLSearchParams();
      if (params?.category) searchParams.append('category', params.category);
      if (params?.search) searchParams.append('search', params.search);
      if (params?.page) searchParams.append('page', params.page.toString());
      if (params?.limit) searchParams.append('limit', params.limit.toString());
      
      return this.request<{ courses: Course[]; pagination: any }>(
        `/api/courses?${searchParams.toString()}`
      );
    },

    get: (id: string) => 
      this.request<Course>(`/api/courses/${id}`),

    create: (data: Partial<Course>) => 
      this.request<Course>('/api/courses', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    update: (id: string, data: Partial<Course>) => 
      this.request<Course>(`/api/courses/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),

    delete: (id: string) => 
      this.request(`/api/courses/${id}`, { method: 'DELETE' }),
  };

  // Enrollments
  enrollments = {
    list: () => 
      this.request<Enrollment[]>('/api/enrollments'),

    create: (courseId: string) => 
      this.request<Enrollment>('/api/enrollments', {
        method: 'POST',
        body: JSON.stringify({ courseId }),
      }),

    delete: (id: string) => 
      this.request(`/api/enrollments/${id}`, { method: 'DELETE' }),
  };

  // Services
  services = {
    list: () => 
      this.request<Service[]>('/api/services'),

    book: (data: { serviceId: number; date: string; time: string; notes?: string }) => 
      this.request<Booking>('/api/services/booking', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  };

  // Payments
  payments = {
    createCheckout: (courseId: string, amount: number) => 
      this.request<{ sessionId: string }>('/api/payments/create-checkout', {
        method: 'POST',
        body: JSON.stringify({ courseId, amount }),
      }),
  };

  // Users
  users = {
    get: (id: string) => this.request<User>(`/api/users/${id}`),
    
    update: (id: string, data: Partial<User>) =>
      this.request<User>(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
      
    delete: (id: string) =>
      this.request(`/api/users/${id}`, { method: 'DELETE' }),
  };

  // Contact
  contact = {
    submit: (data: { name: string; email: string; subject: string; message: string; phone?: string; company?: string; service?: string }) =>
      this.request<{ message: string }>('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  };
}
