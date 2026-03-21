import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Document body */}
        <div
          style={{
            width: 18,
            height: 22,
            background: "white",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            position: "relative",
          }}
        >
          {/* Lines on document */}
          <div style={{ width: 10, height: 2, background: "#93c5fd", borderRadius: 1 }} />
          <div style={{ width: 10, height: 2, background: "#93c5fd", borderRadius: 1 }} />
          {/* Checkmark */}
          <div
            style={{
              fontSize: 9,
              color: "#1e40af",
              fontWeight: "bold",
              lineHeight: 1,
              marginTop: 1,
            }}
          >
            ✓
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
