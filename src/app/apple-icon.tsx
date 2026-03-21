import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 36,
          background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 100,
            height: 124,
            background: "white",
            borderRadius: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <div style={{ width: 60, height: 10, background: "#93c5fd", borderRadius: 5 }} />
          <div style={{ width: 60, height: 10, background: "#93c5fd", borderRadius: 5 }} />
          <div style={{ fontSize: 40, color: "#1e40af", fontWeight: "bold", lineHeight: 1 }}>✓</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
