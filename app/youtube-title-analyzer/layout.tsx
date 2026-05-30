export const metadata = {
  title: "YouTube Title Analyzer | CTR Potential, Clarity & Curiosity Score",
  description:
    "Analyze any YouTube title for CTR potential, clarity, curiosity gap and keyword placement. Get an AI-scored analysis with improved title suggestions before publishing.",
  alternates: { canonical: "https://hooksignals.com/youtube-title-analyzer" },
  openGraph: {
    title: "YouTube Title Analyzer | HookSignals",
    description:
      "Score your YouTube title for click-through rate potential, clarity, curiosity and keyword placement. Get AI-powered improvements before publishing.",
    url: "https://hooksignals.com/youtube-title-analyzer",
    siteName: "HookSignals",
    type: "website",
  },
};

export default function YouTubeTitleAnalyzerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
