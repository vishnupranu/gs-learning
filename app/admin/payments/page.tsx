'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '@/components/layout/AdminLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, Download, Search, TrendingUp, CreditCard, AlertCircle, RefreshCw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams({ page: String(page), limit: '20' });
    fetch(`/api/admin/payments?${params}`)
      .then(r => r.json())
      .then(data => {
        setPayments(data.payments || []);
        setTotal(data.pagination?.total || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page]);

  const filtered = search
    ? payments.filter(p =>
        p.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
        p.id?.toLowerCase().includes(search.toLowerCase())
      )
    : payments;

  const totalRevenue = payments.reduce((s, p) => p.status === 'COMPLETED' ? s + p.amount : s, 0);
  const pendingAmount = payments.reduce((s, p) => p.status === 'PENDING' ? s + p.amount : s, 0);
  const completedCount = payments.filter(p => p.status === 'COMPLETED').length;

  const exportCSV = () => {
    const rows = [
      ['ID', 'User', 'Email', 'Amount', 'Status', 'Date'],
      ...payments.map(p => [p.id, p.user?.name, p.user?.email, p.amount, p.status, new Date(p.createdAt).toLocaleDateString()])
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `payments-${Date.now()}.csv`; a.click();
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payments & Billing</h1>
            <p className="text-gray-500 text-sm">{total} transactions · real-time data from database</p>
          </div>
          <Button onClick={exportCSV} variant="outline" className="flex items-center gap-2">
            <Download size={16} /> Export CSV
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: DollarSign, label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, color: 'from-green-500 to-green-600', trend: '+12%' },
            { icon: AlertCircle, label: 'Pending Amount', value: `$${pendingAmount.toLocaleString()}`, color: 'from-yellow-500 to-orange-500', trend: '-2%' },
            { icon: CreditCard, label: 'Completed Transactions', value: completedCount, color: 'from-purple-500 to-purple-600', trend: '+8%' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon size={18} className="text-white" />
              </div>
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              <div className="flex items-end gap-2">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                <span className={`text-sm font-semibold pb-1 ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{stat.trend}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search by name, email, or ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                {['Transaction ID', 'Client', 'Course/Service', 'Amount', 'Status', 'Date'].map(h => (
                  <th key={h} className="px-6 py-3 text-left font-semibold text-gray-500 text-xs uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} className="px-6 py-4"><div className="h-4 shimmer rounded" /></td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    {search ? 'No payments match your search.' : 'No payment records yet. Payments will appear here once processed.'}
                  </td>
                </tr>
              ) : (
                filtered.map((payment) => (
                  <motion.tr
                    key={payment.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="px-6 py-4 font-mono text-xs text-gray-500">{payment.id.slice(0, 12)}...</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 dark:text-white">{payment.user?.name || 'Unknown'}</div>
                      <div className="text-xs text-gray-400">{payment.user?.email}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{payment.course?.title || 'Service Payment'}</td>
                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                      ${(payment.amount || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={
                        payment.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                        payment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }>
                        {payment.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">
                      {new Date(payment.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>

          {total > 20 && (
            <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <span className="text-sm text-gray-500">Showing {(page - 1) * 20 + 1}–{Math.min(page * 20, total)} of {total}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</Button>
                <Button variant="outline" size="sm" onClick={() => setPage(p => p + 1)} disabled={page * 20 >= total}>Next</Button>
              </div>
            </div>
          )}
        </div>

        {/* UPI Payment Info */}
        <div className="mt-6 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 flex items-center justify-between">
          <div className="text-white">
            <h3 className="font-bold text-lg mb-1">Accept Instant UPI Payments</h3>
            <p className="text-green-100 text-sm">Share your UPI ID to receive payments instantly</p>
          </div>
          <div className="bg-white rounded-2xl px-6 py-3 text-center">
            <div className="text-xs text-gray-500 font-medium">UPI ID</div>
            <div className="text-lg font-bold text-gray-900">8884162999-4@ybl</div>
            <div className="text-xs text-green-600 font-semibold">Praveenkumar</div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
