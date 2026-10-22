import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AppWindow, UI } from "./AppWindow";

const Tile: React.FC<{
  label: string;
  at: number;
  children: React.ReactNode;
}> = ({ label, at, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - at, fps, config: { damping: 14 } });
  return (
    <div
      style={{
        backgroundColor: UI.panel,
        border: `1px solid ${UI.border}`,
        borderRadius: 10,
        padding: "14px 16px",
        opacity: p,
        scale: String(0.85 + p * 0.15),
        translate: `0px ${(1 - p) * 26}px`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          color: UI.muted,
          fontSize: 13,
          fontWeight: 600,
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
};

/** Insights dashboard: panels drop onto the tile grid and draw themselves. */
export const InsightsMock: React.FC<{ accent: string; uiScale?: number }> = ({
  accent,
  uiScale = 1,
}) => {
  const frame = useCurrentFrame();

  const metric = interpolate(frame, [30, 70], [0, 1240000], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bars = [42, 68, 55, 82, 96];
  const lineDraw = interpolate(frame, [66, 108], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const donutDraw = interpolate(frame, [80, 118], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AppWindow
      title="Operations Overview"
      subtitle="Insights"
      accent={accent}
      uiScale={uiScale}
      activeRail={0}
      height={700}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: 14,
          height: "100%",
        }}
      >
        <Tile label="MONTHLY SALES" at={12}>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: accent, fontSize: 44, fontWeight: 800 }}>
              ₱{(metric / 1000000).toFixed(2)}M
            </div>
            <div style={{ color: UI.muted, fontSize: 13, marginTop: 6 }}>
              +18% vs last month
            </div>
          </div>
        </Tile>
        <Tile label="ORDERS BY STATUS" at={26}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 14,
              height: "100%",
              width: "100%",
              padding: "0 10px 10px",
            }}
          >
            {bars.map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${h * interpolate(frame, [38 + i * 5, 62 + i * 5], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  })}%`,
                  backgroundColor: accent,
                  borderRadius: "6px 6px 0 0",
                  opacity: 0.85,
                }}
              />
            ))}
          </div>
        </Tile>
        <Tile label="DELIVERIES / DAY" at={40}>
          <svg viewBox="0 0 200 70" style={{ width: "100%", height: 90 }}>
            <path
              d="M4,56 C30,52 40,22 66,30 S110,50 136,24 S180,12 196,16"
              fill="none"
              stroke={accent}
              strokeWidth="3.5"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - lineDraw}
            />
          </svg>
        </Tile>
        <Tile label="STOCK HEALTH" at={54}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <svg viewBox="0 0 60 60" width="88" height="88">
              <circle
                cx="30"
                cy="30"
                r="22"
                fill="none"
                stroke={UI.border}
                strokeWidth="8"
              />
              <circle
                cx="30"
                cy="30"
                r="22"
                fill="none"
                stroke={accent}
                strokeWidth="8"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - donutDraw * 0.72}
                transform="rotate(-90 30 30)"
              />
            </svg>
            <div>
              <div style={{ color: UI.text, fontSize: 28, fontWeight: 700 }}>
                72%
              </div>
              <div style={{ color: UI.muted, fontSize: 13 }}>in stock</div>
            </div>
          </div>
        </Tile>
      </div>
    </AppWindow>
  );
};
