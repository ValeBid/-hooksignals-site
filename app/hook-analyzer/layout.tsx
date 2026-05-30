import ToolSEOContent from "../components/tool-seo-content";

export const metadata = {
  title: "AI Hook Analyzer for YouTube, TikTok and Reels | HookSignals",
  description: "Score your opening line for clarity, curiosity, platform pacing, audience fit and retention risk. Get AI-powered hook analysis before you publish.",
  alternates: { canonical: "https://hooksignals.com/hook-analyzer" },
  openGraph: {
    title: "AI Hook Analyzer | HookSignals",
    description: "Score your YouTube, TikTok or Shorts hook for clarity, curiosity and retention risk before publishing.",
    url: "https://hooksignals.com/hook-analyzer",
    siteName: "HookSignals",
    type: "website",
  },
};

export default function HookAnalyzerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ToolSEOContent tool="hook-analyzer" />
    </>
  );
}
