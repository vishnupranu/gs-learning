'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, CreditCard, TrendingUp, ArrowUpRight, ArrowDownRight, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';
import AdminLayout from '@/components/layout/AdminLayout';
import { useAuth } from '@/components/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

const COLORS = ['#00C853', '#FFEB3B', '#7C3AED', '#EC4899', '#F59E0B'];

function StatCard({ title, value, icon: Icon, change, changeType, color }: any) {
  return (
    <div className="dashboard-stat-card">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center`}>
          <Icon size={18} className="text-white" />
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${changeType === 'up' ? 'text-green-600' : 'text-red-500'}`}>
          {changeType === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change}%
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</div>
      <div className="text-gray-500 text-sm">{title}</div>
    </div>
  );
}

export default function AdminDashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [analytics, setAnalytics] = useState<any>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth/login?redirect=/admin');
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    fetch('/api/admin/analytics')
      .then(r => r.json())
      .then(data => { setAnalytics(data); setFetching(false); })
      .catch(() => setFetching(false));
  }, []);

  if (loading || fetching) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  const overview = analytics?.overview || {};
  const charts = analytics?.charts || {};

  const stats = [
    { title: 'Total Users', value: overview.totalUsers || 0, icon: Users, change: 12, changeType: 'up', color: 'from-blue-500 to-blue-600' },
    { title: 'Total Bookings', value: overview.totalBookings || 0, icon: Calendar, change: 8, changeType: 'up', color: 'from-green-500 to-green-600' },
    { title: 'Total Revenue', value: `$${(overview.totalRevenue || 0).toLocaleString()}`, icon: CreditCard, change: 15, changeType: 'up', color: 'from-purple-500 to-purple-600' },
    { title: 'This Month', value: `$${(overview.revenueThisMonth || 0).toLocaleString()}`, icon: TrendingUp, change: overview.revenueThisMonth > 0 ? 23 : 0, changeType: 'up', color: 'from-orange-500 to-orange-600' },
  ];

  const bookingStatus = Object.entries(charts.bookingsByStatus || {}).map(([name, value]) => ({ name, value }));

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user?.name}. Here&apos;s what&apos;s happening.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Revenue & Bookings (6 months)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={charts.revenueByMonth || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v: any) => [`$${v}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="#00C853" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Booking Status Pie */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Bookings by Status</h3>
            {bookingStatus.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={bookingStatus} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name }) => name}>
                    {bookingStatus.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[220px] flex items-center justify-center text-gray-400 text-sm">No booking data yet</div>
            )}
          </div>
        </div>

        {/* User Growth */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 mb-8">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">User Growth (6 months)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={charts.userGrowth || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#00C853" strokeWidth={2} dot={{ fill: '#00C853', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Pending Bookings', value: overview.pendingBookings || 0, icon: Clock, color: 'text-yellow-600 bg-yellow-50' },
            { label: 'Confirmed Bookings', value: overview.confirmedBookings || 0, icon: CheckCircle, color: 'text-green-600 bg-green-50' },
            { label: 'This Month Bookings', value: overview.bookingsThisMonth || 0, icon: Calendar, color: 'text-blue-600 bg-blue-50' },
          ].map((item) => (
            <div key={item.label} className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center`}>
                <item.icon size={18} />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{item.value}</div>
                <div className="text-gray-500 text-sm">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
