'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CheckCircle, ArrowRight, Phone, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const SERVICES = [
  {
    name: 'Web Development',
    icon: '💻',
    priceINR: '₹75,000',
    priceUSD: '$900',
    timeline: '4-8 weeks',
    description: 'Custom web applications, corporate websites, and SaaS platforms built with modern technology.',
    features: [
      'Next.js / React frontend',
      'Node.js / Django backend',
      'PostgreSQL / MongoDB database',
      'REST API + Websockets',
      'Mobile-responsive design',
      'SEO optimization',
      '3 months post-launch support',
      'SSL + performance setup',
    ],
    color: 'from-blue-500 to-blue-600',
    popular: false,
  },
  {
    name: 'AI / ML Development',
    icon: '🧠',
    priceINR: '₹1,50,000',
    priceUSD: '$1,800',
    timeline: '6-12 weeks',
    description: 'Intelligent AI solutions including chatbots, ML models, computer vision, and automation systems.',
    features: [
      'Custom ML model development',
      'NLP & chatbot integration',
      'Computer vision systems',
      'Data pipeline & ETL',
      'Model training & fine-tuning',
      'API integration (OpenAI, Anthropic)',
      'Real-time inference system',
      '6 months model maintenance',
    ],
    color: 'from-purple-500 to-purple-600',
    popular: true,
  },
  {
    name: 'Mobile App (iOS & Android)',
    icon: '📱',
    priceINR: '₹1,25,000',
    priceUSD: '$1,500',
    timeline: '8-14 weeks',
    description: 'Cross-platform mobile applications with native performance using React Native or Flutter.',
    features: [
      'React Native / Flutter',
      'iOS + Android deployment',
      'Push notifications',
      'Offline mode support',
      'App Store + Play Store submission',
      'Payment gateway integration',
      'Analytics & crash reporting',
      '3 months post-launch support',
    ],
    color: 'from-green-500 to-green-600',
    popular: false,
  },
  {
    name: 'LMS Platform',
    icon: '🎓',
    priceINR: '₹2,00,000',
    priceUSD: '$2,400',
    timeline: '10-16 weeks',
    description: 'White-label Learning Management System with video streaming, assessments, and certification.',
    features: [
      'Course creation & management',
      'Video streaming (CDN)',
      'Interactive assessments',
      'Digital certificate generation',
      'Student progress tracking',
      'Multi-instructor support',
      'Payment & subscriptions',
      'Mobile app included',
    ],
    color: 'from-yellow-500 to-amber-600',
    popular: false,
  },
  {
    name: 'UX/UI Design',
    icon: '🎨',
    priceINR: '₹45,000',
    priceUSD: '$540',
    timeline: '3-5 weeks',
    description: 'Premium UX/UI design with user research, wireframing, prototyping, and design system creation.',
    features: [
      'UX research & user interviews',
      'Information architecture',
      'Wireframes & prototypes',
      'High-fidelity Figma designs',
      'Design system & components',
      'Responsive mobile designs',
      'Handoff-ready specifications',
      'Unlimited revisions',
    ],
    color: 'from-pink-500 to-pink-600',
    popular: false,
  },
  {
    name: 'Enterprise Solution',
    icon: '🏢',
    priceINR: 'Custom',
    priceUSD: 'Custom',
    timeline: 'Custom',
    description: 'Large-scale enterprise platforms with custom workflows, integrations, and dedicated team assignment.',
    features: [
      'Dedicated project team',
      'Custom architecture design',
      'Enterprise security & compliance',
      'Multi-system integrations',
      'SLA-backed delivery',
      'On-site requirement gathering',
      '24/7 technical support',
      'Source code ownership',
    ],
    color: 'from-slate-600 to-slate-800',
    popular: false,
    isEnterprise: true,
  },
];

const PAYMENT_METHODS = [
  { name: 'UPI', desc: '8884162999-4@ybl (Praveenkumar)', icon: '📱', instant: true },
  { name: 'PayPal', desc: 'International payments accepted', icon: '💳', instant: false },
  { name: 'Bank Transfer', desc: 'NEFT / RTGS / IMPS available', icon: '🏦', instant: false },
  { name: 'Razorpay', desc: 'Cards, Netbanking, Wallets', icon: '💰', instant: true },
];

