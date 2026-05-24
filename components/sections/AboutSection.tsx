'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Lightbulb, CheckCircle } from 'lucide-react';

const values = [
  { icon: Target, title: 'Mission', description: 'Empower businesses worldwide with innovative technology solutions that drive growth and digital transformation.', color: 'from-blue-500 to-blue-600' },
  { icon: Lightbulb, title: 'Vision', description: 'Be the leading global provider of cutting-edge IT solutions, setting industry standards for innovation.', color: 'from-green-500 to-green-600' },
  { icon: Award, title: 'Excellence', description: 'We maintain the highest standards of quality in every project, ensuring exceptional results.', color: 'from-purple-500 to-purple-600' },
  { icon: Users, title: 'Collaboration', description: 'We work closely with our clients as partners, understanding unique needs and delivering tailored solutions.', color: 'from-pink-500 to-pink-600' },
];

const stats = [
  { number: '500+', label: 'Projects Delivered', desc: 'Across various industries' },
  { number: '150+', label: 'Happy Clients', desc: 'Startups to enterprise' },
  { number: '98%', label: 'Satisfaction Rate', desc: 'Based on reviews' },
  { number: '24/7', label: 'Support', desc: 'Round-the-clock help' },
];

const AboutSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            🏢 Our Story
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            About <span className="gradient-text">Guide Soft</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            With over 5 years of excellence in the IT industry, we have been at the forefront of digital transformation,
            helping businesses leverage technology to achieve unprecedented growth.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-black text-gray-900 dark:text-white">
              Pioneering Innovation in Technology Solutions
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Founded with a vision to bridge the gap between complex technology and business success,
              Guide Soft IT Solutions has evolved into a trusted partner for organizations seeking digital excellence.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Our team of expert developers, designers, and strategists work collaboratively to deliver solutions
              that not only meet current needs but also scale for future growth.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-5 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl font-black gradient-text">{stat.number}</div>
                  <div className="text-gray-900 dark:text-white font-bold text-sm mt-1">{stat.label}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{stat.desc}</div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col gap-3 mt-6">
              {['ISO 9001 Quality Certified', 'GDPR & HIPAA Compliant', 'Agile Development Process', 'Dedicated Project Managers'].map(item => (
                <div key={item} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-96 lg:h-full min-h-[420px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Guide Soft Team at work"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="text-xl font-black mb-1">Our Expert Team</h4>
                <p className="text-gray-200 text-sm">50+ dedicated professionals</p>
              </div>
            </div>
            <div className="absolute -top-5 -right-5 w-20 h-20 gradient-bg rounded-2xl flex items-center justify-center shadow-xl rotate-3">
              <div className="text-center text-white">
                <div className="text-xl font-black">5+</div>
                <div className="text-[10px] font-semibold">Years</div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl px-4 py-3 shadow-xl">
              <div className="text-sm font-black text-gray-900 dark:text-white">🏆 ISO Certified</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Quality Assured</div>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-3">Our Core Values</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              The principles that guide our work and define our commitment to excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 text-center group transition-all"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <value.icon className="text-white" size={24} />
                </div>
                <h4 className="text-lg font-black text-gray-900 dark:text-white mb-2">{value.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;