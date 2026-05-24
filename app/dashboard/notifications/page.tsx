'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Bell, FileText, Settings } from 'lucide-react';

const NOTIFICATIONS = [
  { id: 1, message: 'Your booking has been confirmed for May 20th.', time: '2 hours ago', read: false },
  { id: 2, message: 'Invoice INV-2026-001 has been generated.', time: '1 day ago', read: true },
  { id: 3, message: 'Welcome to Guide Soft! Complete your profile.', time: '2 days ago', read: true }
];

export default function DashboardNotificationsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <div className="pt-24 pb-16 max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
            <p className="text-gray-500">Stay updated on your account activity</p>
          </div>
          <button className="text-green-600 font-medium hover:text-green-700 text-sm flex items-center gap-2">
            <Settings size={16} /> Preferences
          </button>
        </div>

        <div className="premium-card overflow-hidden">
          {NOTIFICATIONS.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <Bell size={48} className="mx-auto text-gray-300 mb-4" />
              <p>You're all caught up!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {NOTIFICATIONS.map(note => (
                <div key={note.id} className={`p-6 flex items-start gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${!note.read ? 'bg-green-50/30 dark:bg-green-900/10' : ''}`}>
                  <div className={`mt-1 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${!note.read ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                    <Bell size={18} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-base ${!note.read ? 'font-bold text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                      {note.message}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">{note.time}</p>
                  </div>
                  {!note.read && (
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-2 shadow-sm shadow-green-500/50"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
