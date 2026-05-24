'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Users, Handshake, TrendingUp, Globe, Star, Building2, Award, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { toast } from 'sonner';

const partnerTiers = [
  {
    name: 'Referral Partner',
    commission: '10%',
    color: 'from-slate-500 to-slate-600',
    description: 'Refer clients and earn on every successful project',
    benefits: [
      '10% commission on referred projects',
      'Dedicated partner dashboard',
      'Real-time earnings tracking',
      'Monthly payouts via UPI/Bank',
      'Marketing collaterals provided',
      'Co-branded proposal templates',
    ],
    requirement: 'No minimum revenue requirement',
    popular: false,
  },
  {
    name: 'Silver Partner',
    commission: '15%',
    color: 'from-green-500 to-green-600',
    description: 'Active resellers and consultants with ₹5L+ annual revenue',
    benefits: [
      '15% commission on all deals',
      'Priority lead assignment',
      'White-label deliverables',
      'Technical pre-sales support',
      'Dedicated account manager',
      'Quarterly bonus incentives',
      'Partner certification training',
    ],
    requirement: '₹5 Lakhs minimum annual revenue',
    popular: true,
  },
  {
    name: 'Gold Partner',
    commission: '20%',
    color: 'from-yellow-500 to-orange-500',
    description: 'Strategic alliance for agencies and enterprise consultants',
    benefits: [
      '20% commission + performance bonuses',
      'Co-selling opportunities',
      'Joint GTM campaigns',
      'Executive access and advisory',
      'Custom pricing authority',
      'Revenue sharing on renewals',
      'Priority support SLA',
      'Annual partner summit invitation',
    ],
    requirement: '₹20 Lakhs minimum annual revenue',
    popular: false,
  },
];

const stats = [
  { value: '120+', label: 'Active Partners', icon: Users },
  { value: '₹2.4Cr+', label: 'Partner Earnings Paid', icon: TrendingUp },
  { value: '18', label: 'Countries Served', icon: Globe },
  { value: '96%', label: 'Partner Satisfaction', icon: Star },
];

