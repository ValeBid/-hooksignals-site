export const siteUrl = "https://hooksignals.com";

export const seoHubs = [
  {
    slug: "ai-hook-analyzer",
    title: "AI Hook Analyzer for YouTube Shorts and TikTok",
    description:
      "Learn how AI hook analysis helps creators improve the first three seconds, viewer curiosity and short-form retention.",
    category: "Creator SEO",
    intent: "Commercial investigation",
    keywords: ["AI hook analyzer", "YouTube hook analyzer", "TikTok hook tool"],
    summary:
      "AI hook analyzers review the opening line, emotional trigger, clarity and curiosity gap before a video is published.",
  },
  {
    slug: "youtube-shorts-seo",
    title: "YouTube Shorts SEO Workflow",
    description:
      "A practical workflow for improving YouTube Shorts titles, hooks, descriptions, chapters and retention packaging.",
    category: "YouTube SEO",
    intent: "Informational",
    keywords: ["YouTube Shorts SEO", "shorts title optimization", "YouTube hook strategy"],
    summary:
      "Shorts SEO combines keyword clarity, high-retention openings, thumbnails, titles and repeatable publishing signals.",
  },
  {
    slug: "tiktok-seo-hooks",
    title: "TikTok SEO Hooks and First-Three-Seconds Strategy",
    description:
      "Optimize TikTok hooks with keyword-first openings, on-screen text and voiceover clarity for discovery-first content.",
    category: "TikTok SEO",
    intent: "Informational",
    keywords: ["TikTok SEO", "TikTok hooks", "first 3 seconds TikTok"],
    summary:
      "TikTok discovery depends heavily on clear topic signals, fast context and early visual or spoken keyword relevance.",
  },
  {
    slug: "thumbnail-text-checker",
    title: "Thumbnail Text Checker for Creator Packaging",
    description:
      "Improve thumbnail readability, contrast, emotional clarity and mobile visibility before publishing a video.",
    category: "Packaging",
    intent: "Commercial investigation",
    keywords: ["thumbnail text checker", "thumbnail readability", "YouTube thumbnail text"],
    summary:
      "Thumbnail text should be readable on mobile, emotionally specific and aligned with the title promise.",
  },
  {
    slug: "shorts-script-generator",
    title: "AI Shorts Script Generator Workflow",
    description:
      "Structure short-form scripts around hook, context, payoff, proof and CTA without losing pacing.",
    category: "AI Scriptwriting",
    intent: "Commercial investigation",
    keywords: ["shorts script generator", "AI video script", "short form script tool"],
    summary:
      "Short-form scripts need fast setup, clear payoff and a retention arc that prevents early swipe-away behavior.",
  },
  {
    slug: "creator-retention-analysis",
    title: "Creator Retention Analysis Guide",
    description:
      "Understand retention risk, pacing, curiosity loops and audience drop-off before publishing creator content.",
    category: "Retention",
    intent: "Informational",
    keywords: ["creator retention", "video retention analysis", "audience retention AI"],
    summary:
      "Retention analysis identifies where viewers may lose context, interest or emotional reason to keep watching.",
  },
];

export type ComparisonPage = {
  slug: string;
  title: string;
  description: string;
  competitor: string;
  pageType?: "comparison" | "best-of";
  competitorFocus?: string;
  hsStrengths?: readonly string[];
  whenAltEnough?: readonly string[];
  tableRows?: readonly [string, string, string][];
  faqs?: readonly { q: string; a: string }[];
};

