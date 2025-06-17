import { OpenAI } from 'openai';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_TOKEN,
  baseURL: "https://openrouter.ai/api/v1/",
});

// IMPORTANT! Set the runtime to edge: https://vercel.com/docs/functions/edge-functions/edge-runtime
export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
  const { prompt } = await req.json();

  const response = await openai.chat.completions.create({
    model: "deepseek/deepseek-r1-0528:free",
    messages: [
      {
        role: "system",
        content: "You are an AI writing assistant that will help find women friendly companies whenever someone searches a company name. You have to fetch 4 statistics about a company. One, you will find the quantitative number of women employed in the company. Second, you will find the quantitative number of women in leadership roles. Third, you will find the quantitative value of gap between the salary of male and females. Fourth, if they have maternity leave policies. If they do not have maternity leave policies, you will say 'No maternity leave policies'. If they do not have any of the above statistics, you will say 'No Public Records Of This Stat'. If you don't any information about a company, just fetch their contacts and socials. Return all the data found in json format",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const script = response.choices[0]?.message?.content!.trim() || 'No script generated';

  return new Response(JSON.stringify({ script }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
