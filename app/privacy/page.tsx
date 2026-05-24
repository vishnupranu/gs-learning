'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <div className="pt-24 pb-20 max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="premium-card p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Privacy Policy</h1>
          <p className="text-gray-500 mb-8 pb-8 border-b border-gray-100 dark:border-gray-800">Last updated: May 19, 2026</p>
          
          <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 text-sm leading-loose space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, and other information you choose to provide.</p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. Use of Information</h2>
            <p>We may use the information we collect about you to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Provide, maintain, and improve our Services.</li>
              <li>Perform internal operations, including troubleshooting, data analysis, testing, and research.</li>
              <li>Send communications we think will be of interest to you, including information about products, services, promotions, news, and events.</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. Data Security</h2>
            <p>We implement appropriate technical and organizational security measures to protect your personal information against accidental or unlawful destruction, loss, alteration, and unauthorized disclosure or access.</p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">4. Third-Party Services</h2>
            <p>We may share your information with third-party vendors, consultants, and other service providers who need access to such information to carry out work on our behalf (e.g., payment processors like Stripe and Razorpay, analytics providers like Google Analytics).</p>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
