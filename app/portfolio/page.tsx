'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: 'HealthHub Portal',
    category: 'Web App',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    description: 'A comprehensive telemedicine portal connecting patients with doctors.'
  },
  {
    id: 2,
    title: 'Retail AI Predictor',
    category: 'AI/ML',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    description: 'Machine learning model for predicting retail inventory needs with 94% accuracy.'
  },
  {
    id: 3,
    title: 'FinancePro Mobile',
    category: 'Mobile App',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
    description: 'Secure, fast, and intuitive banking application for iOS and Android.'
  },
  {
    id: 4,
    title: 'EduCore LMS',
    category: 'SaaS',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    description: 'Enterprise learning management system used by 50+ universities.'
  },
  {
    id: 5,
    title: 'Logistics Tracker',
    category: 'Web App',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c50a58?auto=format&fit=crop&q=80&w=800',
    description: 'Real-time global supply chain tracking and optimization platform.'
  },
  {
    id: 6,
    title: 'Customer Sentiment AI',
    category: 'AI/ML',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800',
    description: 'NLP-based tool for analyzing customer feedback across social media.'
  }
];

const CATEGORIES = ['All', 'Web App', 'Mobile App', 'AI/ML', 'SaaS'];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = activeCategory === 'All' 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <Badge className="mb-4 bg-green-500/10 text-green-600 border-green-500/20">Our Work</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Featured <span className="gradient-text">Portfolio</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
            Explore a selection of our most impactful digital transformations and software solutions.
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category 
                    ? 'gradient-bg text-white shadow-lg' 
                    : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                className="group relative rounded-3xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 aspect-[4/3] cursor-pointer"
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <Badge className="bg-green-500 text-white border-0 mb-3">{item.category}</Badge>
                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{item.description}</p>
                    <button className="flex items-center text-green-400 font-semibold hover:text-green-300">
                      View Details <ExternalLink size={16} className="ml-2" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
