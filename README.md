# Guide Soft IT Solutions - Full Stack Application

A comprehensive Next.js 13 application featuring software development services, AI/ML solutions, UX/UI design, and a Learning Management System (LMS) platform.

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 13.5.1 (App Router)
- **Language**: TypeScript 5.2.2
- **Styling**: Tailwind CSS 3.3.3
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Animations**: Framer Motion 12.23.6
- **Icons**: Lucide React 0.446.0
- **Forms**: React Hook Form 7.60.0 + Zod 3.25.76
- **Charts**: Recharts 2.15.4
- **Theme**: next-themes 0.3.0

### Backend
- **API**: Next.js API Routes (App Router)
- **Authentication**: Custom JWT implementation
- **Database**: PostgreSQL (with Prisma ORM)
- **Payment**: Stripe 18.3.0

### Development Tools
- **Linting**: ESLint 8.49.0
- **Package Manager**: npm
- **Version Control**: Git

## 📁 Project Structure

```
project/
├── app/                      # Next.js App Router pages
│   ├── about/               # About page
│   ├── auth/                # Authentication pages
│   ├── booking/             # Booking consultation
│   ├── contact/             # Contact form
│   ├── dashboard/           # User dashboard
│   ├── lms/                 # Learning Management System
│   ├── process/             # Process page
│   ├── projects/            # Projects showcase
│   ├── services/            # Services page
│   ├── technology/          # Technology stack
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── layout/              # Layout components (Header, Footer)
│   ├── providers/           # Context providers
│   ├── sections/            # Page sections
│   └── ui/                  # shadcn/ui components
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions
├── sdk/                     # SDK and API client libraries
├── .github/                 # GitHub Actions workflows
│   └── workflows/           # CI/CD pipelines
└── public/                  # Static assets
```

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database

### Setup Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd project
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/guidesoft"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Stripe
STRIPE_PUBLIC_KEY="your-stripe-public-key"
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="your-webhook-secret"

# Email (optional)
EMAIL_SERVER_HOST="smtp.example.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email"
EMAIL_SERVER_PASSWORD="your-password"
EMAIL_FROM="noreply@guidesoft.com"
```

4. **Set up the database**
```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## 🔧 API Routes

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Courses (LMS)
- `GET /api/courses` - List all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses` - Create course (admin)
- `PUT /api/courses/:id` - Update course (admin)
- `DELETE /api/courses/:id` - Delete course (admin)

### Enrollments
- `GET /api/enrollments` - Get user enrollments
- `POST /api/enrollments` - Enroll in course
- `DELETE /api/enrollments/:id` - Cancel enrollment

### Services
- `GET /api/services` - List services
- `POST /api/services/booking` - Book consultation

### Payments
- `POST /api/payments/create-checkout` - Create Stripe checkout session
- `POST /api/payments/webhook` - Stripe webhook handler

## 🧪 Testing

The project uses Jest and React Testing Library for testing.

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🚢 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Docker
```bash
# Build image
docker build -t guidesoft .

# Run container
docker run -p 3000:3000 guidesoft
```

### Manual Deployment
```bash
# Build
npm run build

# Start
npm start
```

## 📚 SDK Usage

The project includes an SDK for easy integration:

```typescript
import { GuideSoftSDK } from '@/sdk';

const sdk = new GuideSoftSDK({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  baseUrl: process.env.NEXT_PUBLIC_API_URL
});

// Get courses
const courses = await sdk.courses.list();

// Enroll in course
await sdk.enrollments.create({ courseId: 1 });
```

See `/sdk/README.md` for detailed documentation.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, email support@guidesoft.com or visit our contact page.

## 🔗 Links

- Website: https://trainings.guideitsol.com
- Documentation: https://docs.guideitsol.com
- GitHub: https://github.com/guideitsol/project

---

Built with ❤️ by Guide Soft IT Solutions
