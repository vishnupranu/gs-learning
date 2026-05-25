'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const PROJECTS = [
  {
    id: 1, title: 'NexaBank', client: 'FinTech Arabia', category: 'Mobile App',
    desc: 'AI-powered digital banking app with biometric auth, real-time transactions, and fraud detection serving 500K+ users.',
    tech: ['React Native', 'Node.js', 'TensorFlow', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800',
    color: 'from-blue-500 to-blue-700',
  },
  {
    id: 2, title: 'EduLearn Pro', client: 'EduGlobal Singapore', category: 'LMS Platform',
    desc: 'White-label LMS platform with video streaming, AI personalized learning paths, and blockchain certifications for 10K+ monthly learners.',
    tech: ['Next.js', 'PostgreSQL', 'Cloudflare Stream', 'Blockchain'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    color: 'from-purple-500 to-purple-700',
  },
  {
    id: 3, title: 'AgriConnect', client: 'AgriConnect India', category: 'Enterprise',
    desc: 'Supply chain management platform connecting 500+ farmers with real-time tracking, AI demand forecasting, and UPI payments.',
    tech: ['Next.js', 'Python ML', 'UPI API', 'WhatsApp API'],
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
    color: 'from-green-500 to-green-700',
  },
  {
    id: 4, title: 'MedTrack AI', client: 'HealthTech Solutions', category: 'AI/ML',
    desc: 'HIPAA-compliant healthcare platform with AI diagnostic assistance achieving 94.7% accuracy across 150+ hospitals.',
    tech: ['Python', 'TensorFlow', 'React', 'FastAPI'],
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800',
    color: 'from-red-500 to-red-700',
  },
  {
    id: 5, title: 'ShopNow', client: 'RetailPro UK', category: 'Web App',
    desc: 'High-performance e-commerce platform handling 50K daily transactions with AI product recommendations and 0.8s page load.',
    tech: ['Next.js 14', 'Stripe', 'Cloudflare', 'OpenAI'],
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800',
    color: 'from-orange-500 to-orange-700',
  },
  {
    id: 6, title: 'ExamPro National', client: 'Ministry of Education, Qatar', category: 'Enterprise',
    desc: 'National examination platform for 200,000 concurrent students with real-time AI proctoring and instant results.',
    tech: ['Next.js', 'AWS ECS', 'Cloudflare AI', 'Redis'],
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b6af3?auto=format&fit=crop&q=80&w=800',
    color: 'from-teal-500 to-teal-700',
  },
  {
    id: 7, title: 'CRMFlow Pro', client: 'SalesForce India', category: 'Web App',
    desc: 'AI-enhanced CRM with lead scoring, automated follow-ups, and real-time analytics dashboards for 200+ sales teams.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'OpenAI'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    color: 'from-indigo-500 to-indigo-700',
  },
  {
    id: 8, title: 'LearnAI Tutor', client: 'EduMinistry Qatar', category: 'AI/ML',
    desc: 'Personalized AI tutoring platform with GPT-powered explanations, adaptive assessments, and progress tracking.',
    tech: ['Next.js', 'OpenAI GPT-4', 'PostgreSQL', 'Vercel AI SDK'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    color: 'from-yellow-500 to-amber-700',
  },
  {
    id: 9, title: 'TravelBook', client: 'TravelEase UAE', category: 'Mobile App',
    desc: 'Full-stack travel booking app with real-time availability, hotel & flight search, and payment processing.',
    tech: ['React Native', 'Node.js', 'Stripe', 'Google Maps'],
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800',
    color: 'from-cyan-500 to-cyan-700',
  },
  {
    id: 10, title: 'InventoryPro', client: 'LogiTech Manufacturing', category: 'Enterprise',
    desc: 'Smart warehouse management system with barcode scanning, real-time inventory tracking, and automated reorder alerts.',
    tech: ['React', 'Python', 'PostgreSQL', 'Raspberry Pi'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    color: 'from-slate-500 to-slate-700',
  },
  {
    id: 11, title: 'HRMatrix', client: 'TalentFirst India', category: 'Web App',
    desc: 'Comprehensive HRMS with attendance tracking, payroll automation, performance reviews, and leave management.',
    tech: ['Next.js', 'PostgreSQL', 'AWS Lambda', 'Calendar API'],
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800',
    color: 'from-pink-500 to-pink-700',
  },
  {
    id: 12, title: 'CloudDash Monitor', client: 'DevOps Solutions UK', category: 'Web App',
    desc: 'Infrastructure monitoring dashboard with real-time metrics, alerting, and multi-cloud support for 50+ enterprise clients.',
    tech: ['React', 'AWS SDK', 'Grafana', 'Prometheus'],
    image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=800',
    color: 'from-emerald-500 to-emerald-700',
  },
];

const CATEGORIES = ['All', 'Web App', 'Mobile App', 'AI/ML', 'LMS Platform', 'Enterprise'];

export default function PortfolioPage() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === active);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />

      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 gradient-grid-bg-light dark:gradient-grid-bg" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="highlight-badge mb-6 inline-flex">🖥️ Our Work</span>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
              Our <span className="gradient-text">Portfolio</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              500+ projects delivered across 18 countries. Real solutions. Real impact.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-6 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                active === cat
                  ? 'gradient-bg text-white shadow-lg shadow-green-500/25'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group overflow-hidden rounded-3xl border border-gray-100 dark:border-gray-800 hover:border-green-300 dark:hover:border-green-800 transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-900"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-30 group-hover:opacity-40 transition-opacity`} />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/90 text-gray-900 text-xs border-0 backdrop-blur-sm">{p.category}</Badge>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow">
                      <ExternalLink size={14} className="text-gray-700" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs font-semibold text-green-600 dark:text-green-400 mb-1">{p.client}</div>
                  <h3 className="font-black text-gray-900 dark:text-white text-lg mb-2">{p.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md font-medium">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
            Have a Project in <span className="gradient-text">Mind?</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
            Let's build something extraordinary together. Book a free consultation today.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/booking">
              <Button className="gradient-bg text-white h-12 px-8 rounded-2xl font-bold shadow-lg shadow-green-500/25">
                Start Your Project <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="h-12 px-8 rounded-2xl font-bold">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
