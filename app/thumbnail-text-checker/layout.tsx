import ToolSEOContent from "../components/tool-seo-content";

export const metadata = {
  alternates: {
    canonical: "https://hooksignals.com/thumbnail-text-checker",
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
