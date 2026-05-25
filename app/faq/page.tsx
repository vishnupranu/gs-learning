'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ChevronDown, MessageCircle, Phone, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const FAQS = [
  {
    category: 'Services & Pricing',
    questions: [
      {
        q: 'What services does GuideSoft IT Solutions offer?',
        a: 'We offer a comprehensive range of IT services including custom software development (web & mobile), AI/ML development, UX/UI design, LMS platform development, Cloud & DevOps, and enterprise solutions. We serve clients across 18+ countries with over 500 projects successfully delivered.'
      },
      {
        q: 'How much does a software development project cost?',
        a: 'Our pricing starts from ₹75,000 ($900) for web development, ₹1,25,000 ($1,500) for mobile apps, ₹1,50,000 ($1,800) for AI/ML projects, and ₹2,00,000 ($2,400) for LMS platforms. Enterprise solutions are quoted separately. All prices are starting rates; final cost depends on project scope and complexity.'
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept UPI (8884162999-4@ybl | Praveenkumar K.), PayPal, bank transfers (NEFT/RTGS/IMPS), and Razorpay (cards, netbanking, wallets). Our standard payment structure is 50% advance payment before work begins and 50% on project delivery.'
      },
      {
        q: 'Do you offer refunds or money-back guarantee?',
        a: 'We stand behind the quality of our work. If we fail to deliver the agreed project scope, we will refund the advance payment. All projects include a 30-day post-launch support period for bug fixes at no additional cost. We also sign NDAs and detailed SoW agreements to protect both parties.'
      },
    ]
  },
  {
    category: 'Process & Timeline',
    questions: [
      {
        q: 'What is your development process?',
        a: 'Our process follows an Agile methodology: 1) Discovery & requirements (1-2 weeks), 2) System design & architecture, 3) Sprint-based development with weekly demos, 4) QA & testing, 5) Deployment & handover, 6) Post-launch support. We provide weekly progress reports and maintain a shared project dashboard.'
      },
      {
        q: 'How long does a typical project take?',
        a: 'Timeline varies by complexity: Simple websites (4-6 weeks), Web applications (6-12 weeks), Mobile apps (8-14 weeks), AI/ML projects (6-12 weeks), LMS platforms (10-16 weeks), Enterprise systems (3-9 months). We provide detailed timelines during the discovery phase.'
      },
      {
        q: 'Will I own the source code and intellectual property?',
        a: 'Yes, absolutely. Upon final payment, you receive 100% ownership of the source code, design files, database schemas, and all other project assets. We transfer all GitHub repositories and assets to your accounts. You retain full IP rights.'
      },
      {
        q: 'Do you work with international clients?',
        a: 'Yes, we work with clients across 18+ countries. Our team is fluent in English and we operate across IST, EST, and GMT time zones to ensure smooth communication. We conduct meetings via Google Meet, Zoom, or Microsoft Teams and provide real-time project dashboards.'
      },
    ]
  },
  {
    category: 'Technology & Quality',
    questions: [
      {
        q: 'What technologies and frameworks do you use?',
        a: 'We use industry-leading technologies: Frontend (Next.js, React, Vue.js), Mobile (React Native, Flutter), Backend (Node.js, Python, Django, FastAPI), AI/ML (TensorFlow, PyTorch, OpenAI, Anthropic), Database (PostgreSQL, MongoDB, Redis), Cloud (AWS, Google Cloud, Azure), DevOps (Docker, Kubernetes, GitHub Actions).'
      },
      {
        q: 'How do you ensure code quality and security?',
        a: 'We maintain rigorous quality standards: peer code reviews, automated testing (unit + integration), security audits (OWASP guidelines), performance optimization, and CI/CD pipelines. We also follow GDPR, HIPAA, and ISO 9001 compliance standards where required. All sensitive data is encrypted at rest and in transit.'
      },
      {
        q: 'Do you provide post-launch support and maintenance?',
        a: 'Yes. All projects include 3-6 months of post-launch support (varies by package) for bug fixes and minor enhancements. For ongoing maintenance, we offer monthly retainer packages starting from ₹15,000/month. We also offer 24/7 critical issue support plans for enterprise clients.'
      },
      {
        q: 'Can I integrate third-party services and APIs?',
        a: 'Absolutely. We specialize in API integrations including payment gateways (Stripe, Razorpay, PayPal), communication (WhatsApp Business API, Telegram, Twilio), maps (Google Maps, MapBox), analytics (Google Analytics, Mixpanel), and any custom APIs you may have.'
      },
    ]
  },
  {
    category: 'Communication & Support',
    questions: [
      {
        q: 'How do I communicate with the development team?',
        a: 'We maintain transparent communication through: dedicated Slack/WhatsApp group for daily updates, weekly video calls for progress reviews, real-time project tracking on Jira or Trello, shared Google Drive for documents, and a dedicated project manager as your single point of contact.'
      },
      {
        q: 'Can I book a free consultation before starting a project?',
        a: 'Yes! We offer a free 30-minute project consultation call where we discuss your requirements, suggest the best technical approach, and provide a rough estimate. Book directly at guideitsol.com/booking, WhatsApp us at +91 8884162999, or email info@guideitsol.com.'
      },
    ]
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 dark:border-gray-800">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-5 flex items-center justify-between gap-4"
      >
        <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{q}</span>
        <ChevronDown
          size={18}
          className={`text-green-500 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />

      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 gradient-grid-bg-light dark:gradient-grid-bg" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="highlight-badge mb-6 inline-flex">❓ Got Questions?</span>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
              Frequently Asked
              <span className="block gradient-text">Questions</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Find answers to the most common questions about our services, 
              pricing, process, and technology.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 space-y-12">
          {FAQS.map((section, si) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: si * 0.1 }}
            >
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 gradient-bg rounded-full inline-block" />
                {section.category}
              </h2>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl px-6">
                {section.questions.map((faq) => (
                  <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Our team is available 24/7. Reach us via WhatsApp, email, or book a free call.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="https://wa.me/918884162999" target="_blank" rel="noopener noreferrer">
                <Button className="gradient-bg text-white h-12 px-6 rounded-2xl font-bold shadow-lg shadow-green-500/25">
                  <MessageCircle size={16} className="mr-2" /> WhatsApp Us
                </Button>
              </a>
              <a href="mailto:info@guideitsol.com">
                <Button variant="outline" className="h-12 px-6 rounded-2xl font-bold">
                  <Mail size={16} className="mr-2" /> Email Us
                </Button>
              </a>
              <Link href="/booking">
                <Button variant="outline" className="h-12 px-6 rounded-2xl font-bold">
                  <Phone size={16} className="mr-2" /> Book Free Call
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
