import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// WhatsApp Business API Webhook
// Meta → WhatsApp Business → Configuration → Webhook
// Verify Token: process.env.WHATSAPP_VERIFY_TOKEN
// Webhook URL: https://yourdomain.com/api/whatsapp/webhook

// GET — Webhook verification (Meta challenge)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    console.log('WhatsApp webhook verified');
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
}

// POST — Receive WhatsApp messages
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.object !== 'whatsapp_business_account') {
      return NextResponse.json({ ok: true });
    }

    for (const entry of body.entry || []) {
      for (const change of entry.changes || []) {
        if (change.field !== 'messages') continue;

        const value = change.value;
        const messages = value?.messages || [];
        const contacts = value?.contacts || [];

        for (const message of messages) {
          const from = message.from; // phone number
          const msgId = message.id;
          const contact = contacts.find((c: any) => c.wa_id === from);
          const name = contact?.profile?.name || 'Unknown';
          const text = message.text?.body || '';
          const msgType = message.type;

          console.log(`WhatsApp [${from}] ${name}: ${text}`);

          // Auto-reply logic
          const reply = getAutoReply(text.toLowerCase(), name);
          if (reply) {
            await sendWhatsAppMessage(from, reply);
          }

          // Log to CRM as lead
          try {
            const existing = await prisma.cRMLead.findFirst({
              where: { phone: from },
            });
            if (!existing) {
              await prisma.cRMLead.create({
                data: {
                  name,
                  phone: from,
                  source: 'WhatsApp',
                  status: 'NEW',
                  notes: `First message: ${text}`,
                },
              });
            }
          } catch (e) {
            // CRM logging failure is non-critical
            console.warn('CRM log failed:', e);
          }
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('WhatsApp webhook error:', error);
    return NextResponse.json({ ok: true }); // Always return 200 to Meta
  }
}

function getAutoReply(text: string, name: string): string | null {
  const firstName = name.split(' ')[0];

  if (text.includes('hello') || text.includes('hi') || text === 'hey') {
    return `Hello ${firstName}! 👋 Welcome to *Guide Soft IT Solutions*.\n\nWe specialize in:\n• Web & Mobile Development\n• AI Integration\n• SaaS Platforms\n• Cloud Solutions\n\nHow can we help you today? Reply with:\n1️⃣ *Pricing*\n2️⃣ *Services*\n3️⃣ *Book a call*\n4️⃣ *Support*`;
  }
  if (text === '1' || text.includes('price') || text.includes('cost') || text.includes('pricing')) {
    return `💰 *Our Pricing*\n\n🚀 *Starter* — ₹25,000+\nPerfect for landing pages & small projects\n\n⚡ *Growth* — ₹75,000+\nFull web app with backend & dashboard\n\n🏢 *Enterprise* — Custom\nLarge-scale SaaS, AI, ERP solutions\n\nView details: https://guidesoftitsolutions.com/pricing\n\nBook a free consultation: https://guidesoftitsolutions.com/booking`;
  }
  if (text === '2' || text.includes('service')) {
    return `🛠️ *Our Services*\n\n• Next.js / React Web Development\n• Mobile Apps (React Native)\n• AI & ML Integration\n• SaaS Platform Development\n• UI/UX Design (Figma)\n• Cloud & DevOps\n• SEO & Digital Marketing\n\nhttps://guidesoftitsolutions.com/services`;
  }
  if (text === '3' || text.includes('book') || text.includes('call') || text.includes('meet')) {
    return `📅 *Book a Consultation*\n\nChoose a time that works for you:\nhttps://guidesoftitsolutions.com/booking\n\nWe'll discuss your requirements and provide a custom quote within 24 hours!`;
  }
  if (text === '4' || text.includes('support') || text.includes('help') || text.includes('issue')) {
    return `🎫 *Support*\n\nPlease describe your issue and we'll create a support ticket.\n\n📧 praveenkumar.kanneganti@gmail.com\n🌐 https://guidesoftitsolutions.com/contact\n\nOur team responds within 2-4 hours during business hours (9 AM - 7 PM IST).`;
  }

  // Default: forward to admin and acknowledge
  return `Thanks ${firstName}! 🙏 Your message has been received. Our team will respond within 2-4 hours.\n\n⏰ Business hours: 9 AM – 7 PM IST, Mon–Sat\n\nFor urgent queries: praveenkumar.kanneganti@gmail.com`;
}

async function sendWhatsAppMessage(to: string, text: string) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) return;

  await fetch(`https://graph.facebook.com/v19.0/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body: text },
    }),
  });
}
