'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Phone, Mail, Sun, Moon, User, LogOut, Calendar,
  ChevronDown, Sparkles, BookOpen, DollarSign, MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/providers/AuthProvider';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import BrandLogo from '@/components/ui/BrandLogo';

const servicesMenu = [
  { name: 'Software Development', href: '/services#software', icon: '💻', desc: 'Web, mobile & enterprise apps' },
  { name: 'AI / ML Development', href: '/services#ai', icon: '🧠', desc: 'Intelligent automation & chatbots' },
  { name: 'UX/UI Design', href: '/services#design', icon: '🎨', desc: 'User research & design systems' },
  { name: 'LMS Platform', href: '/lms', icon: '🎓', desc: 'E-learning & certification' },
  { name: 'Mobile Apps', href: '/services#mobile', icon: '📱', desc: 'iOS, Android & React Native' },
  { name: 'Cloud & DevOps', href: '/services#cloud', icon: '☁️', desc: 'AWS, Azure, GCP & CI/CD' },
];

const companyMenu = [
  { name: 'About Us', href: '/about', icon: '🏢' },
  { name: 'Case Studies', href: '/case-studies', icon: '📊' },
  { name: 'Portfolio', href: '/portfolio', icon: '🖥️' },
  { name: 'Testimonials', href: '/testimonials', icon: '⭐' },
  { name: 'Blog', href: '/blog', icon: '✍️' },
  { name: 'Partner Program', href: '/partner', icon: '🤝' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [companyOpen, setCompanyOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/features' },
    { name: 'AI Tools', href: '/ai-tools' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-2 px-4 text-xs text-center font-medium">
        🚀 &nbsp;Special Offer: Get 20% off on all services this month! &nbsp;
        <a href="/pricing" className="underline font-bold hover:text-yellow-300 transition-colors">View Plans →</a>
        <span className="mx-4 hidden md:inline">|</span>
        <span className="hidden md:inline">📞 +91 8500647979 &nbsp;|&nbsp; 📧 info@guideitsol.com &nbsp;|&nbsp; 📍 Guntur & Bangalore, India</span>
      </div>

      {/* Main Header */}
      <motion.header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-lg border-b border-gray-100 dark:border-gray-800/50'
            : 'bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo — GS Brand Logo */}
            <BrandLogo variant="header" showText={true} asLink={true} />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group ${
                    isActive(item.href)
                      ? 'text-green-600 bg-green-50 dark:bg-green-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-green-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute inset-0 bg-green-50 dark:bg-green-900/20 rounded-lg -z-10"
                    />
                  )}
                </Link>
              ))}

              {/* Services Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center gap-1">
                  Services
                  <ChevronDown size={14} className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-72 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800/50 overflow-hidden p-2"
                    >
                      {servicesMenu.map((s) => (
                        <Link
                          key={s.name}
                          href={s.href}
                          className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-green-50 dark:hover:bg-green-900/20 text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors group"
                        >
                          <span className="text-lg group-hover:scale-110 transition-transform mt-0.5">{s.icon}</span>
                          <div>
                            <div className="text-sm font-semibold">{s.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{s.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Company Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCompanyOpen(true)}
                onMouseLeave={() => setCompanyOpen(false)}
              >
                <button className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center gap-1">
                  Company
                  <ChevronDown size={14} className={`transition-transform duration-200 ${companyOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {companyOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-56 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800/50 overflow-hidden p-2"
                    >
                      {companyMenu.map((s) => (
                        <Link
                          key={s.name}
                          href={s.href}
                          className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl hover:bg-green-50 dark:hover:bg-green-900/20 text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors group"
                        >
                          <span className="text-base group-hover:scale-110 transition-transform">{s.icon}</span>
                          {s.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                title="Toggle theme"
              >
                {mounted && resolvedTheme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {/* WhatsApp */}
              <a
                href="https://wa.me/918884162999"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center bg-green-50 text-green-600 hover:bg-green-100 transition-all"
                title="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>

              {/* Auth */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2 rounded-xl">
                      <div className="w-7 h-7 gradient-bg rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xs">{user.name?.charAt(0)?.toUpperCase()}</span>
                      </div>
                      <span className="text-sm font-medium max-w-[100px] truncate">{user.name}</span>
                      <ChevronDown size={12} className="text-gray-400" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 rounded-2xl p-2">
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm">
                        <User size={14} /> Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/bookings" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm">
                        <Calendar size={14} /> My Bookings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/payments" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm">
                        <DollarSign size={14} /> Billing
                      </Link>
                    </DropdownMenuItem>
                    {user.role && ['SUPER_ADMIN', 'ADMIN', 'MANAGER'].includes(user.role) && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-purple-600">
                          <Sparkles size={14} /> Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-red-500 cursor-pointer">
                      <LogOut size={14} /> Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm" className="rounded-xl text-sm font-medium">
                    Sign In
                  </Button>
                </Link>
              )}

              <Link href="/booking">
                <Button
                  size="sm"
                  className="gradient-bg text-white rounded-xl font-semibold hover:opacity-90 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all"
                >
                  Book Free Consultation
                </Button>
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {mounted && resolvedTheme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-gray-100 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md overflow-hidden"
            >
              <div className="px-4 py-6 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-green-50 text-green-600 dark:bg-green-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-1 pb-1 border-t border-gray-100 dark:border-gray-800 my-2" />
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 pb-2">Services</div>
                {servicesMenu.map((s) => (
                  <Link
                    key={s.name}
                    href={s.href}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{s.icon}</span> {s.name}
                  </Link>
                ))}
                <div className="pt-4 space-y-2">
                  {user ? (
                    <>
                      <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full rounded-xl">Dashboard</Button>
                      </Link>
                      <Button onClick={logout} variant="ghost" className="w-full rounded-xl text-red-500">Sign Out</Button>
                    </>
                  ) : (
                    <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full rounded-xl">Sign In</Button>
                    </Link>
                  )}
                  <Link href="/booking" onClick={() => setIsMenuOpen(false)}>
                    <Button className="gradient-bg text-white w-full rounded-xl">Book Consultation</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Header;