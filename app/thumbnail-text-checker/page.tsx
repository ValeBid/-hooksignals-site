import type { Metadata } from "next";
import ThumbnailTextCheckerClient from "./ThumbnailTextCheckerClient";

export const metadata: Metadata = {
  title: "Thumbnail Text Checker | HookSignals",
  description:
    "Check whether your thumbnail text is readable, specific and strong enough for mobile first impressions.",
  alternates: { canonical: "https://hooksignals.com/thumbnail-text-checker" },
  openGraph: {
    title: "Thumbnail Text Checker | HookSignals",
    description:
      "Check thumbnail text clarity, specificity and mobile readability before publishing.",
    url: "https://hooksignals.com/thumbnail-text-checker",
    siteName: "HookSignals",
    type: "website",
  },
};

export default function ThumbnailTextCheckerPage() {
  return <ThumbnailTextCheckerClient />;
}
