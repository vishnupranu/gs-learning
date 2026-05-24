/**
 * WhatsApp messaging utility.
 * Uses the WhatsApp Business Cloud API when configured.
 * Falls back to a no-op logger in development.
 */

const WHATSAPP_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

export async function sendWhatsAppMessage(to: string, body: string): Promise<boolean> {
  // Skip in development or when credentials are missing
  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_ID) {
    console.log(`[WhatsApp stub] To: ${to} | Message: ${body}`);
    return true;
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v18.0/${WHATSAPP_PHONE_ID}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: to.replace(/[^\d]/g, ''),
          type: 'text',
          text: { body },
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error('[WhatsApp] API error:', err);
      return false;
    }

    return true;
  } catch (error) {
    console.error('[WhatsApp] Send failed:', error);
    return false;
  }
}
