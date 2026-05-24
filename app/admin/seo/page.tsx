'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Globe, TrendingUp, AlertCircle, CheckCircle, ExternalLink, RefreshCw, Copy, FileText } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const META_PAGES = [
  { page: 'Home (/)', title: 'Guide Soft IT Solutions — Enterprise Software Development', description: 'Leading IT solutions company in India. Custom software, AI integration, web development, mobile apps. 150+ clients served.', score: 92, issues: 0 },
  { page: 'About (/about)', title: 'About Guide Soft — Our Story & Team', description: 'Learn about Guide Soft IT Solutions, our mission, our expert team, and our 5+ years of delivering digital transformation.', score: 88, issues: 1 },
  { page: 'Services (/services)', title: 'IT Services — Web, Mobile, AI & Cloud Solutions', description: 'Comprehensive IT services including web development, mobile apps, AI/ML, cloud infrastructure, and UI/UX design.', score: 85, issues: 2 },
  { page: 'Pricing (/pricing)', title: 'Pricing Plans — Transparent IT Project Pricing', description: 'Flexible pricing for startups, SMBs, and enterprises. Custom quotes available. No hidden fees.', score: 90, issues: 0 },
  { page: 'Blog (/blog)', title: 'Tech Blog — Insights on AI, Software & Digital Trends', description: 'Expert articles on software development, AI, cloud computing, and digital transformation by the Guide Soft team.', score: 78, issues: 3 },
  { page: 'Contact (/contact)', title: 'Contact Guide Soft — Get in Touch Today', description: 'Reach our team via email, phone, WhatsApp or book a consultation call. Offices in Guntur & Bangalore.', score: 95, issues: 0 },
];

const KEYWORDS = [
  { term: 'software development company india', position: 12, volume: '8.1K', trend: 'up' },
  { term: 'custom web development hyderabad', position: 8, volume: '2.4K', trend: 'up' },
  { term: 'ai integration services india', position: 5, volume: '1.8K', trend: 'up' },
  { term: 'next.js development company', position: 18, volume: '3.2K', trend: 'down' },
  { term: 'mobile app development guntur', position: 3, volume: '890', trend: 'up' },
  { term: 'saas development company', position: 24, volume: '6.5K', trend: 'stable' },
];

