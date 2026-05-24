'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  ArrowRight,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BrandLogo from '@/components/ui/BrandLogo';

const Footer = () => {
  const services = [
    'Software Development',
    'AI/ML Development',
    'UX/UI Design',
    'Testing Services',
    'LMS Platform',
    'Mobile Apps'
  ];

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Blog', href: '/blog' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Partner Program', href: '/partner' },
    { name: 'Contact', href: '/contact' }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            {/* GS Brand Logo */}
            <BrandLogo variant="footer" showText={true} asLink={true} />
            <p className="text-gray-300 leading-relaxed">
              Transforming businesses with cutting-edge technology solutions. 
              We specialize in software development, AI/ML, and comprehensive 
              digital transformation services.
            </p>
            <div className="flex space-x-3">
              <a href="https://facebook.com/guidesoftitsolutions" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all duration-200">
                <Facebook size={18} />
              </a>
              <a href="https://twitter.com/guidesoft_it" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter"
                className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center hover:bg-sky-600 hover:scale-110 transition-all duration-200">
                <Twitter size={18} />
              </a>
              <a href="https://linkedin.com/company/guidesoftitsolutions" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-900 hover:scale-110 transition-all duration-200">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link 
                    href="/services" 
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight size={16} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight size={16} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Get In Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-green-400" />
                <span className="text-gray-300">+91 8500647979 / +91 8884162999</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-green-400" />
                <span className="text-gray-300">info@guideitsol.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-green-400 mt-1" />
                <span className="text-gray-300">Guntur & Bangalore, India</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h5 className="font-semibold">Newsletter Subscription</h5>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                <Button type="submit" className="gradient-bg text-white w-full">
                  <Send size={16} className="mr-2" />
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2026 Guide Soft IT Solutions. All rights reserved. Built with ❤️ in India.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;