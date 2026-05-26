'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Mail, Calendar, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg grid-bg-white opacity-5 dark:opacity-10" />

      {/* Glowing orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-green-400 rounded-full filter blur-3xl opacity-5 dark:opacity-10 animate-blob" />
      <div className="absolute top-40 right-20 w-64 h-64 bg-yellow-400 rounded-full filter blur-3xl opacity-5 dark:opacity-10 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-40 w-64 h-64 bg-blue-400 rounded-full filter blur-3xl opacity-5 dark:opacity-10 animate-blob animation-delay-4000" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
            🚀 Get Started Today
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
            Ready to Transform Your
            <span className="block gradient-text">Digital Future?</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of successful businesses that have chosen Guide Soft IT Solutions for their digital transformation journey.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {[
            { icon: Phone, title: 'Call Us', description: 'Speak directly with our team. Available Mon-Sat, 9AM-7PM IST.', action: '+91 8500647979', href: 'tel:+918500647979' },
            { icon: Calendar, title: 'Book Meeting', description: 'Schedule a detailed discovery call to explore your project requirements.', action: 'Book Free Call', href: '/booking' },
            { icon: MessageCircle, title: 'WhatsApp', description: 'Chat instantly on WhatsApp for quick queries and project discussions.', action: 'Chat Now', href: 'https://wa.me/918884162999' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className="bg-gray-50/50 dark:bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 hover:border-green-500/30 transition-all group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 gradient-bg rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg">
                <item.icon className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-5 text-sm leading-relaxed">{item.description}</p>
              <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                <Button variant="outline" className="border-gray-200 dark:border-white/20 text-gray-800 dark:text-white hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 transition-all rounded-xl">
                  {item.action}
                  <ArrowRight size={14} className="ml-2" />
                </Button>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Main CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/contact">
              <Button size="lg" className="gradient-bg text-white font-bold text-lg px-10 h-14 rounded-2xl shadow-2xl shadow-green-500/30 hover:opacity-90 hover:shadow-green-500/50 transition-all">
                Start Your Project Today
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
            <Link href="/projects">
              <Button size="lg" variant="outline" className="border-gray-300 dark:border-white/20 text-gray-800 dark:text-white hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 font-bold text-lg px-10 h-14 rounded-2xl transition-all">
                View Our Work
              </Button>
            </Link>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">No commitment required · Free consultation · Transparent pricing · NDA protected</p>
        </motion.div>

        {/* Contact Info Row */}
        <motion.div
          className="mt-16 pt-10 border-t border-gray-200 dark:border-gray-800 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-1">Call / WhatsApp</h4>
            <p className="text-gray-600 dark:text-gray-400">+91 8500647979 / +91 8884162999</p>
            <p className="text-xs text-gray-500 dark:text-gray-600 mt-0.5">Mon-Sat, 9AM-7PM IST</p>
          </div>
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-1">Email Us</h4>
            <p className="text-gray-600 dark:text-gray-400">info@guideitsol.com</p>
            <p className="text-xs text-gray-500 dark:text-gray-600 mt-0.5">Response within 24 hours</p>
          </div>
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-1">Office Locations</h4>
            <p className="text-gray-600 dark:text-gray-400">Guntur & Bangalore, India</p>
            <p className="text-xs text-gray-500 dark:text-gray-600 mt-0.5">Visit by appointment</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;