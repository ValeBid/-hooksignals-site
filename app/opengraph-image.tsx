import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "HookSignals creator intelligence platform";
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
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#030507",
          color: "white",
          padding: "64px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 18% 15%, rgba(34,197,94,0.22), transparent 30%), radial-gradient(circle at 84% 18%, rgba(124,58,237,0.22), transparent 28%), radial-gradient(circle at 72% 82%, rgba(14,165,233,0.14), transparent 30%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18, zIndex: 1 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 20,
              border: "1px solid rgba(110,231,183,0.35)",
              background: "rgba(52,211,153,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#6ee7b7",
              fontSize: 30,
              fontWeight: 900,
            }}
          >
            HS
          </div>
          <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: -1 }}>
            HookSignals
          </div>
        </div>

        <div style={{ zIndex: 1, maxWidth: 930 }}>
          <div
            style={{
              display: "inline-flex",
              border: "1px solid rgba(110,231,183,0.32)",
              background: "rgba(52,211,153,0.1)",
              color: "#6ee7b7",
              borderRadius: 999,
              padding: "12px 18px",
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 1.4,
              textTransform: "uppercase",
            }}
          >
            Creator intelligence workflow
          </div>

          <div
            style={{
              marginTop: 28,
              fontSize: 72,
              lineHeight: 0.95,
              fontWeight: 900,
              letterSpacing: -4,
            }}
          >
            Create hooks that stop the scroll.
          </div>

          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              lineHeight: 1.35,
              color: "rgba(255,255,255,0.64)",
              maxWidth: 820,
            }}
          >
            Analyze hooks, titles, scripts and packaging before publishing.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, zIndex: 1 }}>
          {["Hook", "Title", "Script", "Packaging", "Retention"].map((item) => (
            <div
              key={item}
              style={{
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.05)",
                borderRadius: 18,
                padding: "14px 18px",
                color: "rgba(255,255,255,0.74)",
                fontSize: 22,
                fontWeight: 700,
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
