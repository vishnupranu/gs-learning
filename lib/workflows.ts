import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { sendWhatsAppMessage } from '@/lib/whatsapp';
import { sendTelegramMessage } from '@/lib/telegram';

/**
 * Core Business Workflows
 */
export const workflows = {
  
  // 1. User Signup -> Verification -> Onboarding
  async handleUserSignup(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return;

    // Send Welcome Email
    await sendEmail({
      to: user.email,
      subject: 'Welcome to Guide Soft IT Solutions',
      html: `
        <h1>Welcome ${user.name}!</h1>
        <p>Thank you for creating an account with Guide Soft IT Solutions. 
        You can now access your customer dashboard to track projects, book consultations, and view invoices.</p>
        <a href="https://guidesoftitsolutions.com/dashboard">Go to Dashboard</a>
      `
    });

    // Admin Notification
    await sendTelegramMessage(`🚀 New User Registered: ${user.name} (${user.email})`);
    
    // Log Activity
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'USER_SIGNUP',
        details: 'Completed onboarding workflow',
        ipAddress: 'system'
      }
    });
  },

  // 2. Booking -> Payment -> Confirmation -> Reminder
  async handleBookingConfirmation(bookingId: string) {
    const booking = await prisma.booking.findUnique({ 
      where: { id: bookingId },
      include: { user: true }
    });
    if (!booking) return;

    // Update Status
    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'CONFIRMED' }
    });

    const msg = `Your consultation on ${booking.date} at ${booking.time} is confirmed.`;

    // Multi-channel confirmation
    await sendEmail({
      to: booking.user.email,
      subject: 'Booking Confirmed - Guide Soft IT Solutions',
      html: `<p>Hi ${booking.user.name},</p><p>${msg}</p>`
    });

    // Assuming user has phone
    await sendWhatsAppMessage('+918884162999', `Confirmation sent to ${booking.user.name} for ${booking.date}`);
    
    // System Notification
    await prisma.notification.create({
      data: {
        userId: booking.userId,
        message: msg,
        type: 'SUCCESS'
      }
    });
  },

  // 3. Form Submission -> CRM -> Notification -> Follow-up
  async handleLeadCapture(leadData: any) {
    // 1. Add to CRM
    const lead = await prisma.cRMLead.create({
      data: {
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone,
        company: leadData.company || null,
        status: 'NEW'
      }
    });

    // 2. Admin Alert
    await sendTelegramMessage(`🔥 New Hot Lead: ${lead.name} from ${lead.company || 'Unknown'}\nEmail: ${lead.email}`);
    
    // 3. Auto Follow-up
    await sendEmail({
      to: lead.email,
      subject: 'We received your inquiry - Guide Soft IT Solutions',
      html: `
        <p>Hi ${lead.name},</p>
        <p>Thanks for reaching out! One of our enterprise solutions architects will contact you shortly.</p>
        <p>Best,<br>Guide Soft Team</p>
      `
    });

    return lead;
  },

  // 4. Payment Success -> Invoice -> Email -> Dashboard Update
  async handlePaymentSuccess(paymentData: any) {
    const user = await prisma.user.findUnique({ where: { id: paymentData.userId } });
    if (!user) return;

    // 1. Create System Notification
    await prisma.notification.create({
      data: {
        userId: user.id,
        message: `Payment of $${paymentData.amount} received successfully.`,
        type: 'SUCCESS'
      }
    });

    // 2. Send Email Receipt
    await sendEmail({
      to: user.email,
      subject: 'Payment Receipt - Guide Soft IT Solutions',
      html: `
        <h2>Payment Receipt</h2>
        <p>Amount: $${paymentData.amount}</p>
        <p>Status: PAID</p>
        <p>Transaction ID: ${paymentData.stripeSessionId}</p>
        <a href="https://guidesoftitsolutions.com/dashboard/payments">View Invoice in Dashboard</a>
      `
    });

    // 3. Admin Notification
    await sendTelegramMessage(`💰 Payment Received: $${paymentData.amount} from ${user.name}`);
  },

  // 5. AI Support -> Ticket Creation -> Admin Notification
  async createSupportTicketFromAI(userId: string, conversationHistory: string) {
    // 1. Create Ticket
    const ticket = await prisma.supportTicket.create({
      data: {
        userId: userId,
        subject: 'AI Escalated Support Request',
        message: conversationHistory,
        status: 'OPEN',
        priority: 'HIGH'
      }
    });

    // 2. Alert Staff
    await sendTelegramMessage(`🚨 AI Escalation! Ticket #${ticket.id} requires human attention immediately.`);

    // 3. Notify User
    await prisma.notification.create({
      data: {
        userId: userId,
        message: 'Your request has been escalated to our human support team.',
        type: 'INFO'
      }
    });

    return ticket;
  }
};
