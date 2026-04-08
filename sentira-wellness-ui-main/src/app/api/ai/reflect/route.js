import { NextResponse } from 'next/server';
import { protect } from '@/lib/authMiddleware';

const REFLECTION_PROMPT = `You are Sentira. The user has just finished writing a personal journal entry. 
Your task is to:
1. Provide a brief, empathetic summary of what they expressed.
2. Validate their feelings and offer a supportive, non-judgmental perspective.
3. Share your "opinion" or reflection in a way that helps them feel heard and lighter.
4. Keep the tone calm, conversational, and private. 
Do not give medical advice. Aim to reduce their emotional weight.`;

// POST /api/ai/reflect
export async function POST(request) {
  const auth = await protect(request);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  const { content } = await request.json();
  if (!content) return NextResponse.json({ success: false, message: 'No content provided' }, { status: 400 });

  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json({
      success: true,
      data: { message: "I've read your words, and I'm here with you. Your feelings are valid and important.", role: 'assistant' }
    });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [{ role: 'system', content: REFLECTION_PROMPT }, { role: 'user', content: `Here is my journal entry: ${content}` }],
        temperature: 0.7,
        max_tokens: 600,
      }),
    });
    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    return NextResponse.json({ success: true, data: { message: aiResponse, role: 'assistant' } });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'I am reflecting on your words. Take a moment to breathe.' }, { status: 500 });
  }
}
