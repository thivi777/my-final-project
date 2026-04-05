const axios = require('axios');

const SYSTEM_PROMPT = `You are Sentira, a private emotional wellness AI companion. Your role is to listen with empathy, validate feelings without judgment, and respond in a calm, supportive, and conversational tone. All conversations remain strictly private and local—never stored, transmitted, or visible to anyone else. You do not provide medical advice; instead, you guide reflection, offer perspective, and encourage emotional clarity. Every response should help the user feel lighter, as if their emotional weight has been reduced by an antigravity field of compassion. After guiding the user through their emotions, gently transition them toward the next positive activity suggested by the mood locker, encouraging progress without pressure. Your goal is to ensure users feel safe, understood, and motivated to continue their journey with trust and emotional lightness.`;

const REFLECTION_PROMPT = `You are Sentira. The user has just finished writing a personal journal entry. 
Your task is to:
1. Provide a brief, empathetic summary of what they expressed.
2. Validate their feelings and offer a supportive, non-judgmental perspective.
3. Share your "opinion" or reflection in a way that helps them feel heard and lighter.
4. Keep the tone calm, conversational, and private. 
Do not give medical advice. Aim to reduce their emotional weight.`;

exports.journalChat = async (req, res) => {
  try {
    const { message, history } = req.body;

    // Clean up history to match the API requirements
    const formattedHistory = (history || []).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content || msg.text || ''
    }));

    // Build the message array with the system prompt first
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...formattedHistory,
      { role: 'user', content: message }
    ];

    // Check if API key is present
    if (!process.env.GROQ_API_KEY) {
      console.warn("Missing GROQ_API_KEY in environment variables. Falling back to mock response.");
      return res.status(200).json({
        success: true,
        data: {
          message: "I am Sentira. (Note: Please set your GROQ_API_KEY in the .env file to enable full AI responses). I hear you, and your feelings are completely valid.",
          role: 'assistant'
        }
      });
    }

    // Call the Groq OpenAI-compatible API
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-8b-8192', // Highly performant, completely free model
        messages: messages,
        temperature: 0.6,
        max_tokens: 500, // Keep responses appropriately concise
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const aiResponse = response.data.choices[0].message.content;

    res.status(200).json({
      success: true,
      data: {
        message: aiResponse,
        role: 'assistant'
      }
    });

  } catch (error) {
    console.error("AI Controller Error:", error?.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "I am resting right now. Please take a deep breath and try talking to me again in a moment."
    });
  }
};

exports.generateJournalReflection = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ success: false, message: "No content provided" });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(200).json({
        success: true,
        data: {
          message: "I've read your words, and I'm here with you. (Note: Please set your GROQ_API_KEY to see my full reflection). Your feelings are valid and important.",
          role: 'assistant'
        }
      });
    }

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-8b-8192',
        messages: [
          { role: 'system', content: REFLECTION_PROMPT },
          { role: 'user', content: `Here is my journal entry: ${content}` }
        ],
        temperature: 0.7,
        max_tokens: 600,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const aiResponse = response.data.choices[0].message.content;

    res.status(200).json({
      success: true,
      data: {
        message: aiResponse,
        role: 'assistant'
      }
    });

  } catch (error) {
    console.error("AI Reflection Error:", error?.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "I am reflecting on your words. Take a moment to breathe, and I'll share my thoughts with you shortly."
    });
  }
};
