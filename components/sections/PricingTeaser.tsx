'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Zap, Shield, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const PLANS = [
  {
    name: 'Starter',
    price: '₹25,000',
    period: 'project',
    icon: Zap,
    color: 'from-blue-500 to-blue-600',
    description: 'Perfect for startups and small businesses',
    features: ['Custom Website', 'Mobile Responsive', 'SEO Setup', '3 Months Support', 'Source Code'],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Professional',
    price: '₹75,000',
    period: 'project',
    icon: Shield,
    color: 'from-green-500 to-green-600',
    description: 'For growing businesses needing robust solutions',
    features: ['Full-Stack Web App', 'API Integration', 'Database Design', 'Payment Gateway', 'Admin Dashboard', '6 Months Support', 'CI/CD Pipeline'],
    cta: 'Most Popular',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'quote',
    icon: Crown,
    color: 'from-purple-500 to-purple-600',
    description: 'For large-scale enterprise needs',
    features: ['AI/ML Integration', 'Microservices Arch', 'Multi-tenant SaaS', 'Dedicated Team', 'SLA Guarantee', '24/7 Priority Support', 'White-label Options'],
    cta: 'Contact Us',
    popular: false,
  },
];

export default function PricingTeaser() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg grid-bg-white opacity-5 dark:opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            💰 Transparent Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Investment Plans That
            <span className="gradient-text block">Drive Real ROI</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            No hidden fees. No surprises. Just clear, outcome-driven pricing for every stage of your business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-3xl p-8 border transition-all duration-300 hover:-translate-y-2 ${
                plan.popular
                  ? 'bg-gradient-to-b from-green-50/50 to-white dark:from-green-950/20 dark:to-gray-900/60 border-green-500/50 shadow-2xl shadow-green-500/10 dark:shadow-green-500/20'
                  : 'bg-white/80 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 hover:border-green-500/30'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="gradient-bg text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg">
                    ⭐ MOST POPULAR
                  </span>
                </div>
              )}

              <div className={`w-12 h-12 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                <plan.icon size={22} className="text-white" />
              </div>

              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1">{plan.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-black text-gray-900 dark:text-white">{plan.price}</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">/ {plan.period}</span>
              </div>

              <div className="space-y-2.5 mb-8">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Check size={14} className="text-green-500 dark:text-green-400 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>

              <Link href={plan.name === 'Enterprise' ? '/contact' : '/booking'}>
                <Button
                  className={`w-full rounded-xl font-bold ${
                    plan.popular
                      ? 'gradient-bg text-white shadow-lg shadow-green-500/30 hover:opacity-90'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight size={14} className="ml-2" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            All plans include: Free consultation · NDA protection · Source code handover · Post-launch support
          </p>
          <Link href="/pricing">
            <Button variant="outline" className="border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900 rounded-xl">
              View Full Pricing & Compare Plans →
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
