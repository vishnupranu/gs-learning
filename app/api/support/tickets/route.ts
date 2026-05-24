import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const ticketSchema = z.object({
  subject: z.string().min(5),
  message: z.string().min(20),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
  category: z.enum(['TECHNICAL', 'BILLING', 'BOOKING', 'GENERAL']).default('GENERAL'),
  email: z.string().email().optional(),
  name: z.string().optional(),
});

// In-memory ticket store (use DB in production)
const tickets: any[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = ticketSchema.parse(body);

    // Try to get user from token
    let userId: string | null = null;
    const token = req.cookies.get('token')?.value;
    if (token) {
      try {
        const { verifyJWT } = await import('@/lib/jwt');
        const payload = await verifyJWT(token) as any;
        userId = payload.userId;
      } catch {}
    }

    const ticket = {
      id: `TKT-${Date.now()}`,
      userId,
      ...data,
      status: 'OPEN',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    tickets.push(ticket);

    // Notify admin via Telegram
    const { sendAdminAlert } = await import('@/lib/notifications');
    sendAdminAlert('New Support Ticket', {
      'Ticket ID': ticket.id,
      Subject: data.subject,
      Priority: data.priority,
      Category: data.category,
      From: data.email || userId || 'Anonymous',
    }).catch(console.error);

    // Auto-reply to user
    if (data.email) {
      const { sendEmail } = await import('@/lib/email');
      sendEmail({
        to: data.email,
        subject: `[Guide Soft IT Solutions] Support Ticket ${ticket.id} Received`,
        html: `<div style="font-family:sans-serif;padding:40px;max-width:500px">
          <h2 style="color:#00C853">Support Ticket Received</h2>
          <p>Hi ${data.name || 'there'}, we received your support request.</p>
          <p><strong>Ticket ID:</strong> ${ticket.id}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Priority:</strong> ${data.priority}</p>
          <p>Our team will respond within ${data.priority === 'URGENT' ? '2' : data.priority === 'HIGH' ? '4' : '24'} hours.</p>
          <p>For urgent matters, WhatsApp us: <a href="https://wa.me/918884162999">+91 88841 62999</a></p>
        </div>`,
      }).catch(console.error);
    }

    return NextResponse.json({ success: true, ticketId: ticket.id, ticket }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { verifyJWT } = await import('@/lib/jwt');
    const payload = await verifyJWT(token) as any;
    const isAdmin = ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'STAFF'].includes(payload.role);

    const result = isAdmin
      ? tickets
      : tickets.filter((t: any) => t.userId === payload.userId);

    return NextResponse.json({ tickets: result });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
