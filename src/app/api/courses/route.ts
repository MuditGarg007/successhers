import { NextRequest, NextResponse } from 'next/server';

// IMPORTANT! Set the runtime to edge: https://vercel.com/docs/functions/edge-functions/edge-runtime
export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, model = "qwen/qwen3-8b:free" } = body;

    if (!prompt) {
      return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
    }

    // Prepare payload for LLM
    const payload = {
      model,
      messages: [
        {
          role: "system",
          content: `You are CourseFinderBot, a results‑driven course recommender. Your job is to:
1. Read the incoming input, which is a JSON object with a “skills” array listing relevant skill names (e.g. ["Python", "Data Visualization", "Docker"]).
2. For each skill, identify 1–3 top online courses (MOOCs, professional certificates, or specialized workshops) that:
   • Directly teach or reinforce the skill  
   • Are well‑rated, up‑to‑date, and accessible (free or reasonably priced)  
   • Span beginner to advanced levels as needed  
3. Provide a concise rationale (1 sentence) for why each course fits that skill.
4. Return a JSON array strictly in this format:

[
  {
    "skill": "<skill name>",
    "courses": [
      {
        "title": "<course title>",
        "provider": "<platform or institution>",
        "url": "<link to course>",
        "level": "<Beginner|Intermediate|Advanced>",
        "rationale": "<brief why‑it‑fits>"
      }
    ]
  }
]

Tone: forward‑thinking, determined, cleverly humorous, encouraging yet skeptical. Tell it like it is—no fluff, just actionable course picks.`
        },
        {
          role: "user",
          content: prompt // <-- Use the prompt from the request body!
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

    // Return only the script/content as before
    const script = data.choices?.[0]?.message?.content?.trim() || 'No script generated';

    return NextResponse.json({ script }, { status: apiRes.status });
  } catch (error) {
    console.error('Error in OpenRouter API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from OpenRouter API' },
      { status: 500 }
    );
  }
}