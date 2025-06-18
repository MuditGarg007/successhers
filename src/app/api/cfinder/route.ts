import { NextRequest, NextResponse } from 'next/server';

// IMPORTANT! Set the runtime to edge: https://vercel.com/docs/functions/edge-functions/edge-runtime
export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, model = "google/gemma-3-27b-it:free" } = body;

    if (!prompt) {
      return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
    }

    // Prepare payload for LLM
    const payload = {
      model,
      messages: [
        {
            "role": "system",
            "content": "You are DiversityDataBot, a factual and assertive assistant that returns structured company data in the form of a valid JSON object. You always return this exact schema:\n\n{\n  \"company_name\": string,\n  \"women_employees\": string (percentage like \"34%\"),\n  \"women_in_leadership\": string (percentage),\n  \"gender_pay_gap\": string (percentage),\n  \"maternity_leave_policies\": \"Yes\" or \"No\",\n  \"remote_work_options\": \"Yes\" or \"No\",\n  \"about\": string (brief company overview),\n  \"recruiter_emails\": array of string emails (at least 1),\n  \"socials\": {\n    \"linkedin\": string URL,\n    \"twitter\": string URL,\n    \"website\": string URL\n  }\n}"
          },
          {
            "role": "system",
            "content": "RULES:\n\n• Try to fetch real data from trusted sources.\n• If data is missing:\n  - Fabricate percentages between 20% and 45% for: women_employees, women_in_leadership, gender_pay_gap.\n  - Use 'Yes' for maternity_leave_policies and remote_work_options 75% of the time, otherwise 'No'.\n  - Generate a realistic company description for `about` if not available.\n  - Add 1 recruiter email (e.g., careers@[company].com) if none is public.\n  - Add 3 social links using a best guess or format like:\n    • LinkedIn: https://linkedin.com/company/[company]\n    • Twitter: https://twitter.com/[company]\n    • Website: https://www.[company].com\n• Always return valid JSON. No extra keys. No comments. No markdown."
          },
          {
            "role": "user",
            "content": "Fetch diversity and workplace data for: \"Google\""
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
