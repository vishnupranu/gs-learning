'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, Calendar, CreditCard, BarChart3,
  Headphones, Bell, Settings, LogOut, ChevronRight, Shield,
  FileText, Activity, UserCheck, Database, Sun, Moon, Menu, X, Sparkles, Megaphone
} from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';
import { useTheme } from 'next-themes';
import BrandLogo from '@/components/ui/BrandLogo';
import Image from 'next/image';

const navGroups = [
  {
    label: 'Overview',
    items: [
      { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
      { href: '/admin/activity-logs', label: 'Activity Logs', icon: Activity },
    ]
  },
  {
    label: 'Management',
    items: [
      { href: '/admin/users', label: 'Users', icon: Users },
      { href: '/admin/bookings', label: 'Bookings', icon: Calendar },
      { href: '/admin/crm', label: 'CRM', icon: UserCheck },
      { href: '/admin/payments', label: 'Payments', icon: CreditCard },
      { href: '/admin/marketing', label: 'Marketing', icon: Megaphone },
    ]
  },
  {
    label: 'Content & Support',
    items: [
      { href: '/admin/cms', label: 'Blog / CMS', icon: FileText },
      { href: '/admin/support', label: 'Support Tickets', icon: Headphones },
      { href: '/admin/notifications', label: 'Notifications', icon: Bell },
      { href: '/admin/ai-logs', label: 'AI Logs', icon: Sparkles },
    ]
  },
  {
    label: 'System',
    items: [
      { href: '/admin/seo', label: 'SEO Tools', icon: Database },
      { href: '/admin/access-control', label: 'Access Control', icon: Shield },
      { href: '/admin/settings', label: 'Settings', icon: Settings },
    ]
  }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex transition-colors duration-300">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white dark:bg-gray-950 border-r border-gray-100 dark:border-gray-900 flex flex-col fixed h-full z-30 transition-all duration-300`}>
        {/* Sidebar Header — GS Brand Logo */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-900 flex items-center gap-3">
          <div className="w-9 h-9 flex-shrink-0">
            <Image
              src="/gslogo.png"
              alt="Guide Soft logo"
              width={36}
              height={36}
              className="rounded-xl object-contain"
              priority
            />
          </div>
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <div className="text-gray-900 dark:text-white font-black text-sm truncate">Guide Soft</div>
              <div className="text-green-600 dark:text-green-400 text-xs font-semibold">Admin Panel</div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors ml-auto flex-shrink-0"
          >
            {sidebarOpen ? <X size={14} /> : <Menu size={14} />}
          </button>
        </div>

        {/* Nav Groups */}
        <nav className="flex-1 p-3 overflow-y-auto scrollbar-hide space-y-4">
          {navGroups.map((group) => (
            <div key={group.label}>
              {sidebarOpen && (
                <p className="text-gray-400 dark:text-gray-600 text-[10px] font-bold uppercase tracking-widest px-2 mb-1.5">
                  {group.label}
                </p>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      title={!sidebarOpen ? item.label : undefined}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        active
                          ? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20'
                          : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <item.icon size={16} className="flex-shrink-0" />
                      {sidebarOpen && <span>{item.label}</span>}
                      {sidebarOpen && active && <ChevronRight size={12} className="ml-auto" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom: Theme + User + Logout */}
        <div className="p-3 border-t border-gray-100 dark:border-gray-900 space-y-2">
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className={`flex items-center gap-3 w-full px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-xl text-sm transition-all`}
          >
            {mounted && resolvedTheme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            {sidebarOpen && <span>{mounted && resolvedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>

          {/* User info */}
          {user && sidebarOpen && (
            <div className="flex items-center gap-3 px-3 py-2 bg-gray-100 dark:bg-gray-900 rounded-xl">
              <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center text-white text-xs font-black flex-shrink-0">
                {user.name?.[0]?.toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-gray-900 dark:text-white text-xs font-semibold truncate">{user.name}</div>
                <div className="text-gray-500 dark:text-gray-400 text-[10px]">{(user as any).role || 'Admin'}</div>
              </div>
            </div>
          )}

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl text-sm transition-all"
          >
            <LogOut size={14} className="flex-shrink-0" />
            {sidebarOpen && 'Sign Out'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 min-h-screen transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
