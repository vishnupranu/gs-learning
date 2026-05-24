import { NextResponse } from 'next/server';

const services = [
  {
    id: 1,
    title: 'Software Development',
    description: 'Custom web & mobile applications built with cutting-edge technology',
    icon: 'Code',
    price: 'Starting at $2,500',
    features: ['Custom Development', 'Scalable Architecture', 'Modern Tech Stack', '24/7 Support']
  },
  {
    id: 2,
    title: 'AI/ML Development',
    description: 'Intelligent solutions powered by machine learning and artificial intelligence',
    icon: 'Brain',
    price: 'Starting at $5,000',
    features: ['Machine Learning Models', 'NLP Solutions', 'Computer Vision', 'Predictive Analytics']
  },
  {
    id: 3,
    title: 'UX/UI Research',
    description: 'User-centered design that creates exceptional digital experiences',
    icon: 'Palette',
    price: 'Starting at $1,500',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems']
  },
  {
    id: 4,
    title: 'Online LMS',
    description: 'Comprehensive learning management systems for educational excellence',
    icon: 'GraduationCap',
    price: 'Starting at $3,000',
    features: ['Course Management', 'Student Tracking', 'Assessment Tools', 'Analytics']
  }
];

export async function GET() {
  return NextResponse.json(services);
}
