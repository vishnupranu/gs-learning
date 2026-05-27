'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Header />
      
      <div className="flex-1 flex pt-20">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-200 dark:border-gray-800 hidden md:block overflow-y-auto bg-white dark:bg-gray-950/50 p-6 fixed h-full">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Getting Started</h3>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <li className="text-green-600 font-medium">Introduction</li>
            <li className="hover:text-gray-900 dark:hover:text-white cursor-pointer">Quick Start</li>
            <li className="hover:text-gray-900 dark:hover:text-white cursor-pointer">Authentication</li>
          </ul>

          <h3 className="font-bold text-gray-900 dark:text-white mt-8 mb-4">API Reference</h3>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <li className="hover:text-gray-900 dark:hover:text-white cursor-pointer">Endpoints</li>
            <li className="hover:text-gray-900 dark:hover:text-white cursor-pointer">Rate Limits</li>
            <li className="hover:text-gray-900 dark:hover:text-white cursor-pointer">Errors</li>
          </ul>
        </div>

        {/* Content */}
        <div className="flex-1 md:ml-64 p-8 md:p-12 lg:p-16 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">API Documentation</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
              Welcome to the Guide Soft IT Solutions Developer API. Use our API to integrate our services, automate your workflows, and build custom solutions on top of our platform.
            </p>

            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Authentication</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                All API endpoints are authenticated using Bearer tokens. You can obtain a token by logging into the admin dashboard and generating an API key in your settings.
              </p>
              
              <div className="bg-gray-900 rounded-xl p-4 mb-8 overflow-x-auto">
                <code className="text-green-400 font-mono text-sm">
                  Authorization: Bearer gs_prod_xxxxxxxxxxxxxx
                </code>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Rate Limiting</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                The API is rate limited to 100 requests per minute per IP address. If you exceed this limit, you will receive a <code>429 Too Many Requests</code> response.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Example Request</h2>
              <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                <pre className="text-gray-300 font-mono text-sm">
{`curl -X GET "https://api.guidesoftitsolutions.com/v1/services" \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json"`}
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
