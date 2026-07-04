import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Enric Trillo — Senior Fullstack Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BANDS = [
  { color: "#FFA028", nm: "590", name: "INTERFACE" },
  { color: "#3CF58F", nm: "520", name: "SYSTEMS" },
  { color: "#38CFFF", nm: "470", name: "CLOUD" },
  { color: "#A97DFF", nm: "405", name: "INTELLIGENCE" },
] as const;

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0B0F",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "56px 72px 52px",
        }}
      >
        {/* Top bar: brand + status chip */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "auto" }}>
          <span style={{ color: "#5D6375", fontSize: 15, letterSpacing: "0.14em", fontFamily: "monospace" }}>
            enric.trillo · v5.5 SIGNAL
          </span>
          <span
            style={{
              color: "#3CF58F",
              border: "1px solid #3CF58F",
              fontSize: 12,
              letterSpacing: "0.14em",
              fontFamily: "monospace",
              padding: "5px 14px",
              borderRadius: 3,
            }}
          >
            AVAILABLE · Q3 2026
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", marginBottom: 36 }}>
          {["Idea to production,", "one engineer,"].map((line) => (
            <span
              key={line}
              style={{
                color: "#EBEDF4",
                fontSize: 88,
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                fontFamily: "sans-serif",
              }}
            >
              {line}
            </span>
          ))}
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span
              style={{
                color: "#EBEDF4",
                fontSize: 88,
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                fontFamily: "sans-serif",
              }}
            >
              full SPECTRUM
            </span>
            <span
              style={{
                color: "#FFA028",
                fontSize: 88,
                fontWeight: 900,
                lineHeight: 1.05,
                fontFamily: "sans-serif",
              }}
            >
              .
            </span>
          </div>
        </div>

        {/* Wavelength bars */}
        <div style={{ display: "flex", gap: 12 }}>
          {BANDS.map((b) => (
            <div key={b.nm} style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
              <div style={{ height: 2, background: b.color, borderRadius: 2 }} />
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: b.color, fontSize: 11, letterSpacing: "0.12em", fontFamily: "monospace", fontWeight: 600 }}>
                  {b.nm}
                </span>
                <span style={{ color: "#5D6375", fontSize: 11, letterSpacing: "0.1em", fontFamily: "monospace" }}>
                  {b.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
