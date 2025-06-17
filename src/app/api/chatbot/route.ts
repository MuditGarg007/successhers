import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const SESSIONS_DIR = path.resolve(process.cwd(), 'sessions');

async function getSessionMessages(sessionId: string) {
  try {
    const file = path.join(SESSIONS_DIR, `${sessionId}.json`);
    const data = await fs.readFile(file, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveSessionMessages(sessionId: string, messages: any[]) {
  await fs.mkdir(SESSIONS_DIR, { recursive: true });
  const file = path.join(SESSIONS_DIR, `${sessionId}.json`);
  await fs.writeFile(file, JSON.stringify(messages), 'utf-8');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, model = 'meta-llama/llama-3.3-8b-instruct:free', messages = [] } = body;

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
    }

    // Load previous messages
    const prevMessages = await getSessionMessages(sessionId);

    // Append new messages
    const allMessages = [...prevMessages, ...messages].slice(-10);

    // Save updated history
    await saveSessionMessages(sessionId, allMessages);

    // Prepare payload for LLM
    const payload = {
      model,
      messages: allMessages,
    };

    const apiRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_TOKEN}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Local Development',
      },
      body: JSON.stringify(payload),
    });

    const data = await apiRes.json();
    return NextResponse.json(data, { status: apiRes.status });
  } catch (error) {
    console.error('Error in OpenRouter API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from OpenRouter API' },
      { status: 500 }
    );
  }
}