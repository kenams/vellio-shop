import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#1a0f2e",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
      }}
    >
      <div
        style={{
          width: 88,
          height: 88,
          background: "rgba(200,169,110,0.12)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid rgba(200,169,110,0.3)",
        }}
      >
        <span style={{ color: "#c8a96e", fontSize: 56, fontFamily: "Georgia, serif", lineHeight: 1 }}>V</span>
      </div>
      <span style={{ color: "#ffffff", fontSize: 80, fontFamily: "Georgia, serif", fontWeight: 700, letterSpacing: "-3px", lineHeight: 1 }}>Vellio</span>
      <span style={{ color: "rgba(255,255,255,0.48)", fontSize: 26, fontFamily: "sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" }}>
        Maison de sélection contemporaine
      </span>
      <div style={{ display: "flex", gap: "32px", marginTop: "8px" }}>
        {["Objets design", "Tech premium", "Livraison gratuite dès 50€"].map((t) => (
          <span key={t} style={{ color: "rgba(200,169,110,0.7)", fontSize: 18, fontFamily: "sans-serif" }}>· {t}</span>
        ))}
      </div>
    </div>,
    { ...size },
  );
}
