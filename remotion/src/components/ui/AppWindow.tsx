import React from "react";
import { fontFamily } from "../../brand";

/** Product-UI palette — mirrors the real app's dark canvas. */
export const UI = {
  page: "#0d1117",
  panel: "#161b22",
  panelHover: "#1d242d",
  border: "#30363d",
  rail: "#090c10",
  text: "#e6edf3",
  muted: "#7d8590",
};

const RAIL_ICONS = ["grid", "list", "box", "bolt", "gear"] as const;

export type Glyph =
  | "grid"
  | "list"
  | "box"
  | "bolt"
  | "gear"
  | "eye"
  | "plus"
  | "pencil"
  | "trash"
  | "input"
  | "calendar"
  | "user"
  | "repeat"
  | "align"
  | "mail"
  | "db"
  | "bars"
  | "line"
  | "pie"
  | "check";

const GLYPHS: Record<Glyph, React.ReactNode> = {
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  list: (
    <>
      <line x1="9" y1="6" x2="21" y2="6" />
      <line x1="9" y1="12" x2="21" y2="12" />
      <line x1="9" y1="18" x2="21" y2="18" />
      <circle cx="4.5" cy="6" r="1.4" />
      <circle cx="4.5" cy="12" r="1.4" />
      <circle cx="4.5" cy="18" r="1.4" />
    </>
  ),
  box: (
    <>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
      <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
    </>
  ),
  bolt: <path d="M13 2L4.5 13.5H11L10 22l8.5-11.5H12L13 2z" />,
  gear: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5 5l2.1 2.1M16.9 16.9L19 19M19 5l-2.1 2.1M7.1 16.9L5 19" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  pencil: (
    <>
      <path d="M17 3.5l3.5 3.5L8 19.5l-4.5 1 1-4.5L17 3.5z" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </>
  ),
  input: (
    <>
      <rect x="3" y="7" width="18" height="10" rx="2" />
      <line x1="7" y1="12" x2="15" y2="12" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="8" y1="3" x2="8" y2="7" />
      <line x1="16" y1="3" x2="16" y2="7" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 21c1.5-4 4.5-6 7.5-6s6 2 7.5 6" />
    </>
  ),
  repeat: (
    <>
      <path d="M17 3l4 4-4 4" />
      <path d="M21 7H8a4 4 0 0 0-4 4v2" />
      <path d="M7 21l-4-4 4-4" />
      <path d="M3 17h13a4 4 0 0 0 4-4v-2" />
    </>
  ),
  align: (
    <>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="11" x2="16" y2="11" />
      <line x1="4" y1="16" x2="20" y2="16" />
      <line x1="4" y1="21" x2="13" y2="21" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </>
  ),
  db: (
    <>
      <ellipse cx="12" cy="5.5" rx="8" ry="3" />
      <path d="M4 5.5V18.5c0 1.66 3.58 3 8 3s8-1.34 8-3V5.5" />
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
    </>
  ),
  bars: (
    <>
      <line x1="5" y1="20" x2="5" y2="11" />
      <line x1="10" y1="20" x2="10" y2="5" />
      <line x1="15" y1="20" x2="15" y2="14" />
      <line x1="20" y1="20" x2="20" y2="8" />
    </>
  ),
  line: (
    <>
      <polyline points="3,17 8,9 12,13 17,5 21,10" />
    </>
  ),
  pie: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 12V4M12 12l5.7 5.7" />
    </>
  ),
  check: <polyline points="5,12.5 10,17.5 19,7" />,
};

export const Icon: React.FC<{
  glyph: Glyph;
  size?: number;
  color?: string;
}> = ({ glyph, size = 16, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {GLYPHS[glyph]}
  </svg>
);

/**
 * App chrome replicating the product: thin module rail on the far left,
 * header bar with breadcrumb, content area. Not a literal screenshot —
 * an animated rebuild so every frame is crisp.
 */
export const AppWindow: React.FC<{
  title: string;
  subtitle: string;
  accent: string;
  activeRail: number;
  height?: number;
  /** Layout zoom for non-16:9 canvases (Chrome renders `zoom` correctly). */
  uiScale?: number;
  children: React.ReactNode;
}> = ({ title, subtitle, accent, activeRail, height = 640, uiScale = 1, children }) => (
  <div
    style={{
      width: 680,
      height,
      zoom: uiScale,
      borderRadius: 18,
      backgroundColor: UI.page,
      border: `1px solid ${UI.border}`,
      overflow: "hidden",
      display: "flex",
      flexDirection: "row",
      fontFamily,
      flexShrink: 0,
    }}
  >
    <div
      style={{
        width: 60,
        backgroundColor: UI.rail,
        borderRight: `1px solid ${UI.border}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 18,
        gap: 12,
      }}
    >
      {RAIL_ICONS.map((g, i) => (
        <div
          key={g}
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: i === activeRail ? "#fff" : UI.muted,
            backgroundColor: i === activeRail ? accent : "transparent",
          }}
        >
          <Icon glyph={g} size={19} />
        </div>
      ))}
    </div>
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div
        style={{
          height: 62,
          borderBottom: `1px solid ${UI.border}`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 20px",
        }}
      >
        <div style={{ fontSize: 14, color: UI.muted, fontWeight: 500 }}>
          {subtitle}
        </div>
        <div style={{ fontSize: 19, color: UI.text, fontWeight: 700 }}>
          {title}
        </div>
      </div>
      <div style={{ flex: 1, position: "relative", padding: 20 }}>{children}</div>
    </div>
  </div>
);
