import { NextRequest, NextResponse } from 'next/server';
import { getAIMatch, chatWithAI } from '@/utils/openai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...data } = body;

    if (action === 'match') {
      const match = await getAIMatch(data);
      return NextResponse.json({ success: true, match });
    }

    if (action === 'chat') {
      const { conversationHistory, userMessage } = data;
      const response = await chatWithAI(conversationHistory, userMessage);
      return NextResponse.json({ success: true, response });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('AI Match Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
