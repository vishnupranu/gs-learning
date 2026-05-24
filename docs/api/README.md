# API Documentation

This directory contains the API documentation for the Guide Soft IT Solutions platform.

## OpenAPI Specification

The API is documented using OpenAPI 3.0 specification in `openapi.yaml`.

## Interactive Documentation

You can view the interactive API documentation using Swagger UI:

1. Install dependencies: `npm install`
2. Run the development server: `npm run dev`
3. Visit: http://localhost:3000/api/docs

## Authentication

Most API endpoints require authentication using a JWT token. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Base URL

- Development: `http://localhost:3000/api`
- Production: `https://api.guidesoft.com/api`

## Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user
- `GET /auth/me` - Get current user

### Courses
- `GET /courses` - List all courses
- `POST /courses` - Create a new course (authenticated)
- `GET /courses/{id}` - Get course by ID
- `PUT /courses/{id}` - Update course (authenticated)
- `DELETE /courses/{id}` - Delete course (authenticated)

### Enrollments
- `GET /enrollments` - List user enrollments (authenticated)
- `POST /enrollments` - Create enrollment (authenticated)

### Services
- `GET /services` - List all services
- `POST /services/booking` - Book a service (authenticated)

### Payments
- `POST /payments/create-checkout` - Create Stripe checkout session (authenticated)

## Error Responses

All endpoints may return the following error responses:

- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Rate Limiting

API requests are rate limited to 100 requests per 15 minutes per IP address.

## SDK

For easier integration, use our TypeScript/JavaScript SDK:

```typescript
import { GuideSoftSDK } from '@/sdk';

const sdk = new GuideSoftSDK({
  baseUrl: 'https://api.guidesoft.com',
});

const courses = await sdk.courses.list();
```

See `/sdk/README.md` for detailed SDK documentation.
