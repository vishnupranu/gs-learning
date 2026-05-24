'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Code, Brain, Palette, TestTube, Smartphone, GraduationCap,
  Shield, Zap, Globe, BarChart3, Lock, Cloud, Bot, Headphones,
  CheckCircle, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const featureCategories = [
  {
    icon: Code,
    color: 'from-blue-500 to-blue-600',
    title: 'Software Development',
    description: 'Custom web applications, enterprise software, and scalable solutions built with modern tech stacks.',
    features: [
      'Next.js & React applications',
      'REST & GraphQL APIs',
      'Microservices architecture',
      'Database design & optimization',
      'Cloud-native deployment',
      'CI/CD pipeline setup',
    ],
  },
  {
    icon: Brain,
    color: 'from-purple-500 to-purple-600',
    title: 'AI / ML Development',
    description: 'Transform your business with intelligent solutions powered by the latest AI frameworks.',
    features: [
      'Custom ML model training',
      'OpenAI & Anthropic integration',
      'Cloudflare AI & Workers AI',
      'Natural language processing',
      'Computer vision systems',
      'AI-powered automation',
    ],
  },
  {
    icon: Palette,
    color: 'from-pink-500 to-pink-600',
    title: 'UX/UI Design',
    description: 'ThemeForest-quality designs that convert visitors into customers.',
    features: [
      'Figma & Adobe XD design',
      'Design system creation',
      'User research & testing',
      'Glassmorphism & animations',
      'Mobile-first responsive',
      'Dark/light theme support',
    ],
  },
  {
    icon: Shield,
    color: 'from-green-500 to-green-600',
    title: 'Security & Compliance',
    description: 'Enterprise-grade security built into every layer of your application.',
    features: [
      'JWT + OAuth authentication',
      'Role-based access control',
      'Rate limiting & DDoS protection',
      'CSRF & XSS prevention',
      'Encrypted data storage',
      'GDPR-compliant architecture',
    ],
  },
  {
    icon: Smartphone,
    color: 'from-orange-500 to-orange-600',
    title: 'Mobile Applications',
    description: 'Cross-platform mobile apps for iOS and Android with native performance.',
    features: [
      'React Native development',
      'Flutter cross-platform',
      'App Store & Play Store publishing',
      'Push notifications',
      'Offline functionality',
      'Biometric authentication',
    ],
  },
  {
    icon: GraduationCap,
    color: 'from-indigo-500 to-indigo-600',
    title: 'LMS Platform',
    description: 'Complete learning management systems for education and corporate training.',
    features: [
      'Course creation tools',
      'Live streaming integration',
      'Progress & analytics tracking',
      'Certificate generation',
      'Payment & enrollment',
      'Student dashboard',
    ],
  },
  {
    icon: Bot,
    color: 'from-cyan-500 to-cyan-600',
    title: 'Automation & Integrations',
    description: 'Connect all your tools and automate repetitive workflows.',
    features: [
      'WhatsApp Business API',
      'Telegram bot integration',
      'Google Workspace sync',
      'Stripe & Razorpay payments',
      'Zapier & webhook support',
      'Email marketing automation',
    ],
  },
  {
    icon: Cloud,
    color: 'from-sky-500 to-sky-600',
    title: 'Cloud & DevOps',
    description: 'Scalable cloud infrastructure with Cloudflare, Vercel, and enterprise hosting.',
    features: [
      'Vercel & AWS deployment',
      'Cloudflare CDN & R2 storage',
      'Docker containerization',
      'Auto-scaling infrastructure',
      'Real-time monitoring',
      'Disaster recovery setup',
    ],
  },
];

const techStack = [
  { name: 'Next.js', category: 'Frontend' },
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Framer Motion', category: 'Animation' },
  { name: 'Prisma', category: 'ORM' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Supabase', category: 'BaaS' },
  { name: 'Stripe', category: 'Payments' },
  { name: 'Razorpay', category: 'Payments' },
  { name: 'Cloudflare AI', category: 'AI' },
  { name: 'OpenAI', category: 'AI' },
  { name: 'LangChain', category: 'AI' },
  { name: 'React Native', category: 'Mobile' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Vercel', category: 'Deploy' },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />

      <div className="pt-20">
        {/* Hero */}
        <section className="relative py-24 bg-gradient-to-br from-gray-900 to-gray-800 grid-bg overflow-hidden">
          <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-4 bg-green-500/20 text-green-400 border-green-500/30">
                🚀 Enterprise-Grade Features
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Everything You Need to{' '}
                <span className="gradient-text">Scale</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                From AI-powered chatbots to payment gateways — we build complete digital ecosystems, not just websites.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/pricing">
                  <Button size="lg" className="gradient-bg text-white px-8">View Pricing</Button>
                </Link>
                <Link href="/booking">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                    Book Consultation
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-24 max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Full-Stack Capabilities
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Every service we offer is production-ready, scalable, and built with enterprise security in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featureCategories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="premium-card p-6"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${cat.color} mb-4`}>
                  <cat.icon className="text-white" size={22} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{cat.title}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{cat.description}</p>
                <ul className="space-y-2">
                  {cat.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <CheckCircle size={12} className="text-green-500 mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Built With Modern Technology
              </h2>
              <p className="text-gray-600 dark:text-gray-400">The best tools for building the best products</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.map((tech) => (
                <motion.div
                  key={tech.name}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2"
                >
                  <span className="font-semibold text-gray-900 dark:text-white text-sm">{tech.name}</span>
                  <Badge variant="secondary" className="text-xs px-2 py-0">{tech.category}</Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 gradient-bg">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Start Your Project Today</h2>
            <p className="text-green-100 mb-8">No free trials. No demos. Just real results, real code, and real business value.</p>
            <Link href="/booking">
              <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 px-8 font-bold">
                Book a Paid Consultation <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
