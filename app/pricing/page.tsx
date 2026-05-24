'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, Zap, Shield, Star, ArrowRight, Building, Users, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const plans = [
  {
    name: 'Starter',
    price: { monthly: 499, annual: 399 },
    description: 'Perfect for startups and small businesses launching their digital presence.',
    color: 'from-slate-500 to-slate-600',
    features: [
      'Up to 5 pages website',
      'Basic UI/UX design',
      'Mobile responsive',
      'Contact form integration',
      '1 month support',
      'SSL certificate',
      'Basic SEO setup',
      '3 revision rounds',
    ],
    notIncluded: ['Custom backend', 'AI features', 'Payment gateway', 'Admin panel'],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Professional',
    price: { monthly: 1499, annual: 1199 },
    description: 'Full-stack solution for growing businesses with advanced features.',
    color: 'from-green-500 to-green-600',
    features: [
      'Up to 20 pages',
      'Premium UI/UX design',
      'Custom backend API',
      'Database integration',
      'Payment gateway (Stripe/Razorpay)',
      'User authentication',
      'Admin dashboard',
      '3 months support',
      'Advanced SEO',
      'Performance optimization',
      'WhatsApp integration',
      '10 revision rounds',
    ],
    notIncluded: ['AI/ML features', 'Mobile app'],
    cta: 'Start Building',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: { monthly: 3999, annual: 3199 },
    description: 'Complete digital ecosystem with AI, mobile app, and enterprise infrastructure.',
    color: 'from-purple-500 to-purple-600',
    features: [
      'Unlimited pages',
      'Enterprise UI/UX design',
      'Full-stack development',
      'AI/ML integration',
      'Mobile app (iOS + Android)',
      'LMS platform',
      'Multi-role admin panel',
      'CRM integration',
      'Payment gateway + subscriptions',
      'WhatsApp + Telegram automation',
      'Google Analytics + Tag Manager',
      '12 months priority support',
      'Dedicated project manager',
      'Unlimited revisions',
      'Cloudflare CDN + DDoS protection',
    ],
    notIncluded: [],
    cta: 'Contact Sales',
    popular: false,
  },
];

const addons = [
  { name: 'AI Chatbot Integration', price: 299, icon: '🤖' },
  { name: 'WhatsApp Business API', price: 199, icon: '💬' },
  { name: 'Telegram Bot Setup', price: 149, icon: '✈️' },
  { name: 'Google Workspace Setup', price: 99, icon: '📧' },
  { name: 'Razorpay / UPI Integration', price: 249, icon: '💳' },
  { name: 'Custom Domain + SSL', price: 79, icon: '🔒' },
  { name: 'SEO Audit + Optimization', price: 349, icon: '📈' },
  { name: 'Mobile App (React Native)', price: 1999, icon: '📱' },
];

const faqs = [
  {
    q: 'Do you offer any free trials?',
    a: 'No. We offer completely paid services with clearly defined deliverables. All plans include a detailed proposal, timeline, and milestone-based delivery.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept UPI (8884162999-4@ybl), Razorpay, Stripe, PayPal, Google Pay, and PhonePe. Payments are milestone-based — 50% upfront, 50% on delivery.',
  },
  {
    q: 'Can I upgrade my plan later?',
    a: 'Absolutely! You can upgrade at any time. The difference in cost will be calculated pro-rata and billed accordingly.',
  },
  {
    q: 'Do you provide source code?',
    a: 'Yes, for all Professional and Enterprise plans, full source code ownership is transferred to you upon final payment.',
  },
  {
    q: 'What is your refund policy?',
    a: 'We offer refunds on milestone payments if we fail to deliver as per agreed specifications. Please see our Terms & Conditions for details.',
  },
];

