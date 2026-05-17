import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: "#1a0f2e",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "6px",
      }}
    >
      <span style={{ color: "#c8a96e", fontSize: 22, fontFamily: "Georgia, serif", fontWeight: 700, lineHeight: 1 }}>V</span>
    </div>,
    { ...size },
  );
}
