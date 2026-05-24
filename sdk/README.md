# Guide Soft SDK

TypeScript/JavaScript SDK for interacting with the Guide Soft IT Solutions API.

## Installation

```bash
npm install @guidesoft/sdk
```

## Usage

### Initialize the SDK

```typescript
import { GuideSoftSDK } from '@guidesoft/sdk';

const sdk = new GuideSoftSDK({
  baseUrl: 'https://api.guidesoft.com',
  apiKey: 'your-api-key', // Optional
});
```

### Authentication

```typescript
// Login
const { user, token } = await sdk.login('user@example.com', 'password');

// Register
const { user } = await sdk.register('user@example.com', 'password', 'John Doe');

// Get current user
const currentUser = await sdk.getCurrentUser();

// Logout
await sdk.logout();
```

### Using with Token

If you have a token from another source:

```typescript
sdk.setToken('your-jwt-token');
```

### Courses

```typescript
// List all courses
const { courses, pagination } = await sdk.courses.list();

// Filter by category
const { courses } = await sdk.courses.list({ category: 'Web Development' });

// Search courses
const { courses } = await sdk.courses.list({ search: 'React' });

// Get specific course
const course = await sdk.courses.get('course-id');

// Create course (requires authentication)
const newCourse = await sdk.courses.create({
  title: 'New Course',
  description: 'Course description',
  category: 'Web Development',
  price: 299,
  // ... other fields
});

// Update course
const updatedCourse = await sdk.courses.update('course-id', {
  title: 'Updated Title',
});

// Delete course
await sdk.courses.delete('course-id');
```

### Enrollments

```typescript
// List user enrollments
const enrollments = await sdk.enrollments.list();

// Enroll in a course
const enrollment = await sdk.enrollments.create('course-id');

// Cancel enrollment
await sdk.enrollments.delete('enrollment-id');
```

### Services

```typescript
// List available services
const services = await sdk.services.list();

// Book a consultation
const booking = await sdk.services.book({
  serviceId: 1,
  date: '2024-01-25',
  time: '14:00',
  notes: 'Discuss project requirements',
});
```

### Payments

```typescript
// Create Stripe checkout session
const { sessionId } = await sdk.payments.createCheckout('course-id', 299);

// Redirect to Stripe
window.location.href = `https://checkout.stripe.com/pay/${sessionId}`;
```

## Error Handling

```typescript
try {
  const courses = await sdk.courses.list();
} catch (error) {
  console.error('API Error:', error.message);
}
```

## Configuration

```typescript
const sdk = new GuideSoftSDK({
  baseUrl: 'https://api.guidesoft.com',
  apiKey: 'your-api-key', // Optional, for API key authentication
  timeout: 30000, // Request timeout in milliseconds (default: 30000)
});
```

## TypeScript Support

The SDK is fully typed. Import types for type safety:

```typescript
import type { Course, Enrollment, User, Service } from '@guidesoft/sdk';

const course: Course = await sdk.courses.get('id');
```

## Examples

See the `/examples` directory for complete usage examples.

## License

MIT
