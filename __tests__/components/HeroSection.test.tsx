import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme: jest.fn() }),
}));

// Mock framer-motion — Proxy covers every motion.X tag automatically
jest.mock('framer-motion', () => {
  const tags = ['div','section','h1','h2','h3','p','span','a','button','li','ul','ol','img','form','header','footer','nav','article','aside','main'];
  const motion: any = {};
  tags.forEach((tag) => {
    motion[tag] = ({ children, ...props }: any) => {
      const { initial, animate, exit, transition, variants, whileHover, whileTap, ...rest } = props;
      return React.createElement(tag, rest, children);
    };
  });
  return {
    motion,
    useScroll: () => ({ scrollY: { get: () => 0, on: () => () => {} } }),
    useTransform: () => 0,
    useMotionValue: () => ({ get: () => 0, on: () => () => {} }),
    useSpring: () => 0,
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

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
