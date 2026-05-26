export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "white",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1
        style={{
          fontSize: "56px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        HookSignals
      </h1>

      <p
        style={{
          fontSize: "20px",
          color: "#aaa",
          maxWidth: "700px",
          marginBottom: "40px",
        }}
      >
        AI-powered creator workflow tools for YouTube, TikTok and Shorts creators.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: "20px",
        }}
      >
        {[
          "Hook Analyzer",
          "Viral Title Scorer",
          "Thumbnail Text Checker",
          "Transcript Cleaner",
        ].map((tool) => (
          <div
            key={tool}
            style={{
              background: "#151515",
              border: "1px solid #222",
              borderRadius: "20px",
              padding: "24px",
            }}
          >
            <h2 style={{ fontSize: "22px", marginBottom: "12px" }}>
              {tool}
            </h2>

            <p style={{ color: "#888" }}>
              Optimize creator workflow with AI-powered analysis.
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}