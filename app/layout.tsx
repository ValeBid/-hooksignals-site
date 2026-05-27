import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  metadataBase: new URL("https://hooksignals.com"),
  title: "HookSignals | AI Creator Workflow Tools",
  description:
    "AI-powered tools for creators to improve hooks, titles, thumbnails, Shorts scripts and retention before publishing.",
  openGraph: {
    title: "HookSignals | AI Creator Workflow Tools",
    description:
      "Improve hooks, titles, thumbnails and creator workflows before publishing.",
    url: "https://hooksignals.com",
    siteName: "HookSignals",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HookSignals | AI Creator Workflow Tools",
    description:
      "AI-powered creator tools for hooks, titles, thumbnails and retention.",
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
