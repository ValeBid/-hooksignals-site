export const siteConfig = {
  name: "HookSignals",
  url: "https://hooksignals.com",
  description:
    "Creator workflow tools for improving hooks, titles, thumbnails, Shorts scripts and retention before publishing.",
};

export type SeoRoute = {
  path: string;
  title: string;
  description: string;
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly";
  intent: "tool" | "workflow" | "examples" | "education";
};

const staticRoutes: SeoRoute[] = [
  { path: "/", title: "HookSignals | AI Creator Workflow Tools for YouTube and Shorts", description: "Analyze hooks, improve titles, generate Shorts scripts and check creator packaging before publishing.", priority: 1, changeFrequency: "daily", intent: "workflow" },
  { path: "/tools", title: "AI Creator Tools | HookSignals", description: "Explore HookSignals tools for hooks, titles, scripts, thumbnails and viewer retention.", priority: 0.92, changeFrequency: "weekly", intent: "workflow" },
  { path: "/hook-analyzer", title: "AI Hook Analyzer for YouTube, TikTok and Reels | HookSignals", description: "Score your YouTube, TikTok or Shorts hook for clarity, curiosity, audience fit and retention risk before publishing.", priority: 0.95, changeFrequency: "weekly", intent: "tool" },
  { path: "/hook-improver", title: "Hook Improver | Rewrite Weak Hooks | HookSignals", description: "Rewrite weak video hooks into clearer, sharper and more retention-focused opening lines.", priority: 0.9, changeFrequency: "weekly", intent: "tool" },
  { path: "/youtube-hook-generator", title: "YouTube Hook Generator | Create Better Video Hooks | HookSignals", description: "Generate stronger YouTube hooks for Shorts, long-form videos and creator content.", priority: 0.88, changeFrequency: "weekly", intent: "tool" },
  { path: "/tiktok-hook-generator", title: "TikTok Hook Generator | Scroll-Stopping Hook Ideas | HookSignals", description: "Create TikTok hook ideas designed to stop the scroll and improve short-form retention.", priority: 0.84, changeFrequency: "weekly", intent: "tool" },
  { path: "/youtube-title-generator", title: "YouTube Title Generator | Create Better Video Titles | HookSignals", description: "Generate YouTube title ideas built around clarity, curiosity and click intent.", priority: 0.88, changeFrequency: "weekly", intent: "tool" },
  { path: "/shorts-script-generator", title: "Shorts Script Generator | AI Short-Form Script Tool | HookSignals", description: "Generate short-form script structures designed for hook strength, pacing and retention.", priority: 0.88, changeFrequency: "weekly", intent: "tool" },
  { path: "/thumbnail-text-checker", title: "Thumbnail Text Checker | Improve CTR Clarity | HookSignals", description: "Check whether your thumbnail text is readable, clear and built for stronger click intent.", priority: 0.84, changeFrequency: "weekly", intent: "tool" },
  { path: "/pricing", title: "Pricing | HookSignals Creator Plans", description: "Choose a HookSignals plan for hook analysis, creator workflows, script drafts and thumbnail checks before publishing.", priority: 0.86, changeFrequency: "monthly", intent: "workflow" },
  { path: "/blog", title: "Creator Growth Blog | HookSignals", description: "Read practical guides on hooks, retention, titles, thumbnails and creator workflow optimization.", priority: 0.72, changeFrequency: "weekly", intent: "education" },
  { path: "/seo", title: "Creator SEO Hub | HookSignals", description: "Explore HookSignals creator SEO resources for hooks, titles, thumbnails, retention and video packaging.", priority: 0.72, changeFrequency: "weekly", intent: "education" },
  { path: "/seo/hooksignals-vs-manual-hook-writing", title: "HookSignals vs Manual Hook Writing", description: "Compare HookSignals with a manual hook writing workflow for creators, agencies and short-form publishing teams.", priority: 0.66, changeFrequency: "monthly", intent: "education" },
  { path: "/seo/hooksignals-vs-generic-ai-writing-tools", title: "HookSignals vs Generic AI Writing Tools", description: "Compare HookSignals with generic AI writing tools for hook analysis, titles, thumbnails and creator workflow decisions.", priority: 0.66, changeFrequency: "monthly", intent: "education" },
  { path: "/terms", title: "Terms of Service | HookSignals", description: "Terms for using HookSignals creator workflow tools, credits and paid plans.", priority: 0.3, changeFrequency: "monthly", intent: "workflow" },
  { path: "/privacy", title: "Privacy Policy | HookSignals", description: "Privacy policy for HookSignals creator workflow tools, analytics, accounts and payments.", priority: 0.3, changeFrequency: "monthly", intent: "workflow" },
  { path: "/refund-policy", title: "Refund Policy | HookSignals", description: "Refund policy for HookSignals subscriptions and creator workflow tools.", priority: 0.3, changeFrequency: "monthly", intent: "workflow" },
  { path: "/hook-psychology", title: "Hook Psychology | Why Viewers Keep Watching | HookSignals", description: "Learn how curiosity, clarity and tension shape stronger short-form video openings.", priority: 0.82, changeFrequency: "weekly", intent: "education" },
  { path: "/clickable-title-formulas", title: "Clickable Title Formulas | HookSignals", description: "Use practical title formulas to improve clarity, curiosity and click intent.", priority: 0.8, changeFrequency: "weekly", intent: "education" },
  { path: "/viral-title-examples", title: "Viral Title Examples | HookSignals", description: "Study stronger title structures for YouTube, Shorts and creator content.", priority: 0.8, changeFrequency: "weekly", intent: "examples" },
  { path: "/shorts-title-ideas", title: "Shorts Title Ideas | HookSignals", description: "Explore title ideas for YouTube Shorts and short-form creator workflows.", priority: 0.78, changeFrequency: "weekly", intent: "examples" },
  { path: "/shorts-hook-ideas", title: "Shorts Hook Ideas | HookSignals", description: "Explore short-form hook ideas designed for fast attention and stronger retention.", priority: 0.8, changeFrequency: "weekly", intent: "examples" },
  { path: "/viral-hook-examples", title: "Viral Hook Examples | HookSignals", description: "Study viral hook examples and reusable opening patterns for short-form videos.", priority: 0.8, changeFrequency: "weekly", intent: "examples" },
  { path: "/youtube-hook-examples", title: "YouTube Hook Examples | HookSignals", description: "Browse YouTube hook examples for Shorts, creator videos and retention-focused openings.", priority: 0.78, changeFrequency: "weekly", intent: "examples" },
  { path: "/hook-formulas", title: "Hook Formulas for Short-Form Videos | HookSignals", description: "Use proven hook formulas to create clearer, more curiosity-driven video openings.", priority: 0.78, changeFrequency: "weekly", intent: "education" },
  { path: "/retention-hook-examples", title: "Retention Hook Examples | HookSignals", description: "Study hooks designed to reduce early drop-off and improve viewer retention.", priority: 0.78, changeFrequency: "weekly", intent: "examples" },
  { path: "/viewer-retention-tips", title: "Viewer Retention Tips for YouTube and Shorts | HookSignals", description: "Learn practical viewer retention principles for YouTube, Shorts and TikTok content.", priority: 0.76, changeFrequency: "weekly", intent: "education" },
  { path: "/youtube-ctr-tips", title: "YouTube CTR Tips | HookSignals", description: "Learn practical YouTube CTR principles for titles, thumbnails and first-impression packaging.", priority: 0.76, changeFrequency: "weekly", intent: "education" },
  { path: "/youtube-thumbnail-tips", title: "YouTube Thumbnail Tips | HookSignals", description: "Learn thumbnail clarity principles for stronger first impressions and packaging.", priority: 0.76, changeFrequency: "weekly", intent: "education" },
];

