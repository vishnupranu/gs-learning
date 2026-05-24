'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, MessageCircle, Clock, CheckCircle, XCircle, RefreshCw, Search, Filter, Zap } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Input } from '@/components/ui/input';

interface AILog {
  id: string;
  userId?: string;
  userName?: string;
  provider: string;
  model: string;
  prompt: string;
  response: string;
  tokens: number;
  latencyMs: number;
  status: 'success' | 'error' | 'timeout';
  createdAt: string;
}

// Realistic mock data for the AI logs
const MOCK_LOGS: AILog[] = [
  { id: '1', userName: 'Ravi Kumar', provider: 'OpenAI', model: 'gpt-4o', prompt: 'What services does Guide Soft offer?', response: 'Guide Soft IT Solutions specializes in...', tokens: 312, latencyMs: 820, status: 'success', createdAt: new Date(Date.now() - 2 * 60000).toISOString() },
  { id: '2', userName: 'Anita Sharma', provider: 'Anthropic', model: 'claude-3-5-sonnet', prompt: 'Can you help me with my booking?', response: 'Of course! I can help you schedule...', tokens: 245, latencyMs: 650, status: 'success', createdAt: new Date(Date.now() - 15 * 60000).toISOString() },
  { id: '3', provider: 'Google', model: 'gemini-1.5-flash', prompt: 'What is the pricing for enterprise?', response: 'Our enterprise plans start at...', tokens: 189, latencyMs: 420, status: 'success', createdAt: new Date(Date.now() - 32 * 60000).toISOString() },
  { id: '4', userName: 'Mohammed Ali', provider: 'OpenAI', model: 'gpt-4o-mini', prompt: 'How do I reset my password?', response: '', tokens: 0, latencyMs: 5000, status: 'timeout', createdAt: new Date(Date.now() - 1 * 3600000).toISOString() },
  { id: '5', userName: 'Priya Nair', provider: 'Anthropic', model: 'claude-3-haiku', prompt: 'I need a web development quote', response: 'I would be happy to help with your quote...', tokens: 428, latencyMs: 710, status: 'success', createdAt: new Date(Date.now() - 2 * 3600000).toISOString() },
  { id: '6', provider: 'OpenAI', model: 'gpt-4o', prompt: 'System error test', response: '', tokens: 0, latencyMs: 120, status: 'error', createdAt: new Date(Date.now() - 3 * 3600000).toISOString() },
];

const PROVIDER_COLORS: Record<string, string> = {
  OpenAI: 'text-green-400 bg-green-500/10 border-green-500/20',
  Anthropic: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  Google: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  Cloudflare: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
};

const STATUS_MAP = {
  success: { label: 'Success', icon: CheckCircle, color: 'text-green-400' },
  error: { label: 'Error', icon: XCircle, color: 'text-red-400' },
  timeout: { label: 'Timeout', icon: Clock, color: 'text-yellow-400' },
};

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  if (diff < 60000) return 'just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return new Date(date).toLocaleDateString();
}

