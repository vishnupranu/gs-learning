'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Download, CreditCard, DollarSign, CheckCircle, Clock, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/providers/AuthProvider';
import Link from 'next/link';

export default function DashboardPaymentsPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const [payments, setPayments] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetch('/api/user/profile')
        .then(r => r.json())
        .then(data => {
          setPayments(data.user?.payments || []);
          setFetching(false);
        })
        .catch(() => setFetching(false));
    }
  }, [isAuthenticated]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!isAuthenticated) return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Please log in to view payments</h2>
          <Link href="/auth/login"><Button className="gradient-bg text-white">Login</Button></Link>
        </div>
      </div>
      <Footer />
    </div>
  );

  const totalPaid = payments.filter(p => p.status === 'COMPLETED').reduce((s, p) => s + (p.amount || 0), 0);
  const pending = payments.filter(p => p.status === 'PENDING').reduce((s, p) => s + (p.amount || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <div className="pt-24 pb-16 max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Billing & Payments</h1>
          <p className="text-gray-500">{payments.length} transactions · all-time account history</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Paid', value: `$${totalPaid.toLocaleString()}`, icon: CheckCircle, color: 'text-green-600 bg-green-100' },
            { label: 'Pending', value: `$${pending.toLocaleString()}`, icon: Clock, color: 'text-yellow-600 bg-yellow-100' },
            { label: 'Transactions', value: payments.length, icon: CreditCard, color: 'text-blue-600 bg-blue-100' },
          ].map(s => (
            <div key={s.label} className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
              <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center mb-3`}>
                <s.icon size={18} />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</div>
              <div className="text-gray-500 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* UPI Pay Now */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white">
            <h3 className="font-bold text-xl mb-1">Pay Now via UPI</h3>
            <p className="text-green-100 text-sm">Instant payment, no fees, directly to our account</p>
          </div>
          <div className="bg-white rounded-2xl px-6 py-4 text-center">
            <div className="text-xs text-gray-500 font-medium">UPI ID</div>
            <div className="text-xl font-bold text-gray-900 font-mono">8884162999-4@ybl</div>
            <div className="text-xs text-green-600 font-semibold">Praveenkumar</div>
          </div>
          <div className="flex flex-col gap-2">
            <a href="https://wa.me/918884162999?text=I%20want%20to%20make%20a%20payment" target="_blank" rel="noopener noreferrer">
              <Button className="bg-white text-green-700 hover:bg-gray-100 w-full">
                💬 Payment Help
              </Button>
            </a>
          </div>
        </div>

        {/* Payment History */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Transaction History</h3>
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          {fetching ? (
            <div className="divide-y divide-gray-100">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="p-4 flex items-center justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="h-4 shimmer rounded w-1/2" />
                    <div className="h-3 shimmer rounded w-1/3" />
                  </div>
                  <div className="h-8 shimmer rounded w-20" />
                </div>
              ))}
            </div>
          ) : payments.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <DollarSign size={48} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg font-semibold mb-2">No transactions yet</p>
              <p className="text-sm mb-4">Your payment history will appear here after your first transaction.</p>
              <Link href="/pricing">
                <Button className="gradient-bg text-white">View Pricing Plans</Button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {payments.map((payment, i) => (
                <motion.div
                  key={payment.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      payment.status === 'COMPLETED' ? 'bg-green-100' :
                      payment.status === 'PENDING' ? 'bg-yellow-100' : 'bg-red-100'
                    }`}>
                      <CreditCard size={18} className={
                        payment.status === 'COMPLETED' ? 'text-green-600' :
                        payment.status === 'PENDING' ? 'text-yellow-600' : 'text-red-600'
                      } />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {payment.course?.title || 'Service Payment'}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                        <span className="font-mono">{payment.id?.slice(0, 16)}...</span>
                        {payment.createdAt && (
                          <>
                            <span>·</span>
                            <span>{new Date(payment.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-bold text-gray-900 dark:text-white">${(payment.amount || 0).toLocaleString()}</p>
                      <Badge className={
                        payment.status === 'COMPLETED' ? 'bg-green-100 text-green-700 mt-1' :
                        payment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700 mt-1' :
                        'bg-red-100 text-red-700 mt-1'
                      }>
                        {payment.status}
                      </Badge>
                    </div>
                    <button
                      onClick={() => {
                        const content = `Receipt\nID: ${payment.id}\nAmount: $${payment.amount}\nStatus: ${payment.status}\nDate: ${new Date(payment.createdAt).toLocaleDateString()}`;
                        const blob = new Blob([content], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url; a.download = `receipt-${payment.id}.txt`; a.click();
                      }}
                      className="p-2 text-gray-400 hover:text-green-500 transition-colors"
                      title="Download receipt"
                    >
                      <Download size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
