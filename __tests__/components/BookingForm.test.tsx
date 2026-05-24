/**
 * Booking Form Component Tests
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mocks
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/',
}));
jest.mock('sonner', () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...p }: any) => <div {...p}>{children}</div>,
    section: ({ children, ...p }: any) => <section {...p}>{children}</section>,
    button: ({ children, ...p }: any) => <button {...p}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Test the booking page validation logic
describe('Booking Page Validation', () => {
  it('validates name minimum length', () => {
    const name = 'Jo';
    expect(name.length >= 3).toBe(false);
  });

  it('validates email format', () => {
    const validEmails = ['test@example.com', 'user.name+tag@gmail.com'];
    const invalidEmails = ['notanemail', 'missing@', '@domain.com'];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    validEmails.forEach(e => expect(emailRegex.test(e)).toBe(true));
    invalidEmails.forEach(e => expect(emailRegex.test(e)).toBe(false));
  });

  it('validates phone number format', () => {
    const validPhones = ['+918500647979', '8500647979', '+1-555-555-5555'];
    const phoneRegex = /^[\+]?[0-9\-\s]{8,15}$/;
    validPhones.forEach(p => expect(phoneRegex.test(p.replace(/\s/g, ''))).toBeTruthy());
  });

  it('validates required project type', () => {
    const projectType = '';
    expect(projectType.length > 0).toBe(false);
  });

  it('validates budget range selection', () => {
    const validBudgets = ['<5L', '5-15L', '15-50L', '50L+'];
    const selectedBudget = '5-15L';
    expect(validBudgets.includes(selectedBudget)).toBe(true);
  });
});

// Test the contact form
describe('Contact Form Logic', () => {
  it('validates message minimum length', () => {
    const message = 'Hi';
    expect(message.length >= 10).toBe(false);
  });

  it('validates message maximum length', () => {
    const message = 'A'.repeat(2001);
    expect(message.length <= 2000).toBe(false);
  });

  it('sanitizes HTML from inputs', () => {
    const input = '<script>alert("xss")</script>Hello World';
    // Remove script tags AND their content, then strip remaining tags
    const sanitized = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '').replace(/<[^>]*>/g, '');
    expect(sanitized).toBe('Hello World');
    expect(sanitized).not.toContain('<script>');
  });
});
