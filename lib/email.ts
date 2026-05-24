/**
 * Email service using SMTP (nodemailer-compatible fetch-based fallback).
 * Works with Gmail, Zoho, or any SMTP server.
 * Set ENABLE_EMAIL=true and EMAIL_SERVER_* vars to activate.
 */

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

interface EmailResult {
  success: boolean;
  error?: string;
}

// ── Base Templates ──────────────────────────────────────────────────────────

function baseTemplate(content: string, title: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    body { margin:0; padding:0; font-family: 'Inter', Arial, sans-serif; background:#f8fafc; color:#0f172a; }
    .wrapper { max-width:600px; margin:0 auto; padding:40px 20px; }
    .card { background:white; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.08); }
    .header { background:linear-gradient(135deg,#00C853,#FFEB3B); padding:32px 40px; text-align:center; }
    .header h1 { margin:0; font-size:24px; color:white; font-weight:800; letter-spacing:-0.5px; }
    .header p { margin:8px 0 0; color:rgba(255,255,255,0.9); font-size:14px; }
    .body { padding:40px; }
    .body h2 { font-size:20px; font-weight:700; margin:0 0 8px; }
    .body p { color:#475569; line-height:1.6; margin:0 0 16px; }
    .info-box { background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:20px; margin:24px 0; }
    .info-row { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #e2e8f0; }
    .info-row:last-child { border-bottom:none; }
    .info-label { font-weight:600; color:#64748b; font-size:13px; }
    .info-value { color:#0f172a; font-size:13px; text-align:right; }
    .btn { display:inline-block; background:linear-gradient(135deg,#00C853,#00a846); color:white; text-decoration:none; padding:14px 32px; border-radius:8px; font-weight:600; font-size:15px; margin:8px 0; }
    .footer { text-align:center; padding:24px 40px; color:#94a3b8; font-size:12px; border-top:1px solid #e2e8f0; }
    .badge { display:inline-block; padding:4px 12px; border-radius:999px; font-size:12px; font-weight:600; }
    .badge-green { background:#d1fae5; color:#065f46; }
    .badge-yellow { background:#fef3c7; color:#92400e; }
    .badge-blue { background:#dbeafe; color:#1e40af; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="header">
        <h1>Guide Soft IT Solutions</h1>
        <p>${title}</p>
      </div>
      <div class="body">${content}</div>
      <div class="footer">
        <p>© ${new Date().getFullYear()} Guide Soft IT Solutions. All rights reserved.</p>
        <p>This email was sent automatically. Please do not reply directly.</p>
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL}" style="color:#00C853;">guidesoftitsolutions.com</a></p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

// ── Email Templates ─────────────────────────────────────────────────────────

export function welcomeEmailTemplate(name: string): string {
  return baseTemplate(`
    <h2>Welcome aboard, ${name}! 🎉</h2>
    <p>Your account at Guide Soft IT Solutions is ready. We're excited to have you on board.</p>
    <p>You now have access to:</p>
    <ul style="color:#475569;line-height:2;">
      <li>Book consultations with our experts</li>
      <li>Track your projects and bookings</li>
      <li>Access our AI-powered tools</li>
      <li>Manage invoices and payments</li>
    </ul>
    <div style="text-align:center;margin:32px 0;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="btn">Go to Dashboard →</a>
    </div>
    <p style="font-size:13px;color:#94a3b8;">If you didn't create this account, please contact us immediately.</p>
  `, 'Welcome to Guide Soft IT Solutions');
}

export function bookingConfirmationTemplate(data: {
  name: string;
  service: string;
  date: string;
  time: string;
  bookingId: string;
  notes?: string;
}): string {
  return baseTemplate(`
    <h2>Booking Confirmed ✅</h2>
    <p>Hi ${data.name}, your consultation has been successfully booked. Here are your booking details:</p>
    <div class="info-box">
      <div class="info-row">
        <span class="info-label">Booking ID</span>
        <span class="info-value"><strong>#${data.bookingId}</strong></span>
      </div>
      <div class="info-row">
        <span class="info-label">Service</span>
        <span class="info-value">${data.service}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Date</span>
        <span class="info-value">${data.date}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Time</span>
        <span class="info-value">${data.time}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Status</span>
        <span class="info-value"><span class="badge badge-yellow">PENDING CONFIRMATION</span></span>
      </div>
      ${data.notes ? `<div class="info-row"><span class="info-label">Notes</span><span class="info-value">${data.notes}</span></div>` : ''}
    </div>
    <p>Our team will contact you within 24 hours to confirm your appointment.</p>
    <div style="text-align:center;margin:32px 0;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/bookings" class="btn">View My Bookings →</a>
    </div>
    <p><strong>Need to reschedule?</strong> Contact us on WhatsApp: <a href="https://wa.me/918884162999" style="color:#00C853;">+91 88841 62999</a></p>
  `, 'Booking Confirmation');
}

export function contactFormTemplate(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  timestamp: string;
}): string {
  return baseTemplate(`
    <h2>New Contact Form Submission</h2>
    <p>You received a new message from your website contact form.</p>
    <div class="info-box">
      <div class="info-row">
        <span class="info-label">Name</span>
        <span class="info-value">${data.name}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Email</span>
        <span class="info-value">${data.email}</span>
      </div>
      ${data.phone ? `<div class="info-row"><span class="info-label">Phone</span><span class="info-value">${data.phone}</span></div>` : ''}
      <div class="info-row">
        <span class="info-label">Subject</span>
        <span class="info-value">${data.subject}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Received</span>
        <span class="info-value">${data.timestamp}</span>
      </div>
    </div>
    <p><strong>Message:</strong></p>
    <div style="background:#f8fafc;padding:16px;border-radius:8px;border-left:3px solid #00C853;">
      <p style="margin:0;white-space:pre-wrap;">${data.message}</p>
    </div>
    <div style="text-align:center;margin:32px 0;">
      <a href="mailto:${data.email}?subject=Re: ${data.subject}" class="btn">Reply to ${data.name} →</a>
    </div>
  `, 'New Contact Form Submission');
}

export function adminBookingTemplate(data: {
  userName: string;
  userEmail: string;
  service: string;
  date: string;
  time: string;
  bookingId: string;
  notes?: string;
}): string {
  return baseTemplate(`
    <h2>New Booking Received 📅</h2>
    <p>A new booking has been submitted and requires your attention.</p>
    <div class="info-box">
      <div class="info-row">
        <span class="info-label">Booking ID</span>
        <span class="info-value"><strong>#${data.bookingId}</strong></span>
      </div>
      <div class="info-row">
        <span class="info-label">Customer</span>
        <span class="info-value">${data.userName}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Email</span>
        <span class="info-value">${data.userEmail}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Service</span>
        <span class="info-value">${data.service}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Date</span>
        <span class="info-value">${data.date}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Time</span>
        <span class="info-value">${data.time}</span>
      </div>
      ${data.notes ? `<div class="info-row"><span class="info-label">Notes</span><span class="info-value">${data.notes}</span></div>` : ''}
    </div>
    <div style="text-align:center;margin:32px 0;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/bookings" class="btn">Manage Booking →</a>
    </div>
  `, '[Admin] New Booking Submission');
}

// ── Sender ──────────────────────────────────────────────────────────────────

export async function sendEmail(options: EmailOptions): Promise<EmailResult> {
  if (process.env.ENABLE_EMAIL !== 'true') {
    console.log('[Email] Disabled — would send to:', options.to, '|', options.subject);
    return { success: true };
  }

  const host = process.env.EMAIL_SERVER_HOST;
  const port = parseInt(process.env.EMAIL_SERVER_PORT || '587');
  const user = process.env.EMAIL_SERVER_USER;
  const pass = process.env.EMAIL_SERVER_PASSWORD;
  const from = process.env.EMAIL_FROM || 'GuideSoft <noreply@guidesoftitsolutions.com>';

  if (!host || !user || !pass) {
    console.error('[Email] Missing SMTP configuration');
    return { success: false, error: 'Email not configured' };
  }

  try {
    // Dynamic import nodemailer (optional dep — gracefully degrade)
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const toArray = Array.isArray(options.to) ? options.to : [options.to];
    await transporter.sendMail({
      from,
      to: toArray.join(', '),
      subject: options.subject,
      html: options.html,
      text: options.text || options.html.replace(/<[^>]+>/g, ''),
    });

    console.log('[Email] Sent:', options.subject, '→', options.to);
    return { success: true };
  } catch (error: any) {
    console.error('[Email] Error:', error?.message);
    return { success: false, error: error?.message };
  }
}

// ── Convenience Functions ───────────────────────────────────────────────────

export async function sendWelcomeEmail(to: string, name: string) {
  return sendEmail({
    to,
    subject: '[Guide Soft IT Solutions] Welcome! Your Account is Ready',
    html: welcomeEmailTemplate(name),
  });
}

export async function sendBookingConfirmation(to: string, data: Parameters<typeof bookingConfirmationTemplate>[0]) {
  return sendEmail({
    to,
    subject: '[Guide Soft IT Solutions] Booking Confirmation #' + data.bookingId,
    html: bookingConfirmationTemplate(data),
  });
}

export async function sendAdminBookingAlert(data: Parameters<typeof adminBookingTemplate>[0]) {
  const adminEmail = process.env.ADMIN_EMAIL || 'praveenkumar.kanneganti@gmail.com';
  return sendEmail({
    to: adminEmail,
    subject: '[Guide Soft IT Solutions] New Booking Submission',
    html: adminBookingTemplate(data),
  });
}

export async function sendContactFormEmails(data: Parameters<typeof contactFormTemplate>[0]) {
  const adminEmail = process.env.ADMIN_EMAIL || 'praveenkumar.kanneganti@gmail.com';
  // Send to admin
  await sendEmail({
    to: adminEmail,
    subject: '[Guide Soft IT Solutions] New Submission Confirmation — ' + data.subject,
    html: contactFormTemplate(data),
  });
  // Send confirmation to user
  await sendEmail({
    to: data.email,
    subject: '[Guide Soft IT Solutions] We received your message!',
    html: baseTemplate(`
      <h2>Thanks for reaching out, ${data.name}! 👋</h2>
      <p>We received your message and will get back to you within 24 hours.</p>
      <div class="info-box">
        <div class="info-row">
          <span class="info-label">Subject</span>
          <span class="info-value">${data.subject}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Submitted</span>
          <span class="info-value">${data.timestamp}</span>
        </div>
      </div>
      <p>In the meantime, feel free to reach us on WhatsApp: <a href="https://wa.me/918884162999" style="color:#00C853;">+91 88841 62999</a></p>
    `, 'Message Received'),
  });
}
