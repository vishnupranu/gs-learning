'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Brain, 
  Palette, 
  TestTube, 
  Smartphone, 
  GraduationCap,
  ArrowRight,
  CheckCircle,
  Star,
  Users
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

const ServicesPage = () => {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      icon: Code,
      title: 'Software Development',
      shortDesc: 'Custom web applications, enterprise software, and scalable solutions built with modern technologies.',
      fullDesc: 'Our software development team creates robust, scalable applications tailored to your business needs. From web applications to enterprise software, we use cutting-edge technologies and best practices to deliver solutions that drive growth and efficiency.',
      features: [
        'Custom Web Applications',
        'Enterprise Software Solutions',
        'API Development & Integration',
        'Database Design & Optimization',
        'Cloud-Native Applications',
        'Microservices Architecture'
      ],
      technologies: ['React', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker'],
      pricing: 'Starting from $5,000',
      timeline: '4-12 weeks',
      color: 'from-blue-500 to-blue-600',
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: Brain,
      title: 'AI/ML Development',
      shortDesc: 'Intelligent solutions leveraging machine learning, natural language processing, and computer vision.',
      fullDesc: 'Transform your business with artificial intelligence and machine learning solutions. Our AI experts develop custom models, implement automation, and create intelligent systems that learn and adapt to your business needs.',
      features: [
        'Machine Learning Models',
        'Natural Language Processing',
        'Computer Vision Solutions',
        'Predictive Analytics',
        'Chatbots & Virtual Assistants',
        'AI-Powered Automation'
      ],
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI', 'Scikit-learn', 'Jupyter'],
      pricing: 'Starting from $8,000',
      timeline: '6-16 weeks',
      color: 'from-purple-500 to-purple-600',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: Palette,
      title: 'UX/UI Design',
      shortDesc: 'User-centered design approach creating intuitive interfaces and exceptional user experiences.',
      fullDesc: 'Our design team creates beautiful, functional interfaces that users love. We focus on user research, wireframing, prototyping, and creating design systems that ensure consistency and usability across all touchpoints.',
      features: [
        'User Experience Research',
        'Wireframing & Prototyping',
        'Visual Design & Branding',
        'Design System Creation',
        'Usability Testing',
        'Mobile-First Design'
      ],
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle', 'Framer'],
      pricing: 'Starting from $3,000',
      timeline: '3-8 weeks',
      color: 'from-pink-500 to-pink-600',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: TestTube,
      title: 'Testing Services',
      shortDesc: 'Comprehensive quality assurance ensuring your software meets the highest standards.',
      fullDesc: 'Our QA team ensures your software is bug-free, secure, and performs optimally. We provide comprehensive testing services including automated testing, performance testing, and security audits.',
      features: [
        'Automated Testing',
        'Manual Quality Assurance',
        'Performance Testing',
        'Security Testing',
        'Cross-Browser Testing',
        'Mobile App Testing'
      ],
      technologies: ['Selenium', 'Jest', 'Cypress', 'JMeter', 'Postman', 'TestRail'],
      pricing: 'Starting from $2,000',
      timeline: '2-6 weeks',
      color: 'from-orange-500 to-orange-600',
      image: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: Smartphone,
      title: 'Mobile Applications',
      shortDesc: 'Native and cross-platform mobile apps that deliver seamless user experiences.',
      fullDesc: 'We develop high-performance mobile applications for iOS and Android platforms. Our mobile solutions are designed to provide excellent user experiences while leveraging device capabilities and platform-specific features.',
      features: [
        'iOS App Development',
        'Android App Development',
        'Cross-Platform Solutions',
        'App Store Optimization',
        'Push Notifications',
        'Offline Functionality'
      ],
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Xamarin', 'Ionic'],
      pricing: 'Starting from $6,000',
      timeline: '6-14 weeks',
      color: 'from-green-500 to-green-600',
      image: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: GraduationCap,
      title: 'LMS Platform',
      shortDesc: 'Complete learning management systems with course creation, student tracking, and assessments.',
      fullDesc: 'Our LMS solutions provide comprehensive learning management capabilities. From course creation to student progress tracking, we build platforms that facilitate effective online learning and training programs.',
      features: [
        'Course Management System',
        'Student Progress Tracking',
        'Assessment & Quizzing Tools',
        'Video Streaming Integration',
        'Certificate Generation',
        'Analytics Dashboard'
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'AWS', 'Stripe'],
      pricing: 'Starting from $10,000',
      timeline: '8-20 weeks',
      color: 'from-indigo-500 to-indigo-600',
      image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'TechStart Inc.',
      rating: 5,
      text: 'Guide Soft delivered an exceptional web application that transformed our business operations. Their attention to detail and technical expertise is outstanding.',
      service: 'Software Development'
    },
    {
      name: 'Michael Chen',
      company: 'DataFlow Analytics',
      rating: 5,
      text: 'The AI solution they built for us has revolutionized our data analysis capabilities. Highly recommend their AI/ML services.',
      service: 'AI/ML Development'
    },
    {
      name: 'Emily Rodriguez',
      company: 'EduTech Solutions',
      rating: 5,
      text: 'Their LMS platform exceeded our expectations. The user experience is fantastic and our students love the interface.',
      service: 'LMS Platform'
    }
  ];

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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={`${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
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
                Our <span className="block">Services</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
                Comprehensive technology solutions designed to transform your business 
                and drive digital innovation across all industries.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {services.map((service, index) => (
                <motion.div key={service.title} variants={itemVariants}>
                  <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden cursor-pointer"
                        onClick={() => setActiveService(index)}>
                    <div className="relative">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center`}>
                          <service.icon className="text-white" size={24} />
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{service.shortDesc}</p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          {service.pricing}
                        </Badge>
                        <span className="text-sm text-gray-500">{service.timeline}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {service.technologies.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {service.technologies.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{service.technologies.length - 3} more
                          </Badge>
                        )}
                      </div>
                      
                      <Button className="w-full gradient-bg text-white hover:opacity-90">
                        Learn More
                        <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Service Detail Modal */}
        {activeService !== null && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="border-0 shadow-2xl overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative">
                      <img
                        src={services[activeService].image}
                        alt={services[activeService].title}
                        className="w-full h-full object-cover min-h-[400px]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-6 left-6">
                        {(() => { const SvcIcon = services[activeService].icon; return (
                          <div className={`w-16 h-16 bg-gradient-to-r ${services[activeService].color} rounded-full flex items-center justify-center mb-4`}>
                            <SvcIcon className="text-white" size={32} />
                          </div>
                        ); })()}
                        <h2 className="text-3xl font-bold text-white">{services[activeService].title}</h2>
                      </div>
                    </div>

                    <div className="p-8">
                      <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                        {services[activeService].fullDesc}
                      </p>

                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {services[activeService].features.map((feature, idx) => (
                            <div key={idx} className="flex items-center">
                              <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" />
                              <span className="text-gray-600">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                          {services[activeService].technologies.map((tech) => (
                            <Badge key={tech} variant="outline" className="text-green-600 border-green-600">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <h4 className="font-semibold text-gray-900">Starting Price</h4>
                          <p className="text-green-600 font-bold">{services[activeService].pricing}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Timeline</h4>
                          <p className="text-gray-600">{services[activeService].timeline}</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Link href="/contact" className="flex-1">
                          <Button className="w-full gradient-bg text-white hover:opacity-90">
                            Get Quote
                          </Button>
                        </Link>
                        <Link href="/booking" className="flex-1">
                          <Button variant="outline" className="w-full">
                            Book Consultation
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </section>
        )}

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                What Our <span className="gradient-text">Clients Say</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our clients say about our services.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div key={testimonial.name} variants={itemVariants}>
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex gap-1 mb-4">
                        {renderStars(testimonial.rating)}
                      </div>
                      <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.company}</p>
                        <Badge variant="outline" className="mt-2 text-xs">
                          {testimonial.service}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Let's discuss your project requirements and create a solution that drives your business forward.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="gradient-bg text-white hover:opacity-90 text-lg px-8 py-4">
                    Get Free Quote
                  </Button>
                </Link>
                <Link href="/booking">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-4">
                    Schedule Consultation
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default ServicesPage;