'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const faqCategories = [
  {
    category: 'Pricing & Payments',
    icon: '💳',
    faqs: [
      {
        q: 'Do you offer any free trials or free tier?',
        a: 'No. We offer completely paid, professional services with defined deliverables, timelines, and milestones. All engagements start with a paid strategy call (applied toward your project cost).',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept UPI (8884162999-4@ybl), Razorpay, Stripe, PayPal, Google Pay, and PhonePe. International wire transfers are available for enterprise clients.',
      },
      {
        q: 'What is the payment structure?',
        a: 'We use milestone-based payments: 50% upfront to begin work, 25% at the midpoint review, and 25% on final delivery and code handover.',
      },
      {
        q: 'Do you provide invoices and receipts?',
        a: 'Yes, all transactions come with a formal GST invoice with full project details, timestamps, and payment records.',
      },
      {
        q: 'What is your refund policy?',
        a: 'Refunds are processed for undelivered milestones only. Once a milestone is delivered and approved, that portion is non-refundable. See our Terms & Conditions for full details.',
      },
    ],
  },
  {
    category: 'Project & Delivery',
    icon: '🚀',
    faqs: [
      {
        q: 'How long does a typical project take?',
        a: 'Timelines vary by scope: Basic websites (2-4 weeks), Software development (4-12 weeks), AI/ML solutions (6-16 weeks), Enterprise platforms (8-24 weeks). We provide exact timelines in our project proposal.',
      },
      {
        q: 'Do I receive the source code?',
        a: 'Yes. For Professional and Enterprise plans, full source code ownership is transferred on final payment. You get a private Git repository with complete documentation.',
      },
      {
        q: 'What tech stack do you use?',
        a: 'We primarily use Next.js, TypeScript, Tailwind CSS, Prisma, PostgreSQL, and various AI SDKs (Cloudflare AI, OpenAI). We adapt to your requirements and existing infrastructure.',
      },
      {
        q: 'Can you work with our existing codebase?',
        a: 'Absolutely. We perform a thorough code audit before starting and provide a detailed integration plan. We have experience with React, Vue, Angular, Node.js, Laravel, Django, and more.',
      },
    ],
  },
  {
    category: 'Support & Maintenance',
    icon: '🛠️',
    faqs: [
      {
        q: 'What support do you provide after launch?',
        a: 'All plans include post-launch support: 1 month (Starter), 3 months (Professional), 12 months with priority SLA (Enterprise). After that, we offer monthly retainer maintenance packages.',
      },
      {
        q: 'How do I report bugs or request changes?',
        a: 'Via our support ticket system, WhatsApp (+91 88841 62999), or email. Priority response times: 2h (Enterprise), 4h (Professional), 24h (Starter).',
      },
      {
        q: 'Do you offer ongoing maintenance?',
        a: 'Yes. Monthly maintenance retainers are available starting from ₹15,000/month, covering security updates, performance monitoring, content updates, and 10 hours of development time.',
      },
    ],
  },
  {
    category: 'Integrations & AI',
    icon: '🤖',
    faqs: [
      {
        q: 'Can you integrate WhatsApp Business API?',
        a: 'Yes. We implement the official WhatsApp Business Cloud API for booking confirmations, order updates, AI chatbot replies, and admin alerts to your number (+91 88841 62999).',
      },
      {
        q: 'What AI features can you implement?',
        a: 'We integrate Cloudflare Workers AI, OpenAI GPT-4, Anthropic Claude, and Google Gemini. Features include AI chatbots, content generation, search, recommendations, and automated support.',
      },
      {
        q: 'Do you set up Google Analytics and Tag Manager?',
        a: 'Yes, all projects include GA4, Google Tag Manager, Google Search Console setup, and a custom analytics dashboard inside your admin panel.',
      },
    ],
  },
];

function FAQItem({ faq }: { faq: { q: string; a: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-5 text-left gap-4"
      >
        <span className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">{faq.q}</span>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 text-green-500 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(faqCategories[0].category);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <div className="pt-20">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-green-600 to-green-700 relative overflow-hidden grid-bg">
          <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <HelpCircle size={48} className="text-green-200 mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-green-100 text-lg">
                Everything you need to know about working with Guide Soft IT Solutions.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 max-w-5xl mx-auto px-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {faqCategories.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all ${
                  activeCategory === cat.category
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {cat.icon} {cat.category}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          {faqCategories.map((cat) => (
            cat.category === activeCategory && (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <span>{cat.icon}</span> {cat.category}
                </h2>
                {cat.faqs.map((faq) => (
                  <FAQItem key={faq.q} faq={faq} />
                ))}
              </motion.div>
            )
          ))}

          {/* Still have questions? */}
          <div className="mt-16 text-center bg-gradient-to-r from-green-50 to-yellow-50 dark:from-green-900/20 dark:to-yellow-900/20 rounded-2xl p-10 border border-green-100 dark:border-green-900">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Still have questions?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Our team is ready to answer any specific questions about your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="gradient-bg text-white px-8">Contact Our Team</Button>
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
