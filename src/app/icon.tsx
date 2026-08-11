import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Favicon: guld "AR"-monogram på mörk bakgrund.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0e18",
          color: "#ebbd33",
          fontSize: 34,
          fontWeight: 700,
          fontFamily: "serif",
          letterSpacing: "-0.02em",
        }}
      >
        AR
      </div>
    ),
    { ...size },
  );
}
