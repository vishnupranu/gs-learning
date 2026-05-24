'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Lock, CheckCircle, AlertTriangle, Eye, Edit, Trash2, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AdminLayout from '@/components/layout/AdminLayout';
import { toast } from 'sonner';

const ROLES = [
  { name: 'SUPER_ADMIN', label: 'Super Admin', color: 'text-red-400 bg-red-500/10 border-red-500/20', description: 'Full platform access. Can manage all users, billing, and settings.', permissions: ['All permissions'] },
  { name: 'ADMIN', label: 'Admin', color: 'text-orange-400 bg-orange-500/10 border-orange-500/20', description: 'Manage users, content, bookings, and support. Cannot manage billing.', permissions: ['users.read', 'users.write', 'bookings.*', 'cms.*', 'support.*', 'crm.*'] },
  { name: 'MANAGER', label: 'Manager', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20', description: 'View analytics, manage bookings and support tickets.', permissions: ['bookings.*', 'support.*', 'analytics.read', 'crm.read'] },
  { name: 'STAFF', label: 'Staff', color: 'text-green-400 bg-green-500/10 border-green-500/20', description: 'Handle support tickets and view assigned bookings.', permissions: ['support.read', 'support.write', 'bookings.read'] },
  { name: 'USER', label: 'User', color: 'text-gray-400 bg-gray-500/10 border-gray-700', description: 'Standard customer account with access to dashboard and bookings.', permissions: ['profile.*', 'bookings.read', 'payments.read'] },
];

const PERMISSION_MATRIX = [
  { resource: 'Users', read: ['SUPER_ADMIN', 'ADMIN'], write: ['SUPER_ADMIN', 'ADMIN'], delete: ['SUPER_ADMIN'] },
  { resource: 'Bookings', read: ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'STAFF'], write: ['SUPER_ADMIN', 'ADMIN', 'MANAGER'], delete: ['SUPER_ADMIN', 'ADMIN'] },
  { resource: 'Payments', read: ['SUPER_ADMIN', 'ADMIN'], write: ['SUPER_ADMIN'], delete: ['SUPER_ADMIN'] },
  { resource: 'CRM', read: ['SUPER_ADMIN', 'ADMIN', 'MANAGER'], write: ['SUPER_ADMIN', 'ADMIN', 'MANAGER'], delete: ['SUPER_ADMIN', 'ADMIN'] },
  { resource: 'CMS / Blog', read: ['SUPER_ADMIN', 'ADMIN', 'MANAGER'], write: ['SUPER_ADMIN', 'ADMIN'], delete: ['SUPER_ADMIN', 'ADMIN'] },
  { resource: 'Support', read: ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'STAFF'], write: ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'STAFF'], delete: ['SUPER_ADMIN', 'ADMIN'] },
  { resource: 'Analytics', read: ['SUPER_ADMIN', 'ADMIN', 'MANAGER'], write: [], delete: [] },
  { resource: 'Settings', read: ['SUPER_ADMIN'], write: ['SUPER_ADMIN'], delete: [] },
  { resource: 'Audit Logs', read: ['SUPER_ADMIN', 'ADMIN'], write: [], delete: [] },
];

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const roleOrder = ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'STAFF', 'USER'];

