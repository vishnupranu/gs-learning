'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <div className="pt-24 pb-20 max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="premium-card p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Terms of Service</h1>
          <p className="text-gray-500 mb-8 pb-8 border-b border-gray-100 dark:border-gray-800">Last updated: May 19, 2026</p>
          
          <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 text-sm leading-loose space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. Agreement to Terms</h2>
            <p>By accessing or using Guide Soft IT Solutions services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.</p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. Services Rendered</h2>
            <p>We provide custom software development, AI integration, UX/UI design, and related IT consulting services. All services are subject to a formal Statement of Work (SOW) or project proposal which acts as a binding addendum to these terms.</p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. Payment Terms</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>All pricing is explicitly outlined in your project proposal.</li>
              <li>Standard payment structure is 50% upfront, 25% at midpoint, and 25% upon final delivery.</li>
              <li>Payments are non-refundable once a milestone has been approved by the client.</li>
              <li>We accept payments via UPI, Stripe, Razorpay, and direct wire transfers.</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">4. Intellectual Property</h2>
            <p>Upon receipt of full final payment, all source code, design assets, and intellectual property developed specifically for the client during the project are transferred to the client. Guide Soft IT Solutions retains rights to any pre-existing libraries or generic open-source components used.</p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">5. Confidentiality (NDA)</h2>
            <p>We maintain strict confidentiality regarding all client data, business logic, and proprietary information. A formal NDA can be executed upon request prior to project initiation.</p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">6. Limitation of Liability</h2>
            <p>In no event shall Guide Soft IT Solutions, nor its directors, employees, or partners, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of our services.</p>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
