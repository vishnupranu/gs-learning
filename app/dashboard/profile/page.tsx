'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/components/providers/AuthProvider';
import { User, Mail, Lock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardProfilePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <div className="pt-24 pb-16 max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h1>
          <p className="text-gray-500">Manage your personal information and security</p>
        </div>

        <div className="space-y-6">
          <div className="premium-card p-8">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user?.name || 'User'}</h2>
                <p className="text-gray-500 flex items-center gap-2"><Mail size={14} /> {user?.email}</p>
                <div className="mt-2 inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-md">
                  <Shield size={12} /> {user?.role || 'CUSTOMER'}
                </div>
              </div>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-400" size={16} />
                    <input type="text" defaultValue={user?.name || ''} className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400" size={16} />
                    <input type="email" defaultValue={user?.email || ''} disabled className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-500 cursor-not-allowed" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button className="gradient-bg text-white">Save Changes</Button>
              </div>
            </form>
          </div>

          <div className="premium-card p-8">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Lock size={18} className="text-gray-400" /> Security
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm max-w-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm max-w-md" />
              </div>
              <div className="pt-2">
                <Button variant="outline" className="border-gray-300">Update Password</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
