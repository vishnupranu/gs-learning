'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  Clock, 
  Star, 
  Filter,
  Search,
  Play,
  Award,
  TrendingUp,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

const LMSPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Web Development', 'AI/ML', 'Mobile Development', 'UI/UX Design', 'DevOps', 'Data Science'];

  const courses = [
    {
      id: 1,
      title: 'Complete React Development Bootcamp',
      category: 'Web Development',
      instructor: 'John Smith',
      instructorAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      price: '$299',
      originalPrice: '$399',
      rating: 4.8,
      students: 12450,
      duration: '45 hours',
      lessons: 128,
      level: 'Beginner to Advanced',
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Master React from basics to advanced concepts including hooks, context, and modern patterns.',
      skills: ['React', 'JavaScript', 'HTML/CSS', 'Node.js'],
      featured: true
    },
    {
      id: 2,
      title: 'Machine Learning Fundamentals',
      category: 'AI/ML',
      instructor: 'Dr. Sarah Johnson',
      instructorAvatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      price: '$449',
      originalPrice: '$599',
      rating: 4.9,
      students: 8930,
      duration: '60 hours',
      lessons: 95,
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Learn machine learning algorithms, data preprocessing, and model evaluation techniques.',
      skills: ['Python', 'TensorFlow', 'Scikit-learn', 'Data Analysis'],
      featured: false
    },
    {
      id: 3,
      title: 'Mobile App Development with React Native',
      category: 'Mobile Development',
      instructor: 'Mike Davis',
      instructorAvatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      price: '$349',
      originalPrice: '$449',
      rating: 4.7,
      students: 6780,
      duration: '40 hours',
      lessons: 86,
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Build cross-platform mobile apps using React Native and deploy to App Store and Google Play.',
      skills: ['React Native', 'JavaScript', 'Mobile UI', 'API Integration'],
      featured: true
    },
    {
      id: 4,
      title: 'UI/UX Design Masterclass',
      category: 'UI/UX Design',
      instructor: 'Emily Rodriguez',
      instructorAvatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      price: '$199',
      originalPrice: '$299',
      rating: 4.6,
      students: 15230,
      duration: '35 hours',
      lessons: 72,
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Learn user-centered design principles, wireframing, prototyping, and design systems.',
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
      featured: false
    },
    {
      id: 5,
      title: 'Full-Stack Web Development',
      category: 'Web Development',
      instructor: 'Alex Thompson',
      instructorAvatar: 'https://images.pexels.com/photos/2182975/pexels-photo-2182975.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      price: '$599',
      originalPrice: '$799',
      rating: 4.9,
      students: 9650,
      duration: '80 hours',
      lessons: 156,
      level: 'Beginner to Advanced',
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Complete full-stack development course covering frontend, backend, and deployment.',
      skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
      featured: true
    },
    {
      id: 6,
      title: 'DevOps and Cloud Computing',
      category: 'DevOps',
      instructor: 'David Kim',
      instructorAvatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      price: '$399',
      originalPrice: '$499',
      rating: 4.8,
      students: 5420,
      duration: '55 hours',
      lessons: 98,
      level: 'Intermediate to Advanced',
      image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Master DevOps practices, CI/CD pipelines, containerization, and cloud deployment.',
      skills: ['Docker', 'Kubernetes', 'AWS', 'Jenkins'],
      featured: false
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeFilter === 'All' || course.category === activeFilter;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredCourses = courses.filter(course => course.featured);

  const stats = [
    { number: '50+', label: 'Expert Instructors', icon: Users },
    { number: '200+', label: 'Courses Available', icon: BookOpen },
    { number: '25K+', label: 'Students Enrolled', icon: TrendingUp },
    { number: '95%', label: 'Completion Rate', icon: Award }
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
        size={14}
        className={`${index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950">
      <Header />
      
      <div className="pt-20 pb-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-500 via-green-600 to-yellow-400 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Master New Skills with Our
                <span className="block">Learning Platform</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
                Access world-class courses taught by industry experts. Learn at your own pace 
                and advance your career with practical, hands-on training.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-4">
                  <Play className="mr-2" size={20} />
                  Start Learning Today
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-4">
                  Browse Courses
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white dark:bg-[#0a0f1e]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {stats.map((stat, index) => (
                <motion.div key={stat.label} variants={itemVariants} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-yellow-400 rounded-full flex items-center justify-center">
                    <stat.icon className="text-white" size={28} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.number}</div>
                  <div className="text-gray-655 dark:text-gray-400 font-semibold">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Featured Courses */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Featured <span className="gradient-text">Courses</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Start with our most popular and highly-rated courses, carefully selected 
                to provide maximum value for your learning journey.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {featuredCourses.map((course) => (
                <motion.div key={course.id} variants={itemVariants}>
                  <Card className="h-full bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
                    <div className="relative">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-green-500 text-white">Featured</Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary">{course.level}</Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{course.category}</Badge>
                        <div className="flex items-center">
                          {renderStars(course.rating)}
                          <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">({course.rating})</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                        {course.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{course.description}</p>

                      <div className="flex items-center mb-4">
                        <img
                          src={course.instructorAvatar}
                          alt={course.instructor}
                          className="w-8 h-8 rounded-full mr-3"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{course.instructor}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <span className="flex items-center">
                          <Users size={14} className="mr-1" />
                          {course.students.toLocaleString()} students
                        </span>
                        <span className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {course.duration}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {course.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {course.skills.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{course.skills.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-gray-900 dark:text-white">{course.price}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 line-through ml-2">{course.originalPrice}</span>
                        </div>
                        <Button size="sm" className="gradient-bg text-white hover:opacity-90">
                          Enroll Now
                          <ChevronRight size={16} className="ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* All Courses */}
        <section className="py-16 bg-white dark:bg-[#0a0f1e]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                All <span className="gradient-text">Courses</span>
              </h2>

              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search courses..."
                      className="pl-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-200 dark:border-gray-800"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex gap-2 overflow-x-auto bg-transparent scrollbar-hide">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={activeFilter === category ? "default" : "outline"}
                      onClick={() => setActiveFilter(category)}
                      className={`whitespace-nowrap ${
                        activeFilter === category 
                          ? 'gradient-bg text-white border-0' 
                          : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-green-500 dark:hover:border-green-400 hover:text-green-600 dark:hover:text-green-400'
                       }`}
                    >
                      <Filter size={14} className="mr-2" />
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400 mb-8">
                Showing {filteredCourses.length} of {courses.length} courses
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              key={activeFilter + searchQuery} // Re-animate when filters change
            >
              {filteredCourses.map((course) => (
                <motion.div key={course.id} variants={itemVariants}>
                  <Card className="h-full bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
                    <div className="relative">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary">{course.level}</Badge>
                      </div>
                      {course.featured && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-green-500 text-white">Featured</Badge>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{course.category}</Badge>
                        <div className="flex items-center">
                          {renderStars(course.rating)}
                          <span className="ml-1 text-sm text-gray-655 dark:text-gray-400">({course.rating})</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                        {course.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{course.description}</p>

                      <div className="flex items-center mb-4">
                        <img
                          src={course.instructorAvatar}
                          alt={course.instructor}
                          className="w-8 h-8 rounded-full mr-3"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{course.instructor}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <span className="flex items-center">
                          <Users size={14} className="mr-1" />
                          {course.students.toLocaleString()} students
                        </span>
                        <span className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {course.duration}
                        </span>
                        <span className="flex items-center">
                          <BookOpen size={14} className="mr-1" />
                          {course.lessons} lessons
                        </span>
                        <span className="flex items-center">
                          <Award size={14} className="mr-1" />
                          Certificate
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-gray-900 dark:text-white">{course.price}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 line-through ml-2">{course.originalPrice}</span>
                        </div>
                        <Button size="sm" className="gradient-bg text-white hover:opacity-90">
                          Enroll Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {filteredCourses.length === 0 && (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <BookOpen size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No courses found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your search terms or filters to find the perfect course.
                </p>
                <Button onClick={() => { setActiveFilter('All'); setSearchQuery(''); }}>
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of students who have transformed their careers with our courses. 
                Start learning today and unlock your potential.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/login">
                  <Button size="lg" className="gradient-bg text-white hover:opacity-90 text-lg px-8 py-4">
                    Create Free Account
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-4">
                    Talk to an Advisor
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

export default LMSPage;