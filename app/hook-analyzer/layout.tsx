import ToolSEOContent from "../components/tool-seo-content";

export const metadata = {
  alternates: {
    canonical: "https://hooksignals.com/hook-analyzer",
  },
};

export default function HookAnalyzerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ToolSEOContent tool="hook-analyzer" />
    </>
  );
}
