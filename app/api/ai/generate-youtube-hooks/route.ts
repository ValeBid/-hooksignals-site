import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function fallbackHooks(topic: string) {
  const subject = topic.trim().replace(/[.!?]+$/, "") || "your video idea";
  return [
    `Most creators explain ${subject} too slowly. Start with this instead.`,
    `If ${subject} is not getting views, the first 3 seconds are probably the problem.`,
    `I would not publish a video about ${subject} until the hook passes this test.`,
    `Here is the fastest way to make ${subject} feel worth watching.`,
    `The biggest mistake with ${subject} is giving context before creating curiosity.`,
  ];
}

export async function POST(request: Request) {
  try {
    const { topic, platform = "YouTube Shorts", audience = "creators" } = await request.json();
    const cleanTopic = String(topic || "").trim().slice(0, 240);
    if (cleanTopic.length < 4) return NextResponse.json({ error: "missing_topic" }, { status: 400 });

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ hooks: fallbackHooks(cleanTopic), mode: "rules" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.75,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "Return JSON only: { hooks: string[] }. Write 5 specific, non-clickbait video hooks. Each hook must be under 22 words and optimized for retention." },
        { role: "user", content: `Topic: ${cleanTopic}\nPlatform: ${platform}\nAudience: ${audience}\nGenerate varied hooks: mistake, proof, contrast, curiosity, direct payoff.` },
      ],
    });

    const parsed = JSON.parse(completion.choices[0]?.message?.content || "{}");
    const hooks = Array.isArray(parsed.hooks) ? parsed.hooks.filter((h: unknown) => typeof h === "string").slice(0, 5) : fallbackHooks(cleanTopic);
    return NextResponse.json({ hooks: hooks.length ? hooks : fallbackHooks(cleanTopic), mode: "ai" });
  } catch {
    return NextResponse.json({ error: "generation_failed" }, { status: 500 });
  }
}
