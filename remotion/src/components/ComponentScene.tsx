import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Aspect, COLORS, ComponentFeature, fontFamily, layoutFor } from "../brand";
import { FlowsMock } from "./ui/FlowsMock";
import { FormsMock } from "./ui/FormsMock";
import { InsightsMock } from "./ui/InsightsMock";
import { RbacMock } from "./ui/RbacMock";

const MOCKS = {
  forms: FormsMock,
  rbac: RbacMock,
  flows: FlowsMock,
  insights: InsightsMock,
} as const;

export const ComponentScene: React.FC<{
  feature: ComponentFeature;
  aspect: Aspect;
}> = ({ feature, aspect }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lay = layoutFor(aspect);

  const headerIn = spring({ frame, fps, config: { damping: 18 } });
  const imageIn = spring({
    frame: frame - 10,
    fps,
    config: { damping: 18 },
  });
  const descOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const Mock = MOCKS[feature.mock];

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: COLORS.bg,
        display: "flex",
        flexDirection: lay.isColumn ? "column" : "row",
        alignItems: "center",
        justifyContent: lay.isColumn ? "space-evenly" : "center",
        padding: `0 ${lay.pad}px`,
        gap: lay.isColumn ? 48 : 80,
        fontFamily,
      }}
    >
      <div
        style={{
          flex: lay.isColumn ? undefined : 1,
          display: "flex",
          flexDirection: "column",
          alignItems: lay.isColumn ? "center" : "flex-start",
          textAlign: lay.isColumn ? "center" : "left",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            opacity: headerIn,
            translate: `${(1 - headerIn) * -60}px 0px`,
          }}
        >
          <span
            style={{
              fontSize: 28 * lay.fontScale,
              fontWeight: 700,
              color: feature.accent,
              border: `3px solid ${feature.accent}`,
              borderRadius: 12,
              padding: "6px 16px",
            }}
          >
            {feature.index}
          </span>
          <span
            style={{
              fontSize: 30 * lay.fontScale,
              fontWeight: 600,
              color: COLORS.muted,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            {feature.name}
          </span>
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 60 * lay.fontScale,
            fontWeight: 800,
            color: COLORS.ink,
            lineHeight: 1.1,
            opacity: headerIn,
            translate: `${(1 - headerIn) * -60}px 0px`,
          }}
        >
          {feature.headline}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 26 * lay.fontScale,
            fontWeight: 400,
            color: COLORS.muted,
            lineHeight: 1.5,
            maxWidth: 620,
            opacity: descOpacity,
          }}
        >
          {feature.description}
        </div>
      </div>
      <div
        style={{
          borderRadius: 24,
          overflow: "hidden",
          border: `3px solid ${feature.accent}`,
          boxShadow: `0 0 80px ${feature.accent}55`,
          opacity: imageIn,
          scale: String(0.9 + imageIn * 0.1),
        }}
      >
        <Mock accent={feature.accent} uiScale={lay.uiScale} />
      </div>
    </div>
  );
};