const platformHookRoutes: SeoRoute[] = [
  ["youtube-shorts",  "YouTube Shorts Hook Analyzer | HookSignals",    "Analyze YouTube Shorts hooks for clarity, curiosity, retention risk and first-three-second stopping power."],
  ["tiktok",          "TikTok Hook Analyzer | HookSignals",             "Analyze TikTok hooks for scroll stopping power, curiosity gap, pacing and audience fit before posting."],
  ["instagram-reels", "Instagram Reels Hook Analyzer | HookSignals",   "Analyze Instagram Reels hooks for retention, clarity, visual promise and short-form attention."],
  ["fitness",         "Fitness Hook Analyzer | HookSignals",            "Analyze fitness hooks for transformation promise, specificity, tension and viewer retention."],
  ["ai",              "AI Content Hook Analyzer | HookSignals",         "Analyze AI content hooks for novelty, clarity, proof and stronger audience curiosity."],
  ["saas",            "SaaS Hook Analyzer | HookSignals",               "Analyze SaaS hooks for pain, outcome clarity, proof and demo-first retention."],
  ["ecommerce",       "Ecommerce Hook Analyzer | HookSignals",          "Analyze ecommerce hooks for product clarity, desire, objections and conversion-focused retention."],
  ["coaching",        "Coaching Hook Analyzer | HookSignals",           "Analyze coaching hooks for audience pain, promise strength, authority and retention."],
  ["personal-finance","Personal Finance Hook Analyzer | HookSignals",   "Analyze personal finance hooks for specificity, trust, payoff and early retention risk."],
  ["real-estate",     "Real Estate Hook Analyzer | HookSignals",        "Analyze real estate hooks for local relevance, buyer intent, specificity and retention."],
  // Phase D additions
  ["gaming",          "Gaming Hook Analyzer | HookSignals",             "Analyze gaming hooks for excitement clarity, skill payoff and first-second stopping power."],
  ["finance",         "Finance Content Hook Analyzer | HookSignals",    "Analyze finance content hooks for credibility, specificity and trust-building without vague claims."],
  ["crypto",          "Crypto Content Hook Analyzer | HookSignals",     "Score crypto content hooks for analytical credibility, discovery framing and educational payoff."],
  ["business",        "Business Content Hook Analyzer | HookSignals",   "Analyze business content hooks for ROI clarity, founder relevance and operational credibility."],
  ["education",       "Education Content Hook Analyzer | HookSignals",  "Score education content hooks for learning outcome clarity and student relevance."],
  ["podcast",         "Podcast Hook Analyzer | HookSignals",            "Analyze podcast episode hooks for listener retention, topic clarity and download-driving tension."],
].map(([slug, title, description]) => ({ path: `/hooks/${slug}`, title, description, priority: 0.78, changeFrequency: "weekly" as const, intent: "tool" as const }));

