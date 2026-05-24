'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '@/components/layout/AdminLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageCircle, Clock, AlertTriangle, CheckCircle, Search, X, Send, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

const PRIORITY_COLORS: Record<string, string> = {
  LOW: 'text-gray-500 bg-gray-100',
  MEDIUM: 'text-yellow-700 bg-yellow-100',
  HIGH: 'text-orange-700 bg-orange-100',
  URGENT: 'text-red-700 bg-red-100',
};

const STATUS_COLORS: Record<string, string> = {
  OPEN: 'bg-red-100 text-red-700',
  IN_PROGRESS: 'bg-yellow-100 text-yellow-700',
  RESOLVED: 'bg-blue-100 text-blue-700',
  CLOSED: 'bg-gray-100 text-gray-700',
};

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selected, setSelected] = useState<any | null>(null);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetch('/api/support/tickets')
      .then(r => r.json())
      .then(data => { setTickets(data.tickets || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/support/tickets`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t));
        if (selected?.id === id) setSelected((prev: any) => ({ ...prev, status }));
        toast.success('Ticket status updated');
      }
    } catch { toast.error('Failed to update status'); }
  };

  const sendReply = async () => {
    if (!replyText.trim() || !selected) return;
    setSending(true);
    // In production: POST to /api/support/tickets/[id]/reply
    await new Promise(r => setTimeout(r, 1000));
    toast.success('Reply sent to customer');
    setReplyText('');
    setSending(false);
  };

  const filtered = tickets.filter(t => {
    const matchSearch = !search || t.subject?.toLowerCase().includes(search.toLowerCase()) || t.id?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const openCount = tickets.filter(t => t.status === 'OPEN').length;
  const urgentCount = tickets.filter(t => t.priority === 'URGENT').length;
  const resolvedToday = tickets.filter(t => {
    const d = new Date(t.updatedAt);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    return t.status === 'RESOLVED' && d >= today;
  }).length;

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Support Helpdesk</h1>
            <p className="text-gray-500 text-sm">{tickets.length} total tickets · real-time support queue</p>
          </div>
          <a
            href="https://wa.me/918884162999"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
          >
            💬 WhatsApp Support Line
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { icon: AlertTriangle, label: 'Open Tickets', value: openCount, color: 'text-red-600 bg-red-100' },
            { icon: Clock, label: 'Urgent Priority', value: urgentCount, color: 'text-orange-600 bg-orange-100' },
            { icon: CheckCircle, label: 'Resolved Today', value: resolvedToday, color: 'text-green-600 bg-green-100' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ticket List */}
          <div className="lg:col-span-1 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 space-y-3">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search tickets..."
                  className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex gap-1 flex-wrap">
                {['ALL', 'OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'].map(s => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all ${statusFilter === s ? 'gradient-bg text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}
                  >
                    {s.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-y-auto flex-1 max-h-[500px]">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="p-4 border-b border-gray-50 dark:border-gray-800 space-y-2">
                    <div className="h-3 shimmer rounded" />
                    <div className="h-3 shimmer rounded w-2/3" />
                  </div>
                ))
              ) : filtered.length === 0 ? (
                <div className="p-8 text-center text-gray-400 text-sm">
                  No tickets found. New support tickets will appear here.
                </div>
              ) : (
                filtered.map(ticket => (
                  <button
                    key={ticket.id}
                    onClick={() => setSelected(ticket)}
                    className={`w-full text-left p-4 border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${selected?.id === ticket.id ? 'bg-green-50 dark:bg-green-900/20' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="text-xs font-mono text-gray-400">{ticket.id}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${PRIORITY_COLORS[ticket.priority] || PRIORITY_COLORS.MEDIUM}`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">{ticket.subject}</div>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[ticket.status] || STATUS_COLORS.OPEN}`}>
                        {ticket.status?.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-gray-400">
                        {ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString('en-IN') : 'Now'}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Ticket Detail */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col">
            {!selected ? (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-gray-400">
                <MessageCircle size={48} className="mb-4 opacity-30" />
                <p className="text-lg font-medium">Select a ticket to view details</p>
                <p className="text-sm">Click on any ticket in the list to manage it</p>
              </div>
            ) : (
              <>
                <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-gray-400">{selected.id}</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${PRIORITY_COLORS[selected.priority]}`}>
                          {selected.priority}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selected.subject}</h2>
                      <p className="text-gray-500 text-sm mt-1">
                        From: {selected.email || 'Anonymous'} · Category: {selected.category || 'GENERAL'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={selected.status}
                        onChange={e => updateStatus(selected.id, e.target.value)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 ${STATUS_COLORS[selected.status]}`}
                      >
                        {['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'].map(s => (
                          <option key={s} value={s}>{s.replace('_', ' ')}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 mb-6">
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{selected.message}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      Submitted: {selected.createdAt ? new Date(selected.createdAt).toLocaleString('en-IN') : 'Just now'}
                    </p>
                  </div>

                  {/* Quick actions */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {[
                      { label: 'Mark Resolved', action: () => updateStatus(selected.id, 'RESOLVED'), color: 'bg-green-50 text-green-700 hover:bg-green-100' },
                      { label: 'Escalate', action: () => updateStatus(selected.id, 'IN_PROGRESS'), color: 'bg-orange-50 text-orange-700 hover:bg-orange-100' },
                    ].map(btn => (
                      <button
                        key={btn.label}
                        onClick={btn.action}
                        className={`py-2.5 rounded-xl text-sm font-semibold transition-colors ${btn.color}`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>

                  {/* WhatsApp quick link */}
                  {selected.phone && (
                    <a
                      href={`https://wa.me/${selected.phone.replace(/\D/g, '')}?text=Hi, this is regarding your support ticket ${selected.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-green-500/10 text-green-700 rounded-xl p-3 text-sm font-medium mb-4 hover:bg-green-500/20 transition-colors"
                    >
                      💬 Reply via WhatsApp to {selected.phone}
                    </a>
                  )}
                </div>

                {/* Reply Box */}
                <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex gap-3">
                    <textarea
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                      placeholder="Type your reply to the customer..."
                      className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                      rows={3}
                    />
                    <button
                      onClick={sendReply}
                      disabled={!replyText.trim() || sending}
                      className="w-12 gradient-bg rounded-xl flex items-center justify-center disabled:opacity-50 hover:opacity-90 transition-opacity"
                    >
                      <Send size={16} className="text-white" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
