export const metadata = {
  title: "YouTube Video Analyzer | Real Data Hook & Packaging Analysis",
  description:
    "Paste any YouTube URL to fetch real video data and get an AI-powered analysis of the title hook, packaging strength, retention risk and improvement ideas.",
  alternates: { canonical: "https://hooksignals.com/youtube-video-analyzer" },
  openGraph: {
    title: "YouTube Video Analyzer | HookSignals",
    description:
      "Fetch real YouTube video data and analyze the hook, title clarity, retention risk and thumbnail angle opportunities.",
    url: "https://hooksignals.com/youtube-video-analyzer",
    siteName: "HookSignals",
    type: "website",
  },
};

export default function YoutubeVideoAnalyzerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
