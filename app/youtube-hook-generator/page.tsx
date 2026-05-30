import type { Metadata } from "next";
import YoutubeHookGeneratorClient from "./YoutubeHookGeneratorClient";

export const metadata: Metadata = {
  title: "YouTube Hook Generator | Create Better Video Hooks",
  description:
    "Generate stronger YouTube hooks for Shorts, long-form videos and creator content with HookSignals.",
  alternates: { canonical: "https://hooksignals.com/youtube-hook-generator" },
  openGraph: {
    title: "YouTube Hook Generator | HookSignals",
    description: "Create stronger YouTube hooks and test them inside a pre-publish creator workflow.",
    url: "https://hooksignals.com/youtube-hook-generator",
    siteName: "HookSignals",
    type: "website",
  },
};

export default function YouTubeHookGeneratorPage() {
  return <YoutubeHookGeneratorClient />;
}
