import type { Metadata } from "next";
import ComparisonPage, { type ComparisonData } from "../../components/comparison-page";

export const metadata: Metadata = {
  title: "HookSignals vs TubeBuddy — Pre-Publish Packaging vs YouTube Browser Extension",
  description:
    "HookSignals analyzes hook, title and thumbnail packaging before you publish. TubeBuddy is a YouTube browser extension for A/B testing, keyword research and bulk operations. Compare and choose.",
  alternates: { canonical: "https://hooksignals.com/compare/hooksignals-vs-tubebuddy" },
  openGraph: {
    title: "HookSignals vs TubeBuddy",
    description:
      "Pre-publish packaging analysis vs YouTube browser extension tools. See how HookSignals and TubeBuddy compare for creators.",
    url: "https://hooksignals.com/compare/hooksignals-vs-tubebuddy",
    siteName: "HookSignals",
    type: "website",
  },
};

const data: ComparisonData = {
  competitor: { name: "TubeBuddy", slug: "tubebuddy" },
  hero: {
    badge: "Tool comparison",
    subheadline:
      "TubeBuddy is a YouTube browser extension with A/B thumbnail testing, keyword tools and bulk video management. HookSignals is a web-based pre-publish analyzer that scores your hook, title and packaging before the video goes live — no extension needed.",
  },
  summary: {
    chooseHS: [
      "You want AI-scored feedback on your hook and title packaging before publishing",
      "You want 9-dimension packaging analysis — hook strength, clarity, CTR potential and more",
      "You prefer a focused web tool that does not require a browser extension",
      "You want specific rewrites — title alternatives, hook options, thumbnail text ideas",
      "You want pre-publish feedback on a video still in production",
    ],
    chooseComp: [
      "You want to run real A/B thumbnail tests on published videos",
      "You need keyword research and SEO tag recommendations inside YouTube Studio",
      "You want bulk operations across your channel — descriptions, cards, tags",
      "You want to manage your channel workflow from inside the YouTube interface",
      "You need a tool that integrates directly with your YouTube Studio account",
    ],
  },
  features: [
    { capability: "Pre-publish hook analysis", hooksignals: "AI scoring across 9 packaging signals", competitor: "Not available", hsAdvantage: true },
    { capability: "A/B thumbnail testing", hooksignals: "Not available", competitor: "Core feature on published videos", hsAdvantage: false },
    { capability: "Title packaging diagnosis", hooksignals: "Clarity, curiosity and CTR packaging focus", competitor: "SEO and keyword focus", hsAdvantage: false },
    { capability: "Thumbnail text analysis", hooksignals: "Pre-publish length and readability check", competitor: "Not directly — A/B testing post-publish", hsAdvantage: true },
    { capability: "AI hook rewrites", hooksignals: "3 stronger hook alternatives per analysis", competitor: "Not available", hsAdvantage: true },
    { capability: "AI title alternatives", hooksignals: "3 packaging-focused title rewrites", competitor: "Tag and keyword suggestions", hsAdvantage: false },
    { capability: "Keyword research", hooksignals: "Not available", competitor: "Available", hsAdvantage: false },
    { capability: "Bulk video management", hooksignals: "Not available", competitor: "Core feature", hsAdvantage: false },
    { capability: "Browser extension required", hooksignals: "No — web app only", competitor: "Yes — core functionality lives in extension", hsAdvantage: true },
    { capability: "Works without YouTube login", hooksignals: "Yes — public data only", competitor: "No — requires YouTube account connection", hsAdvantage: true },
    { capability: "Hook and opening line scoring", hooksignals: "Dedicated Hook Analyzer tool", competitor: "Not available", hsAdvantage: true },
    { capability: "Works before video is published", hooksignals: "Yes — any hook or title", competitor: "Most features require published video", hsAdvantage: true },
  ],
  workflow: [
    { step: "Idea", hs: "Hook Generator turns a topic into 5 opening angle options", competitor: "Keyword research reveals search demand for your topic" },
    { step: "Hook", hs: "Hook Analyzer scores opening line strength and retention pull", competitor: "Not in scope" },
    { step: "Title", hs: "Packaging analysis for clarity, curiosity and CTR potential", competitor: "SEO score, tag recommendations, keyword match" },
    { step: "Thumbnail", hs: "Pre-publish text length and readability check", competitor: "A/B thumbnail test after the video is published" },
    { step: "Publish", hs: "Pre-publish packaging check complete", competitor: "Bulk editing tools, scheduled publishing, cards" },
    { step: "Review", hs: "Paste published URL to score packaging signals", competitor: "A/B test results, click-through data, performance tracking" },
  ],
  decisions: [
    { need: "Score hook and title before recording", choose: "hooksignals" },
    { need: "Run an A/B thumbnail test on a live video", choose: "competitor" },
    { need: "Get AI hook rewrite suggestions", choose: "hooksignals" },
    { need: "Keyword research for video SEO", choose: "competitor" },
    { need: "Pre-publish packaging score across 9 dimensions", choose: "hooksignals" },
    { need: "Bulk update descriptions or tags", choose: "competitor" },
    { need: "Thumbnail text feedback before filming", choose: "hooksignals" },
    { need: "Manage cards and end screens at scale", choose: "competitor" },
    { need: "Full pre-publish hook and title review", choose: "hooksignals" },
    { need: "YouTube Studio workflow integration", choose: "competitor" },
  ],
  benefits: [
    { title: "Pre-publish analysis TubeBuddy does not offer", desc: "Hook scoring, opening line analysis and 9-dimension packaging feedback are not available in TubeBuddy's feature set." },
    { title: "No extension, no account connection", desc: "HookSignals runs in the browser without any extension install or YouTube account authorization. Paste a URL or text and get scores." },
    { title: "Scores before the video exists", desc: "Analyze a planned hook or working title before you record — not just after the video is uploaded and live." },
    { title: "Specific rewrites every time", desc: "Every analysis returns 3 better title options, 3 hook rewrites and thumbnail text ideas. Actionable output, not just a score." },
    { title: "Focused on what you can fix pre-publish", desc: "HookSignals does one job well: tell you whether the packaging is strong enough before you upload. No feature sprawl." },
    { title: "9-dimension packaging depth", desc: "Hook strength, title clarity, curiosity gap, CTR potential, outlier potential, retention risk and more — scored per video." },
  ],
  tradeoffs: [
    { title: "A/B thumbnail testing", desc: "TubeBuddy's A/B thumbnail testing is a genuine differentiator. It shows real CTR data from live traffic on two thumbnail variants. HookSignals does not offer A/B testing." },
    { title: "Keyword research and tag tools", desc: "TubeBuddy provides YouTube keyword research, search volume data and tag recommendations integrated into YouTube Studio. HookSignals does not offer keyword tools." },
    { title: "Bulk channel management", desc: "Updating descriptions, cards, end screens or tags across many videos is a TubeBuddy strength. HookSignals does not have bulk editing features." },
    { title: "YouTube Studio integration", desc: "TubeBuddy's browser extension integrates directly into the YouTube Studio interface. HookSignals is a standalone web app without Studio integration." },
    { title: "Post-publish performance data", desc: "TubeBuddy works with your actual YouTube analytics to surface performance data. HookSignals focuses on pre-publish signals — not post-publish reporting." },
  ],
  faq: [
    { question: "What is the core difference between HookSignals and TubeBuddy?", answer: "TubeBuddy is a browser extension that integrates into YouTube Studio and provides A/B thumbnail testing, keyword research, tag tools and bulk channel management. HookSignals is a standalone web app that scores your hook, title and packaging before the video is published — with AI rewrites and 9-dimension packaging analysis. They solve different problems at different stages." },
    { question: "Does HookSignals require a browser extension?", answer: "No. HookSignals is a web app. You paste a YouTube URL, a hook or a title and get packaging scores and rewrites without installing any browser extension." },
    { question: "Does TubeBuddy analyze hooks or opening lines?", answer: "TubeBuddy's tools are primarily keyword, SEO and A/B testing focused. Hook and opening line analysis — scoring clarity, curiosity and retention pull before publishing — is not a TubeBuddy feature." },
    { question: "Can I use both HookSignals and TubeBuddy?", answer: "Yes. A common workflow is to use HookSignals for pre-publish hook, title and thumbnail packaging review, and TubeBuddy for post-publish A/B thumbnail testing, keyword management and bulk operations. They complement each other across different stages." },
    { question: "What does HookSignals analyze that TubeBuddy does not?", answer: "HookSignals analyzes the opening line of your video for hook strength and retention pull, scores your title on packaging dimensions beyond SEO, and provides specific rewrites for hooks and thumbnails — all before the video is published." },
    { question: "Does HookSignals connect to my YouTube account?", answer: "No. HookSignals uses the public YouTube Data API for URL-based analysis. You do not need to log in or authorize your YouTube channel at any point." },
    { question: "Can HookSignals tell me if my thumbnail will perform?", answer: "HookSignals checks thumbnail text for length, readability and contrast signal before publishing. It does not run live A/B tests. For testing actual thumbnail performance with real traffic, TubeBuddy's A/B feature is better suited." },
    { question: "What does HookSignals return in an analysis?", answer: "Each analysis returns: a packaging score across 9 dimensions, hook strength and clarity scores, CTR potential and retention risk estimates, 3 better title alternatives, 3 hook rewrite options, thumbnail text ideas and a description angle — all based on public metadata and AI packaging analysis." },
  ],
};

export default function Page() {
  return <ComparisonPage data={data} />;
}
