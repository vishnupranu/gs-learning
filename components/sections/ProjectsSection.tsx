'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const filters = ['All', 'Banking', 'E-commerce', 'AI/ML', 'Real Estate', 'Education', 'Healthcare'];

const projects = [
  { id: 1, title: 'Digital Banking Platform', category: 'Banking', description: 'Modern banking solution with real-time transactions, mobile banking, and AI-powered fraud detection.', image: 'https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=600', technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'], features: ['Mobile Banking', 'AI Fraud Detection', 'Real-time Transactions', 'Analytics'], liveUrl: '#', githubUrl: '#' },
  { id: 2, title: 'E-commerce Marketplace', category: 'E-commerce', description: 'Full-featured marketplace with vendor management, payment processing, and inventory tracking.', image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600', technologies: ['Next.js', 'Stripe', 'MongoDB', 'Docker'], features: ['Multi-vendor', 'Payment Gateway', 'Inventory', 'Order Tracking'], liveUrl: '#', githubUrl: '#' },
  { id: 3, title: 'AI-Powered Analytics', category: 'AI/ML', description: 'Machine learning platform for predictive analytics and business intelligence.', image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600', technologies: ['Python', 'TensorFlow', 'React', 'FastAPI'], features: ['Predictive Analytics', 'Data Visualization', 'ML Models', 'Real-time'], liveUrl: '#', githubUrl: '#' },
  { id: 4, title: 'Property Management', category: 'Real Estate', description: 'Comprehensive real estate platform with property listings, virtual tours, and CRM.', image: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=600', technologies: ['Vue.js', 'Laravel', 'MySQL', 'Google Maps'], features: ['Property Listings', 'Virtual Tours', 'CRM Integration', 'Lead Mgmt'], liveUrl: '#', githubUrl: '#' },
  { id: 5, title: 'Learning Management System', category: 'Education', description: 'Complete LMS with course creation, student progress tracking, and interactive assessments.', image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=600', technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'], features: ['Course Mgmt', 'Progress Tracking', 'Live Classes', 'Assessments'], liveUrl: '#', githubUrl: '#' },
  { id: 6, title: 'Telemedicine Platform', category: 'Healthcare', description: 'Digital health platform enabling remote consultations, appointments, and health records.', image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600', technologies: ['React Native', 'Express', 'PostgreSQL', 'WebRTC'], features: ['Video Consults', 'Appointment Booking', 'Health Records', 'Prescriptions'], liveUrl: '#', githubUrl: '#' },
];

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filtered = activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <span className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            💼 Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Our <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover our portfolio of successful projects across various industries, showcasing our expertise in delivering innovative digital solutions.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div className="flex flex-wrap justify-center gap-3 mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }}>
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeFilter === filter
                  ? 'gradient-bg text-white shadow-lg shadow-green-500/25'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <Filter size={13} />
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-green-500/10 hover:border-green-200 dark:hover:border-green-800 transition-all"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a href={project.liveUrl} className="w-9 h-9 bg-white rounded-xl flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors shadow">
                    <ExternalLink size={14} />
                  </a>
                  <a href={project.githubUrl} className="w-9 h-9 bg-white rounded-xl flex items-center justify-center hover:bg-gray-800 hover:text-white transition-colors shadow">
                    <Github size={14} />
                  </a>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 gradient-bg text-white text-xs font-bold rounded-full">{project.category}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-1">
                  {project.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="text-center mt-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3">Ready to Start Your Next Project?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Let&apos;s discuss your requirements and create a solution that drives your business forward.
          </p>
          <Link href="/booking">
            <Button size="lg" className="gradient-bg text-white font-bold px-10 rounded-2xl shadow-lg shadow-green-500/25 hover:opacity-90">
              Start Your Project
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;