export const comparisonPages: ComparisonPage[] = [
  {
    slug: "hooksignals-vs-manual-hook-writing",
    title: "HookSignals vs Manual Hook Writing",
    description:
      "Compare AI-assisted creator workflow analysis with manual hook writing and disconnected creator tools.",
    competitor: "Manual workflow",
    competitorFocus: "Gut-feel hook writing without scoring or retention analysis",
    hsStrengths: [
      "Scores the hook before publishing — no guesswork",
      "Finds retention risk, weak audience triggers and packaging gaps",
      "Connects hook, title and thumbnail into one pre-publish workflow",
      "Saves every analysis to a searchable workspace",
    ],
    whenAltEnough: [
      "You publish rarely and have a trusted peer reviewer",
      "Your current manual process consistently hits strong retention",
      "You prefer writing every hook from scratch without scoring feedback",
      "You only need one or two hooks per month",
    ],
    tableRows: [
      ["Hook scoring", "Calibrated AI score", "Subjective assessment"],
      ["Retention risk check", "Built in", "Not available"],
      ["Title + thumbnail alignment", "Workflow-guided", "Manual, disconnected"],
      ["Saved analysis history", "Workspace included", "Spreadsheet or none"],
      ["Speed", "Seconds per hook", "Minutes to hours"],
    ],
    faqs: [
      { q: "Is manual hook writing still worth doing?", a: "Manual writing is valuable for drafting — but scoring and retention analysis require a more systematic check. HookSignals works alongside your writing process, not instead of it." },
      { q: "How does AI hook scoring differ from personal feedback?", a: "AI scoring checks clarity, curiosity gap, retention risk and platform pacing consistently across every hook. Personal feedback varies based on the reviewer's experience and bandwidth." },
      { q: "Does HookSignals replace the creative process?", a: "No. HookSignals scores and improves hooks, but the initial idea and angle still come from the creator. Think of it as a quality check before publishing." },
    ],
  },
  {
    slug: "hooksignals-vs-generic-ai-writing-tools",
    title: "HookSignals vs Generic AI Writing Tools",
    description:
      "See why creator-specific hook, title, thumbnail and retention workflows differ from generic AI writing tools.",
    competitor: "Generic AI writers",
    competitorFocus: "General-purpose text generation without creator-specific scoring",
    hsStrengths: [
      "Scores hooks specifically for clarity, curiosity and retention risk",
      "Understands platform context: Shorts, TikTok, Reels, long-form",
      "Generates improvements calibrated to the original hook weakness",
      "Connects hook to title and thumbnail in one workflow",
    ],
    whenAltEnough: [
      "You need general copywriting across many content types",
      "You only want draft ideas without scoring feedback",
      "You do not publish video content regularly",
      "Budget is the primary constraint",
    ],
    tableRows: [
      ["Hook scoring", "Retention-focused scoring", "None"],
      ["Platform context", "Shorts, TikTok, Reels, long-form", "Generic text output"],
      ["Retention risk detection", "Built in", "Not available"],
      ["Pre-publish workflow", "Full suite included", "Standalone generation"],
      ["Creator-specific output", "Hook, title, thumbnail, script", "Any text type"],
    ],
    faqs: [
      { q: "Can ChatGPT or Claude analyze a hook for retention risk?", a: "General AI tools can give feedback on a hook, but they do not score clarity, curiosity gap and retention risk with the calibration that a creator-specific tool uses. HookSignals is built specifically for pre-publish video hook analysis." },
      { q: "What does creator-specific mean?", a: "Creator-specific means the analysis accounts for platform pacing, niche context and viewer psychology rather than general writing quality. A fitness hook and a finance hook need different tension signals." },
      { q: "Can I use both HookSignals and a general AI tool?", a: "Yes. Many creators use general AI to draft initial hook ideas, then use HookSignals to score and improve the best candidates before publishing." },
    ],
  },
  {
    slug: "hooksignals-vs-vidiq",
    title: "HookSignals vs vidIQ",
    description:
      "Compare HookSignals pre-publish hook analysis with vidIQ YouTube analytics and channel growth tools.",
    competitor: "vidIQ",
    competitorFocus: "Post-publish YouTube analytics, keyword research and channel benchmarking",
    hsStrengths: [
      "Scores hooks before the video is published — not after",
      "Detects retention risk and packaging gaps before upload",
      "Aligns hook, title and thumbnail promise in one workflow",
      "Platform-specific analysis for Shorts, TikTok and Reels",
    ],
    whenAltEnough: [
      "You need post-publish analytics and competitor benchmarking",
      "Keyword research and SEO tagging are your primary workflow gaps",
      "You already have a pre-publish hook review process",
      "You primarily manage and optimize an existing large library",
    ],
    tableRows: [
      ["Pre-publish hook scoring", "Built in", "Not the focus"],
      ["Post-publish analytics", "Not included", "Core feature"],
      ["Retention risk detection", "Pre-publish", "Post-publish view patterns"],
      ["Keyword / SEO research", "Not included", "Core feature"],
      ["Hook + title + thumbnail workflow", "Integrated", "Separate tasks"],
    ],
    faqs: [
      { q: "Do HookSignals and vidIQ compete directly?", a: "They solve different problems. vidIQ focuses on analytics, keyword research and post-publish optimization. HookSignals focuses on pre-publish hook scoring, retention risk and packaging alignment. Some creators use both." },
      { q: "Does vidIQ score hooks before publishing?", a: "vidIQ is primarily a post-publish analytics and channel management tool. It does not score the opening hook for retention risk or clarity before upload." },
      { q: "Which tool is better for growing a new channel?", a: "New channels often benefit more from pre-publish quality signals — stronger hooks reduce early drop-off before analytics data exists. HookSignals addresses this with hook scoring and retention analysis before the first upload." },
    ],
  },
  {
    slug: "hooksignals-vs-tubebuddy",
    title: "HookSignals vs TubeBuddy",
    description:
      "Compare HookSignals hook and packaging analysis with TubeBuddy YouTube optimization and management tools.",
    competitor: "TubeBuddy",
    competitorFocus: "Browser extension for YouTube channel management, A/B testing and tag optimization",
    hsStrengths: [
      "Pre-publish hook scoring — finds weak signals before the video goes live",
      "Retention risk analysis based on hook clarity and curiosity gap",
      "Multi-platform support: YouTube Shorts, TikTok, Reels",
      "Integrated hook-to-title-to-thumbnail packaging workflow",
    ],
    whenAltEnough: [
      "You need bulk YouTube management and tag optimization",
      "Thumbnail A/B testing and post-publish testing are your main needs",
      "You manage a large existing library that needs systematic optimization",
      "Your primary tool gap is YouTube Studio workflow efficiency",
    ],
    tableRows: [
      ["Pre-publish hook scoring", "Built in", "Not the focus"],
      ["Tag and SEO optimization", "Not included", "Core feature"],
      ["Thumbnail A/B testing", "Not included", "Available"],
      ["Retention risk before upload", "Built in", "Not available"],
      ["Bulk channel management", "Not included", "Core feature"],
    ],
    faqs: [
      { q: "Can TubeBuddy improve hook quality before publishing?", a: "TubeBuddy is primarily a YouTube Studio extension focused on channel management, SEO tags and post-publish testing. Pre-publish hook scoring is not its core function." },
      { q: "Is HookSignals a browser extension?", a: "No. HookSignals is a web-based creator workflow platform. You paste your hook, title or thumbnail text into the analyzer and get a scored result with improvement recommendations." },
      { q: "Which is better for a creator who uploads three times a week?", a: "High-frequency creators benefit from both pre-publish quality control (HookSignals) and post-publish management (TubeBuddy). HookSignals prevents weak hooks from being published; TubeBuddy optimizes what is already live." },
    ],
  },
  {
    slug: "hooksignals-vs-chatgpt",
    title: "HookSignals vs ChatGPT for YouTube Hooks",
    description:
      "Compare using HookSignals vs ChatGPT for YouTube hook analysis, hook improvement and pre-publish creator workflows.",
    competitor: "ChatGPT",
    competitorFocus: "General AI text generation without creator-specific scoring or retention analysis",
    hsStrengths: [
      "Calibrated hook scoring with retention risk and curiosity gap metrics",
      "Creator-specific platform context: pacing, niche, audience trigger",
      "Pre-publish workflow connecting hook to title, thumbnail and script",
      "Saved workspace history — no re-prompting every session",
    ],
    whenAltEnough: [
      "You need general brainstorming across many content formats",
      "You write hooks infrequently and do not need retention scoring",
      "You are early in content creation without a publishing cadence",
      "You prefer a free-form conversational interface",
    ],
    tableRows: [
      ["Hook scoring", "0–100 with retention metrics", "No structured scoring"],
      ["Retention risk detection", "Built in", "Not available"],
      ["Platform-aware analysis", "Shorts, TikTok, long-form", "Generic text output"],
      ["Hook improvement workflow", "Integrated scoring + rewrite", "Manual prompting"],
      ["Saved creator workspace", "Included", "History lost per session"],
    ],
    faqs: [
      { q: "Can ChatGPT score a hook for retention risk?", a: "ChatGPT can give general feedback on a hook, but it does not apply calibrated scoring for clarity, curiosity gap and retention risk the way a creator-specific tool does. Results vary significantly by prompt." },
      { q: "Is HookSignals using ChatGPT under the hood?", a: "HookSignals uses AI models to power analysis, but the output is structured around creator-specific signals — retention risk, platform pacing, audience trigger — rather than general writing feedback." },
      { q: "What is the main advantage of a specialized tool over ChatGPT?", a: "Specialized tools return consistent, structured output calibrated for a specific use case. HookSignals always scores the same signals in the same way, making it easier to compare hooks and track improvement over time." },
    ],
  },
  {
    slug: "best-hook-analyzer",
    title: "Best Hook Analyzer for YouTube and TikTok Creators",
    description:
      "Find the best hook analyzer for YouTube Shorts, TikTok and Reels. Compare what to look for in a hook analysis tool before publishing.",
    competitor: "Hook analysis tools",
    pageType: "best-of",
    hsStrengths: [
      "Scores clarity, curiosity gap, retention risk and platform pacing in one pass",
      "Platform-specific: Shorts, TikTok, Reels and long-form have different scoring weights",
      "Returns actionable improvements, not just a score",
      "Connects hook score to title and thumbnail workflow",
    ],
    whenAltEnough: [
      "You only need general writing feedback without retention scoring",
      "You publish once a month and use a peer review process",
      "Your current hooks already achieve strong retention metrics",
    ],
    tableRows: [
      ["Hook scoring (0–100)", "Calibrated + creator-specific", "Generic or none"],
      ["Retention risk", "Per-hook metric", "Rarely available"],
      ["Platform context", "Shorts, TikTok, long-form", "Usually generic"],
      ["Improvement suggestions", "Specific rewrites", "General feedback"],
      ["Workflow integration", "Hook → title → thumbnail", "Standalone"],
    ],
    faqs: [
      { q: "What should the best hook analyzer include?", a: "A strong hook analyzer should score clarity, curiosity gap and retention risk separately — not just rate the hook as good or bad. Platform context (Shorts vs long-form) should affect the score, and the tool should return specific improvement suggestions, not generic advice." },
      { q: "How does hook scoring work?", a: "Hook scoring evaluates the opening line for how quickly it establishes a clear subject, creates tension or curiosity, signals the payoff and fits the pace of the platform. A score near 80+ indicates high retention potential. Below 50 suggests the hook needs significant revision." },
      { q: "Can a hook analyzer guarantee more views?", a: "No tool can guarantee views — they depend on many factors including topic demand, SEO and audience size. A hook analyzer improves the pre-publish quality signal so fewer viewers leave in the first seconds. It is a risk-reduction tool, not a reach multiplier." },
    ],
  },
  {
    slug: "best-youtube-hook-generator",
    title: "Best YouTube Hook Generator for Shorts and Long-Form",
    description:
      "Find the best YouTube hook generator for Shorts, long-form videos and TikTok. What to look for and how HookSignals fits creator workflows.",
    competitor: "Hook generation tools",
    pageType: "best-of",
    hsStrengths: [
      "Generates hooks then scores them for retention risk in one workflow",
      "Platform-specific generation: Shorts and long-form hooks need different lengths",
      "Hooks improve based on niche, audience and platform context",
      "Generated hooks feed directly into the title and thumbnail workflow",
    ],
    whenAltEnough: [
      "You need quick brainstorming without scoring the output",
      "Volume of hook ideas matters more than quality scoring",
      "You prefer a free-form prompt interface",
    ],
    tableRows: [
      ["Hook generation", "Context-aware angles", "Template-based"],
      ["Retention scoring after generation", "Included", "Usually not available"],
      ["Niche + platform context", "Inputs affect output", "Generic generation"],
      ["Title alignment", "Workflow-integrated", "Separate step"],
      ["Improvement loop", "Generate → score → rewrite", "Generate only"],
    ],
    faqs: [
      { q: "What makes a hook generator useful for Shorts?", a: "Shorts hooks need to be faster and more direct than long-form hooks. A strong Shorts hook generator accounts for platform pacing and creates an opening that works without visual context — because many viewers watch with sound on but eyes elsewhere." },
      { q: "Should I score hooks after generating them?", a: "Yes. Generating hooks is the first step. Scoring them for clarity, curiosity gap and retention risk before publishing separates the strongest option from the rest. Generation without scoring is guesswork." },
      { q: "How many hook variations should I generate before choosing one?", a: "Most creators benefit from 4–6 variations with different angles (proof, curiosity, warning, contrast) before selecting and scoring the best. HookSignals generates multiple angles then scores them so you can compare objectively." },
    ],
  },
  {
    slug: "best-creator-growth-tools",
    title: "Best Creator Growth Tools for YouTube and Short-Form",
    description:
      "Compare the best creator growth tools for YouTube, Shorts and TikTok. What pre-publish, analytics and packaging tools actually improve channel performance.",
    competitor: "Creator tool category",
    pageType: "best-of",
    hsStrengths: [
      "Pre-publish hook scoring to reduce early drop-off before upload",
      "Retention risk detection so weak hooks get fixed before going live",
      "Title and thumbnail packaging workflow in one platform",
      "Saves analyses so every session builds on the last",
    ],
    whenAltEnough: [
      "Post-publish analytics are your primary workflow gap",
      "Bulk channel management is more urgent than pre-publish quality",
      "You primarily need keyword research and SEO tagging",
    ],
    tableRows: [
      ["Pre-publish quality check", "Core function", "Varies by tool"],
      ["Hook scoring", "Built in", "Usually not available"],
      ["Post-publish analytics", "Not included", "Available in analytics tools"],
      ["Packaging workflow", "Hook + title + thumbnail", "Separate tools"],
      ["Short-form platform support", "Shorts, TikTok, Reels", "Often YouTube-only"],
    ],
    faqs: [
      { q: "What is the most overlooked creator growth tool?", a: "Pre-publish hook analysis. Most creators invest heavily in post-publish analytics but have no systematic way to evaluate hook quality before a video goes live. A weak hook erodes retention data before the algorithm has enough signal to distribute the content." },
      { q: "Do creator growth tools work for small channels?", a: "Pre-publish tools like HookSignals are particularly valuable for small channels because early retention data drives initial distribution. A strong hook on a new channel gives the algorithm clearer signal to show the content to more viewers." },
      { q: "Is a hook analyzer a growth tool?", a: "Yes. Retention rate is one of the strongest signals the YouTube algorithm uses for distribution. Improving hook quality — which directly affects first-30s retention — is one of the highest-leverage actions a creator can take before publishing." },
    ],
  },
];

