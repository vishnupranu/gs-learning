'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Calendar, CreditCard, Headphones, User, Bell,
  TrendingUp, ArrowRight, Plus, CheckCircle, Clock, AlertCircle,
  XCircle, Sparkles, Zap, BookOpen, Phone, MessageCircle, Settings,
  ChevronRight, Star, Activity, FileText, Users, LogOut, Sun, Moon,
  Menu, X, BarChart3, Shield, Database, Megaphone
} from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// ── Dashboard Sidebar Nav ─────────────────────────────────────────────────
const dashboardNav = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/bookings', label: 'My Bookings', icon: Calendar },
  { href: '/dashboard/payments', label: 'Payments', icon: CreditCard },
  { href: '/dashboard/notifications', label: 'Notifications', icon: Bell },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
  { href: '/dashboard/support', label: 'Support', icon: Headphones },
];

// ── Stat Card Component ───────────────────────────────────────────────────
function StatCard({
  title, value, icon: Icon, change, color, delay
}: {
  title: string; value: string; icon: any; change: string; color: string; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      className="glass-card rounded-2xl p-6 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] gradient-bg opacity-80" />
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={22} className="text-white" />
        </div>
        <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
          {change}
        </span>
      </div>
      <p className="text-2xl font-black text-gray-900 dark:text-white mb-1">{value}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
    </motion.div>
  );
}

