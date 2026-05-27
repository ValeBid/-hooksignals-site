import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { siteConfig } from "./lib/seo";

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "HookSignals | AI Creator Workflow Tools",
    template: "%s | HookSignals",
  },
  description: siteConfig.description,
  keywords: [
    "youtube hook generator",
    "hook analyzer",
    "youtube title generator",
    "shorts script generator",
    "viewer retention",
    "youtube shorts tools",
    "creator workflow",
    "thumbnail text checker",
    "tiktok hook generator",
  ],
  alternates: {
    canonical: siteConfig.url,
  },
  category: "creator tools",
  openGraph: {
    title: "HookSignals | AI Creator Workflow Tools",
    description:
      "Improve hooks, titles, thumbnails and creator workflows before publishing.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HookSignals | AI Creator Workflow Tools",
    description:
      "AI-powered creator tools for hooks, titles, thumbnails and retention.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
