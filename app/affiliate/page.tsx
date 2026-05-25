'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ArrowRight, DollarSign, Users, Link as LinkIcon, TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { toast } from 'sonner';

const STEPS = [
  { step: '01', icon: Users, title: 'Sign Up Free', desc: 'Register as a GuideSoft Affiliate. No fee, no minimum requirements. Instant approval.' },
  { step: '02', icon: LinkIcon, title: 'Share Your Link', desc: 'Get your unique referral link and share it with your network, on social media, or your website.' },
  { step: '03', icon: DollarSign, title: 'Earn Commission', desc: 'Earn 15-25% commission on every paying client you refer. Commissions paid within 7 days of client payment.' },
];

const TIERS = [
  { name: 'Starter', referrals: '1-2/month', commission: '15%', payout: '₹11,250+', color: 'border-gray-200' },
  { name: 'Growth', referrals: '3-5/month', commission: '20%', payout: '₹45,000+', color: 'border-green-500', popular: true },
  { name: 'Pro', referrals: '6+/month', commission: '25%', payout: '₹1,12,500+', color: 'border-purple-500' },
];

export default function AffiliatePage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', channel: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type: 'AFFILIATE_APPLICATION', subject: 'Affiliate Program Application' }),
      });
      if (res.ok) {
        toast.success('Application received! We will send your affiliate link within 24 hours.');
        setForm({ name: '', email: '', phone: '', channel: '', message: '' });
      } else {
        toast.error('Submission failed. Please WhatsApp us at +91 8884162999.');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />

      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 gradient-grid-bg-light dark:gradient-grid-bg" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <span className="highlight-badge mb-6 inline-flex">💰 Earn with GuideSoft</span>
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
                Affiliate Program
                <span className="block gradient-text">Earn 15-25%</span>
                <span className="block text-3xl text-gray-600 dark:text-gray-400 font-bold">Per Referral</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Refer businesses to GuideSoft IT Solutions and earn up to 25% commission 
                on every project they start. No cap on earnings. Pay when we get paid.
              </p>
              <div className="flex gap-4 flex-wrap">
                <a href="#apply">
                  <Button className="gradient-bg text-white h-12 px-8 rounded-2xl font-bold shadow-lg shadow-green-500/25">
                    Join Affiliate Program <ArrowRight size={16} className="ml-2" />
                  </Button>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: '₹50L+', label: 'Paid to Affiliates' },
                { value: '45+', label: 'Active Affiliates' },
                { value: '₹75K', label: 'Avg. Commission/Month' },
                { value: '25%', label: 'Max Commission' },
              ].map((s) => (
                <div key={s.label} className="glass-morphism-light dark:glass-morphism rounded-2xl p-6 text-center">
                  <div className="text-3xl font-black gradient-text">{s.value}</div>
                  <div className="text-gray-500 text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/25">
                  <step.icon size={28} className="text-white" />
                </div>
                <div className="text-5xl font-black gradient-text opacity-20 mb-2">{step.step}</div>
                <h3 className="font-black text-gray-900 dark:text-white text-lg mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Tiers */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
              Commission <span className="gradient-text">Tiers</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">More referrals = higher commission rate. No cap on earnings.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TIERS.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl border-2 ${tier.color} ${tier.popular ? 'shadow-xl shadow-green-500/10 scale-105' : ''} bg-white dark:bg-gray-900 p-6 text-center`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="gradient-bg text-white text-xs font-black px-3 py-1 rounded-full">Best Value</span>
                  </div>
                )}
                <h3 className="font-black text-gray-900 dark:text-white mb-1">{tier.name}</h3>
                <div className="text-gray-500 text-xs mb-4">{tier.referrals} referrals</div>
                <div className="text-5xl font-black gradient-text mb-1">{tier.commission}</div>
                <div className="text-xs text-gray-500 mb-4">Commission Rate</div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">Earn up to</div>
                  <div className="text-2xl font-black gradient-text">{tier.payout}</div>
                  <div className="text-xs text-gray-500">per month</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Payout Methods */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">Payout Methods</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { name: 'UPI', desc: '8884162999-4@ybl', icon: '📱' },
              { name: 'PayPal', desc: 'International', icon: '💳' },
              { name: 'Bank Transfer', desc: 'NEFT/RTGS', icon: '🏦' },
            ].map((p) => (
              <div key={p.name} className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                <span className="text-2xl">{p.icon}</span>
                <div className="text-left">
                  <div className="font-bold text-gray-900 dark:text-white text-sm">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">Payouts processed every Monday for previous week's completed commissions.</p>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-20">
        <div className="max-w-xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
              Join as <span className="gradient-text">Affiliate</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Free to join. Instant approval. Start earning today.</p>
          </motion.div>
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Full Name *</label>
                <Input placeholder="John Doe" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="h-11 rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Phone</label>
                <Input placeholder="+91 9999999999" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="h-11 rounded-xl" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Email *</label>
              <Input type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required className="h-11 rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">How will you promote? (Website/Social/Network)</label>
              <Input placeholder="e.g. LinkedIn, blog, business network" value={form.channel} onChange={e => setForm({...form, channel: e.target.value})} className="h-11 rounded-xl" />
            </div>
            <Button type="submit" disabled={loading} className="w-full h-12 gradient-bg text-white font-bold rounded-xl shadow-lg shadow-green-500/25">
              {loading ? 'Applying...' : 'Join Affiliate Program'} <ArrowRight size={16} className="ml-2" />
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
