'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BarChart3, Clock, Zap } from 'lucide-react';
import Link from 'next/link';

const CASE_STUDIES = [
  {
    id: 1,
    client: 'FinTech Global',
    title: 'Transforming Legacy Banking into a Cloud-Native Experience',
    description: 'How we migrated a 20-year-old monolithic banking system to a modern microservices architecture using Next.js and PostgreSQL, resulting in 400% faster transactions.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    tags: ['FinTech', 'Cloud Migration', 'Next.js'],
    metrics: [
      { icon: Zap, label: 'Performance', value: '+400%' },
      { icon: Clock, label: 'Downtime', value: 'Zero' },
      { icon: BarChart3, label: 'Conversion', value: '+45%' }
    ]
  },
  {
    id: 2,
    client: 'EduLearn Inc.',
    title: 'AI-Powered LMS Platform Scaling to 1M+ Users',
    description: 'Built a scalable custom LMS platform with integrated Cloudflare AI for personalized learning paths, supporting over 1 million concurrent users without degradation.',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800',
    tags: ['EdTech', 'AI Integration', 'High Scale'],
    metrics: [
      { icon: Zap, label: 'Active Users', value: '1M+' },
      { icon: Clock, label: 'Dev Time', value: '3 Mo' },
      { icon: BarChart3, label: 'Engagement', value: '+85%' }
    ]
  }
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
          <Badge className="mb-4 bg-green-500/10 text-green-600 border-green-500/20">Success Stories</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Proven <span className="gradient-text">Results</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover how we've helped enterprise clients across industries achieve their digital transformation goals.
          </p>
        </motion.div>

        <div className="space-y-16">
          {CASE_STUDIES.map((study, index) => (
            <motion.div 
              key={study.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center`}
            >
              <div className="w-full lg:w-1/2 relative group">
                <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-video">
                  <img src={study.image} alt={study.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {study.tags.map(tag => (
                      <Badge key={tag} className="bg-black/50 text-white backdrop-blur-md border-0">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2 space-y-6">
                <p className="text-green-600 font-bold tracking-wider uppercase text-sm">{study.client}</p>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                  {study.title}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  {study.description}
                </p>
                
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100 dark:border-gray-800">
                  {study.metrics.map((metric, i) => (
                    <div key={i}>
                      <div className="flex items-center gap-2 text-gray-500 mb-2 text-sm">
                        <metric.icon size={14} className="text-green-500" /> {metric.label}
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</div>
                    </div>
                  ))}
                </div>

                <div className="pt-6">
                  <Link href="/contact">
                    <button className="flex items-center text-green-600 font-bold hover:text-green-700 transition-colors">
                      Start Your Project <ArrowRight size={20} className="ml-2" />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
