import type { Metadata } from "next";
import ShortsScriptGeneratorClient from "./ShortsScriptGeneratorClient";

export const metadata: Metadata = {
  title: "Shorts Script Generator",
  description:
    "Create a retention-focused Shorts script from a hook, beat structure and payoff workflow.",
  alternates: { canonical: "https://hooksignals.com/shorts-script-generator" },
  openGraph: {
    title: "Shorts Script Generator",
    description:
      "Turn a video idea into a hook, retention beats and payoff structure before recording.",
    url: "https://hooksignals.com/shorts-script-generator",
    siteName: "HookSignals",
    type: "website",
  },
};

export default function ShortsScriptGeneratorPage() {
  return <ShortsScriptGeneratorClient />;
}