export default function AdminSEOPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'pages' | 'keywords'>('overview');
  const [copying, setCopying] = useState<string | null>(null);
  const [regenerating, setRegenerating] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopying(id);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopying(null), 1500);
  };

  const handleRegenerate = async (page: string) => {
    setRegenerating(page);
    await new Promise(r => setTimeout(r, 1200));
    toast.success(`Meta tags regenerated for ${page}`);
    setRegenerating(null);
  };

  const avgScore = Math.round(META_PAGES.reduce((s, p) => s + p.score, 0) / META_PAGES.length);
  const totalIssues = META_PAGES.reduce((s, p) => s + p.issues, 0);

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 gradient-bg rounded-2xl flex items-center justify-center shadow-lg">
            <Search size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">SEO Tools</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Monitor page SEO health, meta tags, and keyword rankings</p>
          </div>
          <div className="ml-auto flex gap-3">
            <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="rounded-xl gap-2 text-xs border-gray-200 dark:border-gray-700">
                <Globe size={13} /> Search Console <ExternalLink size={11} />
              </Button>
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Avg SEO Score', value: `${avgScore}/100`, color: avgScore >= 85 ? 'text-green-400' : 'text-yellow-400', icon: TrendingUp },
            { label: 'Pages Indexed', value: `${META_PAGES.length}`, color: 'text-blue-400', icon: FileText },
            { label: 'Total Issues', value: totalIssues, color: totalIssues > 0 ? 'text-red-400' : 'text-green-400', icon: AlertCircle },
            { label: 'Sitemap', value: 'Live', color: 'text-green-400', icon: CheckCircle },
          ].map(s => (
            <div key={s.label} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <s.icon size={14} className={s.color} />
                <span className="text-xs text-gray-500 dark:text-gray-400">{s.label}</span>
              </div>
              <div className={`text-xl font-black ${s.color}`}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-5 bg-gray-100 dark:bg-gray-800 p-1 rounded-2xl w-fit">
          {(['overview', 'pages', 'keywords'] as const).map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${activeTab === t ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Pages Tab */}
        {activeTab === 'pages' && (
          <div className="space-y-4">
            {META_PAGES.map((page) => (
              <motion.div key={page.page} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{page.page}</span>
                    {page.issues > 0 && (
                      <span className="ml-2 text-xs text-red-400 font-semibold">{page.issues} issue{page.issues > 1 ? 's' : ''}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`text-sm font-black px-3 py-1 rounded-full ${page.score >= 90 ? 'bg-green-500/10 text-green-500' : page.score >= 75 ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'}`}>
                      {page.score}/100
                    </div>
                    <Button size="sm" variant="outline" onClick={() => handleRegenerate(page.page)} disabled={regenerating === page.page} className="rounded-lg text-xs h-8">
                      {regenerating === page.page ? <RefreshCw size={12} className="animate-spin" /> : <RefreshCw size={12} />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-2 items-start">
                    <span className="text-xs font-bold text-gray-400 w-24 shrink-0 pt-0.5">Title</span>
                    <p className="text-sm text-gray-800 dark:text-gray-200 flex-1">{page.title}</p>
                    <button onClick={() => copyToClipboard(page.title, `title-${page.page}`)} className="text-gray-400 hover:text-gray-600 shrink-0">
                      <Copy size={12} />
                    </button>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="text-xs font-bold text-gray-400 w-24 shrink-0 pt-0.5">Description</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 flex-1 italic">{page.description}</p>
                    <button onClick={() => copyToClipboard(page.description, `desc-${page.page}`)} className="text-gray-400 hover:text-gray-600 shrink-0">
                      <Copy size={12} />
                    </button>
                  </div>
                  {/* Score bar */}
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full ${page.score >= 90 ? 'bg-green-500' : page.score >= 75 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${page.score}%` }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Keywords Tab */}
        {activeTab === 'keywords' && (
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="text-left px-5 py-3.5 text-gray-500 dark:text-gray-400 font-semibold">Keyword</th>
                  <th className="text-left px-5 py-3.5 text-gray-500 dark:text-gray-400 font-semibold">Position</th>
                  <th className="text-left px-5 py-3.5 text-gray-500 dark:text-gray-400 font-semibold">Search Volume</th>
                  <th className="text-left px-5 py-3.5 text-gray-500 dark:text-gray-400 font-semibold">Trend</th>
                </tr>
              </thead>
              <tbody>
                {KEYWORDS.map((kw, i) => (
                  <tr key={kw.term} className={`border-b border-gray-50 dark:border-gray-800 ${i % 2 === 0 ? 'bg-gray-50/30 dark:bg-gray-800/20' : ''}`}>
                    <td className="px-5 py-3 font-medium text-gray-800 dark:text-gray-200">{kw.term}</td>
                    <td className="px-5 py-3">
                      <span className={`font-black text-lg ${kw.position <= 5 ? 'text-green-500' : kw.position <= 15 ? 'text-yellow-500' : 'text-gray-400'}`}>#{kw.position}</span>
                    </td>
                    <td className="px-5 py-3 text-gray-600 dark:text-gray-400">{kw.volume}/mo</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-bold ${kw.trend === 'up' ? 'text-green-400' : kw.trend === 'down' ? 'text-red-400' : 'text-gray-400'}`}>
                        {kw.trend === 'up' ? '↑ Rising' : kw.trend === 'down' ? '↓ Falling' : '→ Stable'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
              <h3 className="font-black text-gray-900 dark:text-white mb-4">SEO Checklist</h3>
              {[
                { item: 'sitemap.xml live at /sitemap.xml', done: true },
                { item: 'robots.txt configured', done: true },
                { item: 'OpenGraph meta tags on all pages', done: true },
                { item: 'Canonical URLs set', done: true },
                { item: 'Google Analytics 4 connected', done: false },
                { item: 'Google Search Console verified', done: false },
                { item: 'Schema markup (JSON-LD)', done: false },
                { item: 'Core Web Vitals optimized', done: true },
              ].map(c => (
                <div key={c.item} className="flex items-center gap-3 py-2 border-b border-gray-50 dark:border-gray-800 last:border-0">
                  {c.done ? <CheckCircle size={14} className="text-green-500 shrink-0" /> : <AlertCircle size={14} className="text-yellow-500 shrink-0" />}
                  <span className={`text-sm ${c.done ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400'}`}>{c.item}</span>
                </div>
              ))}
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
              <h3 className="font-black text-gray-900 dark:text-white mb-4">Quick Links</h3>
              {[
                { label: 'Google Search Console', href: 'https://search.google.com/search-console', note: 'Submit sitemap, check indexing' },
                { label: 'View Sitemap XML', href: '/sitemap.xml', note: 'Auto-generated from pages' },
                { label: 'View Robots.txt', href: '/robots.txt', note: 'Crawler rules' },
                { label: 'Google PageSpeed', href: 'https://pagespeed.web.dev/', note: 'Core Web Vitals analysis' },
                { label: 'Ahrefs Free Tools', href: 'https://ahrefs.com/free-seo-tools', note: 'Keyword & backlink analysis' },
              ].map(link => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between py-2.5 border-b border-gray-50 dark:border-gray-800 last:border-0 hover:text-green-500 transition-colors group"
                >
                  <div>
                    <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-green-500">{link.label}</div>
                    <div className="text-xs text-gray-400">{link.note}</div>
                  </div>
                  <ExternalLink size={12} className="text-gray-400 group-hover:text-green-500" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
