import { ImageResponse } from "next/og";
import { getArticle } from "@/lib/articles";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  const title = article?.title ?? "ContestațieAI — Ghid juridic";
  const emoji = article?.emoji ?? "⚖️";
  const category = article?.category ?? "Ghid";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1d4ed8 100%)",
          padding: "60px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top: branding */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "20px" }}>⚖️</span>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "18px" }}>
            ContestațieAI · contestatieamenda.ro
          </span>
        </div>

        {/* Middle: article info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Category badge */}
          <div
            style={{
              display: "flex",
              width: "fit-content",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: "100px",
              padding: "8px 20px",
              color: "rgba(255,255,255,0.9)",
              fontSize: "16px",
              fontWeight: 500,
            }}
          >
            {category}
          </div>

          {/* Emoji + Title */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "24px" }}>
            <div style={{ fontSize: "72px", lineHeight: 1 }}>{emoji}</div>
            <div
              style={{
                color: "white",
                fontSize: "52px",
                fontWeight: 800,
                lineHeight: 1.2,
                letterSpacing: "-0.5px",
                maxWidth: "920px",
              }}
            >
              {title}
            </div>
          </div>
        </div>

        {/* Bottom: CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px" }}>
            Ghid complet · contestatieamenda.ro
          </span>
          <div
            style={{
              background: "white",
              color: "#1d4ed8",
              borderRadius: "12px",
              padding: "14px 28px",
              fontSize: "18px",
              fontWeight: 700,
            }}
          >
            Generează contestația gratuit →
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