export const blogPosts = [
  {
    slug: "how-to-write-a-viral-hook",
    title: "How to Write a Viral Hook Without Sounding Generic",
    description:
      "A practical creator framework for writing stronger hooks using clarity, contrast, curiosity and payoff timing.",
    date: "2026-05-28",
    category: "Hook Strategy",
    readTime: "8 min read",
  },
  {
    slug: "youtube-shorts-seo-checklist",
    title: "YouTube Shorts SEO Checklist for 2026",
    description:
      "A short-form creator SEO checklist covering titles, openings, descriptions, captions and retention structure.",
    date: "2026-05-28",
    category: "YouTube SEO",
    readTime: "9 min read",
  },
  {
    slug: "tiktok-seo-first-three-seconds",
    title: "TikTok SEO Starts in the First Three Seconds",
    description:
      "Why on-screen text, voiceover keywords and immediate context matter for TikTok discovery and retention.",
    date: "2026-05-28",
    category: "TikTok SEO",
    readTime: "7 min read",
  },
];

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "HookSignals",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/icon.png`,
    },
    description:
      "HookSignals is an AI creator workflow platform for analyzing hooks, titles, thumbnails, Shorts scripts and retention before publishing.",
    sameAs: [siteUrl],
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "HookSignals",
    url: siteUrl,
    publisher: { "@id": `${siteUrl}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/tools?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function getSoftwareSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${siteUrl}/#software`,
    name: "HookSignals",
    url: siteUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "AI creator workflow platform for hook analysis, YouTube Shorts SEO, TikTok hooks, script generation and thumbnail text optimization.",
    publisher: { "@id": `${siteUrl}/#organization` },
    offers: [
      { "@type": "Offer", name: "Starter", priceCurrency: "USD", price: "10", url: `${siteUrl}/checkout/starter` },
      { "@type": "Offer", name: "Creator Pro", priceCurrency: "USD", price: "20", url: `${siteUrl}/checkout/pro` },
      { "@type": "Offer", name: "Elite", priceCurrency: "USD", price: "50", url: `${siteUrl}/checkout/elite` },
    ],
  };
}

export function getProductSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${siteUrl}/#product`,
    name: "HookSignals",
    brand: { "@id": `${siteUrl}/#organization` },
    description:
      "AI creator workflow software for analyzing hooks, improving titles, checking thumbnails and building stronger short-form publishing packages.",
    category: "Creator software",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "10",
      highPrice: "50",
      offerCount: "3",
      url: `${siteUrl}/pricing`,
    },
  };
}
