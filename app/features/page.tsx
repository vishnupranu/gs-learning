'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  Brain, Shield, Zap, Globe, BarChart3, Lock, MessageSquare, 
  GraduationCap, CreditCard, Search, Cloud, Languages, 
  ArrowRight, CheckCircle, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const FEATURES = [
  {
    icon: Brain,
    title: 'AI-Powered Development',
    desc: 'Build intelligent applications with GPT-4, Claude, and custom ML models. Chatbots, AI assistants, recommendation engines, and predictive analytics built to scale.',
    gradient: 'from-purple-500 to-indigo-600',
    bullets: ['Custom ML model training', 'LLM fine-tuning', 'Real-time AI inference', 'Vector database integration'],
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics Dashboard',
    desc: 'Beautiful, actionable dashboards with real-time data visualization. Monitor KPIs, user behavior, revenue, and system health — all in one place.',
    gradient: 'from-blue-500 to-cyan-600',
    bullets: ['Live metrics tracking', 'Custom report builder', 'Data export (CSV/PDF)', 'Alerting & thresholds'],
  },
  {
    icon: Shield,
    title: 'Role-Based Access Control',
    desc: 'Enterprise-grade RBAC with granular permissions. Assign Super Admin, Admin, Manager, Agent, and User roles with customizable access levels.',
    gradient: 'from-red-500 to-pink-600',
    bullets: ['Multi-role management', 'Permission inheritance', 'Audit trails', 'IP whitelisting'],
  },
  {
    icon: Zap,
    title: 'Automated Booking System',
    desc: 'Smart appointment and service booking with availability management, automated confirmations, and CRM integration. Reduce no-shows by 60%.',
    gradient: 'from-yellow-500 to-orange-600',
    bullets: ['Calendar integration', 'Automated reminders', 'Rescheduling flows', 'Payment on booking'],
  },
  {
    icon: CreditCard,
    title: 'Multi-Payment Gateways',
    desc: 'Accept payments via Stripe, Razorpay, PayPal, UPI, and bank transfers. Handle subscriptions, one-time payments, refunds, and invoicing.',
    gradient: 'from-green-500 to-emerald-600',
    bullets: ['UPI & card payments', 'Subscription billing', 'Auto-reconciliation', 'Multi-currency support'],
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp & Telegram Integration',
    desc: 'Send automated notifications, booking confirmations, and support messages via WhatsApp Business API and Telegram Bot — the channels users actually check.',
    gradient: 'from-teal-500 to-green-600',
    bullets: ['Automated notifications', 'Two-way messaging', 'Rich media support', 'Chatbot flows'],
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    desc: 'Bank-grade security with end-to-end encryption, OWASP compliance, JWT/OAuth2.0 authentication, and regular security audits.',
    gradient: 'from-slate-600 to-gray-800',
    bullets: ['E2E encryption', 'OWASP compliance', 'GDPR & HIPAA ready', 'Penetration testing'],
  },
  {
    icon: GraduationCap,
    title: 'LMS with Certification',
    desc: 'Complete learning management system with video courses, interactive assessments, progress tracking, and tamper-proof digital certificates.',
    gradient: 'from-amber-500 to-yellow-600',
    bullets: ['Video CDN streaming', 'Quiz & assignments', 'Blockchain certificates', 'Instructor management'],
  },
  {
    icon: Brain,
    title: '24/7 AI Support',
    desc: 'Intelligent AI chatbot handles 80% of support queries automatically, with seamless handoff to human agents for complex issues.',
    gradient: 'from-violet-500 to-purple-600',
    bullets: ['GPT-4 powered bot', 'Smart handoff rules', 'Ticket management', 'Support analytics'],
  },
  {
    icon: Search,
    title: 'SEO & Marketing Tools',
    desc: 'Built-in SEO optimization, sitemap generation, structured data, and marketing integrations to help you rank and grow organically.',
    gradient: 'from-orange-500 to-red-600',
    bullets: ['Dynamic meta tags', 'Schema.org markup', 'Google Analytics 4', 'Social media integration'],
  },
  {
    icon: Cloud,
    title: 'Cloud-Native Architecture',
    desc: 'Deploy on AWS, GCP, or Azure with auto-scaling, 99.99% uptime SLAs, global CDN distribution, and disaster recovery.',
    gradient: 'from-sky-500 to-blue-600',
    bullets: ['Auto-scaling', 'Multi-region deployment', 'CDN acceleration', 'Backup & disaster recovery'],
  },
  {
    icon: Languages,
    title: 'Multi-Language Support',
    desc: 'Build for global audiences with i18n, RTL support, and AI-powered auto-translation across English, Hindi, Telugu, Arabic, and 20+ languages.',
    gradient: 'from-pink-500 to-rose-600',
    bullets: ['i18n framework', 'RTL language support', 'AI auto-translation', '25+ languages ready'],
  },
];

