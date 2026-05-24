'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Lightbulb, TrendingUp, Globe, Shield, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const AboutPage = () => {
  const values = [
    {
      icon: Target,
      title: 'Mission',
      description: 'To empower businesses worldwide with innovative technology solutions that drive growth and digital transformation.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Lightbulb,
      title: 'Vision',
      description: 'To be the leading global provider of cutting-edge IT solutions, setting industry standards for innovation and excellence.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards of quality in every project, ensuring exceptional results and client satisfaction.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We work closely with our clients as partners, understanding their unique needs and delivering tailored solutions.',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      position: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      bio: 'With over 15 years of experience in technology leadership, Rajesh founded Guide Soft to bridge the gap between innovative technology and business success.'
    },
    {
      name: 'Priya Sharma',
      position: 'CTO',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      bio: 'Priya leads our technical vision with expertise in AI/ML, cloud computing, and enterprise architecture. She holds a PhD in Computer Science.'
    },
    {
      name: 'Amit Patel',
      position: 'Head of Development',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      bio: 'Amit oversees our development teams and ensures delivery of high-quality software solutions. He specializes in full-stack development and DevOps.'
    },
    {
      name: 'Sneha Reddy',
      position: 'Head of Design',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      bio: 'Sneha leads our design team, creating user-centered experiences that delight customers. She has 10+ years of experience in UX/UI design.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Projects Delivered', icon: TrendingUp },
    { number: '150+', label: 'Happy Clients', icon: Users },
    { number: '50+', label: 'Team Members', icon: Globe },
    { number: '5+', label: 'Years Experience', icon: Award }
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
                About <span className="block">Guide Soft IT Solutions</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
                Pioneering digital transformation through innovative technology solutions, 
                exceptional service, and unwavering commitment to client success.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Our <span className="gradient-text">Story</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Founded in 2019 with a vision to democratize technology for businesses of all sizes, 
                  Guide Soft IT Solutions has grown from a small startup to a trusted technology partner 
                  for companies across the globe.
                </p>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Our journey began when our founders recognized the gap between rapidly evolving 
                  technology and businesses' ability to leverage it effectively. We set out to bridge 
                  this gap by providing accessible, innovative, and results-driven IT solutions.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Today, we're proud to have helped over 150 businesses transform their operations, 
                  reach new markets, and achieve unprecedented growth through technology.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img
                  src="https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Guide Soft Team"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold gradient-text">5+</div>
                  <div className="text-gray-600">Years of Excellence</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-4 gap-8"
              variants={containerVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {stats.map((stat, index) => (
                <motion.div key={stat.label} variants={itemVariants as any} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-yellow-400 rounded-full flex items-center justify-center">
                    <stat.icon className="text-white" size={28} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Values */}
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
                Our Core <span className="gradient-text">Values</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The principles that guide our work and define our commitment to excellence
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {values.map((value, index) => (
                <motion.div key={value.title} variants={itemVariants as any}>
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <value.icon className="text-white" size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Meet Our <span className="gradient-text">Leadership Team</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Experienced leaders driving innovation and excellence in everything we do
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {team.map((member, index) => (
                <motion.div key={member.name} variants={itemVariants as any}>
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
                    <div className="relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-green-600 font-medium mb-3">{member.position}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
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
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Let's discuss how our expertise can help you achieve your technology goals 
                and drive your business forward.
              </p>
              <motion.button
                className="gradient-bg text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Journey With Us
              </motion.button>
            </motion.div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutPage;