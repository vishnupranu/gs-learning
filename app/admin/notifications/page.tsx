'use client';

import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Bell, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';

const NOTIFICATIONS = [
  { id: 1, type: 'alert', message: 'High CPU usage detected on Node 3', time: '10 mins ago', read: false },
  { id: 2, type: 'booking', message: 'New booking request from Sarah Smith', time: '1 hour ago', read: false },
  { id: 3, type: 'payment', message: 'Payment of $15,000 received from Acme Corp', time: '2 hours ago', read: true },
  { id: 4, type: 'system', message: 'System update completed successfully', time: '1 day ago', read: true }
];

export default function AdminNotificationsPage() {
  return (
    <AdminLayout>
      <div className="p-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Global Notifications</h1>
            <p className="text-gray-500 text-sm">System alerts and activity feed</p>
          </div>
          <button className="text-green-600 text-sm font-medium hover:text-green-700">
            Mark all as read
          </button>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {NOTIFICATIONS.map(note => (
              <div key={note.id} className={`p-4 flex gap-4 ${!note.read ? 'bg-green-50/50 dark:bg-green-900/10' : ''}`}>
                <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  note.type === 'alert' ? 'bg-red-100 text-red-600' :
                  note.type === 'payment' ? 'bg-green-100 text-green-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {note.type === 'alert' ? <AlertCircle size={14} /> :
                   note.type === 'payment' ? <CheckCircle size={14} /> :
                   <Bell size={14} />}
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${!note.read ? 'font-bold text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                    {note.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{note.time}</p>
                </div>
                {!note.read && (
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