const COMPARE = [
  { feature: 'Custom Development', us: true, agency: true, saas: false },
  { feature: 'Source Code Ownership', us: true, agency: false, saas: false },
  { feature: 'AI/ML Integration', us: true, agency: false, saas: false },
  { feature: 'WhatsApp API', us: true, agency: false, saas: true },
  { feature: 'RBAC & Roles', us: true, agency: true, saas: true },
  { feature: 'LMS Platform', us: true, agency: false, saas: false },
  { feature: 'Multi-currency Payments', us: true, agency: false, saas: true },
  { feature: '24/7 AI Support', us: true, agency: false, saas: false },
  { feature: 'On-premise Deployment', us: true, agency: false, saas: false },
  { feature: 'NDA & IP Protection', us: true, agency: true, saas: false },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />

      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 gradient-grid-bg-light dark:gradient-grid-bg" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="highlight-badge mb-6 inline-flex">⚡ Powerful Features</span>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
              Powerful Features for
              <span className="block gradient-text">Modern Businesses</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Everything you need to build, scale, and monetize your digital products. 
              AI-powered, cloud-native, and enterprise-ready.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative rounded-3xl border border-gray-100 dark:border-gray-800 hover:border-green-300 dark:hover:border-green-800 bg-white dark:bg-gray-900 p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feat.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <feat.icon size={22} className="text-white" />
                </div>
                <h3 className="font-black text-gray-900 dark:text-white text-lg mb-2">{feat.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">{feat.desc}</p>
                <ul className="space-y-1.5">
                  {feat.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <CheckCircle size={12} className="text-green-500 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
              Why Choose <span className="gradient-text">GuideSoft IT?</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">How we compare against generic agencies and SaaS platforms.</p>
          </motion.div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 pr-4 font-semibold text-gray-600 dark:text-gray-400 text-sm">Feature</th>
                  <th className="py-4 px-4 text-center font-black text-green-600 text-sm">GuideSoft IT</th>
                  <th className="py-4 px-4 text-center font-semibold text-gray-400 text-sm">Generic Agency</th>
                  <th className="py-4 px-4 text-center font-semibold text-gray-400 text-sm">SaaS Tools</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row) => (
                  <tr key={row.feature} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3.5 pr-4 text-sm text-gray-700 dark:text-gray-300 font-medium">{row.feature}</td>
                    <td className="py-3.5 px-4 text-center">{row.us ? <CheckCircle size={18} className="text-green-500 mx-auto" /> : <span className="text-gray-300">—</span>}</td>
                    <td className="py-3.5 px-4 text-center">{row.agency ? <CheckCircle size={18} className="text-gray-400 mx-auto" /> : <span className="text-gray-300">—</span>}</td>
                    <td className="py-3.5 px-4 text-center">{row.saas ? <CheckCircle size={18} className="text-gray-400 mx-auto" /> : <span className="text-gray-300">—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex gap-1 justify-center mb-4">
              {[1,2,3,4,5].map(s => <Star key={s} size={20} fill="#FFEB3B" className="text-yellow-400" />)}
            </div>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
              Ready to Build with <span className="gradient-text">All These Features?</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
              Book a free 30-minute consultation and get a custom quote for your project.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/booking">
                <Button className="gradient-bg text-white h-12 px-8 rounded-2xl font-bold shadow-lg shadow-green-500/25">
                  Book Free Consultation <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" className="h-12 px-8 rounded-2xl font-bold">
                  View Pricing
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
