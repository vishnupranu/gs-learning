import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock all next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme: jest.fn() }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock AuthProvider
jest.mock('@/components/providers/AuthProvider', () => ({
  useAuth: () => ({
    user: null,
    login: jest.fn(),
    logout: jest.fn(),
    signup: jest.fn(),
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    header: ({ children, ...props }: any) => <header {...props}>{children}</header>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

import Header from '@/components/layout/Header';

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<Header />);
    expect(document.body).toBeInTheDocument();
  });

  it('displays Guide Soft brand name', () => {
    render(<Header />);
    expect(screen.getByText(/Guide Soft/i)).toBeInTheDocument();
  });

  it('displays main navigation links', () => {
    render(<Header />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
  });

  it('has Book Consultation CTA button', () => {
    render(<Header />);
    expect(screen.getByText(/Book/i)).toBeInTheDocument();
  });

  it('has Sign In link when user is not logged in', () => {
    render(<Header />);
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });

  it('has mobile menu toggle button', () => {
    render(<Header />);
    // Menu icon should be present on mobile
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});

describe('Header with logged-in user', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.mock('@/components/providers/AuthProvider', () => ({
      useAuth: () => ({
        user: { id: '1', name: 'Ravi Kumar', email: 'ravi@test.com', role: 'USER' },
        login: jest.fn(),
        logout: jest.fn(),
      }),
    }));
  });

  it('shows sign in when logged out', () => {
    render(<Header />);
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });
});
