import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1d4ed8 100%)",
          padding: "60px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "100px",
            padding: "10px 24px",
            marginBottom: "32px",
          }}
        >
          <span style={{ fontSize: "20px" }}>⚖️</span>
          <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "18px", fontWeight: 500 }}>
            contestatieamenda.ro
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            color: "white",
            fontSize: "64px",
            fontWeight: 800,
            textAlign: "center",
            lineHeight: 1.15,
            letterSpacing: "-1px",
            maxWidth: "900px",
            marginBottom: "24px",
          }}
        >
          ContestațieAI
        </div>

        {/* Subtitle */}
        <div
          style={{
            color: "rgba(255,255,255,0.75)",
            fontSize: "28px",
            textAlign: "center",
            maxWidth: "700px",
            lineHeight: 1.4,
            marginBottom: "48px",
          }}
        >
          Contestă amenzile cu AI în 5 minute — 100% gratuit
        </div>

        {/* Features row */}
        <div style={{ display: "flex", gap: "24px" }}>
          {["✅ Gratuit", "⚡ 5 minute", "📄 Export PDF", "📊 Estimare șanse"].map((f) => (
            <div
              key={f}
              style={{
                background: "rgba(255,255,255,0.1)",
                borderRadius: "12px",
                padding: "12px 20px",
                color: "rgba(255,255,255,0.9)",
                fontSize: "18px",
              }}
            >
              {f}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
