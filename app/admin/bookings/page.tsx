'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Search, Check, X, Edit } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';

const STATUS_STYLES: Record<string, string> = {
  PENDING: 'status-badge pending',
  CONFIRMED: 'status-badge active',
  COMPLETED: 'status-badge completed',
  CANCELLED: 'status-badge cancelled',
  RESCHEDULED: 'bg-yellow-100 text-yellow-800 status-badge',
};

const SERVICE_NAMES: Record<number, string> = {
  1: 'Software Dev', 2: 'AI/ML Dev', 3: 'UX/UI Design',
  4: 'Testing', 5: 'Mobile App', 6: 'LMS Platform',
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchBookings = () => {
    const params = statusFilter ? `?status=${statusFilter}` : '';
    fetch(`/api/admin/bookings${params}`)
      .then(r => r.json())
      .then(data => { setBookings(data.bookings || []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchBookings(); }, [statusFilter]);

  const updateStatus = async (bookingId: string, status: string) => {
    setUpdating(bookingId);
    await fetch('/api/admin/bookings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingId, status }),
    });
    fetchBookings();
    setUpdating(null);
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Booking Management</h1>
          <p className="text-gray-500 text-sm">{bookings.length} total bookings</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                statusFilter === s ? 'gradient-bg text-white' : 'bg-white dark:bg-gray-800 text-gray-600 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {s || 'All'}
            </button>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {['Booking ID', 'Service', 'Date & Time', 'Status', 'Notes', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}><td colSpan={6} className="px-4 py-4"><div className="h-4 shimmer rounded" /></td></tr>
                ))
              ) : bookings.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-400">No bookings found.</td></tr>
              ) : (
                bookings.map((b) => (
                  <motion.tr key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">#{b.id?.slice(-8)}</td>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                      {SERVICE_NAMES[b.serviceId] || `Service #${b.serviceId}`}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <Calendar size={12} />
                        {b.date ? new Date(b.date).toLocaleDateString('en-IN') : 'N/A'}
                      </div>
                      <div className="flex items-center gap-1 text-gray-400 text-xs">
                        <Clock size={10} /> {b.time}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={STATUS_STYLES[b.status] || 'status-badge'}>{b.status}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs max-w-[120px] truncate">{b.notes || '—'}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {b.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() => updateStatus(b.id, 'CONFIRMED')}
                              disabled={updating === b.id}
                              className="p-1.5 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                              title="Confirm"
                            >
                              <Check size={12} />
                            </button>
                            <button
                              onClick={() => updateStatus(b.id, 'CANCELLED')}
                              disabled={updating === b.id}
                              className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                              title="Cancel"
                            >
                              <X size={12} />
                            </button>
                          </>
                        )}
                        {b.status === 'CONFIRMED' && (
                          <button
                            onClick={() => updateStatus(b.id, 'COMPLETED')}
                            disabled={updating === b.id}
                            className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-xs px-2"
                            title="Mark Complete"
                          >
                            Done
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
