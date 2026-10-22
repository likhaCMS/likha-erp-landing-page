import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, fontFamily } from "../brand";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 14, mass: 0.8 } });
  const textOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textY = interpolate(frame, [20, 40], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineOpacity = interpolate(frame, [45, 60], [0, 1], {
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
      <Img
        src={staticFile("logo.png")}
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          transform: `scale(${logoScale})`,
        }}
      />
      <div
        style={{
          marginTop: 40,
          fontSize: 96,
          fontWeight: 800,
          color: COLORS.ink,
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          letterSpacing: -2,
        }}
      >
        Likha <span style={{ color: COLORS.teal }}>ERP</span>
      </div>
      <div
        style={{
          marginTop: 16,
          fontSize: 36,
          fontWeight: 500,
          color: COLORS.muted,
          opacity: taglineOpacity,
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        Power. Simplicity. Control.
      </div>
    </div>
  );
};
