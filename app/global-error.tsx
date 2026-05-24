'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
    // In production: send to Sentry/LogRocket
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-gray-950 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <AlertTriangle size={36} className="text-red-400" />
          </div>
          <h1 className="text-3xl font-black text-white mb-3">Something went wrong</h1>
          <p className="text-gray-400 mb-2">
            An unexpected error occurred. Our team has been notified.
          </p>
          {error.digest && (
            <p className="text-xs text-gray-600 font-mono mb-6">
              Error ID: {error.digest}
            </p>
          )}
          <div className="flex gap-3 justify-center">
            <Button
              onClick={reset}
              className="gradient-bg text-white rounded-xl font-bold shadow-lg shadow-green-500/25"
            >
              <RefreshCw size={14} className="mr-2" />
              Try Again
            </Button>
            <Link href="/">
              <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800 rounded-xl">
                <Home size={14} className="mr-2" />
                Go Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </body>
    </html>
  );
}
