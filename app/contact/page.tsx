'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare,
  User,
  Building,
  Globe,
  Facebook,
  Twitter,
  Linkedin,
  Instagram
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { toast } from 'sonner';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    service: ''
  });
  const [loading, setLoading] = useState(false);

  const services = [
    'Software Development',
    'AI/ML Development',
    'UX/UI Design',
    'Mobile Applications',
    'Testing Services',
    'LMS Platform',
    'Consultation',
    'Other'
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91 8884162999', '+91 8500647979'],
      description: 'Mon-Sat from 9am to 7pm IST'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['praveenkumar.kanneganti@gmail.com', 'support@guidesoftitsolutions.com'],
      description: 'We respond within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Office',
      details: ['Guntur, Andhra Pradesh', 'Bangalore, Karnataka'],
      description: 'Visit us for in-person meetings'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 4:00 PM'],
      description: 'Sunday closed'
    }
  ];

  const socialLinks = [
    { icon: Facebook, name: 'Facebook', url: 'https://facebook.com/guidesoftitsolutions', color: 'hover:text-blue-600' },
    { icon: Twitter, name: 'X / Twitter', url: 'https://twitter.com/guidesoft_it', color: 'hover:text-sky-400' },
    { icon: Linkedin, name: 'LinkedIn', url: 'https://linkedin.com/company/guidesoftitsolutions', color: 'hover:text-blue-800' },
    { icon: Instagram, name: 'Instagram', url: 'https://instagram.com/guidesoftitsolutions', color: 'hover:text-pink-600' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      toast.success('Message sent successfully! We\'ll get back to you within 24 hours.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        service: ''
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-20 pb-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-green-500 via-green-600 to-yellow-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Get In <span className="block">Touch</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
                Ready to transform your business with innovative technology solutions? 
                Let's discuss your project and bring your vision to life.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {contactInfo.map((info, index) => (
                <motion.div key={info.title} variants={itemVariants as any}>
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-yellow-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <info.icon className="text-white" size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{info.title}</h3>
                      <div className="space-y-1 mb-3">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-700 font-medium">{detail}</p>
                        ))}
                      </div>
                      <p className="text-gray-600 text-sm">{info.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                      <MessageSquare className="mr-3" size={28} />
                      Send us a Message
                    </CardTitle>
                    <p className="text-gray-600">
                      Fill out the form below and we'll get back to you within 24 hours.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name *
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              type="text"
                              name="name"
                              placeholder="Enter your full name"
                              className="pl-10"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address *
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              type="email"
                              name="email"
                              placeholder="Enter your email"
                              className="pl-10"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              type="tel"
                              name="phone"
                              placeholder="Enter your phone number"
                              className="pl-10"
                              value={formData.phone}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company
                          </label>
                          <div className="relative">
                            <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              type="text"
                              name="company"
                              placeholder="Enter your company name"
                              className="pl-10"
                              value={formData.company}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Service Interested In
                          </label>
                          <select
                            name="service"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            value={formData.service}
                            onChange={handleInputChange}
                          >
                            <option value="">Select a service</option>
                            {services.map((service) => (
                              <option key={service} value={service}>{service}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Subject *
                          </label>
                          <Input
                            type="text"
                            name="subject"
                            placeholder="Enter subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Message *
                        </label>
                        <Textarea
                          name="message"
                          placeholder="Tell us about your project requirements..."
                          className="min-h-[120px]"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full gradient-bg text-white hover:opacity-90 text-lg py-3"
                        disabled={loading}
                      >
                        {loading ? 'Sending...' : 'Send Message'}
                        <Send className="ml-2" size={20} />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Map & Additional Info */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Map */}
                <Card className="border-0 shadow-xl overflow-hidden">
                  <div className="h-64 bg-gray-200 relative">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61440.24!2d80.4036!3d16.3067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a748039bdc2c3%3A0x1002ada0c6c3f499!2sGuntur%2C%20Andhra%20Pradesh%2C%20India!5e0!3m2!1sen!2sin!4v1716000000000!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Guide Soft IT Solutions — Guntur Office"
                    ></iframe>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Our Office</h3>
                    <p className="text-gray-600 mb-4">
                      We'd love to meet you in person. Schedule a visit to our office 
                      to discuss your project requirements face-to-face.
                    </p>
                    <a
                      href="https://maps.google.com/?q=Guntur,Andhra+Pradesh,India"
                      target="_blank" rel="noopener noreferrer"
                    >
                      <Button variant="outline" className="w-full hover:border-green-400 hover:text-green-600">
                        <MapPin className="mr-2" size={16} />
                        Get Directions — Guntur Office
                      </Button>
                    </a>
                  </CardContent>
                </Card>

                {/* Social Media */}
                <Card className="border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      Connect With Us
                    </CardTitle>
                    <p className="text-gray-600">
                      Follow us on social media for updates and insights.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {socialLinks.map((social) => (
                        <a
                          key={social.name}
                          href={social.url}
                          className={`flex items-center p-3 border rounded-lg hover:shadow-md transition-all duration-300 ${social.color}`}
                        >
                          <social.icon size={20} className="mr-3" />
                          <span className="font-medium">{social.name}</span>
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Contact */}
                <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-yellow-50">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Need Immediate Assistance?
                    </h3>
                    <p className="text-gray-600 mb-6">
                      For urgent matters or immediate support, don't hesitate to call us directly.
                    </p>
                    <div className="space-y-3">
                      <a
                        href="tel:+918884162999"
                        className="flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <Phone className="mr-3 text-green-600" size={20} />
                        <div>
                          <p className="font-medium text-gray-900">+91 8884162999</p>
                          <p className="text-sm text-gray-600">WhatsApp &amp; Calls</p>
                        </div>
                      </a>
                      <a
                        href="mailto:praveenkumar.kanneganti@gmail.com"
                        className="flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <Mail className="mr-3 text-green-600" size={20} />
                        <div>
                          <p className="font-medium text-gray-900">praveenkumar.kanneganti@gmail.com</p>
                          <p className="text-sm text-gray-600">General Inquiries</p>
                        </div>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked <span className="gradient-text">Questions</span>
              </h2>
              <p className="text-lg text-gray-600">
                Quick answers to common questions about our services and process.
              </p>
            </motion.div>

            <motion.div
              className="space-y-6"
              variants={containerVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  question: "How long does a typical project take?",
                  answer: "Project timelines vary based on complexity and scope. Simple websites take 2-4 weeks, while complex applications can take 3-6 months. We provide detailed timelines during our initial consultation."
                },
                {
                  question: "Do you provide ongoing support after project completion?",
                  answer: "Yes, we offer comprehensive support and maintenance packages. This includes bug fixes, updates, security patches, and feature enhancements to keep your solution running smoothly."
                },
                {
                  question: "What is your development process?",
                  answer: "We follow a structured 6-step process: Discovery & Consultation, Research & Planning, Design & Prototyping, Development, Testing & QA, and Launch & Support. This ensures quality delivery and client satisfaction."
                },
                {
                  question: "Can you work with our existing team?",
                  answer: "Absolutely! We can integrate with your existing team, provide staff augmentation, or work as an independent development partner. We're flexible and adapt to your preferred working style."
                }
              ].map((faq, index) => (
                <motion.div key={index} variants={itemVariants as any}>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default ContactPage;