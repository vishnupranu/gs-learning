import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyJWT } from '@/lib/jwt';
import { sendEmail } from '@/lib/email';

interface RouteParams {
  params: { id: string };
}

// POST /api/admin/support/[id]/reply — Send a reply to a support ticket
export async function POST(req: NextRequest, { params }: RouteParams) {
  try {
    // Auth check
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const payload = await verifyJWT(token);
    if (!payload || !['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'STAFF'].includes(payload.role as string)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = params;
    const { message, closeTicket } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Reply message is required' }, { status: 400 });
    }

    // Get the ticket with user info
    const ticket = await prisma.supportTicket.findUnique({
      where: { id },
      include: { user: { select: { email: true, name: true } } },
    });

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    // Update ticket status
    const newStatus = closeTicket ? 'CLOSED' : 'IN_PROGRESS';
    const updatedTicket = await prisma.supportTicket.update({
      where: { id },
      data: {
        status: newStatus,
        updatedAt: new Date(),
      },
    });

    // Log the reply in audit logs
    await prisma.auditLog.create({
      data: {
        userId: payload.userId as string,
        action: `SUPPORT_REPLY`,
        resource: 'SupportTicket',
        resourceId: id,
        details: JSON.stringify({
          message: message.slice(0, 200),
          newStatus,
          adminId: payload.userId,
        }),
      },
    });

    // Send email reply to user
    if (ticket.user?.email) {
      await sendEmail({
        to: ticket.user.email,
        subject: `[Guide Soft Support] Re: ${ticket.subject} — Ticket #${id.slice(-6).toUpperCase()}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #10b981, #f59e0b); padding: 24px; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 20px;">Guide Soft Support Reply</h1>
            </div>
            <div style="background: #f9fafb; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
              <p>Hi <strong>${ticket.user.name}</strong>,</p>
              <p>Our support team has responded to your ticket <strong>#${id.slice(-6).toUpperCase()}</strong>:</p>
              <div style="background: white; border-left: 4px solid #10b981; padding: 16px; margin: 16px 0; border-radius: 8px;">
                <p style="margin: 0; color: #374151;">${message.replace(/\n/g, '<br>')}</p>
              </div>
              ${closeTicket ? '<p><strong>✅ Your ticket has been marked as resolved.</strong></p>' : '<p>Your ticket is still open. Feel free to reply if you need further assistance.</p>'}
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
              <p style="color: #6b7280; font-size: 12px;">
                Guide Soft IT Solutions | <a href="https://guidesoftitsolutions.com">guidesoftitsolutions.com</a>
              </p>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({
      success: true,
      ticket: updatedTicket,
      emailSent: !!ticket.user?.email,
    });
  } catch (error) {
    console.error('Support reply error:', error);
    return NextResponse.json({ error: 'Failed to send reply' }, { status: 500 });
  }
}
