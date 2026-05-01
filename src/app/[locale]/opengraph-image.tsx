import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "The 502 Project — La comunidad de builders y founders en Guatemala";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#000000",
          padding: 80,
          position: "relative",
        }}
      >
        {/* Subtle green glow */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle, rgba(86,239,159,0.25) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Top: brand name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "#56ef9f",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#56ef9f",
              marginRight: 16,
              display: "flex",
            }}
          />
          <span>The 502 Project</span>
        </div>

        {/* Spacer */}
        <div style={{ display: "flex", flex: 1 }} />

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontSize: 88,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 1000,
          }}
        >
          <span style={{ marginRight: 16 }}>Builders, founders,</span>
          <span style={{ color: "#56ef9f" }}>ambiciosos.</span>
        </div>

        {/* Subline */}
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.35,
            maxWidth: 900,
            marginTop: 24,
            marginBottom: 60,
          }}
        >
          La comunidad para los que están construyendo empresas y tecnología de
          clase mundial desde Guatemala.
        </div>

        {/* Bottom strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "rgba(255,255,255,0.55)",
            fontSize: 22,
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex" }}>
            <span style={{ marginRight: 36 }}>+550 builders</span>
            <span style={{ marginRight: 36 }}>+12 eventos</span>
            <span>+6 sponsors</span>
          </div>
          <span>the502project.com</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
