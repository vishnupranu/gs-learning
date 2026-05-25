'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, Phone, Building2, FileText, Lock, Shield, Bell,
  Eye, EyeOff, Save, Trash2, Camera, CheckCircle, AlertTriangle,
  ChevronRight, LogOut, LayoutDashboard, Calendar, CreditCard,
  Headphones, Sun, Moon, Menu, X, Activity
} from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// ── Dashboard Nav (shared sidebar) ───────────────────────────────────────
const dashboardNav = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/bookings', label: 'My Bookings', icon: Calendar },
  { href: '/dashboard/payments', label: 'Payments', icon: CreditCard },
  { href: '/dashboard/notifications', label: 'Notifications', icon: Bell },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
  { href: '/dashboard/support', label: 'Support', icon: Headphones },
];

function DashboardSidebar({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/dashboard/profile';
  const isActive = (href: string) => href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href);

  return (
    <aside className={`${open ? 'w-64' : 'w-16'} bg-gray-900 dark:bg-[#060b14] border-r border-gray-800 flex flex-col fixed h-full z-30 transition-all duration-300`}>
      <div className="p-4 border-b border-gray-800 flex items-center gap-3">
        <div className="w-9 h-9 flex-shrink-0 gradient-bg rounded-xl flex items-center justify-center text-white font-black text-sm">GS</div>
        {open && <div className="flex-1 min-w-0"><div className="text-white font-black text-sm">GuideSoft</div><div className="text-green-400 text-xs font-semibold">My Dashboard</div></div>}
        <button onClick={() => setOpen(!open)} className="text-gray-400 hover:text-white ml-auto flex-shrink-0">{open ? <X size={14} /> : <Menu size={14} />}</button>
      </div>
      <nav className="flex-1 p-3 overflow-y-auto scrollbar-hide space-y-0.5">
        {dashboardNav.map((item) => {
          const active = isActive(item.href);
          return (
            <Link key={item.href} href={item.href} title={!open ? item.label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? 'bg-green-500/20 text-green-400 border border-green-500/20' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
              <item.icon size={16} className="flex-shrink-0" />
              {open && <span>{item.label}</span>}
              {open && active && <ChevronRight size={12} className="ml-auto" />}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-gray-800 space-y-2">
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="flex items-center gap-3 w-full px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl text-sm transition-all">
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          {open && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
        {user && open && (
          <div className="flex items-center gap-3 px-3 py-2 bg-gray-800 rounded-xl">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center text-white text-xs font-black">{user.name?.[0]?.toUpperCase()}</div>
            <div className="flex-1 min-w-0"><div className="text-white text-xs font-semibold truncate">{user.name}</div><div className="text-gray-400 text-[10px]">{user.role}</div></div>
          </div>
        )}
        <button onClick={logout} className="flex items-center gap-3 w-full px-3 py-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl text-sm transition-all">
          <LogOut size={14} className="flex-shrink-0" />
          {open && 'Sign Out'}
        </button>
      </div>
    </aside>
  );
}

// ── Notification Toggle ───────────────────────────────────────────────────
function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${checked ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
    >
      <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
    </button>
  );
}

// ── Profile Page ──────────────────────────────────────────────────────────
export default function DashboardProfilePage() {
  const { user, updateUser, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Form state
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+91 8884162999',
    bio: 'Software entrepreneur exploring AI and digital transformation solutions for business growth.',
    company: 'TechVentures India Pvt Ltd',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Password state
  const [passwords, setPasswords] = useState({ current: '', newPwd: '', confirm: '' });
  const [showPwd, setShowPwd] = useState({ current: false, new: false, confirm: false });
  const [pwdSaving, setPwdSaving] = useState(false);
  const [pwdSaved, setPwdSaved] = useState(false);
  const [pwdError, setPwdError] = useState('');

  // Notification prefs
  const [notifPrefs, setNotifPrefs] = useState({
    bookingConfirmations: true,
    paymentReceipts: true,
    projectUpdates: true,
    supportReplies: true,
    marketingEmails: false,
    weeklyDigest: true,
    smsAlerts: false,
  });

  // Delete confirm
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    setSaveError('');
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name }),
      });
      if (res.ok) {
        updateUser({ name: form.name });
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        setSaveError('Failed to save. Please try again.');
      }
    } catch {
      setSaveError('Network error. Please check your connection.');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    setPwdError('');
    if (passwords.newPwd !== passwords.confirm) {
      setPwdError('New passwords do not match.');
      return;
    }
    if (passwords.newPwd.length < 8) {
      setPwdError('Password must be at least 8 characters.');
      return;
    }
    setPwdSaving(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: passwords.current, newPassword: passwords.newPwd }),
      });
      if (res.ok) {
        setPwdSaved(true);
        setPasswords({ current: '', newPwd: '', confirm: '' });
        setTimeout(() => setPwdSaved(false), 3000);
      } else {
        const data = await res.json().catch(() => ({}));
        setPwdError(data.error || 'Current password is incorrect.');
      }
    } catch {
      setPwdError('Network error. Please try again.');
    } finally {
      setPwdSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center"><h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Please log in</h2>
          <Link href="/auth/login"><Button className="gradient-bg text-white">Sign In</Button></Link></div>
      </div>
    );
  }

  const initials = user.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex transition-colors duration-300">
      <DashboardSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <main className={`flex-1 min-h-screen transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen">
          {/* Top Bar */}
          <div className="sticky top-0 z-20 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                <User size={20} className="text-green-500" /> My Profile
              </h1>
              <p className="text-xs text-gray-500">Manage your personal information and security</p>
            </div>
          </div>

          <div className="p-6 max-w-4xl space-y-6">
            {/* Avatar + Name Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center gap-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl gradient-bg flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-green-500/25">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-2xl" />
                    ) : initials}
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center text-gray-500 hover:text-green-600 shadow-sm transition-colors">
                    <Camera size={14} />
                  </button>
                </div>
                {/* Info */}
                <div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white">{user.name}</h2>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
                      <Shield size={10} /> {user.role || 'CUSTOMER'}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                      Member since 2024
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Edit Profile Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-lg font-black text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                <User size={18} className="text-green-500" /> Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
                  <div className="relative">
                    <User size={15} className="absolute left-3 top-3.5 text-gray-400" />
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full pl-9 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    />
                  </div>
                </div>

                {/* Email (read-only) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3 top-3.5 text-gray-400" />
                    <input
                      type="email"
                      value={form.email}
                      disabled
                      className="w-full pl-9 pr-4 py-3 bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-500 cursor-not-allowed"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Contact support to change your email</p>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Phone Number</label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3 top-3.5 text-gray-400" />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full pl-9 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Company / Organization</label>
                  <div className="relative">
                    <Building2 size={15} className="absolute left-3 top-3.5 text-gray-400" />
                    <input
                      type="text"
                      value={form.company}
                      onChange={e => setForm({ ...form, company: e.target.value })}
                      className="w-full pl-9 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Bio</label>
                <div className="relative">
                  <FileText size={15} className="absolute left-3 top-3.5 text-gray-400" />
                  <textarea
                    rows={3}
                    value={form.bio}
                    onChange={e => setForm({ ...form, bio: e.target.value })}
                    className="w-full pl-9 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div>
                  {saved && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-green-600 font-medium flex items-center gap-1.5">
                      <CheckCircle size={14} /> Changes saved successfully!
                    </motion.p>
                  )}
                  {saveError && <p className="text-sm text-red-500">{saveError}</p>}
                </div>
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="gradient-bg text-white rounded-xl font-semibold px-6 flex items-center gap-2 disabled:opacity-60"
                >
                  {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={14} />}
                  {saving ? 'Saving…' : 'Save Changes'}
                </Button>
              </div>
            </motion.div>

            {/* Password Change */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-lg font-black text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                <Lock size={18} className="text-blue-500" /> Change Password
              </h3>

              <div className="space-y-4 max-w-md">
                {(
                  [
                    { key: 'current', label: 'Current Password', placeholder: 'Enter current password', show: showPwd.current, toggle: () => setShowPwd(p => ({ ...p, current: !p.current })) },
                    { key: 'newPwd', label: 'New Password', placeholder: 'Min. 8 characters', show: showPwd.new, toggle: () => setShowPwd(p => ({ ...p, new: !p.new })) },
                    { key: 'confirm', label: 'Confirm New Password', placeholder: 'Repeat new password', show: showPwd.confirm, toggle: () => setShowPwd(p => ({ ...p, confirm: !p.confirm })) },
                  ] as any[]
                ).map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">{field.label}</label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3 top-3.5 text-gray-400" />
                      <input
                        type={field.show ? 'text' : 'password'}
                        placeholder={field.placeholder}
                        value={(passwords as any)[field.key]}
                        onChange={e => setPasswords(p => ({ ...p, [field.key]: e.target.value }))}
                        className="w-full pl-9 pr-10 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                      <button type="button" onClick={field.toggle} className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600">
                        {field.show ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-5 pt-4 border-t border-gray-100 dark:border-gray-800">
                <Button
                  onClick={handlePasswordChange}
                  disabled={pwdSaving || !passwords.current || !passwords.newPwd || !passwords.confirm}
                  variant="outline"
                  className="rounded-xl font-semibold px-6 flex items-center gap-2 disabled:opacity-50 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                  {pwdSaving ? <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /> : <Lock size={14} />}
                  {pwdSaving ? 'Updating…' : 'Update Password'}
                </Button>
                {pwdSaved && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-green-600 font-medium flex items-center gap-1.5">
                    <CheckCircle size={14} /> Password updated!
                  </motion.p>
                )}
                {pwdError && <p className="text-sm text-red-500">{pwdError}</p>}
              </div>
            </motion.div>

            {/* Notification Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-lg font-black text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                <Bell size={18} className="text-orange-500" /> Notification Preferences
              </h3>

              <div className="space-y-4">
                {(
                  [
                    { key: 'bookingConfirmations', label: 'Booking Confirmations', desc: 'Get notified when a booking is confirmed or updated' },
                    { key: 'paymentReceipts', label: 'Payment Receipts', desc: 'Receive receipts for all transactions' },
                    { key: 'projectUpdates', label: 'Project Updates', desc: 'Stay informed about your active project milestones' },
                    { key: 'supportReplies', label: 'Support Replies', desc: 'Notifications when support team responds to your tickets' },
                    { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'A summary of your account activity every Monday' },
                    { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Promotions, new services and GuideSoft updates' },
                    { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Critical updates sent via SMS to your phone' },
                  ] as any[]
                ).map((pref) => (
                  <div key={pref.key} className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-800 last:border-0">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{pref.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{pref.desc}</p>
                    </div>
                    <Toggle
                      checked={(notifPrefs as any)[pref.key]}
                      onChange={() => setNotifPrefs(p => ({ ...p, [pref.key]: !(p as any)[pref.key] }))}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                <Button
                  onClick={() => { /* Save notification prefs */ }}
                  className="gradient-bg text-white rounded-xl font-semibold px-6 flex items-center gap-2"
                >
                  <Save size={14} /> Save Preferences
                </Button>
              </div>
            </motion.div>

            {/* Danger Zone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl p-6 border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10"
            >
              <h3 className="text-lg font-black text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
                <AlertTriangle size={18} /> Danger Zone
              </h3>
              <p className="text-sm text-red-600/80 dark:text-red-400/70 mb-4">
                Deleting your account is irreversible. All your data including bookings, payment records, and project history will be permanently removed.
              </p>

              {!deleteConfirm ? (
                <Button
                  onClick={() => setDeleteConfirm(true)}
                  variant="outline"
                  className="border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-xl font-semibold"
                >
                  <Trash2 size={14} className="mr-2" /> Delete My Account
                </Button>
              ) : (
                <div className="flex items-center gap-3">
                  <p className="text-sm font-semibold text-red-700 dark:text-red-400">Are you absolutely sure?</p>
                  <Button
                    variant="destructive"
                    className="rounded-xl font-bold px-5"
                    onClick={() => { logout(); }}
                  >
                    Yes, Delete Account
                  </Button>
                  <Button
                    variant="ghost"
                    className="rounded-xl text-gray-600"
                    onClick={() => setDeleteConfirm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
