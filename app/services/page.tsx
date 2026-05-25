'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2, Brain, Palette, GraduationCap, Smartphone, Cloud,
  ArrowRight, CheckCircle, ChevronDown, MessageCircle,
  Zap, Shield, Globe, BarChart3, Layers, GitBranch,
  Star, Users, Award, Clock, Cpu, Database, Server,
  Layout, Figma, Boxes, Activity, Lock, Workflow
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' as const },
  }),
};

const services = [
  {
    id: 'software',
    icon: Code2,
    gradient: 'from-blue-500 via-blue-600 to-cyan-500',
    glow: 'rgba(59,130,246,0.25)',
    badge: 'Core Service',
    title: 'Software Development',
    tagline: 'Web, Mobile & Enterprise Applications',
    description:
      'We architect and build robust, scalable software solutions that power modern businesses. From customer-facing web apps to complex enterprise platforms, we turn your vision into production-ready code using the latest frameworks and best practices.',
    subServices: [
      'Custom Web Application Development',
      'Enterprise Software & ERP Systems',
      'REST & GraphQL API Development',
      'Microservices & Serverless Architecture',
      'Database Design & Query Optimization',
      'Third-party API Integrations',
    ],
    tech: ['Next.js', 'React', 'Node.js', 'Python', 'PostgreSQL', 'Docker'],
    timeline: '4–16 weeks',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80',
  },
  {
    id: 'ai',
    icon: Brain,
    gradient: 'from-purple-500 via-violet-600 to-indigo-500',
    glow: 'rgba(124,58,237,0.25)',
    badge: 'Trending',
    title: 'AI / ML Development',
    tagline: 'Chatbots, ML Models & Automation',
    description:
      'Harness the power of artificial intelligence to automate workflows, gain predictive insights, and deliver personalized user experiences. Our AI/ML engineers build production-grade models trained on your data with enterprise-level reliability.',
    subServices: [
      'Custom AI Chatbots & Virtual Agents',
      'Machine Learning Model Development',
      'OpenAI / Gemini / Claude Integration',
      'Natural Language Processing (NLP)',
      'Computer Vision & Image Recognition',
      'Intelligent Workflow Automation',
    ],
    tech: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI', 'LangChain', 'FastAPI'],
    timeline: '6–20 weeks',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
  },
  {
    id: 'design',
    icon: Palette,
    gradient: 'from-pink-500 via-rose-500 to-orange-400',
    glow: 'rgba(236,72,153,0.25)',
    badge: 'Creative',
    title: 'UX / UI Design',
    tagline: 'UI Research, Design Systems & Prototypes',
    description:
      'Beautiful design is the foundation of great software. Our design team conducts in-depth user research, creates cohesive design systems, and delivers pixel-perfect prototypes that developers can implement with confidence.',
    subServices: [
      'User Research & Persona Mapping',
      'Wireframing & Interactive Prototyping',
      'Design System & Component Library',
      'Visual Branding & Identity Design',
      'Accessibility (WCAG) Audit & Fixes',
      'Usability Testing & Iteration',
    ],
    tech: ['Figma', 'Adobe XD', 'Framer', 'Principle', 'Lottie', 'Storybook'],
    timeline: '2–8 weeks',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
  },
  {
    id: 'lms',
    icon: GraduationCap,
    gradient: 'from-emerald-500 via-green-500 to-teal-500',
    glow: 'rgba(16,185,129,0.25)',
    badge: 'Flagship',
    title: 'LMS Platform',
    tagline: 'E-Learning, Courseware & Assessments',
    description:
      'Our proprietary LMS platform enables educators, trainers, and institutions to deliver world-class online learning. Featuring live streaming, interactive assessments, progress analytics, and automated certificate generation out of the box.',
    subServices: [
      'Multi-Course & Category Management',
      'Live & Recorded Video Streaming',
      'Quizzes, Assignments & Assessments',
      'Student Progress & Completion Tracking',
      'Automated Certificate Generation',
      'Stripe / Razorpay Payment Integration',
    ],
    tech: ['Next.js', 'Node.js', 'MongoDB', 'Socket.io', 'AWS S3', 'Stripe'],
    timeline: '8–24 weeks',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
  },
  {
    id: 'mobile',
    icon: Smartphone,
    gradient: 'from-orange-500 via-amber-500 to-yellow-400',
    glow: 'rgba(245,158,11,0.25)',
    badge: 'Cross-Platform',
    title: 'Mobile Apps',
    tagline: 'iOS, Android & React Native',
    description:
      'From consumer apps to enterprise mobile solutions, we craft high-performance applications that feel native on every platform. Our mobile team excels at React Native, Swift, and Kotlin, ensuring optimal performance and delightful UX.',
    subServices: [
      'React Native Cross-Platform Development',
      'iOS (Swift) & Android (Kotlin) Native',
      'Flutter App Development',
      'App Store & Play Store Publishing',
      'Push Notifications & Deep Linking',
      'Biometric Auth & Offline Sync',
    ],
    tech: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo', 'Firebase'],
    timeline: '6–16 weeks',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80',
  },
  {
    id: 'cloud',
    icon: Cloud,
    gradient: 'from-sky-500 via-blue-500 to-indigo-500',
    glow: 'rgba(14,165,233,0.25)',
    badge: 'Infrastructure',
    title: 'Cloud & DevOps',
    tagline: 'AWS, Azure, GCP & CI/CD Pipelines',
    description:
      'Modern applications demand resilient, auto-scaling infrastructure. Our DevOps engineers design cloud architectures on AWS, Azure, and GCP, and implement fully automated CI/CD pipelines so your team ships faster with fewer incidents.',
    subServices: [
      'Cloud Architecture & Migration (AWS / Azure / GCP)',
      'Kubernetes & Docker Orchestration',
      'CI/CD Pipeline Setup (GitHub Actions, Jenkins)',
      'Infrastructure as Code (Terraform, Pulumi)',
      'Real-time Monitoring & Alerting',
      'Security Hardening & Compliance Audits',
    ],
    tech: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform'],
    timeline: '4–12 weeks',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80',
  },
];

