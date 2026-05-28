import { NextResponse } from "next/server";

function clamp(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const text = String(body?.text || "").trim();

  if (text.length < 2) {
    return NextResponse.json({ error: "Enter thumbnail text to analyze." }, { status: 400 });
  }

  const words = text.split(/\s+/).filter(Boolean);
  const chars = text.length;
  const hasNumber = /\d/.test(text);
  const hasPowerWord = /secret|mistake|before|after|why|how|stop|avoid|fast|easy|truth|hidden/i.test(text);

  const lengthScore = clamp(100 - Math.max(0, words.length - 4) * 14 - Math.max(0, chars - 28) * 2);
  const clarityScore = clamp(58 + (words.length <= 5 ? 20 : -8) + (hasNumber ? 8 : 0) + (hasPowerWord ? 10 : 0));
  const mobileScore = clamp(70 + (chars <= 24 ? 18 : -Math.max(0, chars - 24) * 2));
  const score = clamp(lengthScore * 0.35 + clarityScore * 0.35 + mobileScore * 0.3);

  const feedback = [];
  if (words.length > 5) feedback.push("Shorten the text. Mobile thumbnails usually need fewer than five words.");
  if (chars > 28) feedback.push("Reduce character count so the message survives at feed size.");
  if (!hasNumber && !hasPowerWord) feedback.push("Add a sharper trigger such as a number, mistake, before/after angle or clear outcome.");
  if (feedback.length === 0) feedback.push("The text is compact enough for a first thumbnail draft. Test it against the title before publishing.");

  return NextResponse.json({
    analysis: {
      score,
      lengthScore,
      clarityScore,
      mobileScore,
      verdict: score >= 82 ? "Strong thumbnail text candidate." : score >= 65 ? "Usable, but it can be sharper." : "Too unclear or crowded for mobile feeds.",
      feedback,
      rewrites: [
        words.slice(0, 4).join(" "),
        hasNumber ? text.replace(/\s+/g, " ") : `3 ${words.slice(0, 3).join(" ")}`,
        text.replace(/\b(the|a|an|this|that|really|very)\b/gi, "").replace(/\s+/g, " ").trim(),
      ].filter(Boolean).slice(0, 3),
    },
  });
}
