'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '@/components/layout/AdminLayout';
import { Shield, Activity, Lock, Save, Bell, Globe, Database, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function AdminSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [showSecrets, setShowSecrets] = useState(false);

  const [general, setGeneral] = useState({
    platformName: 'Guide Soft IT Solutions',
    contactEmail: 'info@guideitsol.com',
    supportPhone: '+91 8500647979',
    upiId: '8884162999-4@ybl',
    website: 'https://guidesoftitsolutions.com',
    timezone: 'Asia/Kolkata',
  });

  const [integrations, setIntegrations] = useState({
    stripePublic: process.env.NEXT_PUBLIC_STRIPE_KEY || '',
    cloudflareAccountId: '',
    whatsappNumber: '+91 8884162999',
    telegramBotUsername: '@GuideSoftBot',
    gtmId: '',
    metaPixelId: '',
  });

  const [security, setSecurity] = useState({
    require2FA: false,
    sessionTimeout: '24',
    maxLoginAttempts: '5',
    allowedOrigins: 'https://guidesoftitsolutions.com',
    enableRateLimit: true,
  });

  const [notifications, setNotifications] = useState({
    emailOnBooking: true,
    emailOnPayment: true,
    emailOnTicket: true,
    whatsappOnBooking: true,
    telegramOnLead: true,
  });

  const handleSave = async () => {
    setSaving(true);
    // In production: POST to /api/admin/settings
    await new Promise(r => setTimeout(r, 1200));
    toast.success('Settings saved successfully!');
    setSaving(false);
  };

  return (
    <AdminLayout>
      <div className="p-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">System Settings</h1>
            <p className="text-gray-500 text-sm">Configure platform, integrations, security, and notifications</p>
          </div>
          <Button
            onClick={handleSave}
            className="gradient-bg text-white"
            disabled={saving}
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Saving...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Save size={16} />
                Save All Settings
              </span>
            )}
          </Button>
        </div>

        <div className="space-y-6">
          {/* General Settings */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6"
          >
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Globe size={18} className="text-blue-500" />
              General Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Platform Name', key: 'platformName', type: 'text' },
                { label: 'Contact Email', key: 'contactEmail', type: 'email' },
                { label: 'Support Phone', key: 'supportPhone', type: 'tel' },
                { label: 'UPI Payment ID', key: 'upiId', type: 'text' },
                { label: 'Website URL', key: 'website', type: 'url' },
                { label: 'Timezone', key: 'timezone', type: 'text' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {field.label}
                  </label>
                  <Input
                    type={field.type}
                    value={general[field.key as keyof typeof general]}
                    onChange={(e) => setGeneral({ ...general, [field.key]: e.target.value })}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* API Integrations */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Lock size={18} className="text-purple-500" />
                API & Integrations
              </h2>
              <button
                onClick={() => setShowSecrets(!showSecrets)}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showSecrets ? <EyeOff size={14} /> : <Eye size={14} />}
                {showSecrets ? 'Hide' : 'Show'} values
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-3 text-sm text-yellow-800 dark:text-yellow-300">
                ⚠️ These values are read from environment variables. Edit your <code className="font-mono bg-yellow-100 dark:bg-yellow-900 px-1 rounded">.env</code> file to change them.
              </div>
              {[
                { label: 'Stripe Public Key', key: 'stripePublic', placeholder: 'pk_live_...' },
                { label: 'Cloudflare Account ID', key: 'cloudflareAccountId', placeholder: 'From Cloudflare dashboard' },
                { label: 'WhatsApp Number', key: 'whatsappNumber', placeholder: '+91 8884162999' },
                { label: 'Telegram Bot Username', key: 'telegramBotUsername', placeholder: '@YourBot' },
                { label: 'Google Tag Manager ID', key: 'gtmId', placeholder: 'GTM-XXXXXX' },
                { label: 'Meta Pixel ID', key: 'metaPixelId', placeholder: '123456789' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {field.label}
                  </label>
                  <Input
                    type={showSecrets ? 'text' : 'password'}
                    value={integrations[field.key as keyof typeof integrations]}
                    onChange={(e) => setIntegrations({ ...integrations, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    className="font-mono"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Security */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6"
          >
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Shield size={18} className="text-red-500" />
              Security Settings
            </h2>
            <div className="space-y-4">
              {[
                { label: 'Require 2FA for Admins', key: 'require2FA', type: 'toggle' },
                { label: 'Enable Rate Limiting', key: 'enableRateLimit', type: 'toggle' },
              ].map(field => (
                <div key={field.key} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{field.label}</p>
                  </div>
                  <button
                    onClick={() => setSecurity(prev => ({ ...prev, [field.key]: !prev[field.key as keyof typeof security] }))}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      security[field.key as keyof typeof security] ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                      security[field.key as keyof typeof security] ? 'translate-x-7' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Session Timeout (hours)</label>
                  <Input
                    type="number"
                    value={security.sessionTimeout}
                    onChange={e => setSecurity({ ...security, sessionTimeout: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max Login Attempts</label>
                  <Input
                    type="number"
                    value={security.maxLoginAttempts}
                    onChange={e => setSecurity({ ...security, maxLoginAttempts: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6"
          >
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Bell size={18} className="text-yellow-500" />
              Notification Preferences
            </h2>
            <div className="space-y-3">
              {[
                { label: 'Email on new booking', key: 'emailOnBooking' },
                { label: 'Email on payment received', key: 'emailOnPayment' },
                { label: 'Email on new support ticket', key: 'emailOnTicket' },
                { label: 'WhatsApp on new booking', key: 'whatsappOnBooking' },
                { label: 'Telegram alert on new lead', key: 'telegramOnLead' },
              ].map(field => (
                <div key={field.key} className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-gray-800">
                  <span className="text-sm text-gray-700 dark:text-gray-300">{field.label}</span>
                  <button
                    onClick={() => setNotifications(prev => ({ ...prev, [field.key]: !prev[field.key as keyof typeof notifications] }))}
                    className={`relative w-10 h-5 rounded-full transition-colors ${
                      notifications[field.key as keyof typeof notifications] ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                      notifications[field.key as keyof typeof notifications] ? 'translate-x-5' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6"
          >
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Database size={18} className="text-green-500" />
              System Status
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Database', status: 'Connected', ok: true },
                { label: 'Email Service', status: 'Active', ok: true },
                { label: 'WhatsApp API', status: 'Check .env', ok: false },
                { label: 'Stripe', status: 'Check .env', ok: false },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                  <CheckCircle size={14} className={item.ok ? 'text-green-500' : 'text-yellow-500'} />
                  <div>
                    <div className="text-xs font-semibold text-gray-900 dark:text-white">{item.label}</div>
                    <div className={`text-xs ${item.ok ? 'text-green-600' : 'text-yellow-600'}`}>{item.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              className="gradient-bg text-white px-8"
              disabled={saving}
            >
              {saving ? 'Saving...' : <><Save size={16} className="mr-2" />Save All Changes</>}
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
