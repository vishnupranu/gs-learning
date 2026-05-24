'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Cloud, Smartphone, Brain, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const TechnologyPage = () => {
  const [activeCategory, setActiveCategory] = useState('Frontend');

  const categories = [
    {
      id: 'Frontend',
      name: 'Frontend',
      icon: Code,
      color: 'from-blue-500 to-blue-600',
      description: 'Modern frontend technologies for creating exceptional user experiences'
    },
    {
      id: 'Backend',
      name: 'Backend',
      icon: Database,
      color: 'from-green-500 to-green-600',
      description: 'Robust backend solutions for scalable and secure applications'
    },
    {
      id: 'Database',
      name: 'Database',
      icon: Database,
      color: 'from-purple-500 to-purple-600',
      description: 'Reliable database systems for efficient data management'
    },
    {
      id: 'Cloud',
      name: 'Cloud & DevOps',
      icon: Cloud,
      color: 'from-orange-500 to-orange-600',
      description: 'Cloud infrastructure and DevOps tools for modern deployment'
    },
    {
      id: 'Mobile',
      name: 'Mobile',
      icon: Smartphone,
      color: 'from-pink-500 to-pink-600',
      description: 'Cross-platform mobile development technologies'
    },
    {
      id: 'AI',
      name: 'AI/ML',
      icon: Brain,
      color: 'from-indigo-500 to-indigo-600',
      description: 'Artificial intelligence and machine learning frameworks'
    }
  ];

  const technologies = {
    Frontend: [
      {
        name: 'React',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        description: 'A JavaScript library for building user interfaces with component-based architecture.',
        experience: '5+ years',
        projects: '150+',
        expertise: 'Expert'
      },
      {
        name: 'Next.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
        description: 'React framework for production with server-side rendering and static generation.',
        experience: '4+ years',
        projects: '80+',
        expertise: 'Expert'
      },
      {
        name: 'Vue.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
        description: 'Progressive JavaScript framework for building user interfaces.',
        experience: '3+ years',
        projects: '60+',
        expertise: 'Advanced'
      },
      {
        name: 'TypeScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
        description: 'Typed superset of JavaScript that compiles to plain JavaScript.',
        experience: '4+ years',
        projects: '120+',
        expertise: 'Expert'
      },
      {
        name: 'Tailwind CSS',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
        description: 'Utility-first CSS framework for rapidly building custom designs.',
        experience: '3+ years',
        projects: '100+',
        expertise: 'Expert'
      },
      {
        name: 'Angular',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
        description: 'Platform for building mobile and desktop web applications.',
        experience: '4+ years',
        projects: '70+',
        expertise: 'Advanced'
      }
    ],
    Backend: [
      {
        name: 'Node.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
        description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
        experience: '5+ years',
        projects: '140+',
        expertise: 'Expert'
      },
      {
        name: 'Python',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
        description: 'High-level programming language for web development and data science.',
        experience: '6+ years',
        projects: '100+',
        expertise: 'Expert'
      },
      {
        name: 'Django',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
        description: 'High-level Python web framework for rapid development.',
        experience: '4+ years',
        projects: '50+',
        expertise: 'Advanced'
      },
      {
        name: 'Express.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
        description: 'Fast, unopinionated, minimalist web framework for Node.js.',
        experience: '5+ years',
        projects: '120+',
        expertise: 'Expert'
      },
      {
        name: 'FastAPI',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
        description: 'Modern, fast web framework for building APIs with Python.',
        experience: '2+ years',
        projects: '30+',
        expertise: 'Intermediate'
      },
      {
        name: 'Java Spring',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
        description: 'Comprehensive programming and configuration model for Java applications.',
        experience: '3+ years',
        projects: '40+',
        expertise: 'Advanced'
      }
    ],
    Database: [
      {
        name: 'PostgreSQL',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
        description: 'Advanced open-source relational database system.',
        experience: '5+ years',
        projects: '90+',
        expertise: 'Expert'
      },
      {
        name: 'MongoDB',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
        description: 'Document-oriented NoSQL database program.',
        experience: '4+ years',
        projects: '80+',
        expertise: 'Advanced'
      },
      {
        name: 'MySQL',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
        description: 'Open-source relational database management system.',
        experience: '6+ years',
        projects: '100+',
        expertise: 'Expert'
      },
      {
        name: 'Redis',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
        description: 'In-memory data structure store for caching and real-time applications.',
        experience: '3+ years',
        projects: '60+',
        expertise: 'Advanced'
      },
      {
        name: 'Firebase',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
        description: 'Platform for building web and mobile applications.',
        experience: '4+ years',
        projects: '70+',
        expertise: 'Advanced'
      },
      {
        name: 'Elasticsearch',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg',
        description: 'Distributed search and analytics engine.',
        experience: '2+ years',
        projects: '25+',
        expertise: 'Intermediate'
      }
    ],
    Cloud: [
      {
        name: 'AWS',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
        description: 'Comprehensive cloud computing platform by Amazon.',
        experience: '5+ years',
        projects: '100+',
        expertise: 'Expert'
      },
      {
        name: 'Docker',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
        description: 'Platform for developing, shipping, and running applications in containers.',
        experience: '4+ years',
        projects: '80+',
        expertise: 'Advanced'
      },
      {
        name: 'Kubernetes',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
        description: 'Container orchestration platform for automating deployment and scaling.',
        experience: '3+ years',
        projects: '40+',
        expertise: 'Advanced'
      },
      {
        name: 'Google Cloud',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
        description: 'Suite of cloud computing services by Google.',
        experience: '3+ years',
        projects: '50+',
        expertise: 'Advanced'
      },
      {
        name: 'Azure',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
        description: 'Cloud computing service by Microsoft.',
        experience: '2+ years',
        projects: '30+',
        expertise: 'Intermediate'
      },
      {
        name: 'Jenkins',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg',
        description: 'Open-source automation server for CI/CD pipelines.',
        experience: '3+ years',
        projects: '60+',
        expertise: 'Advanced'
      }
    ],
    Mobile: [
      {
        name: 'React Native',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        description: 'Framework for building native mobile apps using React.',
        experience: '4+ years',
        projects: '60+',
        expertise: 'Expert'
      },
      {
        name: 'Flutter',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
        description: 'UI toolkit for building natively compiled applications.',
        experience: '3+ years',
        projects: '40+',
        expertise: 'Advanced'
      },
      {
        name: 'Swift',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg',
        description: 'Programming language for iOS, macOS, and other Apple platforms.',
        experience: '3+ years',
        projects: '35+',
        expertise: 'Advanced'
      },
      {
        name: 'Kotlin',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
        description: 'Modern programming language for Android development.',
        experience: '3+ years',
        projects: '35+',
        expertise: 'Advanced'
      },
      {
        name: 'Ionic',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg',
        description: 'Cross-platform mobile app development framework.',
        experience: '2+ years',
        projects: '25+',
        expertise: 'Intermediate'
      },
      {
        name: 'Xamarin',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xamarin/xamarin-original.svg',
        description: 'Microsoft platform for building cross-platform mobile apps.',
        experience: '2+ years',
        projects: '20+',
        expertise: 'Intermediate'
      }
    ],
    AI: [
      {
        name: 'TensorFlow',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
        description: 'Open-source machine learning framework by Google.',
        experience: '3+ years',
        projects: '30+',
        expertise: 'Advanced'
      },
      {
        name: 'PyTorch',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
        description: 'Machine learning library based on the Torch library.',
        experience: '2+ years',
        projects: '25+',
        expertise: 'Advanced'
      },
      {
        name: 'Scikit-learn',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg',
        description: 'Machine learning library for Python programming language.',
        experience: '4+ years',
        projects: '40+',
        expertise: 'Expert'
      },
      {
        name: 'OpenAI GPT',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
        description: 'Large language models and AI APIs for natural language processing.',
        experience: '2+ years',
        projects: '20+',
        expertise: 'Advanced'
      },
      {
        name: 'Jupyter',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg',
        description: 'Interactive computing environment for data science and ML.',
        experience: '4+ years',
        projects: '50+',
        expertise: 'Expert'
      },
      {
        name: 'Pandas',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
        description: 'Data manipulation and analysis library for Python.',
        experience: '4+ years',
        projects: '45+',
        expertise: 'Expert'
      }
    ]
  };

  const stats = [
    { number: '50+', label: 'Technologies Mastered', icon: Code },
    { number: '100%', label: 'Up-to-date Stack', icon: Shield },
    { number: '24/7', label: 'Technical Support', icon: Cloud },
    { number: '5+', label: 'Years Experience', icon: Brain }
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

  const getExpertiseColor = (expertise: string) => {
    switch (expertise) {
      case 'Expert': return 'bg-green-100 text-green-800';
      case 'Advanced': return 'bg-blue-100 text-blue-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
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
                Our Technology <span className="block">Stack</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
                We leverage cutting-edge technologies and frameworks to build robust, 
                scalable, and future-ready solutions for your business needs.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-white">
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
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Technology Categories */}
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
                Technology <span className="gradient-text">Categories</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore our expertise across different technology domains and see the tools we use to build exceptional solutions.
              </p>
            </motion.div>

            {/* Category Tabs */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-full transition-all duration-300 ${
                    activeCategory === category.id 
                      ? 'gradient-bg text-white border-0' 
                      : 'hover:border-green-500 hover:text-green-600'
                  }`}
                >
                  <category.icon size={18} className="mr-2" />
                  {category.name}
                </Button>
              ))}
            </motion.div>

            {/* Active Category Description */}
            <motion.div
              className="text-center mb-12"
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${categories.find(c => c.id === activeCategory)?.color} rounded-full flex items-center justify-center`}>
                {React.createElement(categories.find(c => c.id === activeCategory)?.icon || Code, { className: "text-white", size: 28 })}
              </div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {categories.find(c => c.id === activeCategory)?.description}
              </p>
            </motion.div>

            {/* Technologies Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {technologies[activeCategory as keyof typeof technologies]?.map((tech, index) => (
                <motion.div key={tech.name} variants={itemVariants}>
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 mr-4 flex items-center justify-center bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                          <img
                            src={tech.icon}
                            alt={tech.name}
                            className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `https://via.placeholder.com/48/00C853/FFFFFF?text=${tech.name.charAt(0)}`;
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{tech.name}</h3>
                          <Badge className={getExpertiseColor(tech.expertise)}>
                            {tech.expertise}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 leading-relaxed">{tech.description}</p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-semibold text-gray-700">Experience:</span>
                          <p className="text-gray-600">{tech.experience}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Projects:</span>
                          <p className="text-gray-600">{tech.projects}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Technology Stack Overview */}
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
                Complete <span className="gradient-text">Technology Stack</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our comprehensive technology stack enables us to build end-to-end solutions for any business requirement.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {categories.map((category, index) => (
                <motion.div key={category.id} variants={itemVariants}>
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                        onClick={() => setActiveCategory(category.id)}>
                    <CardHeader>
                      <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <category.icon className="text-white" size={28} />
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4 leading-relaxed">{category.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {technologies[category.id as keyof typeof technologies]?.length} Technologies
                        </span>
                        <Button size="sm" variant="outline" className="group-hover:border-green-500 group-hover:text-green-600">
                          Explore
                        </Button>
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
                Need a Custom Technology Solution?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Our experts can help you choose the right technology stack for your specific 
                requirements and ensure optimal performance and scalability.
              </p>
              <motion.button
                className="gradient-bg text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Consult Our Tech Experts
              </motion.button>
            </motion.div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default TechnologyPage;