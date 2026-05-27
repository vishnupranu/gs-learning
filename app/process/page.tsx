'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  FileSearch, 
  Palette, 
  Code, 
  TestTube, 
  Rocket,
  CheckCircle,
  Clock,
  Users,
  Target
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const ProcessPage = () => {
  const steps = [
    {
      number: '01',
      icon: MessageCircle,
      title: 'Discovery & Consultation',
      description: 'We begin with in-depth discussions to understand your business goals, challenges, and requirements. Our team conducts thorough research to ensure we have a complete understanding of your needs.',
      details: [
        'Initial consultation and requirement gathering',
        'Business analysis and goal alignment',
        'Stakeholder interviews and workshops',
        'Technology consultation and recommendations',
        'Project scope definition and documentation'
      ],
      duration: '1-2 weeks',
      deliverables: ['Project Brief', 'Requirements Document', 'Technology Recommendations'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      number: '02',
      icon: FileSearch,
      title: 'Research & Planning',
      description: 'Comprehensive market research and strategic planning to create the optimal solution architecture. We analyze competitors, define user personas, and create detailed project roadmaps.',
      details: [
        'Market research and competitive analysis',
        'User persona development and journey mapping',
        'Technical architecture design',
        'Project roadmap and milestone planning',
        'Resource allocation and team assignment'
      ],
      duration: '2-3 weeks',
      deliverables: ['Research Report', 'Technical Architecture', 'Project Roadmap'],
      color: 'from-green-500 to-green-600'
    },
    {
      number: '03',
      icon: Palette,
      title: 'Design & Prototyping',
      description: 'Creating user-centered designs and interactive prototypes that align with your brand and user needs. We focus on creating intuitive interfaces and exceptional user experiences.',
      details: [
        'User experience (UX) design and wireframing',
        'User interface (UI) design and visual identity',
        'Interactive prototyping and user testing',
        'Design system creation and documentation',
        'Responsive design for all devices'
      ],
      duration: '3-4 weeks',
      deliverables: ['Wireframes', 'UI Designs', 'Interactive Prototype', 'Design System'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      number: '04',
      icon: Code,
      title: 'Development',
      description: 'Agile development process with regular updates and iterative improvements based on feedback. Our experienced developers use best practices and modern technologies.',
      details: [
        'Agile development methodology implementation',
        'Frontend and backend development',
        'Database design and implementation',
        'API development and third-party integrations',
        'Regular code reviews and quality assurance'
      ],
      duration: '6-12 weeks',
      deliverables: ['Working Software', 'API Documentation', 'Code Repository'],
      color: 'from-orange-500 to-orange-600'
    },
    {
      number: '05',
      icon: TestTube,
      title: 'Testing & Quality Assurance',
      description: 'Rigorous testing across multiple devices and platforms to ensure flawless performance. We conduct comprehensive testing to identify and resolve any issues.',
      details: [
        'Automated testing suite development',
        'Manual testing and user acceptance testing',
        'Performance testing and optimization',
        'Security testing and vulnerability assessment',
        'Cross-browser and device compatibility testing'
      ],
      duration: '2-3 weeks',
      deliverables: ['Test Reports', 'Bug Fixes', 'Performance Metrics'],
      color: 'from-pink-500 to-pink-600'
    },
    {
      number: '06',
      icon: Rocket,
      title: 'Launch & Support',
      description: 'Seamless deployment and ongoing support to ensure your solution continues to perform optimally. We provide training, documentation, and continuous support.',
      details: [
        'Production deployment and go-live support',
        'User training and documentation',
        'Performance monitoring and optimization',
        '24/7 technical support and maintenance',
        'Regular updates and feature enhancements'
      ],
      duration: 'Ongoing',
      deliverables: ['Live Application', 'User Documentation', 'Support Plan'],
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const benefits = [
    {
      icon: Target,
      title: 'Proven Methodology',
      description: 'Our process has been refined through 500+ successful projects across various industries.'
    },
    {
      icon: Users,
      title: 'Collaborative Approach',
      description: 'We work closely with your team throughout the entire process, ensuring alignment and transparency.'
    },
    {
      icon: Clock,
      title: 'Timely Delivery',
      description: 'Our structured approach ensures projects are delivered on time and within budget.'
    },
    {
      icon: CheckCircle,
      title: 'Quality Assurance',
      description: 'Rigorous testing and quality checks at every stage ensure exceptional results.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0f1e] text-gray-900 dark:text-white transition-colors duration-300">
      <Header />
      
      <div className="pt-20 pb-16">
        {/* Hero Section */}
        <section className="relative py-24 gradient-grid-bg overflow-hidden flex items-center">
          {/* Background decorative elements */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 dark:bg-green-500/15 rounded-full blur-3xl pointer-events-none animate-blob" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 dark:bg-yellow-500/15 rounded-full blur-3xl pointer-events-none animate-blob animation-delay-2000" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 dark:bg-green-500/20 border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-semibold mb-6">
                <Target size={14} /> Development Roadmap
              </div>
              <h1 className="hero-h1 font-bold mb-6 text-gray-900 dark:text-white">
                Our <span className="gradient-text">Process</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                A proven methodology that ensures successful project delivery through 
                systematic planning, execution, and continuous improvement.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white dark:bg-gray-900/20 border-y border-gray-100 dark:border-gray-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Why Our <span className="gradient-text">Process Works</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Our structured approach has been refined through years of experience and hundreds of successful projects.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {benefits.map((benefit, index) => (
                <motion.div key={benefit.title} variants={itemVariants}>
                  <Card className="h-full border border-gray-100 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/60 glass-card transition-all duration-300 text-center">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-yellow-400 rounded-full flex items-center justify-center">
                        <benefit.icon className="text-white" size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{benefit.title}</h3>
                      <p className="text-gray-650 dark:text-gray-400 leading-relaxed">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-20 bg-gray-50/50 dark:bg-gray-950/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Our 6-Step <span className="gradient-text">Development Process</span>
              </h2>
              <p className="text-lg text-gray-650 dark:text-gray-400 max-w-3xl mx-auto">
                From initial consultation to ongoing support, we guide you through every step 
                of your digital transformation journey.
              </p>
            </motion.div>

            <div className="space-y-16">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  className={`flex flex-col lg:flex-row items-center gap-12 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Content */}
                  <div className="flex-1 lg:max-w-2xl">
                    <Card className="border border-gray-150 dark:border-gray-800 bg-white dark:bg-gray-900/65 glass-card shadow-xl hover:shadow-2xl transition-all duration-300">
                      <CardContent className="p-8">
                        <div className="flex items-center gap-4 mb-6">
                          <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center`}>
                            <step.icon className="text-white" size={28} />
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Step {step.number}</span>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{step.title}</h3>
                          </div>
                        </div>
                        
                        <p className="text-gray-650 dark:text-gray-400 mb-6 leading-relaxed text-lg">
                          {step.description}
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Activities</h4>
                            <div className="space-y-2">
                              {step.details.map((detail, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                                  <span className="text-sm text-gray-600 dark:text-gray-400">{detail}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <div className="mb-4">
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Duration</h4>
                              <p className="text-green-600 dark:text-green-400 font-medium">{step.duration}</p>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Deliverables</h4>
                              <div className="space-y-1">
                                {step.deliverables.map((deliverable, idx) => (
                                  <div key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                                    • {deliverable}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Step Number Visual */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-24 h-24 bg-white dark:bg-gray-900 border-4 border-green-400 rounded-full shadow-lg flex items-center justify-center">
                        <span className="text-2xl font-bold text-green-600 dark:text-green-455">{step.number}</span>
                      </div>
                      <div className="absolute -top-2 -left-2 w-28 h-28 bg-green-400 rounded-full opacity-20 animate-ping"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Overview */}
        <section className="py-16 bg-white dark:bg-gray-900/20 border-t border-gray-100 dark:border-gray-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Project <span className="gradient-text">Timeline</span>
              </h2>
              <p className="text-lg text-gray-650 dark:text-gray-400 max-w-2xl mx-auto">
                Typical project timeline from start to finish, though actual duration may vary based on project complexity.
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-r from-green-50/50 to-yellow-50/50 dark:from-green-950/20 dark:to-yellow-950/10 rounded-2xl p-8 border border-green-100/30 dark:border-green-900/20 shadow-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                {steps.map((step, index) => (
                  <div key={step.number} className="text-center">
                    <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <step.icon className="text-white" size={20} />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">{step.title}</h4>
                    <p className="text-xs text-gray-605 dark:text-gray-400">{step.duration}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-gray-650 dark:text-gray-400 mb-4">
                  <strong>Total Project Duration:</strong> Typically 3-6 months for most projects
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-450">
                  Timeline may vary based on project scope, complexity, and client requirements
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-gray-900 via-slate-950 to-black relative overflow-hidden border-t border-gray-800">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-lg md:text-xl text-gray-405 mb-8 max-w-2xl mx-auto leading-relaxed">
                Let's discuss how our proven process can help bring your vision to life. 
                Our team is ready to guide you through every step of your digital transformation journey.
              </p>
              <motion.button
                className="gradient-bg text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity text-lg shadow-lg shadow-green-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Project Today
              </motion.button>
            </motion.div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProcessPage;