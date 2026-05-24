import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIP } from '@/lib/middleware/rateLimit';
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';

const SYSTEM_PROMPT = `You are Guide Soft AI, an intelligent assistant for Guide Soft IT Solutions.
Your goal is to assist users with inquiries about software development, AI integration, 
UI/UX design, and IT consulting services. You must be professional, concise, and helpful.
If you don't know the answer, recommend they use the contact form.`;

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req);
    const rateLimit = await checkRateLimit(ip, 'ai_chat', 20, 60 * 60);

    if (!rateLimit.success) {
      return NextResponse.json({ error: 'Rate limit exceeded. Try again later.' }, { status: 429 });
    }

    const { messages, provider = 'openai' } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    let model;
    
    // Multi-Provider Routing
    switch (provider) {
      case 'anthropic':
        if (!process.env.ANTHROPIC_API_KEY) throw new Error('Anthropic not configured');
        model = anthropic('claude-3-haiku-20240307');
        break;
      case 'google':
      case 'gemini':
        if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) throw new Error('Gemini not configured');
        model = google('models/gemini-1.5-flash-latest');
        break;
      case 'openai':
      default:
        if (!process.env.OPENAI_API_KEY) throw new Error('OpenAI not configured');
        model = openai('gpt-3.5-turbo');
        break;
    }

    const result = await streamText({
      model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages
      ],
      temperature: 0.7,
      maxOutputTokens: 500,
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error('AI Chat API Error:', error);
    
    // Local Fallback System (if external APIs fail)
    return NextResponse.json({ 
      error: 'AI service unavailable',
      fallbackMessage: "I'm currently operating in offline mode. Please leave a message via the contact form and our human team will respond!"
    }, { status: 503 });
  }
}