export default function AccessControlPage() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [tab, setTab] = useState<'matrix' | 'users' | 'roles'>('matrix');

  useEffect(() => {
    fetch('/api/admin/users')
      .then(r => r.json())
      .then(d => { setUsers(d.users || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    setUpdatingId(userId);
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
        toast.success('Role updated successfully');
      } else {
        toast.error('Failed to update role');
      }
    } catch {
      toast.error('Failed to update role');
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const hasPerm = (role: string, roles: string[]) => roles.includes(role);

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 gradient-bg rounded-2xl flex items-center justify-center shadow-lg">
            <Shield size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">Access Control</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Manage roles, permissions, and user access levels</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-2xl w-fit">
          {[
            { id: 'matrix', label: 'Permission Matrix', icon: Lock },
            { id: 'users', label: 'User Roles', icon: Users },
            { id: 'roles', label: 'Role Definitions', icon: Shield },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                tab === t.id
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <t.icon size={14} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Permission Matrix Tab */}
        {tab === 'matrix' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <th className="text-left px-6 py-4 text-gray-500 dark:text-gray-400 font-semibold w-36">Resource</th>
                      <th className="text-center px-4 py-4 text-gray-500 dark:text-gray-400 font-semibold" colSpan={3}>Read</th>
                      <th className="w-px bg-gray-100 dark:bg-gray-800" />
                      {roleOrder.map(role => (
                        <th key={role} className="text-center px-3 py-4 font-semibold">
                          <span className={`text-xs px-2 py-1 rounded-full border ${ROLES.find(r => r.name === role)?.color}`}>
                            {ROLES.find(r => r.name === role)?.label}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PERMISSION_MATRIX.map((row, i) => (
                      <tr key={row.resource} className={`border-b border-gray-50 dark:border-gray-800 ${i % 2 === 0 ? 'bg-gray-50/30 dark:bg-gray-800/20' : ''}`}>
                        <td className="px-6 py-3.5 font-semibold text-gray-900 dark:text-white">{row.resource}</td>
                        {['Read', 'Write', 'Delete'].map(perm => (
                          <td key={perm} className="px-3 py-3.5">
                            <div className="flex flex-col gap-1">
                              <span className="text-xs text-gray-400 text-center">{perm}</span>
                              <div className="flex gap-1 justify-center">
                                {roleOrder.map(role => {
                                  const perms = perm === 'Read' ? row.read : perm === 'Write' ? row.write : row.delete;
                                  const has = hasPerm(role, perms);
                                  return (
                                    <div
                                      key={role}
                                      title={`${ROLES.find(r => r.name === role)?.label}: ${has ? 'Allowed' : 'Denied'}`}
                                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                        has ? 'bg-green-500/20 border border-green-500/40' : 'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                                      }`}
                                    >
                                      {has
                                        ? <CheckCircle size={10} className="text-green-500" />
                                        : <div className="w-1.5 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
                                      }
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center gap-6 text-xs text-gray-500">
                <div className="flex items-center gap-1.5"><CheckCircle size={12} className="text-green-500" /> Allowed</div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-full" /> Denied</div>
                <span>Roles: Super Admin &gt; Admin &gt; Manager &gt; Staff &gt; User</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* User Roles Tab */}
        {tab === 'users' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="relative max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search users..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 rounded-xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              />
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden">
              {loading ? (
                <div className="p-8 text-center text-gray-400">Loading users...</div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <th className="text-left px-6 py-4 text-gray-500 dark:text-gray-400 font-semibold">User</th>
                      <th className="text-left px-6 py-4 text-gray-500 dark:text-gray-400 font-semibold">Email</th>
                      <th className="text-left px-6 py-4 text-gray-500 dark:text-gray-400 font-semibold">Current Role</th>
                      <th className="text-left px-6 py-4 text-gray-500 dark:text-gray-400 font-semibold">Change Role</th>
                      <th className="text-left px-6 py-4 text-gray-500 dark:text-gray-400 font-semibold">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(user => {
                      const roleInfo = ROLES.find(r => r.name === user.role);
                      return (
                        <tr key={user.id} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/40">
                          <td className="px-6 py-3.5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 gradient-bg rounded-xl flex items-center justify-center text-white text-xs font-black">
                                {user.name?.[0]?.toUpperCase()}
                              </div>
                              <span className="font-semibold text-gray-900 dark:text-white">{user.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-3.5 text-gray-500 dark:text-gray-400">{user.email}</td>
                          <td className="px-6 py-3.5">
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${roleInfo?.color}`}>
                              {roleInfo?.label || user.role}
                            </span>
                          </td>
                          <td className="px-6 py-3.5">
                            <select
                              value={user.role}
                              onChange={e => handleRoleChange(user.id, e.target.value)}
                              disabled={updatingId === user.id}
                              className="text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1.5 text-gray-700 dark:text-gray-300 disabled:opacity-50"
                            >
                              {roleOrder.map(r => (
                                <option key={r} value={r}>{ROLES.find(rl => rl.name === r)?.label}</option>
                              ))}
                            </select>
                          </td>
                          <td className="px-6 py-3.5 text-gray-500 dark:text-gray-400 text-xs">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>
        )}

        {/* Role Definitions Tab */}
        {tab === 'roles' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ROLES.map(role => (
              <div key={role.name} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-sm font-black px-3 py-1 rounded-full border ${role.color}`}>{role.label}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{role.description}</p>
                <div className="space-y-1.5">
                  {role.permissions.map(p => (
                    <div key={p} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <CheckCircle size={11} className="text-green-500 flex-shrink-0" />
                      <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">{p}</code>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </AdminLayout>
  );
}
