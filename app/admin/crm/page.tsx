'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Phone, Mail, MoreVertical, X, TrendingUp, Users, DollarSign, Clock } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const STATUS_COLORS: Record<string, string> = {
  NEW: 'bg-blue-100 text-blue-700',
  CONTACTED: 'bg-yellow-100 text-yellow-700',
  QUALIFIED: 'bg-purple-100 text-purple-700',
  PROPOSAL: 'bg-orange-100 text-orange-700',
  WON: 'bg-green-100 text-green-700',
  LOST: 'bg-red-100 text-red-700',
};

const PIPELINE_STAGES = ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'WON', 'LOST'];

interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  status: string;
  value?: number;
  createdAt: string;
}

export default function AdminCRMPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'kanban' | 'table'>('kanban');
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState('');
  const [newLead, setNewLead] = useState({ name: '', email: '', company: '', phone: '', value: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/admin/crm');
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
      }
    } catch { } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLeads(); }, []);

  const handleAddLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/crm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead),
      });
      if (res.ok) {
        toast.success('Lead added successfully');
        setShowAddModal(false);
        setNewLead({ name: '', email: '', company: '', phone: '', value: '' });
        fetchLeads();
      } else {
        toast.error('Failed to add lead');
      }
    } catch { toast.error('Network error'); } finally {
      setSubmitting(false);
    }
  };

  const updateLeadStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/crm`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
        toast.success(`Lead moved to ${status}`);
      }
    } catch { toast.error('Failed to update lead'); }
  };

  const filteredLeads = leads.filter(l =>
    !search ||
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.email.toLowerCase().includes(search.toLowerCase()) ||
    l.company?.toLowerCase().includes(search.toLowerCase())
  );

  const totalValue = leads.reduce((sum, l) => sum + (l.value || 0), 0);
  const wonLeads = leads.filter(l => l.status === 'WON');
  const wonValue = wonLeads.reduce((sum, l) => sum + (l.value || 0), 0);

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">CRM & Leads Pipeline</h1>
            <p className="text-gray-500 text-sm">{leads.length} leads · ₹{totalValue.toLocaleString('en-IN')} pipeline value</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
              <button
                onClick={() => setView('kanban')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${view === 'kanban' ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white' : 'text-gray-500'}`}
              >
                Kanban
              </button>
              <button
                onClick={() => setView('table')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${view === 'table' ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white' : 'text-gray-500'}`}
              >
                Table
              </button>
            </div>
            <Button onClick={() => setShowAddModal(true)} className="gradient-bg text-white">
              <Plus size={16} className="mr-2" /> Add Lead
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Users, label: 'Total Leads', value: leads.length, color: 'text-blue-600 bg-blue-100' },
            { icon: DollarSign, label: 'Pipeline Value', value: `₹${(totalValue / 1000).toFixed(0)}K`, color: 'text-green-600 bg-green-100' },
            { icon: TrendingUp, label: 'Won Value', value: `₹${(wonValue / 1000).toFixed(0)}K`, color: 'text-purple-600 bg-purple-100' },
            { icon: Clock, label: 'New This Week', value: leads.filter(l => {
              const d = new Date(l.createdAt);
              const w = new Date(); w.setDate(w.getDate() - 7);
              return d > w;
            }).length, color: 'text-orange-600 bg-orange-100' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon size={18} />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-gray-500 text-xs">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search leads..."
            className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Kanban Board */}
        {view === 'kanban' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto">
            {PIPELINE_STAGES.map((stage) => {
              const stageLeads = filteredLeads.filter(l => l.status === stage);
              const stageValue = stageLeads.reduce((s, l) => s + (l.value || 0), 0);
              return (
                <div key={stage} className="min-w-[160px]">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${STATUS_COLORS[stage]}`}>{stage}</span>
                    <span className="text-xs text-gray-400">{stageLeads.length}</span>
                  </div>
                  {stageValue > 0 && (
                    <div className="text-xs text-gray-500 mb-2">₹{stageValue.toLocaleString('en-IN')}</div>
                  )}
                  <div className="space-y-2">
                    {loading ? (
                      <div className="h-16 shimmer rounded-xl" />
                    ) : stageLeads.length === 0 ? (
                      <div className="h-12 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center">
                        <span className="text-gray-300 text-xs">Drop here</span>
                      </div>
                    ) : (
                      stageLeads.map(lead => (
                        <div
                          key={lead.id}
                          className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all cursor-pointer"
                        >
                          <div className="font-semibold text-gray-900 dark:text-white text-xs truncate">{lead.company || lead.name}</div>
                          <div className="text-gray-400 text-xs truncate">{lead.name}</div>
                          {lead.value && (
                            <div className="text-green-600 font-bold text-xs mt-1">₹{lead.value.toLocaleString('en-IN')}</div>
                          )}
                          <div className="flex gap-1 mt-2">
                            {PIPELINE_STAGES.filter(s => s !== stage).slice(0, 2).map(s => (
                              <button
                                key={s}
                                onClick={() => updateLeadStatus(lead.id, s)}
                                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 px-1.5 py-0.5 rounded hover:bg-gray-200 transition-colors"
                              >
                                → {s.charAt(0) + s.slice(1).toLowerCase()}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Table View */
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  {['Name', 'Company', 'Email', 'Phone', 'Status', 'Value', 'Added'].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {loading ? Array.from({length: 5}).map((_, i) => (
                  <tr key={i}>{Array.from({length: 7}).map((_, j) => <td key={j} className="px-6 py-4"><div className="h-4 shimmer rounded" /></td>)}</tr>
                )) : filteredLeads.map(lead => (
                  <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{lead.name}</td>
                    <td className="px-6 py-4 text-gray-500">{lead.company || '—'}</td>
                    <td className="px-6 py-4 text-gray-500">{lead.email}</td>
                    <td className="px-6 py-4 text-gray-500">{lead.phone || '—'}</td>
                    <td className="px-6 py-4">
                      <select
                        value={lead.status}
                        onChange={e => updateLeadStatus(lead.id, e.target.value)}
                        className={`text-xs font-semibold px-2 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-1 focus:ring-green-500 ${STATUS_COLORS[lead.status]}`}
                      >
                        {PIPELINE_STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="px-6 py-4 font-bold text-green-600">
                      {lead.value ? `₹${lead.value.toLocaleString('en-IN')}` : '—'}
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs">
                      {new Date(lead.createdAt).toLocaleDateString('en-IN')}
                    </td>
                  </tr>
                ))}
                {!loading && filteredLeads.length === 0 && (
                  <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-400">No leads found. Add your first lead to get started.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Lead Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-3xl p-8 w-full max-w-md shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Lead</h2>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleAddLead} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name *</label>
                  <Input placeholder="Contact name" value={newLead.name} onChange={e => setNewLead({...newLead, name: e.target.value})} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email *</label>
                  <Input type="email" placeholder="email@company.com" value={newLead.email} onChange={e => setNewLead({...newLead, email: e.target.value})} required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company</label>
                    <Input placeholder="Company name" value={newLead.company} onChange={e => setNewLead({...newLead, company: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                    <Input type="tel" placeholder="+91..." value={newLead.phone} onChange={e => setNewLead({...newLead, phone: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deal Value (₹)</label>
                  <Input type="number" placeholder="e.g. 50000" value={newLead.value} onChange={e => setNewLead({...newLead, value: e.target.value})} />
                </div>
                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setShowAddModal(false)}>Cancel</Button>
                  <Button type="submit" className="flex-1 gradient-bg text-white" disabled={submitting}>
                    {submitting ? 'Adding...' : 'Add Lead'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
