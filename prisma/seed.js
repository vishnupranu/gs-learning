const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

async function generateSalt() {
  const saltBytes = crypto.randomBytes(16);
  return saltBytes.toString('hex');
}

async function pbkdf2Hash(password, salt) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 100000, 32, 'sha256', (err, derivedKey) => {
      if (err) reject(err);
      else resolve(derivedKey.toString('hex'));
    });
  });
}

async function hashPassword(password) {
  const salt = await generateSalt();
  const hashHex = await pbkdf2Hash(password, salt);
  return `${salt}:${hashHex}`;
}

async function main() {
  console.log('Seeding database...');

  // 1. Clear existing data
  await prisma.notification.deleteMany({});
  await prisma.auditLog.deleteMany({});
  await prisma.supportTicket.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.booking.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.lesson.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.blogPost.deleteMany({});
  await prisma.cRMLead.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('Cleared existing database records.');

  // 2. Create Users
  const adminPassword = await hashPassword('admin123');
  const userPassword = await hashPassword('user123');

  const admin = await prisma.user.create({
    data: {
      email: 'admin@guideitsol.com',
      password: adminPassword,
      name: 'Praveenkumar K.',
      role: 'SUPER_ADMIN',
      bio: 'Managing Director & Enterprise Solution Architect at GuideSoft.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
    },
  });

  const manager = await prisma.user.create({
    data: {
      email: 'manager@guideitsol.com',
      password: adminPassword,
      name: 'GuideSoft Manager',
      role: 'MANAGER',
      bio: 'Operations and Delivery Manager.',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80',
    },
  });

  const staff = await prisma.user.create({
    data: {
      email: 'staff@guideitsol.com',
      password: adminPassword,
      name: 'GuideSoft Team Member',
      role: 'STAFF',
      bio: 'Senior Software Developer.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    },
  });

  const customer = await prisma.user.create({
    data: {
      email: 'customer@guideitsol.com',
      password: userPassword,
      name: 'John Doe',
      role: 'USER',
      bio: 'Founder at InnovateCorp.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
    },
  });

  console.log('Seeded users: SUPER_ADMIN, MANAGER, STAFF, USER.');

  // 3. Create Courses
  const course1 = await prisma.course.create({
    data: {
      title: 'Full Stack Next.js & TypeScript Mastery',
      description: 'Master Next.js 14 App Router, TypeScript, Tailwind CSS, Prisma, and database deployments. Build high-performance SaaS applications with secure authentication and real-time features.',
      category: 'Software Development',
      price: 25000,
      originalPrice: 49999,
      level: 'Advanced',
      duration: '12 weeks',
      lessons: 48,
      rating: 4.9,
      students: 312,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80',
      featured: true,
      instructorId: admin.id,
    },
  });

  const course2 = await prisma.course.create({
    data: {
      title: 'Enterprise AI & LLM Engineering',
      description: 'Learn to build and deploy production-ready AI applications. Covers OpenAI SDK, Google Gemini, Anthropic Claude, LangChain, vector databases (Pinecone), and LLM fine-tuning methodologies.',
      category: 'AI / ML',
      price: 45000,
      originalPrice: 89999,
      level: 'Advanced',
      duration: '8 weeks',
      lessons: 32,
      rating: 4.8,
      students: 184,
      image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
      featured: true,
      instructorId: admin.id,
    },
  });

  const course3 = await prisma.course.create({
    data: {
      title: 'Professional UI/UX Design & Figma Systems',
      description: 'Master advanced typography, color theory, wireframing, interactive prototyping, and building production-grade design systems in Figma. Create layouts that bridge the gap to development.',
      category: 'Design',
      price: 15000,
      originalPrice: 29999,
      level: 'Beginner to Intermediate',
      duration: '6 weeks',
      lessons: 24,
      rating: 4.7,
      students: 215,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
      featured: false,
      instructorId: admin.id,
    },
  });

  console.log('Seeded courses.');

  // 4. Create Lessons for Course 1
  await prisma.lesson.createMany({
    data: [
      { title: 'Introduction to Next.js 14 & App Router', order: 1, courseId: course1.id, description: 'Learn the architectural differences between Page Router and App Router.' },
      { title: 'TypeScript Basics & Configuration', order: 2, courseId: course1.id, description: 'Set up TypeScript in Next.js and understand interface and type structures.' },
      { title: 'Server Components vs Client Components', order: 3, courseId: course1.id, description: 'Understand data fetching patterns and component lifecycles.' },
      { title: 'Routing, Dynamic Routes & Layouts', order: 4, courseId: course1.id, description: 'Create clean nested routes, templates, and dynamic path structures.' },
    ]
  });

  console.log('Seeded lessons.');

  // 5. Create Blog Posts
  await prisma.blogPost.create({
    data: {
      title: 'Building Scalable SaaS Architecture on Next.js 14',
      slug: 'scalable-saas-architecture-nextjs-14',
      content: '<p>Next.js 14 App Router has transformed web development by enabling react server components (RSC). In this engineering insight, we cover database pooling, edge caching using Cloudflare Workers, and multi-tenant subdomains.</p>',
      status: 'PUBLISHED',
      published: new Date(),
      authorId: admin.id,
    }
  });

  await prisma.blogPost.create({
    data: {
      title: 'How to Implement Cloudflare AI Gateway for LLM Logs',
      slug: 'cloudflare-ai-gateway-llm-logs',
      content: '<p>Monitoring OpenAI or Anthropic API usage in production is essential. Cloudflare AI Gateway provides zero-config usage metrics, prompt logging, caching, and rate limiting at the edge.</p>',
      status: 'PUBLISHED',
      published: new Date(),
      authorId: admin.id,
    }
  });

  console.log('Seeded blog posts.');

  // 6. Create initial bookings
  await prisma.booking.create({
    data: {
      userId: customer.id,
      serviceId: 1, // Software Development
      date: '2026-06-01',
      time: '10:00 AM',
      notes: 'Initial roadmap discussion for our new e-commerce project.',
      status: 'CONFIRMED'
    }
  });

  await prisma.booking.create({
    data: {
      userId: customer.id,
      serviceId: 2, // AI/ML Development
      date: '2026-06-15',
      time: '02:00 PM',
      notes: 'Consultation on integrating AI customer support chatbot.',
      status: 'PENDING'
    }
  });

  console.log('Seeded initial bookings.');

  // 7. Create CRM Leads
  await prisma.cRMLead.create({
    data: {
      name: 'Sarah Connor',
      email: 'sarah@skynet.com',
      company: 'Cyberdyne Systems',
      phone: '+1 555-0199',
      status: 'NEW',
      value: 1200000
    }
  });

  await prisma.cRMLead.create({
    data: {
      name: 'Tony Stark',
      email: 'tony@stark.com',
      company: 'Stark Industries',
      phone: '+1 555-3000',
      status: 'CONTACTED',
      value: 5000000
    }
  });

  console.log('Seeded CRM leads.');

  // 8. Create Support Tickets
  await prisma.supportTicket.create({
    data: {
      userId: customer.id,
      subject: 'Invoicing details update',
      message: 'Could you please update my company registration number on the latest invoice?',
      status: 'OPEN',
      priority: 'MEDIUM'
    }
  });

  console.log('Seeded support ticket.');
  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
