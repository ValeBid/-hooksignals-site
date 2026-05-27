import ToolSEOContent from "../components/tool-seo-content";

export const metadata = {
  alternates: {
    canonical: "https://hooksignals.com/youtube-hook-generator",
  },
};

export default function YouTubeHookGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ToolSEOContent tool="youtube-hook-generator" />
    </>
  );
}
