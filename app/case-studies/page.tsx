'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ArrowRight, Clock, Users, TrendingUp, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const CASE_STUDIES = [
  {
    id: 1,
    title: 'National Examination Platform for 200,000 Students',
    client: 'Ministry of Education, Qatar',
    industry: 'Government / EdTech',
    duration: '8 months',
    team: '12 engineers',
    challenge: 'The ministry needed a secure, scalable online examination system capable of simultaneously handling 200,000 concurrent students with real-time AI proctoring, instant result computation, and zero tolerance for downtime.',
    solution: 'We built a distributed microservices architecture on AWS with auto-scaling, integrated Cloudflare AI for proctoring, implemented end-to-end encryption, and created a real-time results dashboard for administrators.',
    results: [
      '200,000 concurrent users with zero downtime',
      '60% reduction in examination administrative costs',
      'Real-time AI proctoring detected 340+ fraudulent attempts',
      'Results delivered in under 2 minutes post-examination',
      '99.99% uptime across all examination sessions',
    ],
    technologies: ['Next.js', 'PostgreSQL', 'AWS ECS', 'Cloudflare AI', 'Redis', 'WebSockets'],
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b6af3?auto=format&fit=crop&q=80&w=800',
    category: 'Enterprise Platform',
    impact: '60%',
    impactLabel: 'Cost Reduction',
  },
  {
    id: 2,
    title: 'AI-Powered Banking App Serving 500K+ Users',
    client: 'FinTech Arabia, Dubai',
    industry: 'Financial Technology',
    duration: '10 months',
    team: '18 engineers',
    challenge: 'Build a next-generation mobile banking application with biometric authentication, AI fraud detection, real-time currency conversion, and compliance with UAE Central Bank regulations.',
    solution: 'Developed React Native cross-platform app with AI/ML fraud detection using real-time transaction pattern analysis, implemented OAuth2.0 with biometric authentication, and integrated with 15+ banking APIs.',
    results: [
      '500,000+ active users within 6 months of launch',
      '40% improvement in user retention over competitor apps',
      'AI fraud detection achieving 99.2% accuracy',
      'Transaction processing under 0.8 seconds average',
      'UAE Central Bank compliance certification achieved',
    ],
    technologies: ['React Native', 'Node.js', 'TensorFlow', 'PostgreSQL', 'Redis', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800',
    category: 'Mobile Application',
    impact: '99.2%',
    impactLabel: 'Fraud Detection',
  },
  {
    id: 3,
    title: 'E-Commerce Platform with 50K Daily Transactions',
    client: 'RetailPro UK, London',
    industry: 'E-Commerce / Retail',
    duration: '6 months',
    team: '8 engineers',
    challenge: 'Replace a legacy PHP monolith with a modern, cloud-native e-commerce platform capable of handling peak Black Friday traffic of 50,000 orders per hour with sub-second page loads.',
    solution: 'Built Next.js 14 storefront with serverless API routes, Cloudflare CDN, Postgres with read replicas, Stripe payment processing, and AI-powered product recommendations.',
    results: [
      '50,000+ transactions per day with 99.99% uptime',
      'Page load time reduced from 4.2s to 0.8s',
      'Conversion rate increased by 35% post-launch',
      '25% increase in average order value via AI recommendations',
      'Black Friday handled without a single error or timeout',
    ],
    technologies: ['Next.js 14', 'TypeScript', 'Stripe', 'Cloudflare', 'PostgreSQL', 'OpenAI'],
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800',
    category: 'Software Development',
    impact: '35%',
    impactLabel: 'Conversion Boost',
  },
  {
    id: 4,
    title: 'Corporate LMS Onboarding 10,000 Learners Monthly',
    client: 'EduGlobal, Singapore',
    industry: 'EdTech / Corporate Training',
    duration: '5 months',
    team: '6 engineers',
    challenge: 'Design and build a white-labeled LMS platform that EdTech companies can deploy in their own branding, with video streaming, AI-powered personalized learning paths, and automated certification.',
    solution: 'Developed a multi-tenant LMS with video CDN delivery, ML-based learning path personalization, interactive assessments, digital certificate generation with blockchain verification.',
    results: [
      '10,000+ new learners onboarded per month',
      '85% course completion rate (industry average: 45%)',
      'Certification fraud eliminated via blockchain verification',
      '12 EdTech companies using the white-label platform',
      'Revenue grew 3x within 12 months of platform launch',
    ],
    technologies: ['Next.js', 'FFmpeg', 'PostgreSQL', 'Cloudflare Stream', 'Blockchain', 'AI SDK'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    category: 'LMS Platform',
    impact: '85%',
    impactLabel: 'Completion Rate',
  },
  {
    id: 5,
    title: 'Healthcare AI Platform for Diagnostic Assistance',
    client: 'HealthTech Solutions, Chennai',
    industry: 'Healthcare / AI',
    duration: '12 months',
    team: '15 engineers + 3 ML specialists',
    challenge: 'Build a HIPAA-compliant AI platform that assists radiologists in diagnosing medical images with ML, while managing patient records, appointments, prescriptions, and billing in one system.',
    solution: 'Developed end-to-end healthcare platform with DICOM image processing, custom CNN models for diagnostic assistance, patient management system, and integration with existing hospital systems.',
    results: [
      'Diagnostic processing time reduced by 65%',
      'AI model achieved 94.7% diagnostic accuracy on test dataset',
      'HIPAA compliance certification achieved',
      '150+ hospitals using the platform across South India',
      'Patient waiting time reduced from 3 hours to 45 minutes',
    ],
    technologies: ['Python', 'TensorFlow', 'FastAPI', 'React', 'PostgreSQL', 'DICOM', 'AWS'],
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800',
    category: 'AI/ML Development',
    impact: '94.7%',
    impactLabel: 'AI Accuracy',
  },
  {
    id: 6,
    title: 'Supply Chain Management System for 500+ Vendors',
    client: 'AgriConnect India',
    industry: 'Agriculture / Supply Chain',
    duration: '9 months',
    team: '10 engineers',
    challenge: 'Digitize and optimize the supply chain for a network of 500+ farmers and vendors with real-time tracking, AI demand forecasting, automated payments via UPI, and multi-language support.',
    solution: 'Built comprehensive supply chain platform with GPS tracking, ML demand forecasting, automated UPI payment flows, WhatsApp notifications, multilingual interface (Hindi/Telugu/English).',
    results: [
      '500+ farmers and vendors onboarded across 8 states',
      'Supply wastage reduced by 42% via AI forecasting',
      'Payment processing time reduced from 7 days to real-time',
      '₹50 crore+ transactions processed in year 1',
      'Farmer income increased by average 28% per vendor',
    ],
    technologies: ['Next.js', 'Python ML', 'UPI API', 'WhatsApp API', 'PostgreSQL', 'GPS APIs'],
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
    category: 'Software Development',
    impact: '42%',
    impactLabel: 'Waste Reduction',
  },
];

export default function CaseStudiesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const categories = ['All', 'Enterprise Platform', 'Mobile Application', 'Software Development', 'LMS Platform', 'AI/ML Development'];
  const filtered = activeCategory === 'All' ? CASE_STUDIES : CASE_STUDIES.filter(c => c.category === activeCategory);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />

      {/* Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 gradient-grid-bg-light dark:gradient-grid-bg" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="highlight-badge mb-6 inline-flex">📊 Real Results</span>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
              Case <span className="gradient-text">Studies</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Real projects. Real challenges. Real results. Explore how we've transformed 
              businesses across 18+ countries with cutting-edge technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? 'gradient-bg text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          {filtered.map((cs, i) => (
            <motion.div
              key={cs.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 glass-morphism-light dark:glass-morphism rounded-3xl overflow-hidden"
            >
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <img
                  src={cs.image}
                  alt={cs.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-500 text-white border-0">{cs.category}</Badge>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="text-4xl font-black text-white">{cs.impact}</div>
                  <div className="text-green-400 text-sm font-semibold">{cs.impactLabel}</div>
                </div>
              </div>

              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="text-xs">{cs.industry}</Badge>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock size={12} /> {cs.duration}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Users size={12} /> {cs.team}
                  </span>
                </div>

                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{cs.title}</h2>
                <p className="text-green-600 dark:text-green-400 font-semibold text-sm mb-4">{cs.client}</p>

                <div className="mb-4">
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-2">Challenge</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{cs.challenge}</p>
                </div>

                {expandedId === cs.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4"
                  >
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-2">Solution</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{cs.solution}</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-2">Key Results</h3>
                      <ul className="space-y-1">
                        {cs.results.map((r, ri) => (
                          <li key={ri} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-2">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {cs.technologies.map((tech) => (
                          <span key={tech} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => setExpandedId(expandedId === cs.id ? null : cs.id)}
                    className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center gap-1"
                  >
                    {expandedId === cs.id ? 'Show Less' : 'Read Full Case Study'}
                    <ArrowRight size={14} className={`transition-transform ${expandedId === cs.id ? 'rotate-90' : ''}`} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 gradient-grid-bg opacity-50" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-black mb-4">
              Ready to Be Our Next <span className="gradient-text">Success Story?</span>
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Let's discuss your project and how GuideSoft can help you achieve extraordinary results.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/booking">
                <Button className="gradient-bg text-white h-12 px-8 rounded-2xl font-bold shadow-lg shadow-green-500/25">
                  Start Your Project <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="h-12 px-8 rounded-2xl font-bold border-gray-700 text-white hover:bg-gray-800">
                  Contact Our Team
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
