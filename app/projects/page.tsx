'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Filter, Calendar, Users, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Banking', 'E-commerce', 'AI/ML', 'Real Estate', 'Education', 'Healthcare'];

  const projects = [
    {
      id: 1,
      title: 'SecureBank Digital Platform',
      category: 'Banking',
      description: 'Comprehensive digital banking solution with real-time transactions, mobile banking, AI-powered fraud detection, and advanced security features.',
      image: 'https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Redis', 'Docker'],
      features: [
        'Real-time Transaction Processing',
        'AI-Powered Fraud Detection',
        'Mobile Banking App',
        'Advanced Security Features',
        'Customer Analytics Dashboard',
        'Multi-currency Support'
      ],
      client: 'SecureBank Ltd.',
      duration: '8 months',
      teamSize: '12 developers',
      year: '2023',
      status: 'Completed',
      rating: 4.9,
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 2,
      title: 'ShopEasy Marketplace',
      category: 'E-commerce',
      description: 'Multi-vendor e-commerce platform with advanced inventory management, payment processing, and vendor analytics.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['Next.js', 'Stripe', 'MongoDB', 'Docker', 'Redis', 'AWS'],
      features: [
        'Multi-vendor Management',
        'Advanced Payment Gateway',
        'Inventory Tracking',
        'Order Management System',
        'Vendor Analytics',
        'Mobile Responsive Design'
      ],
      client: 'ShopEasy Inc.',
      duration: '6 months',
      teamSize: '8 developers',
      year: '2023',
      status: 'Completed',
      rating: 4.8,
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 3,
      title: 'IntelliAnalytics AI Platform',
      category: 'AI/ML',
      description: 'Advanced machine learning platform for predictive analytics, data visualization, and business intelligence.',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['Python', 'TensorFlow', 'React', 'FastAPI', 'PostgreSQL', 'Docker'],
      features: [
        'Predictive Analytics Models',
        'Real-time Data Processing',
        'Interactive Dashboards',
        'Custom ML Algorithms',
        'Data Visualization Tools',
        'API Integration'
      ],
      client: 'DataCorp Analytics',
      duration: '10 months',
      teamSize: '6 developers',
      year: '2023',
      status: 'Completed',
      rating: 4.9,
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 4,
      title: 'PropertyPro Management System',
      category: 'Real Estate',
      description: 'Comprehensive real estate platform with property listings, virtual tours, CRM integration, and lead management.',
      image: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'Google Maps API', 'AWS', 'Docker'],
      features: [
        'Property Listing Management',
        '360° Virtual Tours',
        'CRM Integration',
        'Lead Management System',
        'Advanced Search Filters',
        'Mobile App Integration'
      ],
      client: 'PropertyPro Realty',
      duration: '7 months',
      teamSize: '10 developers',
      year: '2022',
      status: 'Completed',
      rating: 4.7,
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 5,
      title: 'EduTech Learning Platform',
      category: 'Education',
      description: 'Complete learning management system with course creation, student progress tracking, and interactive assessments.',
      image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'AWS', 'Stripe'],
      features: [
        'Course Management System',
        'Student Progress Tracking',
        'Interactive Assessments',
        'Live Video Classes',
        'Certificate Generation',
        'Payment Integration'
      ],
      client: 'EduTech Solutions',
      duration: '9 months',
      teamSize: '14 developers',
      year: '2022',
      status: 'Completed',
      rating: 4.8,
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 6,
      title: 'HealthCare Connect Platform',
      category: 'Healthcare',
      description: 'Telemedicine platform enabling remote consultations, appointment scheduling, and health records management.',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['React Native', 'Express', 'PostgreSQL', 'WebRTC', 'AWS', 'Docker'],
      features: [
        'Video Consultation System',
        'Appointment Scheduling',
        'Electronic Health Records',
        'Prescription Management',
        'Patient Portal',
        'Doctor Dashboard'
      ],
      client: 'HealthCare Plus',
      duration: '11 months',
      teamSize: '16 developers',
      year: '2022',
      status: 'Completed',
      rating: 4.9,
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 7,
      title: 'FinTech Payment Gateway',
      category: 'Banking',
      description: 'Secure payment processing system with multi-currency support, fraud detection, and merchant dashboard.',
      image: 'https://images.pexels.com/photos/259200/pexels-photo-259200.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis', 'Kubernetes', 'AWS'],
      features: [
        'Multi-currency Processing',
        'Fraud Detection System',
        'Merchant Dashboard',
        'API Gateway',
        'Real-time Notifications',
        'Compliance Management'
      ],
      client: 'PaySecure Ltd.',
      duration: '12 months',
      teamSize: '18 developers',
      year: '2021',
      status: 'Completed',
      rating: 4.8,
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 8,
      title: 'SmartRetail Analytics',
      category: 'E-commerce',
      description: 'Advanced retail analytics platform with inventory optimization, sales forecasting, and customer insights.',
      image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['Python', 'Django', 'React', 'PostgreSQL', 'Celery', 'Docker'],
      features: [
        'Sales Forecasting',
        'Inventory Optimization',
        'Customer Behavior Analysis',
        'Real-time Dashboards',
        'Automated Reporting',
        'Integration APIs'
      ],
      client: 'RetailMax Corp.',
      duration: '6 months',
      teamSize: '8 developers',
      year: '2021',
      status: 'Completed',
      rating: 4.7,
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const featuredProjects = projects.filter(project => project.featured);

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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={14}
        className={`${index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
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
                Our <span className="block">Projects</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
                Explore our portfolio of successful projects across various industries, 
                showcasing our expertise in delivering innovative digital solutions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
                {[
                  { number: '50+', label: 'Projects Completed' },
                  { number: '15+', label: 'Industries Served' },
                  { number: '98%', label: 'Client Satisfaction' },
                  { number: '4.8★', label: 'Average Rating' }
                ].map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-bold mb-2">{stat.number}</div>
                    <div className="text-green-100">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Projects */}
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
                Featured <span className="gradient-text">Projects</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Highlighting our most impactful and innovative projects that have 
                transformed businesses and delivered exceptional results.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {featuredProjects.slice(0, 4).map((project) => (
                <motion.div key={project.id} variants={itemVariants}>
                  <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                    <div className="relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <a
                          href={project.liveUrl}
                          className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-green-500 hover:text-white transition-all duration-300"
                        >
                          <ExternalLink size={16} />
                        </a>
                        <a
                          href={project.githubUrl}
                          className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-800 hover:text-white transition-all duration-300"
                        >
                          <Github size={16} />
                        </a>
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-green-500 text-white">Featured</Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{project.category}</Badge>
                        <div className="flex items-center">
                          {renderStars(project.rating)}
                          <span className="ml-1 text-sm text-gray-600">({project.rating})</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>

                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-2" />
                          {project.duration}
                        </div>
                        <div className="flex items-center">
                          <Users size={14} className="mr-2" />
                          {project.teamSize}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 4 && (
                          <Badge variant="secondary" className="text-xs">
                            +{project.technologies.length - 4} more
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Client: {project.client}</span>
                        <Badge className="bg-green-100 text-green-800">{project.status}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* All Projects */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
                All <span className="gradient-text">Projects</span>
              </h2>

              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {filters.map((filter) => (
                  <Button
                    key={filter}
                    variant={activeFilter === filter ? "default" : "outline"}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-6 py-2 rounded-full transition-all duration-300 ${
                      activeFilter === filter 
                        ? 'gradient-bg text-white border-0' 
                        : 'hover:border-green-500 hover:text-green-600'
                    }`}
                  >
                    <Filter size={16} className="mr-2" />
                    {filter}
                  </Button>
                ))}
              </div>

              <div className="text-center text-sm text-gray-600 mb-8">
                Showing {filteredProjects.length} of {projects.length} projects
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              key={activeFilter} // Re-animate when filter changes
            >
              {filteredProjects.map((project) => (
                <motion.div key={project.id} variants={itemVariants}>
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
                    <div className="relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <a
                          href={project.liveUrl}
                          className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-green-500 hover:text-white transition-all duration-300"
                        >
                          <ExternalLink size={14} />
                        </a>
                        <a
                          href={project.githubUrl}
                          className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-800 hover:text-white transition-all duration-300"
                        >
                          <Github size={14} />
                        </a>
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge variant="outline" className="bg-white/90">{project.category}</Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500">{project.year}</span>
                        <div className="flex items-center">
                          {renderStars(project.rating)}
                          <span className="ml-1 text-sm text-gray-600">({project.rating})</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-4">
                        <div className="flex items-center">
                          <Calendar size={12} className="mr-1" />
                          {project.duration}
                        </div>
                        <div className="flex items-center">
                          <Users size={12} className="mr-1" />
                          {project.teamSize}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge className="bg-green-100 text-green-800 text-xs">{project.status}</Badge>
                        <Button size="sm" variant="outline" className="text-xs">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {filteredProjects.length === 0 && (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
                <p className="text-gray-600 mb-6">
                  Try selecting a different category to explore our work.
                </p>
                <Button onClick={() => setActiveFilter('All')}>
                  Show All Projects
                </Button>
              </motion.div>
            )}
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
                Ready to Start Your Next Project?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Let's discuss your requirements and create a solution that drives your business forward. 
                Our team is ready to turn your vision into reality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gradient-bg text-white hover:opacity-90 text-lg px-8 py-4">
                  Start Your Project
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-4">
                  View Case Studies
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProjectsPage;