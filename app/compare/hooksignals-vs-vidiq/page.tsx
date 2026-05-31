import type { Metadata } from "next";
import ComparisonPage, { type ComparisonData } from "../../components/comparison-page";

export const metadata: Metadata = {
  title: "HookSignals vs VidIQ — Pre-Publish Analysis vs YouTube SEO Platform",
  description:
    "HookSignals is focused on pre-publish hook and packaging analysis. VidIQ is a broad YouTube SEO and channel growth platform. Compare features and find the right fit for your creator workflow.",
  alternates: { canonical: "https://hooksignals.com/compare/hooksignals-vs-vidiq" },
  openGraph: {
    title: "HookSignals vs VidIQ",
    description:
      "Focused pre-publish packaging analysis vs full YouTube SEO platform. See how HookSignals and VidIQ compare.",
    url: "https://hooksignals.com/compare/hooksignals-vs-vidiq",
    siteName: "HookSignals",
    type: "website",
  },
};

const data: ComparisonData = {
  competitor: { name: "VidIQ", slug: "vidiq" },
  hero: {
    badge: "Tool comparison",
    subheadline:
      "VidIQ is a comprehensive YouTube growth platform with keyword research, channel analytics and competitor tracking. HookSignals is focused on one outcome: making sure your hook, title and thumbnail are strong before the video goes live.",
  },
  summary: {
    chooseHS: [
      "You want focused AI feedback on your hook, title and thumbnail packaging",
      "You want pre-publish scores on 9 packaging dimensions before each upload",
      "You want specific rewrites — not just a score, but better titles and hook alternatives",
      "You prefer a tool that does one thing deeply over a broad platform with many features",
      "You do not want a browser extension or to connect your YouTube account",
    ],
    chooseComp: [
      "You want keyword research and SEO optimization for YouTube search",
      "You need channel analytics and subscriber growth tracking",
      "You want competitor channel monitoring and benchmarking",
      "You are building a YouTube SEO strategy from scratch",
      "You want a broad all-in-one platform for channel management",
    ],
  },
  features: [
    { capability: "Pre-publish hook analysis", hooksignals: "AI scoring across 9 packaging signals", competitor: "Not the primary focus", hsAdvantage: true },
    { capability: "Title packaging and diagnosis", hooksignals: "Clarity, curiosity and CTR packaging score", competitor: "SEO score and keyword match", hsAdvantage: false },
    { capability: "Thumbnail text analysis", hooksignals: "Length, readability and contrast check", competitor: "Limited", hsAdvantage: true },
    { capability: "AI packaging rewrites", hooksignals: "3 title alternatives, 3 hook rewrites, thumbnail text", competitor: "AI title suggestions available", hsAdvantage: false },
    { capability: "Keyword research", hooksignals: "Not available", competitor: "Core feature", hsAdvantage: false },
    { capability: "Channel analytics", hooksignals: "Not available", competitor: "Core feature", hsAdvantage: false },
    { capability: "Competitor channel tracking", hooksignals: "Not available", competitor: "Available", hsAdvantage: false },
    { capability: "YouTube Data API integration", hooksignals: "Yes — public metadata fetch", competitor: "Deep YouTube Studio integration", hsAdvantage: false },
    { capability: "Works without YouTube login", hooksignals: "Yes", competitor: "Limited — many features require connected account", hsAdvantage: true },
    { capability: "Browser extension required", hooksignals: "No — web app only", competitor: "Yes for core features", hsAdvantage: true },
    { capability: "Hook and opening line analysis", hooksignals: "Dedicated Hook Analyzer tool", competitor: "Not the focus", hsAdvantage: true },
    { capability: "Learning curve", hooksignals: "Low — focused workflow", competitor: "High — broad feature set", hsAdvantage: true },
  ],
  workflow: [
    { step: "Idea", hs: "Hook Generator creates 5 opening angles from your topic", competitor: "Daily video ideas feature surfaces keyword-backed topics" },
    { step: "Hook", hs: "Hook Analyzer scores clarity, curiosity and retention pull", competitor: "Not in scope" },
    { step: "Title", hs: "Packaging analysis — clarity, curiosity gap, CTR potential", competitor: "SEO score based on keyword volume and competition" },
    { step: "Thumbnail", hs: "Thumbnail text checker for length and readability", competitor: "Limited — not a primary workflow step" },
    { step: "Publish", hs: "Pre-publish packaging review complete", competitor: "SEO optimization complete" },
    { step: "Review", hs: "Paste published URL to score packaging signals post-publish", competitor: "Full analytics: views, CTR, watch time, subscriber data" },
  ],
  decisions: [
    { need: "Score hook strength before recording", choose: "hooksignals" },
    { need: "Keyword research for YouTube search", choose: "competitor" },
    { need: "Pre-publish title packaging check", choose: "hooksignals" },
    { need: "Channel subscriber growth analytics", choose: "competitor" },
    { need: "Thumbnail text feedback", choose: "hooksignals" },
    { need: "Competitor channel monitoring", choose: "competitor" },
    { need: "AI hook rewrite suggestions", choose: "hooksignals" },
    { need: "YouTube SEO optimization", choose: "competitor" },
    { need: "Full packaging review before upload", choose: "hooksignals" },
    { need: "Broad all-in-one creator platform", choose: "competitor" },
  ],
  benefits: [
    { title: "Packaging depth VidIQ does not cover", desc: "Hook strength, opening line quality and pre-publish packaging scores across 9 dimensions are not the focus of a broad SEO platform." },
    { title: "No browser extension or account required", desc: "HookSignals works as a web app. No Chrome extension to install, no YouTube account to connect to access core analysis features." },
    { title: "Rewrites, not just scores", desc: "Every analysis returns 3 better title options, 3 hook rewrites and thumbnail text ideas — specific suggestions you can act on immediately." },
    { title: "Focused tool — lower learning curve", desc: "HookSignals does one thing: pre-publish packaging analysis. There is no large feature set to learn or dashboards to configure." },
    { title: "Works before the video exists", desc: "Score a planned hook or working title before you record. Pre-publish feedback when you can still change the outcome." },
    { title: "Public data only", desc: "No private analytics, no account permissions. Scores come from public YouTube metadata and packaging analysis only." },
  ],
  tradeoffs: [
    { title: "Keyword research and SEO strategy", desc: "VidIQ has deep YouTube keyword research tools. HookSignals does not provide keyword volume data, search competition scores or SEO-focused title optimization." },
    { title: "Channel and subscriber analytics", desc: "VidIQ integrates with YouTube Studio and shows detailed channel performance data. HookSignals does not track channel metrics or historical performance." },
    { title: "Competitor monitoring", desc: "Tracking competitor channels, monitoring their performance and benchmarking against them is a core VidIQ capability that HookSignals does not offer." },
    { title: "All-in-one platform coverage", desc: "If you want a single tool to handle SEO, analytics, research and optimization all in one place, a broad platform like VidIQ provides more total surface area." },
    { title: "Published video analytics", desc: "VidIQ provides CTR, watch time and performance data for videos already published. HookSignals focuses on pre-publish signals — not post-publish analytics." },
  ],
  faq: [
    { question: "What is the core difference between HookSignals and VidIQ?", answer: "VidIQ is a broad YouTube growth platform covering keyword research, channel analytics, competitor tracking and SEO optimization. HookSignals is a focused pre-publish packaging analyzer — it scores your hook, title and thumbnail before the video goes live and returns specific rewrites. They solve different problems." },
    { question: "Does HookSignals do keyword research?", answer: "No. HookSignals analyzes packaging signals — hook strength, title clarity, curiosity gap, CTR potential and more. For keyword research and YouTube SEO, a platform like VidIQ is better suited." },
    { question: "Does VidIQ analyze hooks and opening lines?", answer: "Hook and opening line analysis is not a primary VidIQ feature. VidIQ's title tools are SEO-focused, not packaging-focused. HookSignals has a dedicated Hook Analyzer that scores opening lines across multiple retention and curiosity dimensions." },
    { question: "Do I need a browser extension to use HookSignals?", answer: "No. HookSignals is a web app. You paste a YouTube URL, a hook or a title and get results without installing any browser extension or connecting your YouTube account." },
    { question: "Can HookSignals replace VidIQ?", answer: "Not fully. HookSignals replaces the pre-publish packaging review step that VidIQ does not cover deeply. It does not replace VidIQ's keyword research, analytics or competitor tracking. Some creators use both tools for complementary reasons." },
    { question: "What does HookSignals score specifically?", answer: "HookSignals scores 9 packaging dimensions per video: overall packaging score, hook strength, title clarity, curiosity gap, CTR potential, outlier potential and retention risk. It also returns better title alternatives, hook rewrites, thumbnail text ideas and a description angle." },
    { question: "Is HookSignals useful for SEO?", answer: "HookSignals helps with packaging signals that can affect CTR — title clarity, curiosity gap and thumbnail contrast. It is not a keyword research or backlink tool. The focus is on whether a viewer will click and keep watching, not on search ranking." },
    { question: "Does HookSignals require connecting my YouTube channel?", answer: "No. HookSignals uses the public YouTube Data API to fetch metadata from any public video URL. You do not need to connect or authorize your YouTube account at any point." },
  ],
};

export default function Page() {
  return <ComparisonPage data={data} />;
}
