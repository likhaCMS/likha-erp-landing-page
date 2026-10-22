import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AppWindow, Glyph, Icon, UI } from "./AppWindow";

const Node: React.FC<{
  icon: Glyph;
  title: string;
  sub: string;
  accent: string;
  at: number;
}> = ({ icon, title, sub, accent, at }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - at, fps, config: { damping: 13 } });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        width: 360,
        padding: "14px 18px",
        borderRadius: 14,
        backgroundColor: UI.panel,
        border: `1.5px solid ${at === 8 ? accent : UI.border}`,
        boxShadow: at === 8 ? `0 0 24px ${accent}33` : "none",
        opacity: p,
        scale: String(0.8 + p * 0.2),
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          backgroundColor: `${accent}22`,
          color: accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon glyph={icon} size={19} />
      </div>
      <div>
        <div style={{ color: UI.text, fontSize: 17, fontWeight: 700 }}>
          {title}
        </div>
        <div style={{ color: UI.muted, fontSize: 13.5 }}>{sub}</div>
      </div>
    </div>
  );
};

/** Arrow + "+" attach point between nodes — the flows-canvas connector. */
const Link: React.FC<{ at: number; accent: string }> = ({ at, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const draw = interpolate(frame, [at, at + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const plus = spring({ frame: frame - at - 14, fps, config: { damping: 12 } });
  // packet loops down the link once it's drawn — "data flowing" cue
  const travel = ((frame - at - 18) % 24) / 24;
  const packetOn = frame > at + 18;
  return (
    <div
      style={{
        height: 64,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      <svg width="20" height="64" style={{ overflow: "visible" }}>
        <line
          x1="10"
          y1="0"
          x2="10"
          y2="64"
          stroke={UI.muted}
          strokeWidth="2.5"
          strokeDasharray="64"
          strokeDashoffset={64 * (1 - draw)}
        />
        <polygon
          points="10,60 5,50 15,50"
          fill={UI.muted}
          opacity={draw >= 0.98 ? 1 : 0}
        />
      </svg>
      {packetOn ? (
        <div
          style={{
            position: "absolute",
            top: travel * 56,
            width: 9,
            height: 9,
            borderRadius: 5,
            backgroundColor: accent,
            boxShadow: `0 0 10px ${accent}`,
          }}
        />
      ) : null}
      <div
        style={{
          position: "absolute",
          top: 22,
          width: 22,
          height: 22,
          borderRadius: 11,
          backgroundColor: UI.panelHover,
          border: `1.5px solid ${UI.border}`,
          color: UI.muted,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          scale: String(plus),
        }}
      >
        <Icon glyph="plus" size={11} />
      </div>
    </div>
  );
};

/** Automation canvas: trigger node, arrows draw in, operations chain down. */
export const FlowsMock: React.FC<{ accent: string; uiScale?: number }> = ({
  accent,
  uiScale = 1,
}) => {
  return (
    <AppWindow
      title="Low Stock Alert"
      subtitle="Flows"
      accent={accent}
      uiScale={uiScale}
      activeRail={3}
      height={620}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(${UI.border} 1.2px, transparent 1.2px)`,
          backgroundSize: "22px 22px",
          opacity: 0.6,
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Node
          icon="bolt"
          title="Trigger — Event Action"
          sub="items.create · inventory"
          accent={accent}
          at={8}
        />
        <Link at={42} accent={accent} />
        <Node
          icon="grid"
          title="Condition"
          sub="quantity < reorder_point"
          accent={accent}
          at={62}
        />
        <Link at={98} accent={accent} />
        <Node
          icon="mail"
          title="Send Email"
          sub="to: purchasing@company.ph"
          accent={accent}
          at={118}
        />
      </div>
    </AppWindow>
  );
};
