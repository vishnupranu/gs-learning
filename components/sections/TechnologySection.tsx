'use client';

import React from 'react';
import { motion } from 'framer-motion';

const technologies = [
  {
    category: 'Frontend', color: 'from-blue-500 to-blue-600',
    techs: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
      { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg' },
    ]
  },
  {
    category: 'Backend', color: 'from-green-500 to-green-600',
    techs: [
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
      { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
    ]
  },
  {
    category: 'Database', color: 'from-purple-500 to-purple-600',
    techs: [
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
      { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
    ]
  },
  {
    category: 'Cloud & DevOps', color: 'from-orange-500 to-orange-600',
    techs: [
      { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' },
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
      { name: 'Google Cloud', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
      { name: 'Azure', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
    ]
  },
  {
    category: 'Mobile', color: 'from-pink-500 to-pink-600',
    techs: [
      { name: 'React Native', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
      { name: 'Swift', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg' },
      { name: 'Kotlin', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' },
      { name: 'Ionic', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg' },
    ]
  },
  {
    category: 'AI/ML', color: 'from-indigo-500 to-indigo-600',
    techs: [
      { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
      { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
      { name: 'Scikit-learn', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg' },
      { name: 'OpenAI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Jupyter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg' },
    ]
  },
];

const TechnologySection = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <span className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            🛠️ Tech Stack
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Our <span className="gradient-text">Technology Stack</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We leverage cutting-edge technologies and frameworks to build robust, scalable, and future-ready solutions.
          </p>
        </motion.div>

        <div className="space-y-8">
          {technologies.map((category, catIdx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.07 }}
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6"
            >
              <div className="flex items-center mb-6">
                <div className={`w-3 h-3 bg-gradient-to-r ${category.color} rounded-full mr-3`} />
                <h3 className="text-lg font-black text-gray-900 dark:text-white">{category.category}</h3>
                <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800 ml-4" />
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                {category.techs.map((tech) => (
                  <motion.div
                    key={tech.name}
                    whileHover={{ y: -4, scale: 1.05 }}
                    className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-2xl transition-all group cursor-pointer border border-transparent hover:border-green-200 dark:hover:border-green-800"
                  >
                    <div className="w-12 h-12 mb-2 flex items-center justify-center">
                      <img
                        src={tech.icon}
                        alt={tech.name}
                        className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          const t = e.target as HTMLImageElement;
                          t.onerror = null;
                          t.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><rect width="40" height="40" rx="8" fill="%2300C853"/><text x="50%" y="50%" font-family="Arial" font-size="16" fill="%23FFF" text-anchor="middle" dy=".3em">${tech.name.charAt(0)}</text></svg>`;
                        }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 text-center transition-colors leading-tight">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          {[
            { number: '50+', label: 'Technologies Mastered' },
            { number: '100%', label: 'Up-to-date Stack' },
            { number: '24/7', label: 'Technical Support' },
            { number: '5+', label: 'Years Experience' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl">
              <div className="text-3xl font-black gradient-text mb-1">{stat.number}</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologySection;