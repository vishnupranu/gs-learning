import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme: jest.fn() }),
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
  },
  useScroll: () => ({ scrollY: { get: () => 0 } }),
  useTransform: () => 0,
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock IntersectionObserver
beforeAll(() => {
  (global as any).IntersectionObserver = class {
    observe() {}
    disconnect() {}
    unobserve() {}
  };
});

import HeroSection from '@/components/sections/HeroSection';

describe('HeroSection Component', () => {
  it('renders without crashing', () => {
    render(<HeroSection />);
    expect(document.body).toBeInTheDocument();
  });

  it('renders the main heading "We Build"', () => {
    render(<HeroSection />);
    expect(screen.getByText(/We Build/i)).toBeInTheDocument();
  });

  it('renders Start Your Project CTA button', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Start Your Project/i)).toBeInTheDocument();
  });

  it('renders Talk on WhatsApp button', () => {
    render(<HeroSection />);
    expect(screen.getByText(/WhatsApp/i)).toBeInTheDocument();
  });

  it('renders service cards', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Web Development/i)).toBeInTheDocument();
  });

  it('renders stats section with client count', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Happy Clients/i)).toBeInTheDocument();
  });
});
