import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Use the incoming body, or fallback to a default if not provided
    const payload = Object.keys(body).length
      ? body
      : {
          model: 'mistralai/mistral-nemo:free',
          messages: [
            {
              role: 'user',
              content: 'I will give you information about a candidate from ',
            },
          ],
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