export default function PricingPage() {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />

      {/* Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 gradient-grid-bg-light dark:gradient-grid-bg" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="highlight-badge mb-6 inline-flex">💰 Transparent Pricing</span>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
              Transparent Pricing.
              <span className="block gradient-text">Premium Quality.</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              No hidden costs. No surprises. Pay only for what you need with complete ownership 
              of all deliverables and source code.
            </p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <button
                onClick={() => setCurrency('INR')}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${currency === 'INR' ? 'gradient-bg text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600'}`}
              >
                ₹ INR
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${currency === 'USD' ? 'gradient-bg text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600'}`}
              >
                $ USD
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-3xl border ${service.popular ? 'border-green-500 shadow-2xl shadow-green-500/10 scale-105' : 'border-gray-200 dark:border-gray-800'} bg-white dark:bg-gray-900 p-6`}
              >
                {service.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="gradient-bg text-white text-xs font-black px-4 py-1.5 rounded-full flex items-center gap-1">
                      <Sparkles size={12} /> Most Popular
                    </span>
                  </div>
                )}

                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-2xl mb-4`}>
                  {service.icon}
                </div>

                <h3 className="font-black text-gray-900 dark:text-white text-xl mb-2">{service.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 leading-relaxed">{service.description}</p>

                <div className="mb-4">
                  {service.isEnterprise ? (
                    <div className="text-3xl font-black text-gray-900 dark:text-white">Custom Quote</div>
                  ) : (
                    <>
                      <div className="text-3xl font-black gradient-text">
                        {currency === 'INR' ? service.priceINR : service.priceUSD}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">Starting price • {service.timeline}</div>
                    </>
                  )}
                </div>

                <ul className="space-y-2 mb-6">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {service.isEnterprise ? (
                  <a href="https://wa.me/918884162999" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full h-11 gradient-bg text-white font-bold rounded-xl">
                      <MessageCircle size={16} className="mr-2" /> Get Custom Quote
                    </Button>
                  </a>
                ) : (
                  <Link href="/booking">
                    <Button className={`w-full h-11 font-bold rounded-xl ${service.popular ? 'gradient-bg text-white shadow-lg shadow-green-500/25' : 'border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:border-green-500'}`} variant={service.popular ? 'default' : 'outline'}>
                      Get Started <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
              Flexible <span className="gradient-text">Payment Methods</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Pay your way — UPI, PayPal, bank transfer, or card.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PAYMENT_METHODS.map((pm, i) => (
              <motion.div
                key={pm.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center border border-gray-100 dark:border-gray-700"
              >
                <div className="text-3xl mb-2">{pm.icon}</div>
                <div className="font-bold text-gray-900 dark:text-white text-sm">{pm.name}</div>
                <div className="text-xs text-gray-500 mt-1">{pm.desc}</div>
                {pm.instant && <span className="mt-2 inline-block text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Instant</span>}
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">UPI: <strong>8884162999-4@ybl</strong> (Praveenkumar K.) · 50% advance, 50% on delivery</p>
        </div>
      </section>

      {/* Trust */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: '✅', title: 'Source Code', desc: 'Full ownership on completion' },
              { icon: '🔒', title: 'NDA Available', desc: 'Confidentiality guaranteed' },
              { icon: '🏆', title: '500+ Projects', desc: 'Delivered successfully' },
              { icon: '⭐', title: '98% Satisfaction', desc: 'Client satisfaction rate' },
            ].map((t) => (
              <div key={t.title} className="p-4">
                <div className="text-3xl mb-2">{t.icon}</div>
                <div className="font-bold text-gray-900 dark:text-white text-sm">{t.title}</div>
                <div className="text-xs text-gray-500 mt-1">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 gradient-grid-bg opacity-50" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-4">Ready to <span className="gradient-text">Get Started?</span></h2>
          <p className="text-gray-400 mb-8">Book a free consultation and we will scope your project and provide a detailed quote.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/booking"><Button className="gradient-bg text-white h-12 px-8 rounded-2xl font-bold shadow-lg">Book Free Consultation</Button></Link>
            <a href="tel:+918884162999"><Button variant="outline" className="h-12 px-8 rounded-2xl font-bold border-gray-700 text-white"><Phone size={16} className="mr-2" /> +91 8884162999</Button></a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
