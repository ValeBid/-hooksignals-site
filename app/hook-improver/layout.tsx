import ToolSEOContent from "../components/tool-seo-content";

export const metadata = {
  title: "Hook Improver — Rewrite Weak Video Hooks | HookSignals",
  description: "Turn weak hooks into specific, curiosity-driven opening lines. Four rewrite angles for YouTube Shorts, TikTok and Reels in seconds.",
  alternates: { canonical: "https://hooksignals.com/hook-improver" },
  openGraph: {
    title: "Hook Improver | HookSignals",
    description: "Rewrite weak video hooks into sharper, curiosity-driven openings for YouTube, TikTok and Reels.",
    url: "https://hooksignals.com/hook-improver",
    siteName: "HookSignals",
    type: "website",
  },
};

export default function HookImproverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ToolSEOContent tool="hook-improver" />
    </>
  );
}
