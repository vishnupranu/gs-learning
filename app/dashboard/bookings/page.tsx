'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, AlertCircle, CheckCircle, XCircle, Plus } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const SERVICE_NAMES: Record<number, string> = {
  1: 'Software Development', 2: 'AI/ML Development', 3: 'UX/UI Design',
  4: 'Testing Services', 5: 'Mobile Application', 6: 'LMS Platform',
};

const STATUS_ICONS: Record<string, any> = {
  PENDING: { icon: AlertCircle, color: 'text-yellow-500' },
  CONFIRMED: { icon: CheckCircle, color: 'text-green-500' },
  COMPLETED: { icon: CheckCircle, color: 'text-blue-500' },
  CANCELLED: { icon: XCircle, color: 'text-red-500' },
};

export default function DashboardBookingsPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetch('/api/services/booking')
        .then(r => r.json())
        .then(data => { setBookings(data.bookings || []); setFetching(false); })
        .catch(() => setFetching(false));
    }
  }, [isAuthenticated]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!isAuthenticated) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-4">Please log in to view your bookings</h2>
        <Link href="/auth/login"><Button className="gradient-bg text-white">Login</Button></Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <div className="pt-24 pb-16 max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Bookings</h1>
            <p className="text-gray-500">{bookings.length} total booking{bookings.length !== 1 ? 's' : ''}</p>
          </div>
          <Link href="/booking">
            <Button className="gradient-bg text-white">
              <Plus size={16} className="mr-2" /> New Booking
            </Button>
          </Link>
        </div>

        {fetching ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 shimmer rounded-2xl" />
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20">
            <Calendar size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No bookings yet</h3>
            <p className="text-gray-400 mb-6">Book your first consultation with our team</p>
            <Link href="/booking">
              <Button className="gradient-bg text-white">Book Now</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => {
              const statusInfo = STATUS_ICONS[booking.status] || STATUS_ICONS.PENDING;
              const StatusIcon = statusInfo.icon;
              return (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="premium-card p-6"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <StatusIcon size={16} className={statusInfo.color} />
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {SERVICE_NAMES[booking.serviceId] || `Service #${booking.serviceId}`}
                        </span>
                        <span className={`status-badge ${
                          booking.status === 'PENDING' ? 'pending' :
                          booking.status === 'CONFIRMED' ? 'active' :
                          booking.status === 'COMPLETED' ? 'completed' : 'cancelled'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {booking.date ? new Date(booking.date).toLocaleDateString('en-IN', {
                            weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
                          }) : 'N/A'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {booking.time}
                        </span>
                      </div>
                      {booking.notes && (
                        <p className="mt-2 text-sm text-gray-400 italic">{booking.notes}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400 font-mono">#{booking.id?.slice(-8)}</div>
                      {booking.status === 'PENDING' && (
                        <div className="mt-2 space-x-2">
                          <a
                            href="https://wa.me/918884162999?text=I%20need%20to%20reschedule%20my%20booking"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-500 hover:underline"
                          >
                            Reschedule
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
