'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CheckCircle, ArrowRight, TrendingUp, Users, DollarSign, Globe, Handshake, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { toast } from 'sonner';

const PARTNER_BENEFITS = [
  { icon: DollarSign, title: '25-30% Revenue Share', desc: 'Earn recurring commissions on every client you refer who completes a paid project with us.' },
  { icon: TrendingUp, title: 'Co-marketing Support', desc: 'Joint marketing campaigns, co-branded materials, and featured placement on our website.' },
  { icon: Users, title: 'Dedicated Partner Manager', desc: 'A dedicated account manager to help you maximize your partnership performance.' },
  { icon: Globe, title: 'Global Network Access', desc: 'Access to our network of 150+ clients across 18 countries for mutual referrals.' },
  { icon: Award, title: 'Certified Partner Status', desc: 'Receive official GuideSoft Certified Partner badge and priority support.' },
  { icon: Handshake, title: 'Exclusive Training', desc: 'Access to private webinars, case studies, and product roadmap briefings.' },
];

const PARTNER_TIERS = [
  {
    name: 'Silver Partner',
    commission: '20%',
    requirements: ['1+ referral per quarter', 'Complete partner training', 'Co-branded profile'],
    color: 'from-gray-400 to-gray-500',
  },
  {
    name: 'Gold Partner',
    commission: '25%',
    requirements: ['3+ referrals per quarter', 'Dedicated manager', 'Joint marketing campaigns', 'Priority support'],
    color: 'from-yellow-400 to-amber-500',
    popular: true,
  },
  {
    name: 'Platinum Partner',
    commission: '30%',
    requirements: ['5+ referrals per quarter', 'White-label option', 'Custom agreements', 'Quarterly business reviews', 'VIP events access'],
    color: 'from-purple-500 to-purple-700',
  },
];

export default function PartnerPage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', website: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type: 'PARTNER_APPLICATION', subject: 'Partner Program Application' }),
      });
      if (res.ok) {
        toast.success('Partner application submitted! We will contact you within 24 hours.');
        setForm({ name: '', company: '', email: '', phone: '', website: '', message: '' });
      } else {
        toast.error('Submission failed. Please try again or WhatsApp us.');
      }
    } catch {
      toast.error('Network error. Please try WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />

      {/* Hero */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-grid-bg-light dark:gradient-grid-bg" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <span className="highlight-badge mb-6 inline-flex">🤝 Partner Program</span>
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
                Grow Together with
                <span className="block gradient-text">GuideSoft IT</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Join our partner network and earn 20-30% revenue share on every client referral. 
                Help businesses transform with world-class technology while building a sustainable income stream.
              </p>
              <div className="flex gap-4 flex-wrap">
                <a href="#apply">
                  <Button className="gradient-bg text-white h-12 px-8 rounded-2xl font-bold shadow-lg shadow-green-500/25">
                    Apply to Partner <ArrowRight size={16} className="ml-2" />
                  </Button>
                </a>
                <a href="https://wa.me/918884162999" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="h-12 px-8 rounded-2xl font-bold">
                    💬 Chat with Us
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
                { value: '₹50L+', label: 'Paid to Partners' },
                { value: '45+', label: 'Active Partners' },
                { value: '18+', label: 'Countries' },
                { value: '30%', label: 'Max Commission' },
              ].map((stat) => (
                <div key={stat.label} className="glass-morphism-light dark:glass-morphism rounded-2xl p-6 text-center">
                  <div className="text-3xl font-black gradient-text">{stat.value}</div>
                  <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
              Partner <span className="gradient-text">Benefits</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Everything you need to build a successful referral partnership</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PARTNER_BENEFITS.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700"
              >
                <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Tiers */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
              Partner <span className="gradient-text">Tiers</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PARTNER_TIERS.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl p-6 border ${tier.popular ? 'border-green-500 shadow-xl shadow-green-500/10 scale-105' : 'border-gray-200 dark:border-gray-700'} bg-white dark:bg-gray-900`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="gradient-bg text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</span>
                  </div>
                )}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4`}>
                  <span className="text-white font-black text-sm">{tier.name.split(' ')[0][0]}</span>
                </div>
                <h3 className="font-black text-gray-900 dark:text-white text-lg mb-1">{tier.name}</h3>
                <div className="text-4xl font-black gradient-text mb-4">{tier.commission}</div>
                <div className="text-xs text-gray-500 mb-4">Revenue Commission</div>
                <ul className="space-y-2">
                  {tier.requirements.map((r) => (
                    <li key={r} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
              Apply to <span className="gradient-text">Partner</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Fill out the application below and our team will get back to you within 24 hours.</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Full Name *</label>
                <Input placeholder="John Doe" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="h-11 rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Company *</label>
                <Input placeholder="Acme Corp" value={form.company} onChange={e => setForm({...form, company: e.target.value})} required className="h-11 rounded-xl" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Email *</label>
                <Input type="email" placeholder="you@company.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required className="h-11 rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Phone</label>
                <Input placeholder="+91 9999999999" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="h-11 rounded-xl" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Website</label>
              <Input placeholder="https://yourwebsite.com" value={form.website} onChange={e => setForm({...form, website: e.target.value})} className="h-11 rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Why do you want to partner with us? *</label>
              <Textarea placeholder="Tell us about your network, client base, and how you plan to refer projects..." rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} required className="rounded-xl" />
            </div>
            <Button type="submit" disabled={loading} className="w-full h-12 gradient-bg text-white font-bold rounded-xl shadow-lg shadow-green-500/25">
              {loading ? 'Submitting...' : 'Submit Partner Application'} <ArrowRight size={16} className="ml-2" />
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
