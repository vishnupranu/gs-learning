'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ArrowRight, Calendar, User, Clock, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const POSTS = [
  {
    id: 1, title: 'Building Production-Ready AI Chatbots with Next.js and OpenAI GPT-4',
    excerpt: 'A deep dive into architecting scalable AI chatbot systems using Next.js App Router, OpenAI streaming APIs, and real-time WebSocket connections for enterprise applications.',
    category: 'AI/ML', author: 'Praveenkumar K.', date: 'Jan 15, 2026', readTime: '12 min',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    featured: true,
  },
  {
    id: 2, title: 'Why Indian Startups Are Choosing Custom LMS Over Moodle in 2026',
    excerpt: 'An analysis of why 70% of EdTech startups are moving away from open-source LMS to custom platforms, and how GuideSoft helped EduGlobal onboard 10,000 learners/month.',
    category: 'EdTech', author: 'GuideSoft Team', date: 'Jan 10, 2026', readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    featured: false,
  },
  {
    id: 3, title: 'Next.js 15 vs Remix: The Enterprise Developer\'s Guide for 2026',
    excerpt: 'An in-depth technical comparison of Next.js 15 and Remix for building enterprise-scale applications, covering SSR, RSC, edge functions, and deployment strategies.',
    category: 'Engineering', author: 'Praveenkumar K.', date: 'Dec 28, 2025', readTime: '15 min',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
    featured: false,
  },
  {
    id: 4, title: 'Implementing Real-Time AI Proctoring at Scale: Lessons from 200,000 Concurrent Users',
    excerpt: 'Technical retrospective on how we built and deployed an AI-based exam proctoring system for Qatar\'s Ministry of Education handling 200,000 simultaneous students.',
    category: 'AI/ML', author: 'GuideSoft Team', date: 'Dec 20, 2025', readTime: '18 min',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b6af3?auto=format&fit=crop&q=80&w=800',
    featured: false,
  },
  {
    id: 5, title: 'React Native vs Flutter in 2026: Which Should You Choose?',
    excerpt: 'A practical comparison based on 50+ mobile app projects across healthcare, fintech, and e-commerce. Performance benchmarks, developer experience, and cost analysis.',
    category: 'Mobile Dev', author: 'Praveenkumar K.', date: 'Dec 10, 2025', readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
    featured: false,
  },
  {
    id: 6, title: 'Cloud-Native PostgreSQL: Advanced Partitioning, Indexing & Performance Tuning',
    excerpt: 'Production-tested techniques for scaling PostgreSQL databases handling 50,000+ daily transactions, including table partitioning, composite indexes, and connection pooling.',
    category: 'Engineering', author: 'GuideSoft Team', date: 'Nov 30, 2025', readTime: '14 min',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
    featured: false,
  },
  {
    id: 7, title: 'UPI Payment Integration in Next.js: Complete Developer Guide',
    excerpt: 'Step-by-step guide to integrating Razorpay UPI, PhonePe, and Google Pay in Next.js applications with server-side verification, webhook handling, and refund flows.',
    category: 'FinTech', author: 'Praveenkumar K.', date: 'Nov 20, 2025', readTime: '11 min',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800',
    featured: false,
  },
  {
    id: 8, title: 'Building an AI-Powered Supply Chain with ML Demand Forecasting',
    excerpt: 'How we reduced agricultural supply wastage by 42% for AgriConnect India using Python ML models, real-time IoT data, and automated WhatsApp notifications for 500+ vendors.',
    category: 'AI/ML', author: 'GuideSoft Team', date: 'Nov 10, 2025', readTime: '16 min',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
    featured: false,
  },
  {
    id: 9, title: 'WhatsApp Business API Integration: Full Stack Guide for 2026',
    excerpt: 'Complete guide to integrating WhatsApp Business Cloud API in Next.js for automated notifications, chatbots, and two-way messaging with conversation management.',
    category: 'Engineering', author: 'Praveenkumar K.', date: 'Oct 30, 2025', readTime: '13 min',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&q=80&w=800',
    featured: false,
  },
];

const CATEGORIES = ['All', 'AI/ML', 'Engineering', 'EdTech', 'Mobile Dev', 'FinTech'];

const CATEGORY_COLORS: Record<string, string> = {
  'AI/ML': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  'Engineering': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'EdTech': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  'Mobile Dev': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  'FinTech': 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const featured = POSTS.find(p => p.featured);
  const regular = POSTS.filter(p => !p.featured);

  const filtered = (activeCategory === 'All' ? regular : regular.filter(p => p.category === activeCategory))
    .filter(p => searchTerm === '' || p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />

      {/* Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 gradient-grid-bg-light dark:gradient-grid-bg" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="highlight-badge mb-6 inline-flex">✍️ Engineering Insights</span>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
              Latest <span className="gradient-text">Engineering</span> Insights
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              Deep dives into AI/ML, software architecture, mobile development, and building 
              scalable tech businesses by the GuideSoft engineering team.
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search articles..."
                className="pl-12 h-12 rounded-2xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="py-10 border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 glass-morphism-light dark:glass-morphism rounded-3xl overflow-hidden"
            >
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="gradient-bg text-white text-xs font-black px-3 py-1 rounded-full">Featured</span>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <Badge className={`${CATEGORY_COLORS[featured.category]} border-0 text-xs self-start mb-4`}>{featured.category}</Badge>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-4 leading-tight">{featured.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-6">
                  <span className="flex items-center gap-1"><User size={12} /> {featured.author}</span>
                  <span className="flex items-center gap-1"><Calendar size={12} /> {featured.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {featured.readTime}</span>
                </div>
                <button className="text-green-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all self-start">
                  Read Article <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Filter + Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? 'gradient-bg text-white shadow-lg shadow-green-500/25'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group overflow-hidden rounded-3xl border border-gray-100 dark:border-gray-800 hover:border-green-300 dark:hover:border-green-800 transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-900 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <Badge className={`${CATEGORY_COLORS[post.category] || 'bg-gray-100 text-gray-700'} border-0 text-xs backdrop-blur-sm`}>
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
                  </div>
                  <h3 className="font-black text-gray-900 dark:text-white text-lg mb-2 leading-tight group-hover:text-green-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs font-medium text-gray-500 flex items-center gap-1"><User size={11} /> {post.author}</span>
                    <span className="text-green-600 font-bold text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              No articles found for &ldquo;{searchTerm}&rdquo;.
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 gradient-grid-bg opacity-40" />
        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-4">
              Get Weekly <span className="gradient-text">Engineering Insights</span>
            </h2>
            <p className="text-gray-400 mb-6">Join 2,000+ developers and CTOs who read our engineering newsletter.</p>
            <div className="flex gap-3 max-w-md mx-auto">
              <Input placeholder="your@email.com" className="flex-1 h-12 rounded-2xl bg-gray-900 border-gray-700 text-white" />
              <button className="gradient-bg text-white px-6 h-12 rounded-2xl font-bold whitespace-nowrap hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-3">No spam. Unsubscribe anytime. 2,000+ subscribers.</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