export default function PricingPage() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <div className="pt-20">
        {/* Hero */}
        <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 grid-bg overflow-hidden">
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-4 bg-green-500/20 text-green-400 border-green-500/30 px-4 py-1">
                💎 Transparent Pricing — No Hidden Fees
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Invest in Your{' '}
                <span className="gradient-text">Digital Future</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Enterprise-grade solutions at competitive prices. Every plan is fully paid and includes real deliverables, real code, and real results.
              </p>

              {/* Billing Toggle */}
              <div className="inline-flex items-center gap-3 bg-gray-800 rounded-full p-1">
                <button
                  onClick={() => setBilling('monthly')}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                    billing === 'monthly' ? 'bg-green-500 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBilling('annual')}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                    billing === 'annual' ? 'bg-green-500 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Annual <span className="ml-1 text-xs bg-yellow-400 text-black px-1.5 py-0.5 rounded-full">-20%</span>
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Plans */}
        <section className="py-20 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`pricing-card bg-white dark:bg-gray-900 ${plan.popular ? 'popular' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-green-500 text-white px-4 py-1 text-sm font-bold shadow-lg">
                      ⭐ Most Popular
                    </Badge>
                  </div>
                )}

                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${plan.color} mb-4`}>
                  <Zap className="text-white" size={20} />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-gray-500 text-sm mb-6">{plan.description}</p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      ${plan.price[billing].toLocaleString()}
                    </span>
                    <span className="text-gray-500">/project</span>
                  </div>
                  {billing === 'annual' && (
                    <p className="text-green-600 text-sm mt-1">
                      Save ${((plan.price.monthly - plan.price.annual)).toLocaleString()} vs monthly
                    </p>
                  )}
                </div>

                <Link href={plan.name === 'Enterprise' ? '/contact' : '/booking'}>
                  <Button
                    className={`w-full mb-6 ${plan.popular ? 'gradient-bg text-white hover:opacity-90' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    size="lg"
                  >
                    {plan.cta}
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>

                <div className="space-y-3">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <Check size={15} className="text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{f}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((f) => (
                    <div key={f} className="flex items-center gap-2 opacity-40">
                      <div className="w-4 h-4 flex-shrink-0">✗</div>
                      <span className="text-sm text-gray-500 line-through">{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* UPI Payment */}
        <section className="py-16 bg-gradient-to-r from-green-500 to-green-600">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Pay via UPI Instantly</h2>
            <p className="text-green-100 mb-8">Fast, secure Indian payment accepted</p>
            <div className="inline-flex items-center gap-4 bg-white rounded-2xl px-8 py-6 shadow-2xl">
              <div className="text-4xl">💳</div>
              <div className="text-left">
                <div className="text-sm text-gray-500 font-medium">UPI ID</div>
                <div className="text-2xl font-bold text-gray-900">8884162999-4@ybl</div>
                <div className="text-sm text-green-600 font-semibold">Account: Praveenkumar</div>
              </div>
            </div>
            <p className="text-green-100 text-sm mt-4">Also accepted: Razorpay · Stripe · PayPal · Google Pay · PhonePe</p>
          </div>
        </section>

        {/* Add-ons */}
        <section className="py-20 max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Power-Up with <span className="gradient-text">Add-Ons</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">Enhance any plan with specialized integrations and features.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {addons.map((addon) => (
              <motion.div
                key={addon.name}
                whileHover={{ scale: 1.03 }}
                className="premium-card p-5 text-center cursor-pointer"
              >
                <div className="text-3xl mb-3">{addon.icon}</div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{addon.name}</div>
                <div className="text-green-600 font-bold">+${addon.price}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-gray-100 dark:bg-gray-900">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="premium-card p-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{faq.q}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-gray-600 mb-8 text-lg">Book a free 30-minute strategy call and let&apos;s discuss your project.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button size="lg" className="gradient-bg text-white px-8">
                  Book Free Strategy Call
                </Button>
              </Link>
              <a href="https://wa.me/918884162999" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-green-500 text-green-600 px-8">
                  💬 WhatsApp Us
                </Button>
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