export default function PartnerPage() {
  const [form, setForm] = useState({
    name: '', email: '', company: '', phone: '',
    website: '', annualRevenue: '', tier: 'Referral Partner', message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          subject: `Partner Application — ${form.tier}`,
          message: `Partner Application\n\nTier: ${form.tier}\nCompany: ${form.company}\nWebsite: ${form.website}\nAnnual Revenue: ${form.annualRevenue}\n\nMessage: ${form.message}`,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        toast.success('Partner application submitted! We will contact you within 48 hours.');
      } else {
        toast.error('Submission failed. Please try again or contact us on WhatsApp.');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />

      <div className="pt-20">
        {/* Hero */}
        <section className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 grid-bg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50" />
          <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-6 bg-green-500/20 text-green-400 border-green-500/30 px-4 py-1.5 text-sm">
                <Handshake size={14} className="mr-2 inline" />
                Guide Soft Partner Program
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Grow Together.
                <span className="gradient-text block">Earn Together.</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
                Join India's fastest-growing IT partner ecosystem. Refer clients, 
                resell our services, and earn industry-leading commissions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#apply">
                  <Button size="lg" className="gradient-bg text-white px-10 py-4 text-lg font-bold">
                    Apply to Partner <ArrowRight size={18} className="ml-2" />
                  </Button>
                </a>
                <a href="https://wa.me/918884162999" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-10 py-4 text-lg">
                    💬 Talk to Partner Team
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-gradient-to-r from-green-500 to-green-600">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center text-white"
              >
                <stat.icon size={28} className="mx-auto mb-2 text-green-100" />
                <div className="text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-green-100 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Partner Tiers */}
        <section className="py-24 max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your <span className="gradient-text">Partnership Level</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From referral to strategic alliance — we have a partnership model that fits your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partnerTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative bg-white dark:bg-gray-900 rounded-3xl p-8 border-2 transition-all hover:shadow-2xl ${
                  tier.popular ? 'border-green-500 shadow-lg shadow-green-500/10' : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-green-500 text-white px-4 py-1 font-bold shadow">
                      ⭐ Most Popular
                    </Badge>
                  </div>
                )}
                <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${tier.color} mb-4`}>
                  <Award size={22} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{tier.name}</h3>
                <div className="text-5xl font-black gradient-text mb-2">{tier.commission}</div>
                <div className="text-green-600 text-sm font-semibold mb-3">Commission on projects</div>
                <p className="text-gray-500 text-sm mb-6">{tier.description}</p>
                <div className="space-y-3 mb-6">
                  {tier.benefits.map((b) => (
                    <div key={b} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                      {b}
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-xl p-3 mb-6">
                  📋 {tier.requirement}
                </div>
                <a href="#apply">
                  <Button
                    className={`w-full ${tier.popular ? 'gradient-bg text-white' : ''}`}
                    variant={tier.popular ? 'default' : 'outline'}
                  >
                    Apply for {tier.name} <ArrowRight size={14} className="ml-2" />
                  </Button>
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                How the Program Works
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: '01', icon: Building2, title: 'Apply Online', desc: 'Submit your application and company details below.' },
                { step: '02', icon: CheckCircle, title: 'Get Approved', desc: 'Our partner team reviews and approves within 48 hours.' },
                { step: '03', icon: Zap, title: 'Start Referring', desc: 'Access your partner dashboard and unique referral link.' },
                { step: '04', icon: TrendingUp, title: 'Earn Commissions', desc: 'Get paid monthly for every successful deal.' },
              ].map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <s.icon size={24} className="text-white" />
                  </div>
                  <div className="text-sm font-mono text-green-600 mb-1">{s.step}</div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="apply" className="py-24 max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Apply to <span className="gradient-text">Become a Partner</span>
            </h2>
            <p className="text-gray-600">Fill out this form and our partnership team will reach out within 48 hours.</p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-green-50 border border-green-200 rounded-3xl p-12 text-center"
            >
              <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Received!</h3>
              <p className="text-gray-600 mb-6">
                Thank you for applying. Our partner team will review your application and contact you at{' '}
                <strong>{form.email}</strong> within 48 hours.
              </p>
              <a href="https://wa.me/918884162999" target="_blank" rel="noopener noreferrer">
                <Button className="gradient-bg text-white">
                  💬 Chat on WhatsApp for Faster Response
                </Button>
              </a>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
                  <Input placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email *</label>
                  <Input type="email" placeholder="business@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name *</label>
                  <Input placeholder="Your company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone *</label>
                  <Input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Website</label>
                  <Input type="url" placeholder="https://yourcompany.com" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Annual Revenue</label>
                  <Input placeholder="e.g. ₹50 Lakhs" value={form.annualRevenue} onChange={e => setForm({ ...form, annualRevenue: e.target.value })} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Partnership Tier *</label>
                <select
                  className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={form.tier}
                  onChange={e => setForm({ ...form, tier: e.target.value })}
                >
                  {partnerTiers.map(t => (
                    <option key={t.name} value={t.name}>{t.name} — {t.commission} Commission</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tell us about yourself *</label>
                <textarea
                  className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[120px] resize-none"
                  placeholder="Describe your business, your clients, and how you plan to partner with us..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full gradient-bg text-white py-3 font-bold text-base"
                disabled={submitting}
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Submitting Application...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Submit Partner Application
                    <ArrowRight size={16} />
                  </span>
                )}
              </Button>

              <p className="text-xs text-gray-400 text-center">
                By applying, you agree to our Partner Terms & Commission Policy.
                <br />
                Questions? <a href="https://wa.me/918884162999" className="text-green-600 hover:underline">WhatsApp us directly</a>
              </p>
            </form>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
}
