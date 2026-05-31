import type { Metadata } from "next";
import ComparisonPage, { type ComparisonData } from "../../components/comparison-page";

export const metadata: Metadata = {
  title: "HookSignals vs 1of10 — Pre-Publish Analysis vs Niche Research",
  description:
    "HookSignals scores your hook, title and thumbnail before you publish. 1of10 shows what already went viral in your niche. Compare workflows and choose the right tool.",
  alternates: { canonical: "https://hooksignals.com/compare/hooksignals-vs-1of10" },
  openGraph: {
    title: "HookSignals vs 1of10",
    description:
      "HookSignals is a pre-publish packaging analyzer. 1of10 is a viral video research tool. See how they compare and which fits your workflow.",
    url: "https://hooksignals.com/compare/hooksignals-vs-1of10",
    siteName: "HookSignals",
    type: "website",
  },
};

const data: ComparisonData = {
  competitor: { name: "1of10", slug: "1of10" },
  hero: {
    badge: "Tool comparison",
    subheadline:
      "1of10 helps you discover what videos went 10x in your niche. HookSignals helps you make sure your next video is packaged strongly enough to compete with them. Different stages of the same problem.",
  },
  summary: {
    chooseHS: [
      "You want AI feedback on your hook and title before you record or publish",
      "You need packaging scores across 9 dimensions — clarity, curiosity, CTR potential and more",
      "You want specific rewrite suggestions for your opening line and thumbnail text",
      "You prefer a focused pre-publish checklist over a research database",
      "You want to improve packaging on a video that is already planned",
    ],
    chooseComp: [
      "You are in the research phase and want to see what went viral in a niche",
      "You want to study outlier videos to identify proven content angles",
      "You are looking for topic inspiration before deciding what to make",
      "You want to validate a content direction by studying what 10x'd for others",
    ],
  },
  features: [
    { capability: "Pre-publish hook analysis", hooksignals: "AI scoring across 9 signals", competitor: "Not available", hsAdvantage: true },
    { capability: "Title scoring and diagnosis", hooksignals: "Packaging-focused with rewrites", competitor: "Not available", hsAdvantage: true },
    { capability: "Thumbnail text analysis", hooksignals: "Length, clarity and contrast check", competitor: "Not available", hsAdvantage: true },
    { capability: "AI improvement suggestions", hooksignals: "Better titles, hooks, thumbnail text", competitor: "Not available", hsAdvantage: true },
    { capability: "Viral video research in niche", hooksignals: "Not the focus", competitor: "Core feature", hsAdvantage: false },
    { capability: "Outlier video discovery", hooksignals: "Not the focus", competitor: "Core feature", hsAdvantage: false },
    { capability: "YouTube URL analysis", hooksignals: "Via YouTube Data API — real metadata", competitor: "Via published video data", hsAdvantage: false },
    { capability: "Works before video is published", hooksignals: "Yes — analyze any hook or title", competitor: "Requires published videos to study", hsAdvantage: true },
    { capability: "Hook generator", hooksignals: "Generates 5 opening angles per topic", competitor: "Not available", hsAdvantage: true },
    { capability: "No YouTube account required", hooksignals: "Yes", competitor: "Yes", hsAdvantage: false },
    { capability: "Learning curve", hooksignals: "Low — paste and analyze", competitor: "Low — search and browse", hsAdvantage: false },
  ],
  workflow: [
    { step: "Idea", hs: "Generate hook directions with YouTube Hook Generator", competitor: "Research niche outliers for inspiration" },
    { step: "Hook", hs: "Score hook strength and get 3 rewrite options", competitor: "Not in scope" },
    { step: "Title", hs: "Analyze title clarity, curiosity and CTR potential", competitor: "Not in scope" },
    { step: "Thumbnail", hs: "Check thumbnail text length and contrast signal", competitor: "Not in scope" },
    { step: "Publish", hs: "Pre-publish checklist complete — publish with confidence", competitor: "Not in scope" },
    { step: "Review", hs: "Paste published URL to review actual packaging scores", competitor: "Published video may appear in 1of10 data over time" },
  ],
  decisions: [
    { need: "Score a hook I have written", choose: "hooksignals" },
    { need: "Find what 10x'd in my niche last month", choose: "competitor" },
    { need: "Get a rewrite of my opening line", choose: "hooksignals" },
    { need: "Study outlier video patterns", choose: "competitor" },
    { need: "Check title clarity before publishing", choose: "hooksignals" },
    { need: "Identify proven content angles", choose: "competitor" },
    { need: "Thumbnail text feedback", choose: "hooksignals" },
    { need: "Validate a content direction", choose: "competitor" },
    { need: "Full pre-publish packaging review", choose: "hooksignals" },
  ],
  benefits: [
    { title: "Scores before you publish", desc: "You get feedback while you can still change the hook, title and thumbnail — not after the video is already live." },
    { title: "9-dimension packaging analysis", desc: "Hook strength, clarity, curiosity gap, CTR potential, outlier potential, retention risk and more — scored per video." },
    { title: "No research required", desc: "Paste your own hook or URL. You do not need to scroll through a niche database to get actionable feedback." },
    { title: "Specific rewrites, not vague scores", desc: "Every analysis returns 3 better title options, 3 hook rewrites and thumbnail text ideas — not just a number." },
    { title: "Public data only", desc: "Scores come from public YouTube metadata and packaging analysis. No account access, no private analytics." },
    { title: "Fast workflow", desc: "A full video analysis takes under 30 seconds. Use it before every upload as a final pre-publish check." },
  ],
  tradeoffs: [
    { title: "Niche research and inspiration", desc: "1of10 is purpose-built for finding what went viral in a specific niche. HookSignals does not offer a niche research database." },
    { title: "Outlier pattern library", desc: "If you want to study dozens of outlier videos to identify content patterns, 1of10's format is better suited to that research workflow." },
    { title: "Topic validation", desc: "Before you decide what to make, 1of10 can help confirm whether a content angle has already proven viral. HookSignals helps after the topic is chosen." },
    { title: "Content ideation at scale", desc: "For teams generating many content ideas across multiple niches, 1of10's research library provides broader coverage for the ideation phase." },
  ],
  faq: [
    { question: "What is the main difference between HookSignals and 1of10?", answer: "1of10 shows you what videos have already gone viral in a niche. HookSignals analyzes the video you are about to publish and scores its packaging — hook strength, title clarity and thumbnail signals — before it goes live. They solve adjacent problems at different stages of the creator workflow." },
    { question: "Can I use both tools together?", answer: "Yes. A common workflow is to use 1of10 for niche research and topic validation, then use HookSignals to score and improve the hook and title once you have decided what to make." },
    { question: "Does HookSignals show me what videos went viral?", answer: "No. HookSignals analyzes the packaging of your specific video. It does not maintain a database of viral or outlier content. For niche research, a tool focused on that workflow is better suited." },
    { question: "Does 1of10 give feedback on my hook or title before publishing?", answer: "1of10 is a research tool, not a pre-publish analyzer. It shows you what has performed well, but it does not score your own hook or title or provide rewrite suggestions." },
    { question: "What does HookSignals actually analyze?", answer: "HookSignals fetches public video metadata via the YouTube Data API and runs AI packaging analysis across 9 signals: packaging score, hook strength, title clarity, curiosity gap, CTR potential, outlier potential, retention risk and more. It also returns better title options, hook rewrites and thumbnail text ideas." },
    { question: "Is HookSignals useful before I record?", answer: "Yes. You can paste a planned hook or working title into the Hook Analyzer or Title Analyzer before you record and get scoring and rewrite suggestions. You do not need a published video to use HookSignals." },
    { question: "What stage of the workflow is each tool for?", answer: "1of10 is best used during the ideation and research phase — before you decide what to make. HookSignals is best used during the production and pre-publish phase — once you have a hook, title or video ready to score and refine." },
    { question: "Does HookSignals require a YouTube account?", answer: "No. HookSignals uses the public YouTube Data API to fetch metadata from any public video URL. You do not need to connect or log in to your YouTube account." },
  ],
};

export default function Page() {
  return <ComparisonPage data={data} />;
}
