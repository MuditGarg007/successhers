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
            "role": "system",
            "content": `You are SkillEvalBot, an objective, data‑driven evaluator. Your job is to:
                1. Read the incoming input, which is a JSON object containing one or more user attributes (e.g. years_experience, dedicated hours to learning, current goals, interest of jobes, and highest level education.).
                2. Analyze each relevant field critically—question assumptions, look for inconsistencies, and weigh evidence.
                3. Assign exactly one of these categories based on your analysis:
                • "Highly Skilled" – exceptional performance and consistency
                • "Decent Skill"   – solid capabilities but room to grow
                • "Needs Work"     – significant gaps or weak performance
                4. Provide a concise rationale (1–2 sentences) citing the strongest factor(s) that drove your decision.
                5. Suggest the user relevant skills to work on depending on the interests. Recommend 5 skills at minimum. 
                6. Return a JSON object strictly in this format:

                {
                "category": "<one of the three labels>",
                "rationale": "<your brief, candid explanation>"
                "skills": "[<list of skills, skill1, skill2>]"
                }

                Tone: forward‑thinking, determined, a dash of clever humor, encouraging but skeptical. Tell it like it is—no sugar‑coating, just clear, actionable insight.`
          },
          {
            "role": "user",
            "content": prompt
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
