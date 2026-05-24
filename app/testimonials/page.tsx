'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ArrowRight, TrendingUp, Users, ThumbsUp, Award, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'CEO',
    company: 'TechNova Solutions',
    industry: 'SaaS',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh',
    rating: 5,
    review: 'Guide Soft transformed our legacy system into a modern, AI-powered platform. The team delivered everything on time with exceptional quality. Our user engagement increased by 340% within 3 months of launch.',
    result: '340% increase in user engagement',
    project: 'Full-Stack SaaS Platform',
    duration: '4 months',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Director of Technology',
    company: 'EduLearn India',
    industry: 'EdTech',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    rating: 5,
    review: 'The LMS platform they built is incredible — course management, live classes, certificates, payment integration. Everything works flawlessly. 12,000 students onboarded in the first month!',
    result: '12,000 students onboarded in month 1',
    project: 'Enterprise LMS Platform',
    duration: '6 months',
  },
  {
    id: 3,
    name: 'Mohammed Al-Rashid',
    role: 'Founder',
    company: 'LogiChain UAE',
    industry: 'Logistics',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed',
    rating: 5,
    review: 'We needed a real-time logistics tracking system with AI route optimization. Guide Soft delivered beyond expectations. The system processes 10,000+ shipments daily with zero downtime.',
    result: '10,000+ daily shipments processed',
    project: 'AI Logistics Management System',
    duration: '5 months',
  },
  {
    id: 4,
    name: 'Sarah Mitchell',
    role: 'VP Engineering',
    company: 'HealthTech Global',
    industry: 'Healthcare',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    rating: 5,
    review: 'The telemedicine platform Guide Soft built for us is HIPAA-compliant, scalable, and the UX is simply beautiful. Patient adoption rate was 78% — far beyond our target of 50%.',
    result: '78% patient adoption rate',
    project: 'Telemedicine Platform',
    duration: '7 months',
  },
  {
    id: 5,
    name: 'Anand Krishnamurthy',
    role: 'CTO',
    company: 'FinEdge Capital',
    industry: 'Fintech',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anand',
    rating: 5,
    review: 'Security was our biggest concern with a fintech platform. Guide Soft implemented bank-grade encryption, RBAC, audit logs, and real-time fraud detection. Our investors were impressed with the architecture.',
    result: 'Bank-grade security certified',
    project: 'Investment Management Platform',
    duration: '8 months',
  },
  {
    id: 6,
    name: 'Fatima Hassan',
    role: 'Operations Manager',
    company: 'RetailMax Kuwait',
    industry: 'Retail',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima',
    rating: 5,
    review: 'Our e-commerce platform with AI-powered product recommendations resulted in a 52% increase in average order value. The WhatsApp integration for order updates was a game-changer for our customers.',
    result: '52% increase in AOV',
    project: 'AI E-Commerce Platform',
    duration: '3 months',
  },
  {
    id: 7,
    name: 'David Chen',
    role: 'Product Lead',
    company: 'CloudOps Singapore',
    industry: 'Cloud Infrastructure',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    rating: 5,
    review: 'The Cloudflare AI integration they set up for our edge computing platform reduced latency by 60%. The team understood our complex requirements and executed with precision.',
    result: '60% latency reduction',
    project: 'Edge Computing Dashboard',
    duration: '4 months',
  },
  {
    id: 8,
    name: 'Sneha Patel',
    role: 'Marketing Director',
    company: 'GrowthHive Agency',
    industry: 'Digital Marketing',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha',
    rating: 5,
    review: 'The CRM and marketing automation platform reduced our lead response time from 2 days to 15 minutes. Conversion rate doubled. The AI email workflows alone justified the entire investment.',
    result: '2x conversion rate improvement',
    project: 'CRM + Marketing Automation',
    duration: '3 months',
  },
];

const industries = ['All', 'SaaS', 'EdTech', 'Logistics', 'Healthcare', 'Fintech', 'Retail', 'Cloud Infrastructure', 'Digital Marketing'];

export default function TestimonialsPage() {
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = filter === 'All' ? testimonials : testimonials.filter(t => t.industry === filter);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />

      <div className="pt-20">
        {/* Hero */}
        <section className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-6 bg-green-500/20 text-green-400 border-green-500/30 px-4 py-1.5">
                ⭐ Client Success Stories
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                What Our Clients
                <span className="gradient-text block">Are Saying</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                Real results. Real businesses. See how Guide Soft IT Solutions 
                transforms companies with enterprise-grade technology.
              </p>
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white">4.9</div>
                  <div className="flex items-center gap-1 justify-center mt-1">
                    {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="#FFEB3B" className="text-yellow-400" />)}
                  </div>
                  <div className="text-gray-400 text-sm mt-1">Average Rating</div>
                </div>
                <div className="w-px h-16 bg-gray-700" />
                <div className="text-center">
                  <div className="text-4xl font-bold text-white">150+</div>
                  <div className="text-gray-400 text-sm mt-1">Happy Clients</div>
                </div>
                <div className="w-px h-16 bg-gray-700" />
                <div className="text-center">
                  <div className="text-4xl font-bold text-white">98%</div>
                  <div className="text-gray-400 text-sm mt-1">Satisfaction Rate</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filter */}
        <section className="sticky top-[70px] z-10 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 py-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {industries.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setFilter(ind)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    filter === ind
                      ? 'gradient-bg text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-16 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all group flex flex-col"
              >
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} size={14} fill="#FFEB3B" className="text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <Quote size={24} className="text-green-200 dark:text-green-900 mb-2" />
                <p className={`text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-1 ${expanded === t.id ? '' : 'line-clamp-4'}`}>
                  {t.review}
                </p>
                {t.review.length > 200 && (
                  <button
                    onClick={() => setExpanded(expanded === t.id ? null : t.id)}
                    className="text-green-600 text-xs font-semibold mt-1 text-left hover:underline"
                  >
                    {expanded === t.id ? 'Show less' : 'Read more'}
                  </button>
                )}

                {/* Result Highlight */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 my-4 flex items-center gap-2">
                  <TrendingUp size={14} className="text-green-600 flex-shrink-0" />
                  <span className="text-green-700 dark:text-green-400 text-xs font-semibold">{t.result}</span>
                </div>

                {/* Project Info */}
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-gray-500">
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-300 block">Project</span>
                    {t.project}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-300 block">Timeline</span>
                    {t.duration}
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 border-t border-gray-100 dark:border-gray-800 pt-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-10 h-10 rounded-full bg-gray-100"
                  />
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm">{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.role} @ {t.company}</div>
                  </div>
                  <Badge variant="secondary" className="ml-auto text-xs">{t.industry}</Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats Banner */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Users, label: '150+ Clients', sub: 'Across 18 countries' },
                { icon: ThumbsUp, label: '98% Satisfaction', sub: 'Based on client surveys' },
                { icon: Award, label: '4.9/5 Rating', sub: 'Average project rating' },
                { icon: CheckCircle, label: '500+ Projects', sub: 'Successfully delivered' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center border border-gray-100 dark:border-gray-700"
                >
                  <item.icon size={28} className="text-green-500 mx-auto mb-2" />
                  <div className="font-bold text-gray-900 dark:text-white">{item.label}</div>
                  <div className="text-gray-500 text-xs">{item.sub}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
              Start your project today and see real results within 30 days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button size="lg" className="gradient-bg text-white px-10">
                  Book a Consultation <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link href="/case-studies">
                <Button size="lg" variant="outline" className="px-10">
                  View Case Studies
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

