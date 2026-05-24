'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, FileSearch, Palette, Code, TestTube, Rocket, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const steps = [
  { number: '01', icon: MessageCircle, title: 'Discovery & Consultation', description: 'In-depth discussions to understand your business goals, challenges, and requirements.', details: ['Business analysis', 'Requirement gathering', 'Goal alignment', 'Technology consultation'], color: 'from-blue-500 to-blue-600' },
  { number: '02', icon: FileSearch, title: 'Research & Planning', description: 'Comprehensive research and strategic planning to create the optimal solution architecture.', details: ['Market research', 'Technical architecture', 'Project roadmap', 'Resource allocation'], color: 'from-green-500 to-green-600' },
  { number: '03', icon: Palette, title: 'Design & Prototyping', description: 'User-centered designs and interactive prototypes aligned with your brand.', details: ['UI/UX design', 'Wireframing', 'Prototyping', 'Design system creation'], color: 'from-purple-500 to-purple-600' },
  { number: '04', icon: Code, title: 'Development', description: 'Agile development with regular updates and iterative improvements based on feedback.', details: ['Agile methodology', 'Code reviews', 'Regular updates', 'Quality assurance'], color: 'from-orange-500 to-orange-600' },
  { number: '05', icon: TestTube, title: 'Testing & QA', description: 'Rigorous testing across multiple devices and platforms for flawless performance.', details: ['Automated testing', 'Manual QA', 'Performance testing', 'Security audits'], color: 'from-pink-500 to-pink-600' },
  { number: '06', icon: Rocket, title: 'Launch & Support', description: 'Seamless deployment and ongoing support to ensure optimal performance.', details: ['Deployment', 'Training', 'Documentation', '24/7 support'], color: 'from-indigo-500 to-indigo-600' },
];

const ProcessSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <span className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            🔄 How We Work
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Our <span className="gradient-text">Process</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A proven methodology that ensures successful project delivery through systematic planning, execution, and continuous improvement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-7 hover:shadow-xl hover:shadow-green-500/10 hover:border-green-200 dark:hover:border-green-800 transition-all group"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className={`w-14 h-14 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <step.icon className="text-white" size={24} />
                </div>
                <span className="text-4xl font-black text-gray-200 dark:text-gray-700">{step.number}</span>
              </div>
              <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{step.description}</p>
              <div className="space-y-1.5">
                {step.details.map((detail) => (
                  <div key={detail} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <CheckCircle size={12} className="text-green-500 flex-shrink-0" />
                    {detail}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-14 p-8 bg-gradient-to-r from-green-50 to-yellow-50 dark:from-green-900/20 dark:to-yellow-900/20 border border-green-100 dark:border-green-800 rounded-3xl"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3">Ready to Start Your Project?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Let&apos;s discuss how our proven process can help bring your vision to life.
          </p>
          <Link href="/booking">
            <motion.button
              className="gradient-bg text-white px-8 py-4 rounded-2xl font-bold hover:opacity-90 transition-opacity shadow-lg shadow-green-500/25"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            >
              Start Your Project Today
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;