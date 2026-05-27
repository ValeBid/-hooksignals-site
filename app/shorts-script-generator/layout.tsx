import ToolSEOContent from "../components/tool-seo-content";

export const metadata = {
  alternates: {
    canonical: "https://hooksignals.com/shorts-script-generator",
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
      <ToolSEOContent tool="shorts-script-generator" />
    </>
  );
}
