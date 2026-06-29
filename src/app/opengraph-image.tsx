import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "André Roslund – Författare";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Delningsbild (Facebook/X m.fl.): guldnamn på mörk bakgrund i sidans stil.
export default function OpengraphImage() {
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
          background:
            "radial-gradient(120% 90% at 50% 0%, #16233f 0%, #0a0e18 60%, #080a12 100%)",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: "0.04em",
            color: "#ebbd33",
            textTransform: "uppercase",
            fontFamily: "serif",
          }}
        >
          André Roslund
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 30,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "rgba(235,189,51,0.85)",
            fontFamily: "serif",
          }}
        >
          Författare
        </div>
      </div>
    ),
    { ...size },
  );
}
