'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Link from 'next/link';

const testimonials = [
  { id: 1, name: 'Sarah Johnson', position: 'CEO, TechStart Inc.', image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=200', rating: 5, testimonial: 'Guide Soft transformed our business with their exceptional software development services. Their team delivered a robust platform that exceeded our expectations and helped us scale rapidly.', project: 'E-commerce Platform' },
  { id: 2, name: 'Michael Chen', position: 'CTO, FinanceFlow', image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200', rating: 5, testimonial: 'The AI/ML solutions provided by Guide Soft have revolutionized our data analytics capabilities. Their expertise in machine learning is truly impressive and results-driven.', project: 'AI Analytics Dashboard' },
  { id: 3, name: 'Emily Rodriguez', position: 'Director, EduTech Solutions', image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200', rating: 5, testimonial: 'Their LMS platform has transformed how we deliver online education. The user experience is exceptional, and the features are exactly what we needed for our students.', project: 'Learning Management System' },
  { id: 4, name: 'David Kim', position: 'Founder, PropTech Innovations', image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200', rating: 5, testimonial: 'Guide Soft delivered a comprehensive real estate platform that streamlined our operations. Their attention to detail and technical expertise is outstanding.', project: 'Real Estate Platform' },
  { id: 5, name: 'Lisa Thompson', position: 'VP Technology, HealthCare Plus', image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=200', rating: 5, testimonial: 'The telemedicine platform they developed has been crucial for our patient care services. Professional, reliable, and incredibly user-friendly.', project: 'Telemedicine Platform' },
  { id: 6, name: 'James Wilson', position: 'CEO, RetailMax', image: 'https://images.pexels.com/photos/2182975/pexels-photo-2182975.jpeg?auto=compress&cs=tinysrgb&w=200', rating: 5, testimonial: 'From concept to deployment, Guide Soft handled our project with professionalism and expertise. The final product exceeded all our expectations.', project: 'Inventory Management System' },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <span className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            ⭐ Client Reviews
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Client <span className="gradient-text">Testimonials</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Don&apos;t just take our word for it — here&apos;s what our clients say about working with Guide Soft IT Solutions.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {[
            { number: '98%', label: 'Client Satisfaction' },
            { number: '150+', label: 'Happy Clients' },
            { number: '500+', label: 'Projects Done' },
            { number: '4.9★', label: 'Average Rating' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl">
              <div className="text-3xl font-black gradient-text mb-1">{stat.number}</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 hover:shadow-xl hover:shadow-green-500/10 hover:border-green-200 dark:hover:border-green-800 transition-all relative overflow-hidden flex flex-col"
            >
              {/* Quote bg */}
              <Quote size={48} className="absolute top-4 right-4 text-gray-100 dark:text-gray-800 group-hover:text-green-100 dark:group-hover:text-green-900/50 transition-colors" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} size={14} fill="#FFEB3B" className="text-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed italic flex-1 text-sm">
                &quot;{t.testimonial}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-gray-100 dark:border-gray-800 pt-4">
                <img src={t.image} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-black text-gray-900 dark:text-white text-sm truncate">{t.name}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{t.position}</p>
                </div>
                <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2.5 py-1 rounded-full whitespace-nowrap">
                  {t.project}
                </span>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-500 to-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-14 p-8 bg-gradient-to-r from-green-50 to-yellow-50 dark:from-green-900/20 dark:to-yellow-900/20 border border-green-100 dark:border-green-800 rounded-3xl"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3">Ready to Join Our Success Stories?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Let&apos;s build something amazing together. Your success story could be next!</p>
          <Link href="/booking">
            <motion.button
              className="gradient-bg text-white px-8 py-4 rounded-2xl font-bold hover:opacity-90 transition-opacity shadow-lg shadow-green-500/25"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            >
              Start Your Success Story
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;