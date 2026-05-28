import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "HookSignals AI Creator Intelligence Platform";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          background:
            "radial-gradient(circle at 16% 16%, rgba(34,211,238,0.30), transparent 32%), radial-gradient(circle at 84% 20%, rgba(139,92,246,0.28), transparent 32%), linear-gradient(135deg, #020408, #07111f 52%, #030507)",
          color: "white",
          padding: "64px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -90,
            top: 110,
            width: 500,
            height: 360,
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 42,
            background: "rgba(255,255,255,0.05)",
            transform: "rotate(-8deg)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20, zIndex: 1 }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 24,
              border: "1px solid rgba(125,211,252,0.48)",
              background: "rgba(125,211,252,0.14)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#a5f3fc",
              fontSize: 30,
              fontWeight: 900,
              letterSpacing: -3,
            }}
          >
            HS
          </div>
          <div>
            <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: -1 }}>
              HookSignals
            </div>
            <div style={{ color: "#67e8f9", fontSize: 18, letterSpacing: 3, textTransform: "uppercase" }}>
              Creator Intelligence Platform
            </div>
          </div>
        </div>

        <div style={{ zIndex: 1, maxWidth: 935 }}>
          <div
            style={{
              display: "inline-flex",
              border: "1px solid rgba(125,211,252,0.32)",
              background: "rgba(14,165,233,0.12)",
              color: "#67e8f9",
              borderRadius: 999,
              padding: "12px 18px",
              fontSize: 20,
              fontWeight: 900,
              letterSpacing: 1.7,
              textTransform: "uppercase",
            }}
          >
            AI hooks • YouTube SEO • TikTok discovery
          </div>

          <div
            style={{
              marginTop: 28,
              fontSize: 76,
              lineHeight: 0.94,
              fontWeight: 950,
              letterSpacing: -5,
            }}
          >
            Create content that wins attention instantly.
          </div>

          <div
            style={{
              marginTop: 28,
              fontSize: 29,
              lineHeight: 1.34,
              color: "rgba(255,255,255,0.68)",
              maxWidth: 820,
            }}
          >
            Analyze hooks, titles, scripts, thumbnails and retention before publishing.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, zIndex: 1 }}>
          {["AI Hooks", "Shorts SEO", "TikTok", "Retention"].map((item) => (
            <div
              key={item}
              style={{
                border: "1px solid rgba(255,255,255,0.13)",
                background: "rgba(255,255,255,0.06)",
                borderRadius: 999,
                padding: "14px 20px",
                color: "rgba(255,255,255,0.78)",
                fontSize: 21,
                fontWeight: 800,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
