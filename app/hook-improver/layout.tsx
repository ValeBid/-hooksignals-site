import ToolSEOContent from "../components/tool-seo-content";

export const metadata = {
  alternates: {
    canonical: "https://hooksignals.com/hook-improver",
  },
};

export default function HookImproverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ToolSEOContent tool="hook-improver" />
    </>
  );
}
