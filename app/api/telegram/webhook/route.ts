import { NextRequest, NextResponse } from 'next/server';

// Telegram Bot Webhook Handler
// Set webhook URL in BotFather: https://api.telegram.org/bot{TOKEN}/setWebhook?url=https://yourdomain.com/api/telegram/webhook

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, callback_query } = body;

    // Handle text messages
    if (message) {
      const chatId = message.chat.id;
      const text = message.text || '';
      const from = message.from;

      console.log(`Telegram message from ${from?.first_name} (${chatId}): ${text}`);

      // Command handling
      if (text.startsWith('/start')) {
        await sendTelegramMessage(chatId,
          `👋 Welcome to *Guide Soft IT Solutions* bot!\n\n` +
          `I can help you with:\n` +
          `• 📅 Book a consultation\n` +
          `• 📞 Get contact details\n` +
          `• 💰 View pricing\n` +
          `• 🤖 AI tools info\n\n` +
          `Use /help to see all commands.`
        );
      } else if (text.startsWith('/help')) {
        await sendTelegramMessage(chatId,
          `🔧 *Available Commands*\n\n` +
          `/start - Welcome message\n` +
          `/book - Book a consultation\n` +
          `/pricing - View our pricing\n` +
          `/contact - Get contact info\n` +
          `/services - Our services list\n` +
          `/support - Raise a support ticket`
        );
      } else if (text.startsWith('/book')) {
        await sendTelegramMessage(chatId,
          `📅 *Book a Consultation*\n\nVisit our booking page:\nhttps://guidesoftitsolutions.com/booking\n\nOr WhatsApp us: +918884162999`
        );
      } else if (text.startsWith('/pricing')) {
        await sendTelegramMessage(chatId,
          `💰 *Our Pricing*\n\n` +
          `🚀 Starter: ₹25,000+\n` +
          `⚡ Growth: ₹75,000+\n` +
          `🏢 Enterprise: Custom\n\n` +
          `View full pricing: https://guidesoftitsolutions.com/pricing`
        );
      } else if (text.startsWith('/contact')) {
        await sendTelegramMessage(chatId,
          `📞 *Contact Us*\n\n` +
          `📧 praveenkumar.kanneganti@gmail.com\n` +
          `📱 WhatsApp: +918884162999\n` +
          `🌐 guidesoftitsolutions.com\n` +
          `📍 Guntur & Bangalore, India`
        );
      } else if (text.startsWith('/services')) {
        await sendTelegramMessage(chatId,
          `🛠️ *Our Services*\n\n` +
          `• Web Development (Next.js, React)\n` +
          `• Mobile Apps (React Native)\n` +
          `• AI/ML Integration\n` +
          `• Cloud Infrastructure\n` +
          `• UI/UX Design\n` +
          `• SaaS Development\n\n` +
          `Details: https://guidesoftitsolutions.com/services`
        );
      } else if (text.startsWith('/support')) {
        await sendTelegramMessage(chatId,
          `🎫 *Support Ticket*\n\nPlease email us at:\npraveenkumar.kanneganti@gmail.com\n\nOr visit: https://guidesoftitsolutions.com/contact`
        );
      } else {
        // AI-powered fallback — forward to admin
        await sendTelegramMessage(chatId,
          `🤖 Thanks for your message! Our team has been notified and will respond shortly.\n\nFor urgent support: +918884162999`
        );
        // Forward to admin chat
        const adminChatId = process.env.TELEGRAM_CHAT_ID;
        if (adminChatId) {
          await sendTelegramMessage(adminChatId,
            `📨 *New Telegram Message*\n\nFrom: ${from?.first_name} ${from?.last_name || ''}\nUsername: @${from?.username || 'N/A'}\nChat ID: ${chatId}\n\nMessage:\n${text}`
          );
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Telegram webhook error:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

// GET endpoint to set the webhook (run once to register)
export async function GET(req: NextRequest) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (!token || !appUrl) {
    return NextResponse.json({ error: 'TELEGRAM_BOT_TOKEN or NEXT_PUBLIC_APP_URL not configured' }, { status: 400 });
  }

  const webhookUrl = `${appUrl}/api/telegram/webhook`;
  const res = await fetch(`https://api.telegram.org/bot${token}/setWebhook?url=${encodeURIComponent(webhookUrl)}`);
  const data = await res.json();

  return NextResponse.json({ webhookUrl, result: data });
}

async function sendTelegramMessage(chatId: string | number, text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
  });
}
