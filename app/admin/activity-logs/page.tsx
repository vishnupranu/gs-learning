'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '@/components/layout/AdminLayout';
import { Shield, User, Clock, Filter, Search, Download } from 'lucide-react';

interface LogEntry {
  id: string;
  userId?: string;
  user?: { name: string; email: string };
  action: string;
  ipAddress?: string;
  details?: string;
  createdAt: string;
}

const ACTION_COLORS: Record<string, string> = {
  LOGIN: 'text-green-600 bg-green-100',
  LOGOUT: 'text-gray-600 bg-gray-100',
  CREATE: 'text-blue-600 bg-blue-100',
  UPDATE: 'text-yellow-600 bg-yellow-100',
  DELETE: 'text-red-600 bg-red-100',
  ADMIN: 'text-purple-600 bg-purple-100',
  PAYMENT: 'text-emerald-600 bg-emerald-100',
  BOOKING: 'text-cyan-600 bg-cyan-100',
};

function getActionColor(action: string) {
  for (const [key, val] of Object.entries(ACTION_COLORS)) {
    if (action.includes(key)) return val;
  }
  return 'text-gray-600 bg-gray-100';
}

export default function ActivityLogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams({ page: String(page), limit: '50' });
    fetch(`/api/admin/logs?${params}`)
      .then(r => r.json())
      .then(data => {
        setLogs(data.logs || []);
        setTotal(data.pagination?.total || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page]);

  const filtered = logs.filter(log =>
    !search ||
    log.action?.toLowerCase().includes(search.toLowerCase()) ||
    log.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
    log.ipAddress?.includes(search) ||
    log.details?.toLowerCase().includes(search.toLowerCase())
  );

  const exportCSV = () => {
    const rows = [
      ['Timestamp', 'User', 'Action', 'IP Address', 'Details'],
      ...logs.map(l => [
        new Date(l.createdAt).toISOString(),
        l.user?.name || l.userId || 'System',
        l.action,
        l.ipAddress || '—',
        l.details || '—',
      ])
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `activity-logs-${Date.now()}.csv`; a.click();
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Activity & Audit Logs</h1>
            <p className="text-gray-500 text-sm">{total} events recorded · Complete audit trail</p>
          </div>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Download size={16} /> Export CSV
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search logs..."
            className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Timeline */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {['Timestamp', 'User', 'Action', 'Details', 'IP Address'].map(h => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <td key={j} className="px-6 py-4"><div className="h-4 shimmer rounded" /></td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    {search ? 'No logs match your search.' : 'No activity logs yet. User actions will be recorded here.'}
                  </td>
                </tr>
              ) : (
                filtered.map((log, i) => (
                  <motion.tr
                    key={log.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <Clock size={12} />
                        {new Date(log.createdAt).toLocaleString('en-IN', {
                          day: '2-digit', month: 'short',
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 gradient-bg rounded-full flex items-center justify-center flex-shrink-0">
                          <User size={12} className="text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white text-sm">
                            {log.user?.name || log.userId?.slice(0, 8) || 'System'}
                          </div>
                          {log.user?.email && (
                            <div className="text-xs text-gray-400">{log.user.email}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${getActionColor(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs max-w-xs truncate">
                      {log.details || '—'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-xs text-gray-400 font-mono">
                        <Shield size={10} />
                        {log.ipAddress || '—'}
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>

          {total > 50 && (
            <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Showing {(page - 1) * 50 + 1}–{Math.min(page * 50, total)} of {total} events
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage(p => p + 1)}
                  disabled={page * 50 >= total}
                  className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
