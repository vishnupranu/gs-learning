'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Megaphone, Mail, Users, TrendingUp, Target, MousePointer,
  ExternalLink, Plus, Send, BarChart3, Eye, CheckCircle,
  Instagram, Linkedin, Twitter, Facebook, RefreshCw, Globe
} from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const CAMPAIGNS = [
  { id: '1', name: 'Summer Tech Offer', channel: 'Email', status: 'Active', sent: 1240, opens: 612, clicks: 89, conversions: 14, createdAt: '2026-05-10' },
  { id: '2', name: 'AI Tools Launch', channel: 'WhatsApp', status: 'Active', sent: 340, opens: 318, clicks: 76, conversions: 22, createdAt: '2026-05-15' },
  { id: '3', name: 'Enterprise Package', channel: 'Email', status: 'Paused', sent: 580, opens: 203, clicks: 31, conversions: 5, createdAt: '2026-05-01' },
  { id: '4', name: 'Website Revamp Promo', channel: 'Telegram', status: 'Draft', sent: 0, opens: 0, clicks: 0, conversions: 0, createdAt: '2026-05-20' },
];

const STATS = [
  { label: 'Total Leads', value: '1,284', change: '+18%', icon: Users, color: 'text-blue-400' },
  { label: 'Email Opens', value: '48.2%', change: '+3.1%', icon: Mail, color: 'text-green-400' },
  { label: 'Click Rate', value: '12.8%', change: '+1.4%', icon: MousePointer, color: 'text-purple-400' },
  { label: 'Conversions', value: '41', change: '+22%', icon: Target, color: 'text-orange-400' },
];

const STATUS_COLORS: Record<string, string> = {
  Active: 'bg-green-500/10 text-green-400 border-green-500/20',
  Paused: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  Draft: 'bg-gray-500/10 text-gray-400 border-gray-700',
  Completed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
};

const CHANNEL_COLORS: Record<string, string> = {
  Email: 'text-blue-400',
  WhatsApp: 'text-green-400',
  Telegram: 'text-sky-400',
  SMS: 'text-purple-400',
};

