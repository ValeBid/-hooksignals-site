import type { Metadata } from "next";
import ComparisonPage, { type ComparisonData } from "../../components/comparison-page";

export const metadata: Metadata = {
  title: "HookSignals vs OutlierKit — Pre-Publish Analysis vs Outlier Research",
  description:
    "HookSignals scores your hook, title and thumbnail before publishing. OutlierKit helps you find outlier videos and patterns in your niche. Compare tools and decide which fits your workflow.",
  alternates: { canonical: "https://hooksignals.com/compare/hooksignals-vs-outlierkit" },
  openGraph: {
    title: "HookSignals vs OutlierKit",
    description:
      "Pre-publish packaging analysis vs outlier video research. See how HookSignals and OutlierKit compare for YouTube creators.",
    url: "https://hooksignals.com/compare/hooksignals-vs-outlierkit",
    siteName: "HookSignals",
    type: "website",
  },
};

const data: ComparisonData = {
  competitor: { name: "OutlierKit", slug: "outlierkit" },
  hero: {
    badge: "Tool comparison",
    subheadline:
      "OutlierKit surfaces the videos that massively outperformed in a niche — helping you find proven angles. HookSignals takes over once you have an angle and helps you package it correctly before publishing.",
  },
  summary: {
    chooseHS: [
      "You have a topic or hook and want AI feedback before you publish",
      "You want to score your title, hook and thumbnail packaging across 9 dimensions",
      "You want specific rewrites — better titles, stronger hooks, tighter thumbnail text",
      "You want a fast pre-publish check that does not require browsing a research library",
      "You want feedback on packaging a video that is already in production",
    ],
    chooseComp: [
      "You are in the ideation phase and want to find what already worked in a niche",
      "You want to build content strategy from proven outlier patterns",
      "You want to identify untapped angles by studying high-performing videos",
      "You want to validate a niche before committing to a content direction",
    ],
  },
  features: [
    { capability: "Pre-publish hook scoring", hooksignals: "AI analysis across 9 packaging signals", competitor: "Not available", hsAdvantage: true },
    { capability: "Title diagnosis and rewrites", hooksignals: "Clarity, curiosity and CTR feedback plus 3 alternatives", competitor: "Not available", hsAdvantage: true },
    { capability: "Thumbnail text analysis", hooksignals: "Length, readability and contrast check", competitor: "Not available", hsAdvantage: true },
    { capability: "Outlier video research", hooksignals: "Not the focus", competitor: "Core feature", hsAdvantage: false },
    { capability: "Niche performance patterns", hooksignals: "Not the focus", competitor: "Core feature", hsAdvantage: false },
    { capability: "AI packaging suggestions", hooksignals: "Titles, hooks, thumbnail text per analysis", competitor: "Not available", hsAdvantage: true },
    { capability: "Works before video is published", hooksignals: "Yes — any hook or working title", competitor: "Requires published video data", hsAdvantage: true },
    { capability: "YouTube URL analysis", hooksignals: "Real metadata via YouTube Data API", competitor: "Via published video library", hsAdvantage: false },
    { capability: "Hook generator", hooksignals: "5 opening hook directions per topic", competitor: "Not available", hsAdvantage: true },
    { capability: "No YouTube login required", hooksignals: "Yes", competitor: "Yes", hsAdvantage: false },
    { capability: "Use case", hooksignals: "Pre-publish packaging optimization", competitor: "Niche research and content ideation", hsAdvantage: false },
  ],
  workflow: [
    { step: "Idea", hs: "Use Hook Generator to create opening angles from your topic", competitor: "Research outlier videos to find proven content angles" },
    { step: "Hook", hs: "Score hook strength in Hook Analyzer — get rewrites if weak", competitor: "Not in scope" },
    { step: "Title", hs: "Analyze title clarity, curiosity gap and CTR potential", competitor: "Not in scope" },
    { step: "Thumbnail", hs: "Check thumbnail text length, contrast and readability", competitor: "Not in scope" },
    { step: "Publish", hs: "Packaging reviewed — publish with all signals checked", competitor: "Not in scope" },
    { step: "Review", hs: "Paste published URL to score actual video packaging signals", competitor: "Video may eventually appear in outlier research data" },
  ],
  decisions: [
    { need: "Score a hook or title before publishing", choose: "hooksignals" },
    { need: "Find outlier patterns in a niche", choose: "competitor" },
    { need: "Get 3 stronger title alternatives", choose: "hooksignals" },
    { need: "Identify proven content formats", choose: "competitor" },
    { need: "Pre-publish thumbnail text feedback", choose: "hooksignals" },
    { need: "Research high-performing video patterns", choose: "competitor" },
    { need: "Improve hook before recording", choose: "hooksignals" },
    { need: "Validate a content direction", choose: "competitor" },
    { need: "Full packaging review before upload", choose: "hooksignals" },
  ],
  benefits: [
    { title: "Focused on what you control", desc: "You cannot control the algorithm but you can control your packaging. HookSignals scores the signals you can still change before upload." },
    { title: "Scores at the point of decision", desc: "Get feedback when you can still act on it — before the video is published, not after the views come in." },
    { title: "9-signal packaging analysis", desc: "Every analysis covers hook strength, title clarity, curiosity gap, CTR potential, outlier potential, retention risk and more." },
    { title: "Rewrites included", desc: "Each analysis returns better title options, hook rewrites and thumbnail text ideas — ready to use or adapt." },
    { title: "No research required to start", desc: "Paste your own hook or URL. There is no niche database to navigate before getting feedback on your specific content." },
    { title: "Works at any stage", desc: "Analyze a working title before recording, score a hook mid-production, or review a published URL. The tool fits anywhere in the workflow." },
  ],
  tradeoffs: [
    { title: "Outlier and niche research", desc: "OutlierKit is designed around finding what has already outperformed in a niche. HookSignals does not maintain a library of outlier or viral videos." },
    { title: "Content strategy from patterns", desc: "If you build content calendars around proven niche patterns, OutlierKit's research focus better suits that strategic planning workflow." },
    { title: "Competitive angle discovery", desc: "Understanding what angles have already been done well — and where gaps exist — is a research task where a niche research tool has an advantage." },
    { title: "Niche validation", desc: "Before investing in a content direction, studying what has proven to outperform in that niche is valuable work that OutlierKit is built for." },
  ],
  faq: [
    { question: "What is the core difference between HookSignals and OutlierKit?", answer: "OutlierKit helps you research what has already outperformed in a niche, so you can build content strategy from proven patterns. HookSignals analyzes the packaging of the video you are about to publish — hook, title and thumbnail — and tells you how strong the signals are before you upload." },
    { question: "Can I use both tools in the same workflow?", answer: "Yes. OutlierKit works well in the research and ideation phase. Once you have a topic and angle, HookSignals takes over for pre-publish packaging analysis and scoring. The two tools are complementary." },
    { question: "Does HookSignals help me find new content ideas?", answer: "HookSignals is not a content research tool. It analyzes the packaging of ideas you already have. For finding proven angles in a niche, a research-focused tool is better suited for that stage." },
    { question: "What signals does HookSignals analyze?", answer: "HookSignals scores packaging across 9 dimensions: overall packaging strength, hook strength, title clarity, curiosity gap, CTR potential, outlier potential, retention risk and more. Each analysis also returns better title options, hook rewrites and thumbnail text ideas." },
    { question: "Does HookSignals use real YouTube data?", answer: "Yes. When you paste a YouTube URL, HookSignals fetches real public metadata via the YouTube Data API — title, views, likes, duration and thumbnail. It does not access private analytics or YouTube Studio data." },
    { question: "Can I use HookSignals before I have a published video?", answer: "Yes. Paste a planned hook into the Hook Analyzer or a working title into the Title Analyzer. You get scoring and improvement suggestions before any video is recorded or uploaded." },
    { question: "What does 'packaging' mean in HookSignals?", answer: "Packaging refers to the combination of signals that determine whether a viewer clicks and keeps watching: the title structure, the opening line of the video, the thumbnail text and how well they work together to create curiosity and clarity. HookSignals scores each of these signals individually and as a combined score." },
    { question: "Is there a free tier?", answer: "Yes. Every account starts with 15 free credits, enough for 3 full analyses. The free tier lets you run real analyses on your own content before deciding whether to upgrade." },
  ],
};

export default function Page() {
  return <ComparisonPage data={data} />;
}