// ── Activity Timeline ─────────────────────────────────────────────────────
const activities = [
  { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20', msg: 'Software development consultation completed', time: '2 hours ago' },
  { icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', msg: 'New booking confirmed for AI/ML project discussion', time: '1 day ago' },
  { icon: CreditCard, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20', msg: 'Payment of ₹15,000 received for UX/UI Design', time: '2 days ago' },
  { icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20', msg: 'You rated your last session 5 stars', time: '3 days ago' },
  { icon: Bell, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20', msg: 'Support ticket #GS-2204 has been resolved', time: '5 days ago' },
];

// ── Quick Actions ─────────────────────────────────────────────────────────
const quickActions = [
  { label: 'Book Consultation', href: '/booking', icon: Calendar, color: 'from-green-500 to-emerald-600', desc: 'Schedule a free call' },
  { label: 'Browse Services', href: '/services', icon: Zap, color: 'from-blue-500 to-cyan-600', desc: 'Explore our offerings' },
  { label: 'AI Tools', href: '/ai-tools', icon: Sparkles, color: 'from-purple-500 to-violet-600', desc: 'Try our AI solutions' },
  { label: 'Contact Support', href: '/contact', icon: Headphones, color: 'from-orange-500 to-red-500', desc: 'Get instant help' },
];

// ── Recent Bookings ───────────────────────────────────────────────────────
const recentBookings = [
  { id: 'GS-7821', service: 'AI/ML Development Consultation', date: 'May 28, 2026', time: '10:00 AM', status: 'CONFIRMED' },
  { id: 'GS-7804', service: 'Software Architecture Review', date: 'May 22, 2026', time: '2:30 PM', status: 'COMPLETED' },
  { id: 'GS-7790', service: 'UX/UI Design Sprint Planning', date: 'May 15, 2026', time: '11:00 AM', status: 'COMPLETED' },
  { id: 'GS-7775', service: 'Cloud & DevOps Setup Walkthrough', date: 'May 10, 2026', time: '4:00 PM', status: 'CANCELLED' },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  PENDING:   { label: 'Pending',   className: 'status-badge pending' },
  CONFIRMED: { label: 'Confirmed', className: 'status-badge active' },
  COMPLETED: { label: 'Completed', className: 'status-badge completed' },
  CANCELLED: { label: 'Cancelled', className: 'status-badge cancelled' },
};

// ── Sidebar ───────────────────────────────────────────────────────────────
function DashboardSidebar({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [pathname, setPathname] = useState('/dashboard');

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  const isActive = (href: string) =>
    href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href);

  return (
    <aside className={`${open ? 'w-64' : 'w-16'} bg-gray-900 dark:bg-[#060b14] border-r border-gray-800 flex flex-col fixed h-full z-30 transition-all duration-300`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center gap-3">
        <div className="w-9 h-9 flex-shrink-0">
          <div className="w-9 h-9 gradient-bg rounded-xl flex items-center justify-center text-white font-black text-sm">
            GS
          </div>
        </div>
        {open && (
          <div className="flex-1 min-w-0">
            <div className="text-white font-black text-sm truncate">GuideSoft</div>
            <div className="text-green-400 text-xs font-semibold">My Dashboard</div>
          </div>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-400 hover:text-white transition-colors ml-auto flex-shrink-0"
        >
          {open ? <X size={14} /> : <Menu size={14} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 overflow-y-auto scrollbar-hide space-y-0.5">
        {dashboardNav.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={!open ? item.label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-green-500/20 text-green-400 border border-green-500/20'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon size={16} className="flex-shrink-0" />
              {open && <span>{item.label}</span>}
              {open && active && <ChevronRight size={12} className="ml-auto" />}
            </Link>
          );
        })}

        {/* Divider */}
        <div className="my-3 border-t border-gray-800" />

        {/* Admin link if applicable */}
        {user && ['SUPER_ADMIN', 'ADMIN', 'MANAGER'].includes(user.role) && (
          <Link
            href="/admin"
            title={!open ? 'Admin Panel' : undefined}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-purple-400 hover:bg-purple-500/10 transition-all"
          >
            <Shield size={16} className="flex-shrink-0" />
            {open && <span>Admin Panel</span>}
          </Link>
        )}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-gray-800 space-y-2">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex items-center gap-3 w-full px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl text-sm transition-all"
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          {open && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>

        {user && open && (
          <div className="flex items-center gap-3 px-3 py-2 bg-gray-800 rounded-xl">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center text-white text-xs font-black flex-shrink-0">
              {user.name?.[0]?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs font-semibold truncate">{user.name}</div>
              <div className="text-gray-400 text-[10px]">{user.role || 'Customer'}</div>
            </div>
          </div>
        )}

        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl text-sm transition-all"
        >
          <LogOut size={14} className="flex-shrink-0" />
          {open && 'Sign Out'}
        </button>
      </div>
    </aside>
  );
}

// ── Main Dashboard Page ───────────────────────────────────────────────────
export default function DashboardPage() {
  const { user, loading, isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState([
    { title: 'Active Projects', value: '3', icon: Activity, change: '+1 this month', color: 'bg-green-500' },
    { title: 'Total Bookings', value: '12', icon: Calendar, change: '+3 this month', color: 'bg-blue-500' },
    { title: 'Payments Made', value: '₹48,000', icon: CreditCard, change: '+₹15K this month', color: 'bg-purple-500' },
    { title: 'Support Tickets', value: '2', icon: Headphones, change: '1 open', color: 'bg-orange-500' },
  ]);

  useEffect(() => {
    if (!isAuthenticated) return;
    // Fetch real stats
    Promise.all([
      fetch('/api/services/booking').then(r => r.ok ? r.json() : { bookings: [] }),
      fetch('/api/payments').then(r => r.ok ? r.json() : []),
    ]).then(([bookingData, payments]) => {
      const bookings = bookingData.bookings || [];
      const activeBookings = bookings.filter((b: any) => b.status === 'CONFIRMED').length;
      const totalAmount = (Array.isArray(payments) ? payments : [])
        .filter((p: any) => p.status === 'COMPLETED')
        .reduce((sum: number, p: any) => sum + (p.amount || 0), 0);
      setStats([
        { title: 'Active Projects', value: activeBookings.toString(), icon: Activity, change: `${activeBookings} active`, color: 'bg-green-500' },
        { title: 'Total Bookings', value: bookings.length.toString(), icon: Calendar, change: `${bookings.length} total`, color: 'bg-blue-500' },
        { title: 'Payments Made', value: totalAmount > 0 ? `₹${totalAmount.toLocaleString()}` : '₹0', icon: CreditCard, change: 'All time', color: 'bg-purple-500' },
        { title: 'Support Tickets', value: '2', icon: Headphones, change: '1 open', color: 'bg-orange-500' },
      ]);
    }).catch(() => {});
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading your dashboard…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-10 glass-card rounded-3xl max-w-md"
        >
          <div className="w-20 h-20 gradient-bg rounded-2xl flex items-center justify-center text-white text-3xl font-black mx-auto mb-6">
            GS
          </div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Sign in required</h2>
          <p className="text-gray-500 mb-6">Access your GuideSoft dashboard to manage projects, bookings and more.</p>
          <Link href="/auth/login">
            <Button className="gradient-bg text-white rounded-xl font-bold px-8">Sign In</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex transition-colors duration-300">
      <DashboardSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main Content */}
      <main className={`flex-1 min-h-screen transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="min-h-screen"
        >
          {/* Top Bar */}
          <div className="sticky top-0 z-20 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-black text-gray-900 dark:text-white">
                {greeting}, {user?.name?.split(' ')[0]} 👋
              </h1>
              <p className="text-xs text-gray-500">Here's what's happening with your account</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/dashboard/notifications">
                <button className="relative w-9 h-9 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                  <Bell size={16} />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">3</span>
                </button>
              </Link>
              <Link href="/booking">
                <Button size="sm" className="gradient-bg text-white rounded-xl font-semibold shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all">
                  <Plus size={14} className="mr-1.5" /> New Booking
                </Button>
              </Link>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Welcome Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative rounded-3xl overflow-hidden gradient-bg p-8 text-white"
            >
              <div className="grid-bg-white absolute inset-0 opacity-20" />
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <div className="highlight-badge mb-3 border-white/30 bg-white/10 text-white">
                    <Sparkles size={12} />
                    GuideSoft IT & AI Solutions
                  </div>
                  <h2 className="text-3xl font-black mb-2 leading-tight">
                    Welcome back, {user?.name?.split(' ')[0]}!
                  </h2>
                  <p className="text-white/80 text-sm max-w-md">
                    Your projects are on track. You have 1 upcoming consultation on May 28th and 1 open support ticket awaiting resolution.
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    <Link href="/booking">
                      <button className="bg-white text-green-700 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-white/90 transition-colors flex items-center gap-2">
                        <Calendar size={14} /> Book Consultation
                      </button>
                    </Link>
                    <a
                      href="https://wa.me/918884162999"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/10 border border-white/20 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-white/20 transition-colors flex items-center gap-2"
                    >
                      <MessageCircle size={14} /> WhatsApp Us
                    </a>
                  </div>
                </div>
                <div className="hidden lg:flex items-center gap-4">
                  <div className="w-24 h-24 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-5xl font-black">
                    {user?.name?.[0]?.toUpperCase()}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <StatCard key={stat.title} {...stat} delay={i * 0.08} />
              ))}
            </div>

            {/* Two-column Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Recent Bookings Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="xl:col-span-2 glass-card rounded-2xl overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Calendar size={16} className="text-green-500" />
                    Recent Bookings
                  </h3>
                  <Link href="/dashboard/bookings" className="text-xs text-green-600 dark:text-green-400 font-semibold hover:underline flex items-center gap-1">
                    View all <ArrowRight size={12} />
                  </Link>
                </div>
                <div className="divide-y divide-gray-50 dark:divide-gray-800">
                  {recentBookings.map((booking, i) => {
                    const sc = statusConfig[booking.status] || statusConfig.PENDING;
                    return (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 + i * 0.05 }}
                        className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{booking.service}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs text-gray-400 flex items-center gap-1">
                                <Calendar size={10} /> {booking.date}
                              </span>
                              <span className="text-xs text-gray-400 flex items-center gap-1">
                                <Clock size={10} /> {booking.time}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 ml-4">
                            <span className="text-xs font-mono text-gray-400">#{booking.id}</span>
                            <span className={sc.className}>{sc.label}</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Right Column: Quick Actions + Activity */}
              <div className="space-y-5">
                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="glass-card rounded-2xl p-5"
                >
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Zap size={16} className="text-yellow-500" />
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 gap-2.5">
                    {quickActions.map((action) => (
                      <Link key={action.href} href={action.href}>
                        <div className="p-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-green-300 dark:hover:border-green-700 transition-all group cursor-pointer hover:shadow-sm">
                          <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                            <action.icon size={16} className="text-white" />
                          </div>
                          <p className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{action.label}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{action.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>

                {/* Upgrade CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative rounded-2xl overflow-hidden p-5 bg-gradient-to-br from-violet-600 to-purple-700 text-white"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
                  <Sparkles size={24} className="mb-3 opacity-90" />
                  <h3 className="font-black text-lg mb-1">Go Pro Plan</h3>
                  <p className="text-white/80 text-xs mb-4 leading-relaxed">
                    Unlock priority support, dedicated account manager, and unlimited AI tool access.
                  </p>
                  <Link href="/pricing">
                    <button className="bg-white text-purple-700 font-bold text-xs px-4 py-2 rounded-lg hover:bg-white/90 transition-colors w-full">
                      Upgrade Now →
                    </button>
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Activity Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                <Activity size={16} className="text-green-500" />
                Recent Activity
              </h3>
              <div className="space-y-4 relative">
                <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-100 dark:bg-gray-800" />
                {activities.map((activity, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.07 }}
                    className="flex items-start gap-4 relative"
                  >
                    <div className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${activity.bg}`}>
                      <activity.icon size={16} className={activity.color} />
                    </div>
                    <div className="flex-1 min-w-0 pt-2">
                      <p className="text-sm text-gray-700 dark:text-gray-300 font-medium leading-snug">{activity.msg}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Footer Note */}
            <div className="text-center pb-4">
              <p className="text-xs text-gray-400">
                GuideSoft IT & AI Solutions · <a href="tel:+918884162999" className="hover:text-green-500 transition-colors">+91 8884162999</a> · <a href="mailto:info@guideitsol.com" className="hover:text-green-500 transition-colors">info@guideitsol.com</a>
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}