const techStack = [
  { name: 'Next.js 14', icon: '▲', cat: 'Frontend' },
  { name: 'React 18', icon: '⚛', cat: 'Frontend' },
  { name: 'TypeScript', icon: 'TS', cat: 'Language' },
  { name: 'Python 3.11', icon: '🐍', cat: 'Backend' },
  { name: 'Node.js', icon: '🟢', cat: 'Backend' },
  { name: 'PostgreSQL', icon: '🐘', cat: 'Database' },
  { name: 'MongoDB', icon: '🍃', cat: 'Database' },
  { name: 'Redis', icon: '🔴', cat: 'Cache' },
  { name: 'Docker', icon: '🐳', cat: 'DevOps' },
  { name: 'Kubernetes', icon: '⚙️', cat: 'DevOps' },
  { name: 'AWS', icon: '☁️', cat: 'Cloud' },
  { name: 'Stripe', icon: '💳', cat: 'Payments' },
  { name: 'Razorpay', icon: '₹', cat: 'Payments' },
  { name: 'OpenAI', icon: '🤖', cat: 'AI' },
  { name: 'TensorFlow', icon: '🧠', cat: 'AI' },
  { name: 'Figma', icon: '🎨', cat: 'Design' },
];

const processSteps = [
  {
    step: '01',
    icon: Users,
    title: 'Discovery & Scoping',
    description:
      'We begin with in-depth stakeholder interviews to understand your business goals, user personas, technical constraints, and success metrics.',
  },
  {
    step: '02',
    icon: Layout,
    title: 'Design & Architecture',
    description:
      'Our designers create wireframes and high-fidelity prototypes while our architects define the system design, data models, and technology stack.',
  },
  {
    step: '03',
    icon: Code2,
    title: 'Agile Development',
    description:
      'We build in 2-week sprints with daily standups, weekly demos, and continuous feedback loops. Every sprint delivers working, tested software.',
  },
  {
    step: '04',
    icon: Activity,
    title: 'QA & Testing',
    description:
      'Rigorous automated and manual testing including unit, integration, E2E, performance, and security testing before every release.',
  },
  {
    step: '05',
    icon: Workflow,
    title: 'Deployment & CI/CD',
    description:
      'We deploy to your preferred cloud provider with fully automated CI/CD pipelines, zero-downtime deployments, and rollback capabilities.',
  },
  {
    step: '06',
    icon: Shield,
    title: 'Support & Maintenance',
    description:
      'Post-launch monitoring, bug fixes, feature updates, and 24/7 on-call support to keep your application running smoothly at scale.',
  },
];

