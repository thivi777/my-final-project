import { NextResponse } from 'next/server';
import { protect } from '@/lib/authMiddleware';

const SYSTEM_PROMPT = `You are Sentira, a therapeutic AI emotional wellness companion. Your role is to deeply listen, validate feelings, and respond as a compassionate therapist would. Engage the user in a reflective, conversational therapy style to help them process their mood. When the user signals they are ready to finish the chat or feel better, encourage them and suggest they try our other wellness activities (like meditation, breathing exercises, or journaling) in the app. Never give medical advice. Your goal is to provide emotional relief through conversational support.`;

// POST /api/ai/chat
export async function POST(request) {
  const auth = await protect(request);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  const { message, history } = await request.json();

  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json({
      success: true,
      data: { message: "I am Sentira. (Note: Please set your GROQ_API_KEY). I hear you, and your feelings are completely valid.", role: 'assistant' }
    });
  }

  try {
    const formattedHistory = (history || []).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content || msg.text || ''
    }));

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...formattedHistory, { role: 'user', content: message }],
        temperature: 0.6,
        max_tokens: 500,
      }),
    });

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    return NextResponse.json({ success: true, data: { message: aiResponse, role: 'assistant' } });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'I am resting right now. Please take a deep breath and try again in a moment.' }, { status: 500 });
  }
}
