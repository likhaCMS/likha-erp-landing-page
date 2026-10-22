import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AppWindow, Glyph, Icon, UI } from "./AppWindow";

const COLLECTIONS = ["employees", "expenses", "deliveries"];
const ACTIONS: Glyph[] = ["eye", "plus", "pencil", "trash"];

// Frame the selected role flips — the "different roles see different
// things" beat of the scene.
const SWITCH_AT = 88;

// Operations Manager: broad access. Front Desk: view-only where needed.
const OPS: [number, number][] = [
  [0, 0], [0, 1], [0, 2], [0, 3],
  [1, 0], [1, 1],
  [2, 0], [2, 1], [2, 2], [2, 3],
];
const FRONT_DESK: [number, number][] = [
  [0, 0],
  [2, 0],
];

const ROLE_PILLS = ["Operations Manager", "Front Desk"];

/** Roles & Permissions: pick a role, watch its permission matrix fill in. */
export const RbacMock: React.FC<{ accent: string; uiScale?: number }> = ({
  accent,
  uiScale = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const toggle = spring({ frame: frame - 14, fps, config: { damping: 16 } });
  const frontDesk = frame >= SWITCH_AT;
  const grants = frontDesk ? FRONT_DESK : OPS;

  return (
    <AppWindow
      title="Access Control"
      subtitle="Roles & Permissions"
      accent={accent}
      uiScale={uiScale}
      activeRail={4}
      height={560}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "12px 16px",
          borderRadius: 9,
          backgroundColor: UI.panel,
          border: `1px solid ${UI.border}`,
          marginBottom: 14,
        }}
      >
        <div
          style={{
            width: 48,
            height: 26,
            borderRadius: 13,
            backgroundColor: toggle > 0.5 ? accent : UI.border,
            position: "relative",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 3,
              left: 3 + toggle * 22,
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: "#fff",
            }}
          />
        </div>
        <span style={{ color: UI.text, fontSize: 16, fontWeight: 600 }}>
          App Access
        </span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          {ROLE_PILLS.map((role, i) => {
            const active = frontDesk ? i === 1 : i === 0;
            const pop = spring({
              frame: frame - (i === 1 ? SWITCH_AT : 6),
              fps,
              config: { damping: 14 },
            });
            return (
              <div
                key={role}
                style={{
                  padding: "7px 14px",
                  borderRadius: 8,
                  fontSize: 13.5,
                  fontWeight: 600,
                  color: active ? "#0d1117" : UI.muted,
                  backgroundColor: active ? accent : UI.rail,
                  border: `1px solid ${active ? accent : UI.border}`,
                  scale: active ? String(0.9 + pop * 0.1) : "1",
                }}
              >
                {role}
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{
          borderRadius: 9,
          border: `1px solid ${UI.border}`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr repeat(4, 56px)",
            backgroundColor: UI.panel,
            borderBottom: `1px solid ${UI.border}`,
          }}
        >
          <div
            style={{
              padding: "12px 16px",
              color: UI.muted,
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            COLLECTION
          </div>
          {ACTIONS.map((g) => (
            <div
              key={g}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: UI.muted,
              }}
            >
              <Icon glyph={g} size={16} />
            </div>
          ))}
        </div>
        {COLLECTIONS.map((c, r) => (
          <div
            key={c}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr repeat(4, 56px)",
              borderBottom:
                r < COLLECTIONS.length - 1 ? `1px solid ${UI.border}` : "none",
            }}
          >
            <div
              style={{
                padding: "14px 16px",
                color: UI.text,
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              {c}
            </div>
            {ACTIONS.map((_, col) => {
              const order = grants.findIndex(([gr, gc]) => gr === r && gc === col);
              // stagger each grant; re-stagger after the role switch
              const base = frontDesk ? SWITCH_AT + 8 : 34;
              const tickAt = base + Math.max(order, 0) * 5;
              const on = order >= 0 && frame >= tickAt;
              const pop = spring({
                frame: frame - tickAt,
                fps,
                config: { damping: 12 },
              });
              const dimmed = frontDesk && order < 0;
              return (
                <div
                  key={col}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: interpolate(
                      frame,
                      [SWITCH_AT - 4, SWITCH_AT + 12],
                      [1, dimmed ? 0.45 : 1],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                    ),
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      border: `1.5px solid ${on ? accent : UI.border}`,
                      backgroundColor: on ? accent : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      scale: on ? String(0.6 + pop * 0.4) : "1",
                    }}
                  >
                    {on ? <Icon glyph="check" size={13} color="#0d1117" /> : null}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </AppWindow>
  );
};
