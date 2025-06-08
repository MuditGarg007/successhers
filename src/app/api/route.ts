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
              content: 'Make me a resume for a software engineer position. Make it in a bullet point manner. Include diverse skills + different programming languages. There should be plenty of numbers and metrics to show impact. Make it concise',
            },
          ],
        };

    const apiRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer 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',
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