const exampleRoutes: SeoRoute[] = [
  ["fitness",   "Fitness Hook Examples | HookSignals",   "Browse fitness hook examples for transformation, discipline, fat loss, strength and short-form retention."],
  ["ai",        "AI Hook Examples | HookSignals",        "Browse AI hook examples for tools, workflows, automation, productivity and creator content."],
  ["finance",   "Finance Hook Examples | HookSignals",   "Browse finance hook examples for saving, investing, money mistakes and trust-focused content."],
  ["saas",      "SaaS Hook Examples | HookSignals",      "Browse SaaS hook examples for product demos, pain points, use cases and founder-led content."],
  ["ecommerce", "Ecommerce Hook Examples | HookSignals", "Browse ecommerce hook examples for product discovery, objections, offers and short-form ads."],
].map(([slug, title, description]) => ({ path: `/hook-examples/${slug}`, title, description, priority: 0.72, changeFrequency: "weekly" as const, intent: "examples" as const }));

const comparisonRoutes: SeoRoute[] = [
  { path: "/seo/hooksignals-vs-vidiq",        title: "HookSignals vs vidIQ | Pre-Publish Hook Scoring vs Analytics",        description: "Compare HookSignals pre-publish hook analysis with vidIQ YouTube analytics and channel growth tools.",       priority: 0.72, changeFrequency: "monthly", intent: "education" },
  { path: "/seo/hooksignals-vs-tubebuddy",    title: "HookSignals vs TubeBuddy | Hook Analysis vs Channel Management",      description: "Compare HookSignals hook scoring with TubeBuddy YouTube extension and management tools.",                 priority: 0.72, changeFrequency: "monthly", intent: "education" },
  { path: "/seo/hooksignals-vs-chatgpt",      title: "HookSignals vs ChatGPT for YouTube Hooks | HookSignals",              description: "Compare HookSignals creator-specific hook analysis with using ChatGPT for YouTube hook writing.",          priority: 0.72, changeFrequency: "monthly", intent: "education" },
  { path: "/seo/best-hook-analyzer",          title: "Best Hook Analyzer for YouTube and TikTok | HookSignals",             description: "Find the best hook analyzer for YouTube Shorts, TikTok and Reels creators in 2026.",                     priority: 0.80, changeFrequency: "monthly", intent: "education" },
  { path: "/seo/best-youtube-hook-generator", title: "Best YouTube Hook Generator for Shorts and Long-Form | HookSignals",  description: "Find the best YouTube hook generator for Shorts, long-form videos and TikTok creators.",                 priority: 0.80, changeFrequency: "monthly", intent: "education" },
  { path: "/seo/best-creator-growth-tools",   title: "Best Creator Growth Tools for YouTube and Short-Form | HookSignals",  description: "Compare the best creator growth tools for YouTube, Shorts and TikTok channels.",                         priority: 0.76, changeFrequency: "monthly", intent: "education" },
];

// New static pages added in Phase C and later
const additionalStaticRoutes: SeoRoute[] = [
  { path: "/youtube-video-analyzer", title: "YouTube Video Analyzer | Real Data Hook Analysis | HookSignals",      description: "Paste any YouTube URL to fetch real video data and get an AI analysis of hook, packaging and retention risk.", priority: 0.88, changeFrequency: "weekly", intent: "tool" },
  { path: "/youtube-title-analyzer", title: "YouTube Title Analyzer | CTR Potential & Clarity Score | HookSignals", description: "Score your YouTube title for CTR potential, clarity, curiosity gap and keyword placement before publishing.",       priority: 0.88, changeFrequency: "weekly", intent: "tool" },
];

export const seoRoutes: SeoRoute[] = [
  ...staticRoutes,
  ...additionalStaticRoutes,
  ...platformHookRoutes,
  ...exampleRoutes,
  ...comparisonRoutes,
];

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path === "/" ? "" : path}`;
}

export function getSeoRoute(path: string) {
  return seoRoutes.find((route) => route.path === path);
}
