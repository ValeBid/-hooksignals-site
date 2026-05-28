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

export const seoRoutes: SeoRoute[] = [
  { path: "/", title: "HookSignals | AI Creator Workflow Tools for YouTube and Shorts", description: "Analyze hooks, improve titles, generate Shorts scripts and check creator packaging before publishing.", priority: 1, changeFrequency: "daily", intent: "workflow" },
  { path: "/tools", title: "AI Creator Tools | HookSignals", description: "Explore HookSignals tools for hooks, titles, scripts, thumbnails and viewer retention.", priority: 0.92, changeFrequency: "weekly", intent: "workflow" },
  { path: "/hook-analyzer", title: "Hook Analyzer | Score Your Video Hook | HookSignals", description: "Score your YouTube, TikTok or Shorts hook for clarity, curiosity and retention risk before publishing.", priority: 0.95, changeFrequency: "weekly", intent: "tool" },
  { path: "/hook-improver", title: "Hook Improver | Rewrite Weak Hooks | HookSignals", description: "Rewrite weak video hooks into clearer, sharper and more retention-focused opening lines.", priority: 0.9, changeFrequency: "weekly", intent: "tool" },
  { path: "/youtube-hook-generator", title: "YouTube Hook Generator | Create Better Video Hooks | HookSignals", description: "Generate stronger YouTube hooks for Shorts, long-form videos and creator content.", priority: 0.88, changeFrequency: "weekly", intent: "tool" },
  { path: "/tiktok-hook-generator", title: "TikTok Hook Generator | Scroll-Stopping Hook Ideas | HookSignals", description: "Create TikTok hook ideas designed to stop the scroll and improve short-form retention.", priority: 0.84, changeFrequency: "weekly", intent: "tool" },
  { path: "/youtube-title-generator", title: "YouTube Title Generator | Create Better Video Titles | HookSignals", description: "Generate YouTube title ideas built around clarity, curiosity and click intent.", priority: 0.88, changeFrequency: "weekly", intent: "tool" },
  { path: "/shorts-script-generator", title: "Shorts Script Generator | AI Short-Form Script Tool | HookSignals", description: "Generate short-form script structures designed for hook strength, pacing and retention.", priority: 0.88, changeFrequency: "weekly", intent: "tool" },
  { path: "/thumbnail-text-checker", title: "Thumbnail Text Checker | Improve CTR Clarity | HookSignals", description: "Check whether your thumbnail text is readable, clear and built for stronger click intent.", priority: 0.84, changeFrequency: "weekly", intent: "tool" },
  { path: "/pricing", title: "Pricing | HookSignals Creator Plans", description: "Choose a HookSignals plan for hook analysis, creator workflows, script drafts and thumbnail checks before publishing.", priority: 0.7, changeFrequency: "monthly", intent: "workflow" },
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

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path === "/" ? "" : path}`;
}

export function getSeoRoute(path: string) {
  return seoRoutes.find((route) => route.path === path);
}
