import ToolSEOContent from "../components/tool-seo-content";

export const metadata = {
  title: "Shorts Script Generator — AI Short-Form Scripts",
  description: "Generate retention-focused Shorts scripts with a strong hook, tight pacing and a clear payoff. Built for YouTube Shorts, TikTok and Reels.",
  alternates: { canonical: "https://hooksignals.com/shorts-script-generator" },
  openGraph: {
    title: "Shorts Script Generator | HookSignals",
    description: "Generate AI-powered short-form scripts designed for hook strength, pacing and viewer retention.",
    url: "https://hooksignals.com/shorts-script-generator",
    siteName: "HookSignals",
    type: "website",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ToolSEOContent tool="shorts-script-generator" />
    </>
  );
}