export default function AdminMarketingPage() {
  const [tab, setTab] = useState<'campaigns' | 'broadcast' | 'social' | 'pixel'>('campaigns');
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [broadcastChannel, setBroadcastChannel] = useState('Email');
  const [sending, setSending] = useState(false);

  const handleBroadcast = async () => {
    if (!broadcastMsg.trim()) { toast.error('Enter a message first'); return; }
    setSending(true);
    try {
      const res = await fetch('/api/admin/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: broadcastMsg, channel: broadcastChannel }),
      });
      if (res.ok) {
        toast.success(`Broadcast sent via ${broadcastChannel}!`);
        setBroadcastMsg('');
      } else {
        toast.error('Broadcast failed — check channel config');
      }
    } catch {
      toast.error('Broadcast failed');
    } finally {
      setSending(false);
    }
  };

  const totalSent = CAMPAIGNS.reduce((s, c) => s + c.sent, 0);
  const totalConversions = CAMPAIGNS.reduce((s, c) => s + c.conversions, 0);

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 gradient-bg rounded-2xl flex items-center justify-center shadow-lg">
            <Megaphone size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">Marketing</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Campaigns, broadcasts, social media &amp; conversion tracking</p>
          </div>
          <div className="ml-auto">
            <Button size="sm" className="gradient-bg text-white rounded-xl gap-2 text-xs shadow-lg shadow-green-500/25">
              <Plus size={13} /> New Campaign
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {STATS.map(stat => (
            <div key={stat.label} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <stat.icon size={14} className={stat.color} />
                <span className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</span>
              </div>
              <div className="text-xl font-black text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-xs text-green-500 font-semibold mt-0.5">{stat.change} this month</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-5 bg-gray-100 dark:bg-gray-800 p-1 rounded-2xl w-fit">
          {[
            { id: 'campaigns', label: 'Campaigns', icon: BarChart3 },
            { id: 'broadcast', label: 'Broadcast', icon: Send },
            { id: 'social', label: 'Social Media', icon: Globe },
            { id: 'pixel', label: 'Tracking', icon: Target },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id as any)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${tab === t.id ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
            >
              <t.icon size={12} /> {t.label}
            </button>
          ))}
        </div>

        {/* Campaigns Tab */}
        {tab === 'campaigns' && (
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  {['Campaign', 'Channel', 'Status', 'Sent', 'Opens', 'Clicks', 'Conversions', 'Date'].map(h => (
                    <th key={h} className="text-left px-5 py-3.5 text-gray-500 dark:text-gray-400 font-semibold text-xs">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CAMPAIGNS.map((c, i) => (
                  <tr key={c.id} className={`border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/40 ${i % 2 === 0 ? 'bg-gray-50/30 dark:bg-gray-800/20' : ''}`}>
                    <td className="px-5 py-3 font-semibold text-gray-900 dark:text-white">{c.name}</td>
                    <td className={`px-5 py-3 text-xs font-bold ${CHANNEL_COLORS[c.channel] || 'text-gray-400'}`}>{c.channel}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${STATUS_COLORS[c.status]}`}>{c.status}</span>
                    </td>
                    <td className="px-5 py-3 text-gray-700 dark:text-gray-300 font-mono text-xs">{c.sent.toLocaleString()}</td>
                    <td className="px-5 py-3 text-gray-700 dark:text-gray-300 font-mono text-xs">
                      {c.sent > 0 ? `${Math.round((c.opens / c.sent) * 100)}%` : '—'}
                    </td>
                    <td className="px-5 py-3 text-gray-700 dark:text-gray-300 font-mono text-xs">
                      {c.sent > 0 ? `${Math.round((c.clicks / c.sent) * 100)}%` : '—'}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`font-black text-sm ${c.conversions > 0 ? 'text-green-500' : 'text-gray-400'}`}>{c.conversions}</span>
                    </td>
                    <td className="px-5 py-3 text-gray-400 text-xs">{c.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-800 flex gap-8 text-xs text-gray-500 dark:text-gray-400">
              <span>Total sent: <strong className="text-gray-700 dark:text-gray-300">{totalSent.toLocaleString()}</strong></span>
              <span>Total conversions: <strong className="text-green-500">{totalConversions}</strong></span>
            </div>
          </div>
        )}

        {/* Broadcast Tab */}
        {tab === 'broadcast' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6">
              <h3 className="font-black text-gray-900 dark:text-white mb-5">Send Broadcast Message</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 block">CHANNEL</label>
                  <div className="flex gap-2">
                    {['Email', 'WhatsApp', 'Telegram'].map(ch => (
                      <button key={ch} onClick={() => setBroadcastChannel(ch)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${broadcastChannel === ch ? 'gradient-bg text-white border-transparent shadow-lg' : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700'}`}
                      >{ch}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 block">MESSAGE</label>
                  <textarea
                    rows={5}
                    placeholder={`Type your ${broadcastChannel} broadcast message here...\n\nTip: Use {{name}} to personalize the message.`}
                    value={broadcastMsg}
                    onChange={e => setBroadcastMsg(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm text-gray-700 dark:text-gray-300 resize-none focus:outline-none focus:border-green-400 transition-colors"
                  />
                  <div className="text-xs text-gray-400 text-right mt-1">{broadcastMsg.length}/1000 chars</div>
                </div>
                <div className="flex items-center gap-3">
                  <Button onClick={handleBroadcast} disabled={sending || !broadcastMsg.trim()}
                    className="gradient-bg text-white font-bold rounded-xl shadow-lg shadow-green-500/25 gap-2"
                  >
                    {sending ? <RefreshCw size={14} className="animate-spin" /> : <Send size={14} />}
                    {sending ? 'Sending...' : `Send to All ${broadcastChannel} Subscribers`}
                  </Button>
                </div>
                <p className="text-xs text-gray-400">
                  ⚠️ This will send to all opted-in subscribers. Double-check your message before sending.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Social Media Tab */}
        {tab === 'social' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Instagram', icon: Instagram, color: 'text-pink-400', handle: '@guidesoftitsolutions', link: 'https://instagram.com/guidesoftitsolutions' },
              { name: 'LinkedIn', icon: Linkedin, color: 'text-blue-500', handle: 'Guide Soft IT Solutions', link: 'https://linkedin.com/company/guidesoftitsolutions' },
              { name: 'X / Twitter', icon: Twitter, color: 'text-sky-400', handle: '@guidesoft_it', link: 'https://twitter.com/guidesoft_it' },
              { name: 'Facebook', icon: Facebook, color: 'text-blue-600', handle: 'Guide Soft IT Solutions', link: 'https://facebook.com/guidesoftitsolutions' },
            ].map(s => (
              <div key={s.name} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <s.icon size={28} className={s.color} />
                  <div>
                    <div className="font-black text-gray-900 dark:text-white">{s.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{s.handle}</div>
                  </div>
                </div>
                <a href={s.link} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline" className="rounded-xl text-xs gap-1 border-gray-200 dark:border-gray-700">
                    Open <ExternalLink size={11} />
                  </Button>
                </a>
              </div>
            ))}
          </motion.div>
        )}

        {/* Tracking / Pixel Tab */}
        {tab === 'pixel' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Google Analytics 4', key: 'NEXT_PUBLIC_GA_MEASUREMENT_ID', status: 'Configure in .env', color: 'text-orange-400', link: 'https://analytics.google.com' },
              { name: 'Google Tag Manager', key: 'NEXT_PUBLIC_GTM_ID', status: 'Configure in .env', color: 'text-blue-400', link: 'https://tagmanager.google.com' },
              { name: 'Meta Pixel (Facebook)', key: 'NEXT_PUBLIC_META_PIXEL_ID', status: 'Add to .env', color: 'text-blue-600', link: 'https://business.facebook.com/events_manager' },
              { name: 'Google Search Console', key: 'sitemap.xml', status: 'Submit sitemap', color: 'text-green-400', link: 'https://search.google.com/search-console' },
            ].map(t => (
              <div key={t.name} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`font-black text-gray-900 dark:text-white`}>{t.name}</div>
                  <a href={t.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500">
                    <ExternalLink size={14} />
                  </a>
                </div>
                <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-600 dark:text-gray-400 block mb-2">{t.key}</code>
                <span className="text-xs text-yellow-500 font-semibold">{t.status}</span>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </AdminLayout>
  );
}
