'use client';

import Link from 'next/link';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-600">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-3 justify-center">
            <Button onClick={() => window.history.back()} variant="outline">
              <ArrowLeft className="mr-2" size={16} />
              Go Back
            </Button>
            <Link href="/">
              <Button>
                <Home className="mr-2" size={16} />
                Go Home
              </Button>
            </Link>
          </div>

          <div className="pt-6 border-t">
            <p className="text-sm text-gray-600 mb-3">Looking for something specific?</p>
            <Link href="/contact">
              <Button variant="ghost" size="sm">
                <Search className="mr-2" size={14} />
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
