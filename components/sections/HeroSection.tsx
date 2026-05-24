'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Code, Brain, Palette, GraduationCap, Star, CheckCircle, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const TYPEWRITER_TEXTS = [
  'World-Class Software',
  'AI-Powered Solutions',
  'Mobile Applications',
  'Enterprise Platforms',
  'SaaS Products',
];

const STATS = [
  { value: 500, suffix: '+', label: 'Projects Delivered', icon: CheckCircle },
  { value: 150, suffix: '+', label: 'Happy Clients', icon: Star },
  { value: 98, suffix: '%', label: 'Satisfaction Rate', icon: Zap },
  { value: 18, suffix: '', label: 'Countries Served', icon: Shield },
];

const SERVICES_PREVIEW = [
  { icon: Code, title: 'Web Development', color: 'from-blue-500 to-blue-600', desc: 'Full-stack web apps' },
  { icon: Brain, title: 'AI/ML Solutions', color: 'from-purple-500 to-purple-600', desc: 'Intelligent automation' },
  { icon: Palette, title: 'UX/UI Design', color: 'from-pink-500 to-rose-500', desc: 'Premium interfaces' },
  { icon: GraduationCap, title: 'LMS Platform', color: 'from-green-500 to-green-600', desc: 'Education systems' },
];

function useTypewriter(texts: string[], speed = 60, pause = 2000) {
  const [display, setDisplay] = useState('');
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setTextIdx(i => (i + 1) % texts.length);
    }

    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx, texts, speed, pause]);

  return display;
}

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const duration = 1800;
        const step = (timestamp: number) => {
          if (start === 0) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          setCount(Math.floor(progress * value));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function HeroSection() {
  const typeText = useTypewriter(TYPEWRITER_TEXTS);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gray-950 flex items-center">
      {/* === Animated Grid Background === */}
      <div className="absolute inset-0 grid-bg grid-bg-white opacity-20" />

      {/* === Glowing Orbs === */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-green-500/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-yellow-400/15 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[150px]" />
      </div>

      {/* === Floating Elements === */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: '10%', y: '15%', size: 6, delay: 0, color: 'bg-green-400' },
          { x: '85%', y: '20%', size: 4, delay: 1, color: 'bg-yellow-400' },
          { x: '75%', y: '70%', size: 8, delay: 2, color: 'bg-blue-400' },
          { x: '15%', y: '75%', size: 5, delay: 0.5, color: 'bg-purple-400' },
          { x: '50%', y: '10%', size: 3, delay: 1.5, color: 'bg-pink-400' },
        ].map((dot, i) => (
          <motion.div
            key={i}
            className={`absolute ${dot.color} rounded-full opacity-40`}
            style={{ left: dot.x, top: dot.y, width: dot.size, height: dot.size }}
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3 + dot.delay, repeat: Infinity, delay: dot.delay }}
          />
        ))}
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* === Left Content === */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                🚀 India's #1 IT Solutions Partner
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl xl:text-7xl font-black text-white leading-tight mb-6"
            >
              We Build
              <span className="block gradient-text mt-1 min-h-[1.2em]">
                {typeText}
                <span className="animate-pulse">|</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-400 max-w-xl mb-8 leading-relaxed"
            >
              From AI-powered SaaS platforms to enterprise-grade mobile apps — Guide Soft 
              delivers cutting-edge technology solutions that transform businesses across 18+ countries.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Link href="/booking">
                <Button
                  size="lg"
                  className="gradient-bg text-white font-bold px-8 h-14 text-base rounded-2xl shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 hover:opacity-95 transition-all group"
                >
                  Start Your Project
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href="https://wa.me/918884162999" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-700 text-white hover:bg-gray-800 font-bold px-8 h-14 text-base rounded-2xl transition-all"
                >
                  <span className="mr-2 text-lg">💬</span>
                  Talk on WhatsApp
                </Button>
              </a>
            </motion.div>

            {/* Trust Signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-6 flex-wrap"
            >
              <div className="flex -space-x-2">
                {['A', 'B', 'C', 'D', 'E'].map((l) => (
                  <div key={l} className="w-9 h-9 rounded-full gradient-bg border-2 border-gray-900 flex items-center justify-center text-white text-xs font-bold">
                    {l}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#FFEB3B" className="text-yellow-400" />)}
                  <span className="text-yellow-400 font-bold ml-1">4.9</span>
                </div>
                <p className="text-xs text-gray-500">Trusted by 150+ global clients</p>
              </div>
              <div className="hidden md:flex items-center gap-2 text-xs text-gray-500">
                <CheckCircle size={14} className="text-green-500" />
                ISO 9001 Certified
              </div>
            </motion.div>
          </div>

          {/* === Right Content — Floating Dashboard Card === */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Main Card */}
            <div className="relative">
              <div className="glass-card bg-gray-900/60 border border-gray-800 rounded-3xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Current Projects</div>
                    <div className="text-2xl font-black text-white">12 Active</div>
                  </div>
                  <div className="w-12 h-12 gradient-bg rounded-2xl flex items-center justify-center">
                    <Zap size={22} className="text-white" />
                  </div>
                </div>
                {/* Progress Bars */}
                {[
                  { name: 'E-Commerce Platform', progress: 78, color: 'bg-blue-500' },
                  { name: 'AI Chatbot Integration', progress: 92, color: 'bg-green-500' },
                  { name: 'Mobile Banking App', progress: 55, color: 'bg-purple-500' },
                  { name: 'LMS for EduTech Co.', progress: 100, color: 'bg-yellow-400' },
                ].map((p) => (
                  <div key={p.name} className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">{p.name}</span>
                      <span className="text-gray-300 font-semibold">{p.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${p.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${p.progress}%` }}
                        transition={{ duration: 1.2, delay: 0.8 }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Floating Notification Card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-6 glass bg-gray-900/80 border border-gray-700 rounded-2xl p-4 shadow-xl min-w-[200px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Project Delivered!</div>
                    <div className="text-xs text-gray-400">SaaS platform — 3 days early</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Stat Card */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-8 -left-8 glass bg-gray-900/80 border border-gray-700 rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl">⭐</div>
                  <div>
                    <div className="text-xl font-black text-white">4.9/5.0</div>
                    <div className="text-xs text-gray-400">Client satisfaction score</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Service Pills */}
            <div className="mt-12 flex flex-wrap gap-2 justify-center">
              {['Next.js', 'React Native', 'OpenAI', 'PostgreSQL', 'Cloudflare AI', 'Stripe'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-xs font-semibold bg-gray-800 border border-gray-700 text-gray-300 rounded-full hover:border-green-500/50 hover:text-green-400 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* === Service Cards Row === */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20"
        >
          {SERVICES_PREVIEW.map((s, i) => (
            <motion.div
              key={s.title}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group bg-gray-900/50 border border-gray-800 hover:border-green-500/40 rounded-2xl p-5 transition-all duration-300 cursor-pointer"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${s.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                <s.icon size={22} className="text-white" />
              </div>
              <h3 className="font-bold text-white text-sm mb-1">{s.title}</h3>
              <p className="text-xs text-gray-500">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* === Stats Bar === */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-gray-800 pt-12"
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-black gradient-text mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}