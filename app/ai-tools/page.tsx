'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Zap, Brain, Sparkles, MessageCircle, Image, Code2, FileText, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const tools = [
  {
    icon: MessageCircle,
    name: 'AI Chat Assistant',
    description: 'Intelligent chatbot powered by GPT-4o for customer support, lead qualification, and instant answers.',
    features: ['Multi-language support', 'Context-aware responses', 'CRM integration', 'Analytics'],
    color: 'from-blue-500 to-blue-600',
    badge: 'Live',
    href: '/#chat',
  },
  {
    icon: FileText,
    name: 'Content Generator',
    description: 'Generate SEO-optimized blog posts, social media content, and marketing copy instantly.',
    features: ['Blog writing', 'Social captions', 'Email drafts', 'SEO meta tags'],
    color: 'from-green-500 to-green-600',
    badge: 'Popular',
    href: '/admin/cms',
  },
  {
    icon: Code2,
    name: 'Code Assistant',
    description: 'AI-powered code review, generation, and debugging for your development team.',
    features: ['Code review', 'Bug detection', 'Refactoring', 'Documentation'],
    color: 'from-purple-500 to-purple-600',
    badge: 'New',
    href: '/contact',
  },
  {
    icon: Brain,
    name: 'AI Analytics',
    description: 'Predictive analytics and business intelligence powered by machine learning models.',
    features: ['Sales forecasting', 'Churn prediction', 'Trend analysis', 'Custom reports'],
    color: 'from-orange-500 to-orange-600',
    badge: 'Enterprise',
    href: '/contact',
  },
  {
    icon: Image,
    name: 'Image Generation',
    description: 'Generate product images, social media graphics, and marketing visuals using diffusion AI.',
    features: ['Product photography', 'Brand assets', 'Social graphics', 'Batch processing'],
    color: 'from-pink-500 to-pink-600',
    badge: 'Beta',
    href: '/contact',
  },
  {
    icon: Zap,
    name: 'Workflow Automation',
    description: 'Automate repetitive tasks with AI-triggered workflows across your business tools.',
    features: ['Email automation', 'CRM updates', 'Slack alerts', 'Custom triggers'],
    color: 'from-yellow-500 to-orange-500',
    badge: 'Popular',
    href: '/contact',
  },
];

const useCases = [
  { industry: 'E-commerce', use: 'AI product descriptions, personalized recommendations, inventory prediction' },
  { industry: 'Healthcare', use: 'Appointment scheduling AI, patient FAQ bot, diagnostic assistant' },
  { industry: 'Education', use: 'Personalized learning paths, automated grading, content generation' },
  { industry: 'Finance', use: 'Fraud detection, risk scoring, financial report generation' },
  { industry: 'Real Estate', use: 'Property recommendations, market analysis, lead qualification' },
  { industry: 'Retail', use: 'Demand forecasting, chatbot support, pricing optimization' },
];

const badgeColors: Record<string, string> = {
  Live: 'bg-green-500/10 text-green-400 border-green-500/20',
  Popular: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  New: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Enterprise: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  Beta: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
};

export default function AIToolsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Header />

      {/* Hero */}
      <section className="relative py-24 bg-gray-950 overflow-hidden">
        <div className="absolute inset-0 grid-bg grid-bg-white opacity-10" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-green-500/15 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
              <Bot size={14} />
              AI-Powered Tools
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
              Supercharge Your Business
              <span className="block gradient-text">with AI Tools</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
              Enterprise-grade AI tools that automate workflows, generate content, analyze data, 
              and engage customers — all built and integrated by Guide Soft.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button size="lg" className="gradient-bg text-white font-bold px-8 h-14 rounded-2xl shadow-2xl shadow-green-500/30 hover:opacity-90">
                  Get a Free AI Consultation
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-gray-700 text-white hover:bg-gray-800 font-bold px-8 h-14 rounded-2xl">
                  See Live Demo
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto"
          >
            {[
              { n: '10x', l: 'Faster workflows' },
              { n: '80%', l: 'Cost reduction' },
              { n: '24/7', l: 'AI availability' },
              { n: '99.9%', l: 'Uptime SLA' },
            ].map(s => (
              <div key={s.l} className="bg-gray-900/60 border border-gray-800 rounded-2xl p-4">
                <div className="text-2xl font-black gradient-text">{s.n}</div>
                <div className="text-gray-400 text-sm">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
              Our <span className="gradient-text">AI Tool Suite</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Each tool is fully customizable, integrates with your existing stack, and comes with full support from our team.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-7 hover:shadow-xl hover:shadow-green-500/10 hover:border-green-200 dark:hover:border-green-800 group transition-all"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-14 h-14 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <tool.icon size={24} className="text-white" />
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${badgeColors[tool.badge] || ''}`}>
                    {tool.badge}
                  </span>
                </div>

                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2">{tool.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{tool.description}</p>

                <div className="space-y-1.5 mb-6">
                  {tool.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <CheckCircle size={12} className="text-green-500 flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>

                <Link href={tool.href}>
                  <Button size="sm" variant="outline" className="w-full rounded-xl text-sm border-gray-200 dark:border-gray-700 hover:border-green-400 hover:text-green-600 dark:hover:border-green-600 dark:hover:text-green-400 transition-all">
                    Learn More <ArrowRight size={13} className="ml-1" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
              AI for <span className="gradient-text">Every Industry</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              We build custom AI solutions tailored to your specific industry and use case.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCases.map((uc, i) => (
              <motion.div
                key={uc.industry}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 hover:border-green-200 dark:hover:border-green-800 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={14} className="text-green-500" />
                  <span className="font-black text-gray-900 dark:text-white text-sm">{uc.industry}</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{uc.use}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Bot size={48} className="text-green-400 mx-auto mb-4" />
            <h2 className="text-4xl font-black text-white mb-4">
              Ready to Build Your AI Solution?
            </h2>
            <p className="text-gray-400 mb-8">
              Our AI engineers will design, build, and deploy a custom solution tailored to your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button size="lg" className="gradient-bg text-white font-bold px-10 h-14 rounded-2xl shadow-2xl shadow-green-500/30 hover:opacity-90">
                  Book Free AI Consultation
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              <a href="https://wa.me/918884162999" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-gray-700 text-white hover:bg-gray-800 font-bold px-10 h-14 rounded-2xl">
                  💬 Chat on WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
