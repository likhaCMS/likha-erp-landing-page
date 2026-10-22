import { loadFont } from "@remotion/google-fonts/InterTight";

export const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const COLORS = {
  bg: "#1d1d1d",
  bgSoft: "#232323",
  ink: "#edefeb",
  muted: "#9aa39c",
  teal: "#26a69a",
  cyan: "#31ccec",
  yellow: "#f2c037",
  magenta: "#bc37d3",
};

export type Aspect = "9:16" | "1:1" | "16:9";

export const AD_DIMS: Record<Aspect, { width: number; height: number }> = {
  "9:16": { width: 1080, height: 1920 },
  "1:1": { width: 1080, height: 1080 },
  "16:9": { width: 1920, height: 1080 },
};

/** Per-aspect layout hints shared by all scenes. */
export const layoutFor = (aspect: Aspect) => ({
  isVertical: aspect === "9:16",
  /** Copy + UI stack vertically on 9:16 and 1:1, side-by-side on 16:9. */
  isColumn: aspect !== "16:9",
  fontScale: aspect === "9:16" ? 1.1 : aspect === "1:1" ? 0.92 : 1,
  pad: aspect === "9:16" ? 64 : aspect === "1:1" ? 56 : 120,
  /** Zoom applied to the app-window mock so it fills the canvas. */
  uiScale: aspect === "9:16" ? 1.15 : aspect === "1:1" ? 0.85 : 1.15,
});

export type ComponentFeature = {
  index: string;
  name: string;
  headline: string;
  description: string;
  image: string;
  accent: string;
  mock: "forms" | "rbac" | "flows" | "insights";
};

export const FEATURES: ComponentFeature[] = [
  {
    index: "01",
    name: "Forms & Records",
    headline: "The Simplicity of a Form Builder.",
    description:
      "Create custom records, daily logs, and quality checklists as easily as building a form. Zero coding required.",
    image: "forms-records.jpg",
    mock: "forms",
    accent: COLORS.teal,
  },
  {
    index: "02",
    name: "Roles & Permissions",
    headline: "Enterprise Security. Zero Per-User Fees.",
    description:
      "Role-based access control for your entire workforce—give each role exactly the access it needs, without per-user fees.",
    image: "roles-permissions.jpg",
    mock: "rbac",
    accent: COLORS.cyan,
  },
  {
    index: "03",
    name: "Automation & Flows",
    headline: "Stop the Manual Work.",
    description:
      "From low-stock alerts to multi-level purchase approvals, enterprise-scale automation keeps your SOPs running instantly.",
    image: "automation-flows.jpg",
    mock: "flows",
    accent: COLORS.yellow,
  },
  {
    index: "04",
    name: "Dashboard Panels",
    headline: "Instant Operational Intelligence.",
    description:
      "Drag-and-drop real-time dashboards—from live inventory movement to monthly sales targets, at a single glance.",
    image: "dashboard-panels.jpg",
    mock: "insights",
    accent: COLORS.magenta,
  },
];
