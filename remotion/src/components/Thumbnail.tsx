import React from "react";
import { Img, staticFile } from "remotion";
import { Aspect, COLORS, fontFamily, layoutFor } from "../brand";
import { AppWindow } from "./ui/AppWindow";
import { InsightsMock } from "./ui/InsightsMock";

/**
 * Static thumbnail frame (not an ad scene) — huge hook + product UI.
 * Best-practice rules applied: <=5 words of headline readable at ~320px
 * wide, high contrast, product UI for credibility, logo for recall.
 */
export const Thumbnail: React.FC<{ aspect: Aspect }> = ({ aspect }) => {
  const lay = layoutFor(aspect);
  const wide = !lay.isColumn;

  const headlineSize = aspect === "9:16" ? 92 : aspect === "1:1" ? 88 : 118;
  const subSize = aspect === "9:16" ? 40 : aspect === "1:1" ? 36 : 44;

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: COLORS.bg,
        fontFamily,
        display: "flex",
        flexDirection: wide ? "row" : "column",
        alignItems: wide ? "center" : "flex-start",
        justifyContent: wide ? "space-between" : "flex-start",
        padding: lay.pad,
        gap: wide ? 48 : 40,
      }}
    >
      {/* Copy block */}
      <div style={{ flex: wide ? 1 : undefined, paddingTop: wide ? 0 : 24 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 36,
          }}
        >
          <Img
            src={staticFile("logo.png")}
            style={{ width: 56, height: 56, borderRadius: 14 }}
          />
          <div style={{ fontSize: 34, fontWeight: 800, color: COLORS.ink }}>
            Likha <span style={{ color: COLORS.teal }}>ERP</span>
          </div>
        </div>
        <div
          style={{
            fontSize: headlineSize,
            fontWeight: 800,
            lineHeight: 1.02,
            color: COLORS.ink,
            letterSpacing: -2,
          }}
        >
          Stop chasing{" "}
          <span style={{ color: COLORS.yellow }}>approvals.</span>
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: subSize,
            fontWeight: 600,
            color: COLORS.muted,
            lineHeight: 1.3,
          }}
        >
          The ERP built for Philippine SMEs
        </div>
      </div>

      {/* Product UI — dashboards read instantly even at small sizes */}
      <div
        style={{
          flex: wide ? undefined : 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <AppWindow
          title="Insights"
          subtitle="Dashboard"
          accent={COLORS.magenta}
          activeRail={3}
          height={wide ? 640 : 560}
          uiScale={aspect === "9:16" ? 1.24 : aspect === "1:1" ? 0.85 : 0.9}
        >
          <InsightsMock accent={COLORS.magenta} />
        </AppWindow>
      </div>
    </div>
  );
};
