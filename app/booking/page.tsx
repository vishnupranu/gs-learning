'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { toast } from 'sonner';
import { useAuth } from '@/components/providers/AuthProvider';

const BookingPage = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState<number | ''>('');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    company: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const services = [
    {
      id: 1,
      name: 'Free Consultation',
      duration: '30 minutes',
      price: 'Free',
      description: 'Discuss your project requirements and get expert advice'
    },
    {
      id: 2,
      name: 'Technical Review',
      duration: '60 minutes',
      price: '$100',
      description: 'In-depth technical analysis of your existing systems'
    },
    {
      id: 3,
      name: 'Project Planning Session',
      duration: '90 minutes',
      price: '$150',
      description: 'Comprehensive project planning and roadmap creation'
    },
    {
      id: 4,
      name: 'Training Session',
      duration: '120 minutes',
      price: '$200',
      description: 'Personalized training on specific technologies or tools'
    }
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  // Generate next 30 days for booking
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    
    return dates;
  };

  const availableDates = generateDates();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !selectedService) {
      toast.error('Please select date, time, and service');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/services/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId: selectedService,
          date: selectedDate,
          time: selectedTime,
          notes: formData.message,
          phone: formData.phone,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to book appointment');
      }
      
      toast.success('Appointment booked successfully! We\'ll send you a confirmation email shortly.');
      
      // Reset form
      setSelectedDate('');
      setSelectedTime('');
      setSelectedService('');
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        phone: '',
        company: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Book Your <span className="gradient-text">Consultation</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Schedule a meeting with our experts to discuss your project requirements 
              and explore how we can help transform your business.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="mr-2" size={24} />
                      Schedule Your Appointment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Service Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Select Service
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {services.map((service) => (
                            <div
                              key={service.id}
                              className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                                selectedService === service.id
                                  ? 'border-green-500 bg-green-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              onClick={() => setSelectedService(service.id)}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-gray-900">{service.name}</h3>
                                <Badge variant={service.price === 'Free' ? 'default' : 'secondary'}>
                                  {service.price}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                              <div className="flex items-center text-sm text-gray-500">
                                <Clock size={14} className="mr-1" />
                                {service.duration}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Date Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Select Date
                        </label>
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-2 max-h-40 overflow-y-auto">
                          {availableDates.map((date) => (
                            <button
                              key={date}
                              type="button"
                              className={`p-2 text-sm border rounded-lg transition-all duration-200 ${
                                selectedDate === date
                                  ? 'border-green-500 bg-green-50 text-green-700'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              onClick={() => setSelectedDate(date)}
                            >
                              {new Date(date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                              })}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Time Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Select Time
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              type="button"
                              className={`p-2 text-sm border rounded-lg transition-all duration-200 ${
                                selectedTime === time
                                  ? 'border-green-500 bg-green-50 text-green-700'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              onClick={() => setSelectedTime(time)}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Personal Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name *
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              type="text"
                              placeholder="Enter your full name"
                              className="pl-10"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                              placeholder="Enter your email"
                              className="pl-10"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number *
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              type="tel"
                              placeholder="Enter your phone number"
                              className="pl-10"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company (Optional)
                          </label>
                          <Input
                            type="text"
                            placeholder="Enter your company name"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Project Details (Optional)
                        </label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Textarea
                            placeholder="Tell us about your project requirements..."
                            className="pl-10 min-h-[100px]"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        className="w-full gradient-bg text-white hover:opacity-90 text-lg py-3"
                        disabled={loading}
                      >
                        {loading ? 'Booking...' : 'Book Appointment'}
                        <CheckCircle className="ml-2" size={20} />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Booking Summary & Info */}
            <div className="space-y-6">
              {/* Booking Summary */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedService && (
                      <div className="p-3 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-800">
                          {services.find(s => s.id === selectedService)?.name}
                        </h4>
                        <p className="text-sm text-green-600">
                          {services.find(s => s.id === selectedService)?.duration} • {services.find(s => s.id === selectedService)?.price}
                        </p>
                      </div>
                    )}
                    
                    {selectedDate && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar size={16} className="mr-2" />
                        {formatDate(selectedDate)}
                      </div>
                    )}
                    
                    {selectedTime && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock size={16} className="mr-2" />
                        {selectedTime}
                      </div>
                    )}
                    
                    {!selectedService && !selectedDate && !selectedTime && (
                      <p className="text-sm text-gray-500">
                        Please select service, date, and time to see booking summary.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Phone size={16} className="mr-3 text-green-600" />
                        <div>
                          <p className="font-medium">Call Us</p>
                          <p className="text-sm text-gray-600">+91 8884162999</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Mail size={16} className="mr-3 text-green-600" />
                        <div>
                          <p className="font-medium">Email Us</p>
                          <p className="text-sm text-gray-600">info@guideitsol.com</p>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <p className="text-sm text-gray-600">
                          Our team typically responds within 24 hours. For urgent matters, 
                          please call us directly.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-yellow-50">
                  <CardHeader>
                    <CardTitle>What to Expect</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start">
                        <CheckCircle size={16} className="mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Detailed discussion of your project requirements</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={16} className="mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Expert recommendations and technology suggestions</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={16} className="mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Timeline and budget estimation</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={16} className="mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Next steps and project roadmap</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BookingPage;