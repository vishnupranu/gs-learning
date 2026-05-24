import { GuideSoftSDK } from '../sdk';

// Initialize SDK
const sdk = new GuideSoftSDK({
  baseUrl: process.env.API_URL || 'http://localhost:3000',
});

async function main() {
  try {
    // Login
    console.log('Logging in...');
    const { user, token } = await sdk.login('user@example.com', 'password');
    console.log('Logged in as:', user.name);

    // Get current user
    const currentUser = await sdk.getCurrentUser();
    console.log('Current user:', currentUser);

    // List courses
    console.log('\nFetching courses...');
    const { courses } = await sdk.courses.list();
    console.log(`Found ${courses.length} courses`);

    // Get specific course
    if (courses.length > 0) {
      const course = await sdk.courses.get(courses[0].id);
      console.log('\nCourse details:', course.title);

      // Enroll in course
      console.log('\nEnrolling in course...');
      const enrollment = await sdk.enrollments.create(course.id);
      console.log('Enrolled successfully');
    }

    // List services
    console.log('\nFetching services...');
    const services = await sdk.services.list();
    console.log(`Found ${services.length} services`);

    // Book a service
    console.log('\nBooking consultation...');
    const booking = await sdk.services.book({
      serviceId: 1,
      date: '2024-02-01',
      time: '10:00',
      notes: 'Discuss new project',
    });
    console.log('Booking created:', booking.id);

    // Logout
    console.log('\nLogging out...');
    await sdk.logout();
    console.log('Logged out successfully');

  } catch (error) {
    console.error('Error:', error);
  }
}

main();
