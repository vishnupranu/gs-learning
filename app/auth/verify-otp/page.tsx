'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, RefreshCw, CheckCircle, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function OTPForm() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(60);
  const [verified, setVerified] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const redirect = searchParams.get('redirect') || '/dashboard';

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    // Auto-submit when all 6 filled
    if (index === 5 && value) {
      const code = [...newOtp.slice(0, 5), value].join('');
      if (code.length === 6) handleVerify(code);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(''));
      handleVerify(pasted);
    }
  };

  const handleVerify = async (code?: string) => {
    const finalCode = code || otp.join('');
    if (finalCode.length !== 6) {
      toast.error('Please enter all 6 digits');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify', email, code: finalCode }),
      });
      const data = await res.json();
      if (res.ok) {
        setVerified(true);
        toast.success('Email verified successfully!');
        setTimeout(() => router.push(redirect), 1500);
      } else {
        toast.error(data.error || 'Invalid OTP. Please try again.');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch {
      toast.error('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    try {
      const res = await fetch('/api/auth/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send', email }),
      });
      if (res.ok) {
        toast.success('New OTP sent to your email');
        setResendCooldown(60);
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      } else {
        toast.error('Failed to resend OTP');
      }
    } catch {
      toast.error('Failed to resend OTP');
    }
  };

  if (verified) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center py-8"
      >
        <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={40} className="text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Verified!</h3>
        <p className="text-gray-500 dark:text-gray-400">Redirecting you now...</p>
      </motion.div>
    );
  }

  return (
    <>
      {/* OTP Inputs */}
      <div className="flex gap-3 justify-center mb-8" onPaste={handlePaste}>
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={el => { inputRefs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKeyDown(i, e)}
            className={`w-12 h-14 text-center text-2xl font-black rounded-2xl border-2 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white outline-none transition-all ${
              digit
                ? 'border-green-500 bg-green-500/10'
                : 'border-gray-200 dark:border-gray-700 focus:border-green-500'
            }`}
          />
        ))}
      </div>

      <Button
        onClick={() => handleVerify()}
        disabled={loading || otp.join('').length < 6}
        className="w-full gradient-bg text-white font-bold h-12 rounded-xl shadow-lg shadow-green-500/25 hover:opacity-90 disabled:opacity-50 mb-4"
      >
        {loading ? (
          <RefreshCw size={16} className="animate-spin mr-2" />
        ) : (
          <ShieldCheck size={16} className="mr-2" />
        )}
        {loading ? 'Verifying...' : 'Verify Email'}
      </Button>

      <div className="text-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Didn&apos;t receive the code?</p>
        <button
          onClick={handleResend}
          disabled={resendCooldown > 0}
          className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-semibold text-sm disabled:text-gray-400 disabled:dark:text-gray-600 disabled:cursor-not-allowed transition-colors"
        >
          {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend OTP'}
        </button>
      </div>
    </>
  );
}

export default function VerifyOTPPage() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setEmail(decodeURIComponent(String(new URLSearchParams(window.location.search).get('email') || '')));
    }
  }, []);

  return (
    <div className="min-h-screen gradient-grid-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 dark:bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-400/5 dark:bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-100 dark:border-gray-800 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/25">
              <Mail size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Check Your Email</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              We sent a 6-digit verification code to
            </p>
            <p className="text-green-600 dark:text-green-400 font-semibold mt-1">
              {email}
            </p>
          </div>

          <Suspense fallback={<div className="text-center text-gray-400">Loading...</div>}>
            <OTPForm />
          </Suspense>

          <div className="mt-6 text-center">
            <Link href="/auth/login" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors">
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
