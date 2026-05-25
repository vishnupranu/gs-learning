'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle, Shield, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/components/providers/AuthProvider';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const TRUST_POINTS = [
  { icon: Shield, text: 'Enterprise-grade security & encryption' },
  { icon: Zap, text: 'Real-time AI-powered solutions' },
  { icon: CheckCircle, text: 'ISO 9001 certified processes' },
  { icon: Star, text: 'Trusted by 150+ global clients' },
];

const FLOATING_TECH = ['Next.js', 'React', 'AI/ML', 'PostgreSQL', 'TypeScript', 'Cloud'];

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const router = useRouter();

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({
    name: '', email: '', password: '', confirmPassword: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const success = await login(loginForm.email, loginForm.password);
      if (success) {
        toast.success('Welcome back! Login successful.');
        router.push('/dashboard');
      } else {
        toast.error('Invalid credentials. Please check and try again.');
      }
    } catch {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupForm.password !== signupForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (signupForm.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    setLoading(true);
    try {
      const success = await signup(signupForm.name, signupForm.email, signupForm.password);
      if (success) {
        toast.success('Account created! Welcome to GuideSoft IT Solutions.');
        router.push('/dashboard');
      } else {
        toast.error('Signup failed. Email may already be in use.');
      }
    } catch {
      toast.error('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const redirect = new URLSearchParams(window.location.search).get('redirect') || '/dashboard';
    window.location.href = `/api/auth/google?redirect=${encodeURIComponent(redirect)}`;
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT PANEL - Brand & Trust */}
      <div className="hidden lg:flex lg:w-1/2 auth-left-panel flex-col justify-between p-12 relative">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 gradient-bg rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
              <span className="text-white font-black text-xl">GS</span>
            </div>
            <div>
              <div className="text-white font-black text-xl leading-tight">GuideSoft IT</div>
              <div className="text-green-400 text-xs font-semibold tracking-widest uppercase">& AI Solutions</div>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative z-10 space-y-8"
        >
          <div>
            <h1 className="text-4xl xl:text-5xl font-black text-white mb-4 leading-tight">
              Build the Future
              <span className="block gradient-text">with AI & Technology</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Join 150+ enterprises and startups worldwide who trust GuideSoft IT Solutions
              for their software development, AI/ML, and digital transformation needs.
            </p>
          </div>

          <div className="space-y-4">
            {TRUST_POINTS.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-green-500/15 border border-green-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <point.icon size={16} className="text-green-400" />
                </div>
                <span className="text-gray-300 text-sm">{point.text}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {FLOATING_TECH.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.08 }}
                className="px-3 py-1.5 text-xs font-semibold bg-gray-800/60 border border-gray-700/60 text-gray-300 rounded-full"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="relative z-10 grid grid-cols-3 gap-4"
        >
          {[
            { value: '500+', label: 'Projects' },
            { value: '150+', label: 'Clients' },
            { value: '98%', label: 'Satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-black gradient-text">{stat.value}</div>
              <div className="text-gray-500 text-xs mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* RIGHT PANEL - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white dark:bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0,200,83,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,83,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-sm">GS</span>
              </div>
              <span className="font-black text-gray-900 dark:text-white text-lg">GuideSoft IT</span>
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
              {activeTab === 'login' ? 'Welcome back' : 'Create account'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              {activeTab === 'login'
                ? 'Sign in to access your GuideSoft dashboard'
                : 'Join GuideSoft IT Solutions today'}
            </p>
          </div>

          <div className="flex bg-gray-100 dark:bg-gray-900 rounded-2xl p-1 mb-8 gap-1">
            {(['login', 'signup'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 dark:border-gray-800 rounded-2xl hover:border-gray-300 dark:hover:border-gray-700 transition-all mb-6 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 font-medium text-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 text-xs text-gray-400 bg-white dark:bg-gray-950">or continue with email</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'login' ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleLogin}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="you@company.com"
                      className="pl-10 h-12 rounded-xl border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1.5">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
                    <Link href="/auth/forgot-password" className="text-sm text-green-600 hover:text-green-700 font-medium">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="pl-10 pr-12 h-12 rounded-xl border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 gradient-bg text-white font-bold rounded-xl shadow-lg shadow-green-500/25 hover:opacity-95 transition-all"
                >
                  {loading ? 'Signing in...' : 'Sign In'} <ArrowRight size={16} className="ml-2" />
                </Button>
              </motion.form>
            ) : (
              <motion.form
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSignup}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="John Doe"
                      className="pl-10 h-12 rounded-xl border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900"
                      value={signupForm.name}
                      onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="you@company.com"
                      className="pl-10 h-12 rounded-xl border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Min 8 chars"
                        className="pl-10 h-12 rounded-xl border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-sm"
                        value={signupForm.password}
                        onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Confirm</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Re-enter"
                        className="pl-10 h-12 rounded-xl border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-sm"
                        value={signupForm.confirmPassword}
                        onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  {showPassword ? 'Hide' : 'Show'} passwords
                </button>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" className="mt-0.5 rounded border-gray-300 accent-green-500" required />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    I agree to the{' '}
                    <Link href="/terms" className="text-green-600 hover:underline">Terms of Service</Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="text-green-600 hover:underline">Privacy Policy</Link>
                  </span>
                </label>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 gradient-bg text-white font-bold rounded-xl shadow-lg shadow-green-500/25 hover:opacity-95 transition-all"
                >
                  {loading ? 'Creating account...' : 'Create Account'} <ArrowRight size={16} className="ml-2" />
                </Button>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="mt-6 flex gap-3">
            <a
              href="https://wa.me/918884162999"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-green-400 transition-colors text-sm font-medium text-gray-600 dark:text-gray-400"
            >
              <svg className="h-4 w-4" fill="#25D366" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <a
              href="https://t.me/guidesoftitsolutions"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-400 transition-colors text-sm font-medium text-gray-600 dark:text-gray-400"
            >
              <svg className="h-4 w-4" fill="#0088cc" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
              Telegram
            </a>
          </div>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            {activeTab === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
              className="text-green-600 hover:text-green-700 font-semibold"
            >
              {activeTab === 'login' ? 'Sign up free' : 'Sign in'}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
