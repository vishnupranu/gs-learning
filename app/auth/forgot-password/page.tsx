'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, ArrowLeft, CheckCircle, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

type Step = 'email' | 'sent' | 'reset';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSendReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error('Please enter a valid email address');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStep('sent');
        toast.success('Reset link sent! Check your inbox.');
      } else {
        toast.error('Failed to send reset email. Please try again.');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    setLoading(true);
    // In production: call /api/auth/reset-password with token + new password
    await new Promise(r => setTimeout(r, 1000));
    toast.success('Password reset successfully! Please sign in.');
    setLoading(false);
  };

  return (
    <div className="min-h-screen gradient-grid-bg">
      <Header />

      <div className="pt-20 pb-16 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-xl p-8"
          >
            {step === 'email' && (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Mail size={28} className="text-white" />
                  </div>
                  <h1 className="text-2xl font-black text-gray-900 dark:text-white">Forgot your password?</h1>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                    No worries! Enter your email and we will send you a reset link.
                  </p>
                </div>

                <form onSubmit={handleSendReset} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        className="pl-10 bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-850"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full gradient-bg text-white hover:opacity-90"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Reset Link
                        <ArrowRight size={16} />
                      </span>
                    )}
                  </Button>

                  <div className="text-center">
                    <Link href="/auth/login" className="text-sm text-green-600 hover:underline flex items-center gap-1 justify-center">
                      <ArrowLeft size={14} />
                      Back to Sign In
                    </Link>
                  </div>
                </form>
              </>
            )}

            {step === 'sent' && (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-950/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={28} className="text-green-600" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Check your email</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                  We sent a password reset link to{' '}
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{email}</span>
                </p>
                <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-4 mb-6 text-left space-y-2 border border-gray-100 dark:border-gray-800">
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wide">Next steps:</p>
                  {['Open your email inbox', 'Click the reset link in the email', 'Create your new password', 'Sign in with new credentials'].map((step, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <span className="w-5 h-5 rounded-full gradient-bg text-white text-xs flex items-center justify-center font-bold flex-shrink-0">{i + 1}</span>
                      {step}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mb-4">
                  Did not receive it? Check your spam folder or{' '}
                  <button
                    onClick={() => setStep('email')}
                    className="text-green-600 hover:underline font-semibold"
                  >
                    resend the email
                  </button>
                </p>
                <div className="flex gap-3">
                  <Link href="/auth/login" className="flex-1">
                    <Button variant="outline" className="w-full">
                      Back to Login
                    </Button>
                  </Link>
                  <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button className="w-full gradient-bg text-white">
                      Open Gmail
                    </Button>
                  </a>
                </div>
              </div>
            )}
          </motion.div>

          {/* Security note */}
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
            🔒 Reset links expire after 30 minutes for your security.
            <br />
            Need help? <a href="https://wa.me/918884162999" className="text-green-600 hover:underline">Contact support on WhatsApp</a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
