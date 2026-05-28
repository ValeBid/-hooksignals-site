import PremiumToolShell from "../components/premium-tool-shell";

export const metadata = {
  title: "AI Creator Tools for Hooks, Titles, Scripts & Retention",
  description:
    "Use HookSignals creator tools to analyze hooks, improve titles, generate Shorts scripts, check thumbnail clarity and strengthen retention before publishing.",
  alternates: { canonical: "https://hooksignals.com/tools" },
  openGraph: {
    title: "AI Creator Tools",
    description:
      "Analyze hooks, improve titles, check thumbnail clarity and build stronger pre-publish creator workflows.",
    url: "https://hooksignals.com/tools",
    siteName: "HookSignals",
    type: "website",
  },
};

const tools = [
  { name: "Hook Analyzer", desc: "Score your opening line for clarity, curiosity and retention strength.", href: "/hook-analyzer", group: "Analyze", icon: "↗", use: "Before recording" },
  { name: "Hook Improver", desc: "Rewrite weak hooks into sharper, more curiosity-driven versions.", href: "/hook-improver", group: "Improve", icon: "✦", use: "When the opening feels flat" },
  { name: "YouTube Hook Generator", desc: "Generate stronger opening lines for YouTube videos and Shorts.", href: "/youtube-hook-generator", group: "Generate", icon: "◈", use: "For fresh angle options" },
  { name: "TikTok Hook Generator", desc: "Create TikTok hooks designed to stop the scroll quickly.", href: "/tiktok-hook-generator", group: "Generate", icon: "▣", use: "For short-form concepts" },
  { name: "YouTube Title Generator", desc: "Generate clickable YouTube titles built around curiosity and CTR.", href: "/youtube-title-generator", group: "Package", icon: "T", use: "Before thumbnail lock" },
  { name: "Shorts Script Generator", desc: "Build fast-paced Shorts scripts designed for retention.", href: "/shorts-script-generator", group: "Script", icon: "S", use: "After hook validation" },
  { name: "Thumbnail Text Checker", desc: "Check if thumbnail text is short, readable and CTR-friendly.", href: "/thumbnail-text-checker", group: "CTR", icon: "C", use: "Before upload" },
];