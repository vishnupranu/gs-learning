/**
 * Telegram Bot messaging utility.
 * Uses the Telegram Bot API when TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are set.
 * Falls back to a console logger otherwise.
 */

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function sendTelegramMessage(text: string): Promise<boolean> {
  // Skip in development or when credentials are missing
  if (!BOT_TOKEN || !CHAT_ID) {
    console.log(`[Telegram stub] ${text}`);
    return true;
  }

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: 'HTML',
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error('[Telegram] API error:', err);
      return false;
    }

    return true;
  } catch (error) {
    console.error('[Telegram] Send failed:', error);
    return false;
  }
}