export default function AILogsPage() {
  const [logs, setLogs] = useState<AILog[]>(MOCK_LOGS);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterProvider, setFilterProvider] = useState<string>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const totalTokens = logs.reduce((s, l) => s + l.tokens, 0);
  const successRate = Math.round((logs.filter(l => l.status === 'success').length / logs.length) * 100);
  const avgLatency = Math.round(logs.reduce((s, l) => s + l.latencyMs, 0) / logs.length);

  const filtered = logs.filter(l => {
    const matchSearch = !search ||
      l.prompt.toLowerCase().includes(search.toLowerCase()) ||
      l.userName?.toLowerCase().includes(search.toLowerCase()) ||
      l.provider.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || l.status === filterStatus;
    const matchProvider = filterProvider === 'all' || l.provider === filterProvider;
    return matchSearch && matchStatus && matchProvider;
  });

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 gradient-bg rounded-2xl flex items-center justify-center shadow-lg">
            <Bot size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">AI Logs</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Monitor all AI model interactions, token usage, and performance</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Requests', value: logs.length, icon: MessageCircle, color: 'text-blue-400' },
            { label: 'Success Rate', value: `${successRate}%`, icon: CheckCircle, color: 'text-green-400' },
            { label: 'Avg Latency', value: `${avgLatency}ms`, icon: Clock, color: 'text-yellow-400' },
            { label: 'Total Tokens', value: totalTokens.toLocaleString(), icon: Zap, color: 'text-purple-400' },
          ].map(stat => (
            <div key={stat.label} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <stat.icon size={14} className={stat.color} />
                <span className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</span>
              </div>
              <div className="text-xl font-black text-gray-900 dark:text-white">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="relative flex-1 min-w-48">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search prompts, users, providers..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 rounded-xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-sm" />
          </div>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-gray-700 dark:text-gray-300">
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="error">Error</option>
            <option value="timeout">Timeout</option>
          </select>
          <select value={filterProvider} onChange={e => setFilterProvider(e.target.value)} className="text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-gray-700 dark:text-gray-300">
            <option value="all">All Providers</option>
            <option value="OpenAI">OpenAI</option>
            <option value="Anthropic">Anthropic</option>
            <option value="Google">Google</option>
            <option value="Cloudflare">Cloudflare</option>
          </select>
        </div>

        {/* Logs Table */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <th className="text-left px-5 py-3.5 text-gray-500 dark:text-gray-400 font-semibold">Time</th>
                <th className="text-left px-5 py-3.5 text-gray-500 dark:text-gray-400 font-semibold">User</th>
                <th className="text-left px-5 py-3.5 text-gray-500 dark:text-gray-400 font-semibold">Provider / Model</th>
                <th className="text-left px-5 py-3.5 text-gray-500 dark:text-gray-400 font-semibold">Prompt</th>
                <th className="text-left px-5 py-3.5 text-gray-500 dark:text-gray-400 font-semibold">Tokens</th>
                <th className="text-left px-5 py-3.5 text-gray-500 dark:text-gray-400 font-semibold">Latency</th>
                <th className="text-left px-5 py-3.5 text-gray-500 dark:text-gray-400 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log, i) => {
                const statusInfo = STATUS_MAP[log.status];
                return (
                  <React.Fragment key={log.id}>
                    <tr
                      onClick={() => setExpanded(expanded === log.id ? null : log.id)}
                      className={`border-b border-gray-50 dark:border-gray-800 cursor-pointer transition-colors ${
                        i % 2 === 0 ? 'bg-gray-50/30 dark:bg-gray-800/20' : ''
                      } hover:bg-green-50/50 dark:hover:bg-green-900/10`}
                    >
                      <td className="px-5 py-3 text-gray-500 dark:text-gray-400 text-xs whitespace-nowrap">{timeAgo(log.createdAt)}</td>
                      <td className="px-5 py-3 text-gray-700 dark:text-gray-300 text-xs">{log.userName || 'Guest'}</td>
                      <td className="px-5 py-3">
                        <div className="flex flex-col gap-0.5">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full border w-fit ${PROVIDER_COLORS[log.provider] || 'text-gray-400 bg-gray-500/10 border-gray-700'}`}>{log.provider}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-500 font-mono">{log.model}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-gray-700 dark:text-gray-300 text-xs max-w-xs truncate">{log.prompt}</td>
                      <td className="px-5 py-3 text-gray-700 dark:text-gray-300 text-xs font-mono">{log.tokens > 0 ? log.tokens.toLocaleString() : '—'}</td>
                      <td className="px-5 py-3 text-gray-700 dark:text-gray-300 text-xs font-mono">{log.latencyMs}ms</td>
                      <td className="px-5 py-3">
                        <div className={`flex items-center gap-1 text-xs font-semibold ${statusInfo.color}`}>
                          <statusInfo.icon size={12} />
                          {statusInfo.label}
                        </div>
                      </td>
                    </tr>
                    {expanded === log.id && (
                      <tr className="bg-gray-50 dark:bg-gray-800/40 border-b border-gray-100 dark:border-gray-800">
                        <td colSpan={7} className="px-5 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">PROMPT</p>
                              <p className="text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 p-3 rounded-xl border border-gray-100 dark:border-gray-700">{log.prompt}</p>
                            </div>
                            <div>
                              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">RESPONSE</p>
                              <p className="text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 p-3 rounded-xl border border-gray-100 dark:border-gray-700">{log.response || <span className="italic text-gray-400">{log.status === 'timeout' ? 'Request timed out' : 'Error occurred'}</span>}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-12 text-center text-gray-400">No AI logs match your filters</div>
          )}
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-600 mt-3 text-center">Click any row to expand prompt/response details</p>
      </div>
    </AdminLayout>
  );
}
