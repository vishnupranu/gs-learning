/**
 * WhatsApp Business API + Telegram Bot notification helpers.
 * Set ENABLE_WHATSAPP=true and ENABLE_TELEGRAM=true to activate.
 */

// ── WhatsApp ────────────────────────────────────────────────────────────────

export async function sendWhatsAppMessage(to: string, message: string): Promise<boolean> {
  if (process.env.ENABLE_WHATSAPP !== 'true') {
    console.log('[WhatsApp] Disabled — would send to:', to);
    return true;
  }

  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    console.error('[WhatsApp] Missing credentials');
    return false;
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: to.replace(/\D/g, ''), // strip non-digits
          type: 'text',
          text: { body: message },
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error('[WhatsApp] Error:', err);
      return false;
    }

    console.log('[WhatsApp] Sent to:', to);
    return true;
  } catch (error: any) {
    console.error('[WhatsApp] Exception:', error?.message);
    return false;
  }
}

export async function sendBookingWhatsApp(
  phone: string,
  data: { name: string; service: string; date: string; time: string; bookingId: string }
) {
  const message = `✅ *Booking Confirmed!*\n\nHi ${data.name},\n\nYour consultation has been booked.\n\n📋 *Details:*\n• Service: ${data.service}\n• Date: ${data.date}\n• Time: ${data.time}\n• Booking ID: #${data.bookingId}\n\nOur team will confirm within 24 hours.\n\nNeed help? Reply to this message or call us.\n\n_Guide Soft IT Solutions_`;
  return sendWhatsAppMessage(phone, message);
}

export async function sendContactWhatsApp(data: { name: string; subject: string }) {
  const adminPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+918884162999';
  const message = `📩 *New Contact Form Submission*\n\nFrom: ${data.name}\nSubject: ${data.subject}\n\nLogin to admin panel to view details.`;
  return sendWhatsAppMessage(adminPhone, message);
}

// ── Telegram ────────────────────────────────────────────────────────────────

export async function sendTelegramMessage(message: string): Promise<boolean> {
  if (process.env.ENABLE_TELEGRAM !== 'true') {
    console.log('[Telegram] Disabled — would send:', message.substring(0, 50));
    return true;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error('[Telegram] Missing credentials');
    return false;
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[Telegram] Error:', err);
      return false;
    }

    console.log('[Telegram] Sent');
    return true;
  } catch (error: any) {
    console.error('[Telegram] Exception:', error?.message);
    return false;
  }
}

export async function sendAdminAlert(title: string, details: Record<string, string>) {
  const lines = Object.entries(details)
    .map(([k, v]) => `• *${k}:* ${v}`)
    .join('\n');
  const message = `🔔 *${title}*\n\n${lines}\n\n_Guide Soft IT Solutions Admin_`;
  return sendTelegramMessage(message);
}
