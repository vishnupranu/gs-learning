'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, DollarSign, Users, Target } from 'lucide-react';
import Link from 'next/link';

export default function AffiliatePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-green-600 via-green-700 to-emerald-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <Badge className="bg-white/10 text-white border-white/20 mb-6">Partner Program</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Partner with Guide Soft & <span className="text-yellow-400">Earn 15%</span>
          </h1>
          <p className="text-xl text-green-50 mb-10 max-w-2xl mx-auto">
            Refer clients who need enterprise software development, AI solutions, or custom UI/UX design, and earn a generous 15% recurring commission on all closed deals.
          </p>
          <Link href="/auth/register">
            <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 font-bold px-8 py-6 text-lg">
              Become a Partner Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Partner With Us?</h2>
            <p className="text-gray-600 dark:text-gray-400">High ticket sizes mean massive payouts for our partners.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: DollarSign,
                title: 'High Commissions',
                desc: 'Earn 15% on every deal closed. With average project sizes of $10,000+, that is $1,500+ per referral.'
              },
              {
                icon: Users,
                title: 'Dedicated Support',
                desc: 'Get access to marketing materials, a dedicated partner manager, and real-time lead tracking dashboard.'
              },
              {
                icon: Target,
                title: 'High Conversion',
                desc: 'Our enterprise-grade portfolio and expert sales team ensures your leads convert at an industry-leading rate.'
              }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="premium-card p-8 text-center"
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <benefit.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-16">How It Works</h2>
          <div className="space-y-8">
            {[
              'Sign up for the partner program and get your unique referral link.',
              'Share the link with your network or introduce leads directly via email.',
              'Our team handles the sales, technical scoping, and closing.',
              'You get paid 15% of the total project value within 30 days of the client paying.'
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-6 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50"
              >
                <div className="w-12 h-12 flex-shrink-0 gradient-bg text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                  {i + 1}
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
