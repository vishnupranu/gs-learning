'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Brain, Palette, TestTube, Smartphone, GraduationCap, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const services = [
  { icon: Code, title: 'Software Development', description: 'Custom web apps, enterprise software, and scalable solutions built with modern technology stacks.', features: ['React / Next.js', 'Node.js / Python', 'Cloud Integration', 'REST & GraphQL APIs'], color: 'from-blue-500 to-blue-600' },
  { icon: Brain, title: 'AI/ML Development', description: 'Intelligent solutions leveraging machine learning, NLP, and computer vision for automation.', features: ['Machine Learning', 'Deep Learning', 'NLP Solutions', 'Computer Vision'], color: 'from-purple-500 to-purple-600' },
  { icon: Palette, title: 'UX/UI Design', description: 'User-centered design creating intuitive interfaces and exceptional user experiences.', features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'], color: 'from-pink-500 to-pink-600' },
  { icon: TestTube, title: 'Testing Services', description: 'Comprehensive QA ensuring your software meets the highest quality standards.', features: ['Automated Testing', 'Performance Testing', 'Security Testing', 'Manual QA'], color: 'from-orange-500 to-orange-600' },
  { icon: Smartphone, title: 'Mobile Applications', description: 'Native and cross-platform mobile apps delivering seamless user experiences.', features: ['React Native', 'Flutter', 'iOS Development', 'Android Development'], color: 'from-green-500 to-green-600' },
  { icon: GraduationCap, title: 'LMS Platform', description: 'Complete learning management systems with course creation, tracking, and analytics.', features: ['Course Management', 'Student Portal', 'Assessment Tools', 'Analytics Dashboard'], color: 'from-indigo-500 to-indigo-600' },
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            ⚡ What We Do
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Comprehensive technology solutions tailored to transform your business and drive digital innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 group transition-all hover:shadow-xl hover:shadow-green-500/10 hover:border-green-200 dark:hover:border-green-800"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                <service.icon className="text-white" size={26} />
              </div>

              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-5 text-sm leading-relaxed">{service.description}</p>

              <div className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle size={13} className="text-green-500 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>

              <Link href="/services" className="inline-flex items-center text-green-600 dark:text-green-400 font-semibold text-sm hover:text-green-700 dark:hover:text-green-300 transition-colors group/link">
                Learn More
                <ArrowRight size={14} className="ml-1 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Ready to transform your business with our comprehensive IT solutions?
          </p>
          <Link href="/contact">
            <Button size="lg" className="gradient-bg text-white font-bold px-10 rounded-2xl shadow-lg shadow-green-500/25 hover:opacity-90">
              Get Free Consultation
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;