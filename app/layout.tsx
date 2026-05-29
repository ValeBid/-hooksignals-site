import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { siteConfig } from "./lib/seo";

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "HookSignals | AI Creator Intelligence Tools",
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
  icons: {
    icon: "/hs-logo.svg",
    shortcut: "/hs-logo.svg",
    apple: "/hs-logo.svg",
  },
  category: "creator tools",
  openGraph: {
    title: "HookSignals | AI Creator Intelligence Tools",
    description:
      "Creator intelligence tools for hooks, titles, thumbnails, scripts and retention checks before publishing.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "HookSignals AI Creator Intelligence Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HookSignals | AI Creator Intelligence Tools",
    description:
      "Creator intelligence tools for hooks, titles, thumbnails and retention checks before publishing.",
    images: ["/opengraph-image"],
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
    <ClerkProvider>
      <html lang="en">
        <body>
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
