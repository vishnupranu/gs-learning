'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Rahul Sharma',
    role: 'CTO',
    company: 'TechVision India',
    location: 'Bangalore, India',
    rating: 5,
    text: 'GuideSoft IT Solutions transformed our legacy ERP system into a modern cloud-native platform. The team delivered exceptional quality — on time and within budget. Their AI integration reduced our manual workload by 60%. Truly world-class development.',
    service: 'Enterprise Software Development',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    project: 'ERP Modernization',
  },
  {
    id: 2,
    name: 'Sarah Mitchell',
    role: 'Head of Digital',
    company: 'EduGlobal',
    location: 'Singapore',
    rating: 5,
    text: 'The LMS platform built by GuideSoft surpassed every expectation. Within 3 months of launch, we onboarded 10,000+ learners with zero downtime. The video streaming, assessments, and certification system work flawlessly. I recommend them to every EdTech company.',
    service: 'LMS Platform Development',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    project: 'E-Learning Platform',
  },
  {
    id: 3,
    name: 'Ahmed Al-Rashidi',
    role: 'CEO',
    company: 'FinTech Arabia',
    location: 'Dubai, UAE',
    rating: 5,
    text: 'We needed a mobile banking app with rigorous security and a sleek UX. GuideSoft delivered beyond expectations — biometric auth, real-time transactions, and beautiful design. Our user retention went up 40% after launch. Outstanding work.',
    service: 'Mobile App Development',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    project: 'Mobile Banking App',
  },
  {
    id: 4,
    name: 'Priya Nambiar',
    role: 'Product Manager',
    company: 'HealthTech Solutions',
    location: 'Chennai, India',
    rating: 5,
    text: 'GuideSoft built our AI-powered patient management system with ML-based diagnostics support. The accuracy and speed are remarkable. The team was collaborative, transparent, and highly professional throughout the 6-month project.',
    service: 'AI/ML Development',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    project: 'Healthcare AI Platform',
  },
  {
    id: 5,
    name: 'James O\'Brien',
    role: 'Founder',
    company: 'RetailPro UK',
    location: 'London, UK',
    rating: 5,
    text: 'The e-commerce platform GuideSoft developed handles 50,000+ daily transactions without a hiccup. The Cloudflare CDN integration, payment gateway setup, and inventory management are all perfect. Best investment we made in 2025.',
    service: 'Software Development',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150',
    project: 'E-Commerce Platform',
  },
  {
    id: 6,
    name: 'Kavitha Reddy',
    role: 'Design Director',
    company: 'BrandCraft Agency',
    location: 'Hyderabad, India',
    rating: 5,
    text: 'The UX/UI redesign they delivered for our client portal increased user engagement by 85%. Their design thinking approach, user research, and attention to micro-interactions is exceptional. GuideSoft is the best design partner we have worked with.',
    service: 'UX/UI Design',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=150',
    project: 'Client Portal Redesign',
  },
  {
    id: 7,
    name: 'Liu Wei',
    role: 'VP Technology',
    company: 'AsiaCommerce',
    location: 'Shanghai, China',
    rating: 5,
    text: 'We hired GuideSoft for cloud migration and DevOps implementation. They moved our entire infrastructure to AWS with zero data loss and 99.99% uptime since day one. Their CI/CD pipelines cut our deployment time from days to minutes.',
    service: 'Cloud & DevOps',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
    project: 'Cloud Migration',
  },
  {
    id: 8,
    name: 'Fatima Al-Hassan',
    role: 'COO',
    company: 'EduMinistry Qatar',
    location: 'Doha, Qatar',
    rating: 5,
    text: 'GuideSoft built a national-scale examination platform for 200,000 students. The platform handled peak loads flawlessly, with real-time proctoring AI and instant results. A technically brilliant and dedicated team.',
    service: 'Enterprise Platform',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150',
    project: 'National Exam Platform',
  },
  {
    id: 9,
    name: 'Vikram Patel',
    role: 'Director',
    company: 'StartupHub India',
    location: 'Mumbai, India',
    rating: 5,
    text: 'As a startup accelerator, we send all our portfolio companies to GuideSoft for tech development. They understand startup velocity, MVP thinking, and scale-ready architecture. Multiple portfolio companies have raised Series A after their platforms went live.',
    service: 'Startup Technology',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    project: 'Multiple Startups',
  },
];

const STATS = [
  { value: '150+', label: 'Happy Clients' },
  { value: '4.9/5', label: 'Average Rating' },
  { value: '18+', label: 'Countries' },
  { value: '500+', label: 'Projects' },
];

export default function TestimonialsPage() {
  const [filter, setFilter] = useState('All');
  const services = ['All', 'AI/ML Development', 'Software Development', 'LMS Platform Development', 'Mobile App Development', 'UX/UI Design', 'Cloud & DevOps'];

  const filtered = filter === 'All' ? TESTIMONIALS : TESTIMONIALS.filter(t => t.service === filter);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />

      {/* Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 gradient-grid-bg-light dark:gradient-grid-bg" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="highlight-badge mb-6 inline-flex">⭐ Client Success Stories</span>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
              What Our <span className="gradient-text">Clients Say</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
              Don't take our word for it — hear from the 150+ businesses worldwide 
              who transformed their operations with GuideSoft IT Solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
          >
            {STATS.map((s) => (
              <div key={s.label} className="glass-morphism-light dark:glass-morphism rounded-2xl p-4">
                <div className="text-3xl font-black gradient-text">{s.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {services.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  filter === s
                    ? 'gradient-bg text-white shadow-lg shadow-green-500/25'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-morphism-light dark:glass-morphism rounded-3xl p-6 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} size={14} fill="#FFEB3B" className="text-yellow-400" />
                    ))}
                  </div>
                  <Quote size={20} className="text-green-500/40" />
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                  "{t.text}"
                </p>

                <div className="flex items-center gap-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-green-500/20"
                  />
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}, {t.company}</div>
                    <div className="text-xs text-gray-400">{t.location}</div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs border-green-200 text-green-700 dark:border-green-800 dark:text-green-400">
                    {t.service}
                  </Badge>
                  <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-400">
                    {t.project}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
              Ready to Join Our <span className="gradient-text">Success Stories?</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
              Start your project today and experience the GuideSoft difference.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/booking">
                <Button className="gradient-bg text-white h-12 px-8 rounded-2xl font-bold shadow-lg shadow-green-500/25 hover:opacity-90">
                  Start Your Project
                </Button>
              </Link>
              <a href="https://wa.me/918884162999" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="h-12 px-8 rounded-2xl font-bold">
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
