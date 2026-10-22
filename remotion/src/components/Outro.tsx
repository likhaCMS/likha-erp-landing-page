import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, fontFamily } from "../brand";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardIn = spring({ frame, fps, config: { damping: 16 } });
  const ctaOpacity = interpolate(frame, [30, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaY = interpolate(frame, [30, 50], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: COLORS.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          opacity: cardIn,
          transform: `scale(${0.85 + cardIn * 0.15})`,
        }}
      >
        <Img
          src={staticFile("logo.png")}
          style={{ width: 110, height: 110, borderRadius: 26 }}
        />
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.ink }}>
          Likha <span style={{ color: COLORS.teal }}>ERP</span>
        </div>
      </div>
      <div
        style={{
          marginTop: 28,
          fontSize: 30,
          color: COLORS.muted,
          opacity: ctaOpacity,
          transform: `translateY(${ctaY}px)`,
        }}
      >
        The Philippine alternative to complex, foreign ERPs.
      </div>
      <div
        style={{
          marginTop: 44,
          fontSize: 34,
          fontWeight: 700,
          color: "#ffffff",
          backgroundColor: COLORS.teal,
          borderRadius: 16,
          padding: "18px 48px",
          opacity: ctaOpacity,
          transform: `translateY(${ctaY}px)`,
        }}
      >
        LikhaERP<span style={{ opacity: 0.72 }}>.com</span>
      </div>
    </div>
  );
};
