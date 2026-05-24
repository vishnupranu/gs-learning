'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Plus, X, Send, Clock, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/components/providers/AuthProvider';
import { toast } from 'sonner';
import Link from 'next/link';

const STATUS_STYLES: Record<string, string> = {
  OPEN: 'bg-red-100 text-red-700',
  IN_PROGRESS: 'bg-yellow-100 text-yellow-700',
  RESOLVED: 'bg-green-100 text-green-700',
  CLOSED: 'bg-gray-100 text-gray-600',
};

const PRIORITY_STYLES: Record<string, string> = {
  LOW: 'text-gray-500',
  MEDIUM: 'text-yellow-600',
  HIGH: 'text-orange-600',
  URGENT: 'text-red-600',
};

export default function DashboardSupportPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const [tickets, setTickets] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    subject: '',
    message: '',
    priority: 'MEDIUM',
    category: 'GENERAL',
    email: '',
    name: '',
  });

  useEffect(() => {
    if (user) setForm(prev => ({ ...prev, email: user.email, name: user.name }));
  }, [user]);

  useEffect(() => {
    if (isAuthenticated) {
      fetch('/api/support/tickets')
        .then(r => r.json())
        .then(data => { setTickets(data.tickets || []); setFetching(false); })
        .catch(() => setFetching(false));
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/support/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const data = await res.json();
        toast.success(`Ticket ${data.ticketId} created. We'll respond within 24 hours.`);
        setShowForm(false);
        setForm(prev => ({ ...prev, subject: '', message: '' }));
        setTickets(prev => [data.ticket, ...prev]);
      } else {
        toast.error('Failed to create ticket. Please try again.');
      }
    } catch { toast.error('Network error. Please try again.'); } finally { setSubmitting(false); }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!isAuthenticated) return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Please log in to view support tickets</h2>
          <Link href="/auth/login"><Button className="gradient-bg text-white">Login</Button></Link>
        </div>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <div className="pt-24 pb-16 max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Support Center</h1>
            <p className="text-gray-500">{tickets.length} tickets · Average response time: 2 hours</p>
          </div>
          <Button className="gradient-bg text-white" onClick={() => setShowForm(true)}>
            <Plus size={16} className="mr-2" /> New Ticket
          </Button>
        </div>

        {/* Quick Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <a
            href="https://wa.me/918884162999"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xl">💬</span>
            </div>
            <div>
              <div className="font-bold text-gray-900 dark:text-white">WhatsApp Support</div>
              <div className="text-sm text-gray-500">+91 8884162999 · Instant replies</div>
            </div>
            <ArrowRight size={16} className="ml-auto text-green-500 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="mailto:praveenkumar.kanneganti@gmail.com"
            className="flex items-center gap-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-4 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xl">📧</span>
            </div>
            <div>
              <div className="font-bold text-gray-900 dark:text-white">Email Support</div>
              <div className="text-sm text-gray-500">Response within 24 hours</div>
            </div>
            <ArrowRight size={16} className="ml-auto text-blue-500 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Tickets */}
        {fetching ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-24 shimmer rounded-2xl" />)}
          </div>
        ) : tickets.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
            <MessageSquare size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No support tickets yet</h3>
            <p className="text-gray-400 mb-6 text-sm">Create a ticket for any help or inquiry</p>
            <Button className="gradient-bg text-white" onClick={() => setShowForm(true)}>
              Create Your First Ticket
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {tickets.map((ticket, i) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      ticket.status === 'OPEN' ? 'bg-red-100' :
                      ticket.status === 'RESOLVED' ? 'bg-green-100' : 'bg-yellow-100'
                    }`}>
                      {ticket.status === 'OPEN' ? <AlertCircle size={14} className="text-red-500" /> :
                       ticket.status === 'RESOLVED' ? <CheckCircle size={14} className="text-green-500" /> :
                       <Clock size={14} className="text-yellow-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 dark:text-white truncate">{ticket.subject}</h4>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-400 flex-wrap">
                        <span className="font-mono">{ticket.id}</span>
                        <span>·</span>
                        <span className={`font-semibold ${PRIORITY_STYLES[ticket.priority] || PRIORITY_STYLES.MEDIUM}`}>
                          {ticket.priority}
                        </span>
                        <span>·</span>
                        <span>{ticket.category}</span>
                        {ticket.createdAt && (
                          <>
                            <span>·</span>
                            <span>{new Date(ticket.createdAt).toLocaleDateString('en-IN')}</span>
                          </>
                        )}
                      </div>
                      {ticket.message && (
                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{ticket.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${STATUS_STYLES[ticket.status] || STATUS_STYLES.OPEN}`}>
                      {ticket.status?.replace('_', ' ')}
                    </span>
                    <a
                      href={`https://wa.me/918884162999?text=Regarding ticket ${ticket.id}: ${ticket.subject}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-green-600 hover:underline"
                    >
                      Follow up →
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* New Ticket Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-3xl p-8 w-full max-w-lg shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create Support Ticket</h2>
                <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject *</label>
                  <Input
                    placeholder="Brief description of your issue"
                    value={form.subject}
                    onChange={e => setForm({...form, subject: e.target.value})}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                    <select
                      className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={form.priority}
                      onChange={e => setForm({...form, priority: e.target.value})}
                    >
                      <option value="LOW">Low</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HIGH">High</option>
                      <option value="URGENT">Urgent</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                    <select
                      className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={form.category}
                      onChange={e => setForm({...form, category: e.target.value})}
                    >
                      <option value="GENERAL">General</option>
                      <option value="TECHNICAL">Technical</option>
                      <option value="BILLING">Billing</option>
                      <option value="BOOKING">Booking</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Describe your issue *</label>
                  <textarea
                    className="w-full min-h-[120px] bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    placeholder="Provide as much detail as possible..."
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                    required
                    minLength={20}
                  />
                </div>
                <div className="flex gap-3">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setShowForm(false)}>Cancel</Button>
                  <Button type="submit" className="flex-1 gradient-bg text-white" disabled={submitting}>
                    {submitting ? (
                      <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Submitting...</span>
                    ) : (
                      <span className="flex items-center gap-2"><Send size={14} />Submit Ticket</span>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
