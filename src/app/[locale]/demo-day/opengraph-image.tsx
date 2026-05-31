import { ImageResponse } from "next/og";

// Config declared directly in this file (never re-exported from another module:
// re-exporting the segment `runtime` config is a fatal error in production builds).
export const runtime = "edge";
export const alt =
  "502 Demo Day · Edición 1 · Pitchea ante inversionistas, en colaboración con Barrilete Ventures";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#000000";
const FG = "#ffffff";
const ACCENT = "#56ef9f";

export default function DemoDayOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          padding: 80,
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Oversized "502" as a faint editorial backdrop (low-opacity brand green). */}
        <div
          style={{
            position: "absolute",
            right: -40,
            bottom: -160,
            display: "flex",
            fontSize: 540,
            fontWeight: 800,
            letterSpacing: -20,
            color: "rgba(86, 239, 159, 0.1)",
          }}
        >
          502
        </div>

        {/* Top label row. */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: ACCENT,
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              background: ACCENT,
              marginRight: 18,
              display: "flex",
            }}
          />
          <span>502 Demo Day · Edición 1</span>
        </div>

        {/* Headline. */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontSize: 108,
            fontWeight: 800,
            color: FG,
            lineHeight: 0.92,
            letterSpacing: -4,
            textTransform: "uppercase",
            maxWidth: 1020,
          }}
        >
          <span style={{ marginRight: 26 }}>Pitchea ante</span>
          <span style={{ color: ACCENT }}>inversionistas.</span>
        </div>

        {/* Bottom strip: place + date and collaboration. */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.16)",
            paddingTop: 30,
            color: "rgba(255,255,255,0.72)",
            fontSize: 26,
          }}
        >
          <span style={{ display: "flex" }}>
            Ciudad de Guatemala · 27 de junio 2026
          </span>
          <span style={{ display: "flex" }}>
            en colaboración con&nbsp;
            <span style={{ color: FG, fontWeight: 700 }}>Barrilete Ventures</span>
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
