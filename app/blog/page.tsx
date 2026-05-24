'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, Calendar, User, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const BLOG_POSTS = [
  {
    id: 1,
    title: 'The Future of AI in Enterprise Software',
    excerpt: 'Discover how artificial intelligence is transforming legacy enterprise systems into predictive, autonomous engines.',
    category: 'Artificial Intelligence',
    author: 'Praveenkumar K.',
    date: 'Oct 15, 2025',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'Next.js 14 vs React: When to use which?',
    excerpt: 'A comprehensive guide for CTOs and technical founders on choosing the right frontend architecture for scale.',
    category: 'Engineering',
    author: 'Dev Team',
    date: 'Oct 10, 2025',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
    readTime: '8 min read',
  },
  {
    id: 3,
    title: 'Why Custom LMS Platforms Beat SaaS Alternatives',
    excerpt: 'Explore the hidden costs of SaaS learning platforms and why building custom yields higher ROI for institutions.',
    category: 'EdTech',
    author: 'Education Lead',
    date: 'Oct 02, 2025',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    readTime: '6 min read',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <div className="pt-24 pb-20 max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <Badge className="mb-4 bg-green-500/10 text-green-600 border-green-500/20">Our Insights</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Latest <span className="gradient-text">Engineering</span> Insights
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Deep dives into software architecture, artificial intelligence, and building scalable tech businesses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="premium-card overflow-hidden group cursor-pointer flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-gray-900 shadow-sm backdrop-blur-sm border-0">
                    {post.category}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                  <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-green-600 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs text-gray-500 font-medium">{post.readTime}</span>
                  <span className="text-green-600 font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform">
                    Read Article <ArrowRight size={16} className="ml-1" />
                  </span>
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
