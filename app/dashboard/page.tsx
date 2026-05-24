'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Calendar, 
  CreditCard, 
  FileText, 
  Settings, 
  User,
  Bell,
  Award,
  Clock,
  TrendingUp,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/components/providers/AuthProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const [stats, setStats] = useState([
    { title: 'Active Courses', value: '0', icon: BookOpen, color: 'text-blue-600' },
    { title: 'Completed Projects', value: '0', icon: Award, color: 'text-green-600' },
    { title: 'Hours Learned', value: '0', icon: Clock, color: 'text-purple-600' },
    { title: 'Certificates', value: '0', icon: FileText, color: 'text-orange-600' }
  ]);
  const [recentCourses, setRecentCourses] = useState<any[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      try {
        const [enrollmentsRes, bookingsRes, paymentsRes] = await Promise.all([
          fetch('/api/enrollments').then(r => r.ok ? r.json() : []),
          fetch('/api/services/booking').then(r => r.ok ? r.json() : []),
          fetch('/api/payments').then(r => r.ok ? r.json() : [])
        ]);

        // Format courses
        const formattedCourses = (enrollmentsRes.length ? enrollmentsRes : []).map((e: any) => ({
          id: e.courseId,
          title: e.course?.title || 'Unknown Course',
          progress: e.progress || 0,
          instructor: e.course?.instructor?.name || 'Unknown',
          status: e.completed ? 'Completed' : 'In Progress'
        }));
        setRecentCourses(formattedCourses.slice(0, 3));

        // Format stats based on real data
        const activeCourses = formattedCourses.filter((c: any) => c.status !== 'Completed').length;
        const completedCourses = formattedCourses.filter((c: any) => c.status === 'Completed').length;
        setStats([
          { title: 'Active Courses', value: activeCourses.toString(), icon: BookOpen, color: 'text-blue-600' },
          { title: 'Completed Courses', value: completedCourses.toString(), icon: Award, color: 'text-green-600' },
          { title: 'Hours Learned', value: (completedCourses * 10).toString(), icon: Clock, color: 'text-purple-600' },
          { title: 'Certificates', value: completedCourses.toString(), icon: FileText, color: 'text-orange-600' }
        ]);

        // Format appointments
        setUpcomingAppointments((bookingsRes.length ? bookingsRes : []).slice(0, 3).map((b: any) => ({
          id: b.id,
          title: 'Consultation',
          date: new Date(b.date).toLocaleDateString(),
          time: b.time,
          type: 'Video Call',
          consultant: 'Guide Soft Expert'
        })));

        // Format orders
        // Assuming API returns payments for orders
        setRecentOrders((paymentsRes.length ? paymentsRes : []).slice(0, 3).map((p: any) => ({
          id: p.id,
          service: p.course?.title || 'Service Order',
          amount: `$${p.amount}`,
          status: p.status === 'COMPLETED' ? 'Completed' : 'In Progress',
          date: new Date(p.createdAt).toLocaleDateString()
        })));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h2>
          <p className="text-gray-600 mb-8">You need to be logged in to access your dashboard.</p>
          <Link href="/auth/login">
            <Button className="gradient-bg text-white">Login Now</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-green-500 to-yellow-400 rounded-2xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
                  <p className="text-green-100">Ready to continue your learning journey?</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Button variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                    <Bell size={16} className="mr-2" />
                    Notifications
                  </Button>
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-16 h-16 rounded-full border-4 border-white/30"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full border-4 border-white/30 bg-white/20 flex items-center justify-center">
                      <User size={32} className="text-white" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            variants={containerVariants as any}
            initial="hidden"
            animate="visible"
          >
            {stats.map((stat, index) => (
              <motion.div key={stat.title} variants={itemVariants as any}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ${stat.color}`}>
                        <stat.icon size={24} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recent Courses */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>My Courses</span>
                      <Link href="/lms">
                        <Button variant="outline" size="sm">View All</Button>
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentCourses.map((course) => (
                        <div key={course.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{course.title}</h4>
                            <Badge variant={course.status === 'Completed' ? 'default' : 'secondary'}>
                              {course.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">Instructor: {course.instructor}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex-1 mr-4">
                              <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                                <span>Progress</span>
                                <span>{course.progress}%</span>
                              </div>
                              <Progress value={course.progress} className="h-2" />
                            </div>
                            <Button size="sm" variant="outline">
                              {course.status === 'Completed' ? 'Review' : 'Continue'}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Orders */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Recent Orders</span>
                      <Link href="/orders">
                        <Button variant="outline" size="sm">View All</Button>
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-semibold text-gray-900">{order.service}</h4>
                            <p className="text-sm text-gray-600">Order ID: {order.id}</p>
                            <p className="text-sm text-gray-500">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">{order.amount}</p>
                            <Badge variant={order.status === 'Completed' ? 'default' : 'secondary'}>
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link href="/booking">
                      <Button className="w-full justify-start" variant="outline">
                        <Calendar className="mr-2" size={16} />
                        Book Consultation
                      </Button>
                    </Link>
                    <Link href="/lms">
                      <Button className="w-full justify-start" variant="outline">
                        <BookOpen className="mr-2" size={16} />
                        Browse Courses
                      </Button>
                    </Link>
                    <Link href="/services">
                      <Button className="w-full justify-start" variant="outline">
                        <CreditCard className="mr-2" size={16} />
                        Order Services
                      </Button>
                    </Link>
                    <Link href="/profile">
                      <Button className="w-full justify-start" variant="outline">
                        <Settings className="mr-2" size={16} />
                        Account Settings
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Upcoming Appointments */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingAppointments.map((appointment) => (
                        <div key={appointment.id} className="p-3 border rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-1">{appointment.title}</h4>
                          <p className="text-sm text-gray-600">{appointment.consultant}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-gray-500">{appointment.date}</span>
                            <span className="text-sm font-medium text-green-600">{appointment.time}</span>
                          </div>
                          <Badge variant="outline" className="mt-2">
                            {appointment.type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Performance */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Learning Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">This Month</span>
                        <span className="text-sm font-medium text-green-600">+15%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                      <div className="flex items-center justify-center pt-4">
                        <TrendingUp className="text-green-500 mr-2" size={20} />
                        <span className="text-sm text-gray-600">Great progress!</span>
                      </div>
                    </div>
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

export default Dashboard;