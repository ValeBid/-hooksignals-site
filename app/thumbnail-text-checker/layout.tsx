import ToolSEOContent from "../components/tool-seo-content";

export const metadata = {
  title: "Thumbnail Text Checker — Improve CTR Readability | HookSignals",
  description: "Check whether your thumbnail text is short, readable and built for mobile click intent. Score your thumbnail copy before publishing.",
  alternates: { canonical: "https://hooksignals.com/thumbnail-text-checker" },
  openGraph: {
    title: "Thumbnail Text Checker | HookSignals",
    description: "Score your thumbnail text for mobile readability and click intent before publishing.",
    url: "https://hooksignals.com/thumbnail-text-checker",
    siteName: "HookSignals",
    type: "website",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ToolSEOContent tool="thumbnail-text-checker" />
    </>
  );
}