const stats = [
  { value: '150+', label: 'Projects Delivered', icon: Award },
  { value: '98%', label: 'Client Satisfaction', icon: Star },
  { value: '50+', label: 'Expert Engineers', icon: Users },
  { value: '24/7', label: 'Support Available', icon: Clock },
];

export default function ServicesPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0f1e]">
      <Header />

      {/* ── Hero ── */}
      <section className="relative gradient-grid-bg min-h-[620px] flex items-center overflow-hidden pt-16">
        {/* Orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-blob pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-2000 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="highlight-badge mb-6 inline-flex">
              <Zap size={14} className="mr-1" /> End-to-End Technology Partner
            </span>

            <h1 className="hero-h1 text-white mb-6">
              Enterprise IT &{' '}
              <span className="gradient-text">AI Solutions</span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              From idea to production in record time — GuideSoft delivers software development,
              AI/ML, UX design, mobile apps, LMS platforms, and cloud infrastructure for forward-thinking businesses.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button size="lg" className="btn-glow text-white px-8 py-4 text-base font-bold rounded-xl">
                  Book Free Consultation <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <a
                href="https://wa.me/918884162999"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-500/40 text-white hover:bg-green-500/10 px-8 py-4 text-base rounded-xl"
                >
                  <MessageCircle size={16} className="mr-2 text-green-400" /> WhatsApp Us
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {stats.map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="glass-morphism rounded-2xl p-5 text-center"
              >
                <Icon size={20} className="text-green-400 mx-auto mb-2" />
                <div className="text-3xl font-black text-white">{value}</div>
                <div className="text-sm text-gray-400 mt-1">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="py-28 bg-white dark:bg-[#0a0f1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="highlight-badge mb-4 inline-flex">
              <Layers size={13} className="mr-1" /> Our Core Services
            </span>
            <h2 className="section-h2 text-gray-900 dark:text-white mt-4">
              Everything Your Business Needs to{' '}
              <span className="gradient-text">Thrive Digitally</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mt-4 text-lg">
              Six specialised service verticals. One trusted technology partner.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              const isOpen = expanded === svc.id;

              return (
                <motion.div
                  key={svc.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="group"
                >
                  <div
                    className="glass-card dark:bg-gray-900/70 rounded-3xl overflow-hidden border border-gray-100 dark:border-white/5 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                    style={{
                      boxShadow: isOpen
                        ? `0 20px 60px ${svc.glow}`
                        : undefined,
                    }}
                  >
                    {/* Card Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={svc.image}
                        alt={svc.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      {/* Icon + Badge */}
                      <div className="absolute top-4 left-4 flex items-center gap-3">
                        <div
                          className={`w-11 h-11 rounded-xl bg-gradient-to-br ${svc.gradient} flex items-center justify-center shadow-lg`}
                        >
                          <Icon size={22} className="text-white" />
                        </div>
                        <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 text-xs">
                          {svc.badge}
                        </Badge>
                      </div>

                      {/* Overlay title */}
                      <div className="absolute bottom-4 left-4">
                        <p className="text-white/80 text-xs font-medium">{svc.tagline}</p>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6">
                      <h3 className="card-h3 text-gray-900 dark:text-white mb-3">{svc.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                        {svc.description}
                      </p>

                      {/* Sub-services toggle */}
                      <button
                        onClick={() => setExpanded(isOpen ? null : svc.id)}
                        className="flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400 mb-4 hover:underline"
                      >
                        {isOpen ? 'Hide' : 'View'} all sub-services
                        <ChevronDown
                          size={14}
                          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-2 mb-4 overflow-hidden"
                          >
                            {svc.subServices.map((s) => (
                              <li
                                key={s}
                                className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                              >
                                <CheckCircle
                                  size={14}
                                  className="text-green-500 mt-0.5 flex-shrink-0"
                                />
                                {s}
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>

                      {/* Tech pills */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {svc.tech.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 font-medium"
                          >
                            {t}
                          </span>
                        ))}
                        {svc.tech.length > 4 && (
                          <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500">
                            +{svc.tech.length - 4} more
                          </span>
                        )}
                      </div>

                      {/* Footer row */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1">
                          <Clock size={12} /> {svc.timeline}
                        </span>
                        <Link href="/contact">
                          <Button
                            size="sm"
                            className={`bg-gradient-to-r ${svc.gradient} text-white rounded-xl text-xs font-semibold hover:opacity-90 hover:shadow-lg transition-all`}
                          >
                            Get Quote <ArrowRight size={12} className="ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="highlight-badge mb-4 inline-flex">
              <Cpu size={13} className="mr-1" /> Battle-Tested Tech Stack
            </span>
            <h2 className="section-h2 text-gray-900 dark:text-white mt-4">
              Modern Tools for{' '}
              <span className="gradient-text">Modern Problems</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto mt-3">
              We pick the right tool for each job — no vendor lock-in, no bloat.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.08, y: -3 }}
                className="tech-icon flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 cursor-default shadow-sm"
              >
                <span className="text-lg">{tech.icon}</span>
                <div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
                    {tech.name}
                  </div>
                  <div className="text-xs text-gray-400">{tech.cat}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process Overview ── */}
      <section className="py-28 bg-white dark:bg-[#0a0f1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="highlight-badge mb-4 inline-flex">
              <GitBranch size={13} className="mr-1" /> How We Work
            </span>
            <h2 className="section-h2 text-gray-900 dark:text-white mt-4">
              A Proven{' '}
              <span className="gradient-text">6-Step Process</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mt-4">
              Our battle-tested delivery methodology ensures transparency, quality, and on-time delivery at every phase.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="glass-card dark:bg-gray-900/50 rounded-3xl p-7 border border-gray-100 dark:border-white/5 hover:border-green-500/30 transition-all duration-300 h-full">
                    {/* Step number */}
                    <div className="text-6xl font-black text-gray-100 dark:text-white/5 absolute top-5 right-6 select-none leading-none">
                      {step.step}
                    </div>

                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-5 shadow-lg">
                      <Icon size={22} className="text-white" />
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why GuideSoft ── */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="highlight-badge mb-4 inline-flex">
                <Globe size={13} className="mr-1" /> Why GuideSoft?
              </span>
              <h2 className="section-h2 text-gray-900 dark:text-white mt-4 mb-6">
                The Partner That{' '}
                <span className="gradient-text">Delivers Results</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
                With offices in Guntur & Bangalore and a distributed team of 50+ engineers, designers, and AI
                specialists, GuideSoft has helped 150+ businesses across India and globally achieve their digital
                transformation goals.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Shield, text: 'Enterprise-grade security baked into every project' },
                  { icon: Zap, text: 'Rapid prototyping — MVP in as little as 2 weeks' },
                  { icon: BarChart3, text: 'Data-driven decisions backed by real analytics' },
                  { icon: Globe, text: 'Multi-language & multi-currency support globally' },
                  { icon: Database, text: 'GDPR, SOC2, and ISO 27001 ready architectures' },
                  { icon: Server, text: '99.9% SLA uptime guarantee on managed deployments' },
                ].map(({ icon: I, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-50 dark:bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <I size={16} className="text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80"
                alt="GuideSoft team collaboration"
                className="rounded-3xl shadow-2xl w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-green-500/20 to-purple-500/10" />

              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 glass-card dark:bg-gray-900 rounded-2xl p-5 shadow-xl border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                    <Star size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm">4.9 / 5 Rating</div>
                    <div className="text-xs text-gray-500">Based on 120+ reviews</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-28 gradient-grid-bg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 via-transparent to-purple-600/20 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-green-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="section-h2 text-white mb-6">
              Ready to Build Something{' '}
              <span className="gradient-text">Extraordinary?</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
              Talk to our experts today. Get a free technical consultation, project scoping, and a detailed proposal — no commitment required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="btn-glow text-white font-bold px-10 py-5 text-base rounded-xl"
                >
                  Get Free Quote <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <a
                href="https://wa.me/918884162999"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="whatsapp-btn text-base px-8 py-4">
                  <MessageCircle size={20} /> Chat on WhatsApp
                </button>
              </a>
            </div>

            <p className="text-gray-400 text-sm mt-8">
              📞 +91 8884162999 &nbsp;|&nbsp; +91 8500647979 &nbsp;|&nbsp;
              ✉️ info@guideitsol.com &nbsp;|&nbsp; 📍 Guntur & Bangalore, India
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}