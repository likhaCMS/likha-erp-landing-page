import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AppWindow, Glyph, Icon, UI } from "./AppWindow";

const FIELDS: { icon: Glyph; name: string; type: string }[] = [
  { icon: "calendar", name: "delivery_date", type: "Datetime" },
  { icon: "user", name: "driver", type: "Dropdown" },
  { icon: "repeat", name: "items", type: "Repeater" },
  { icon: "input", name: "received_by", type: "Input" },
  { icon: "align", name: "notes", type: "Textarea" },
];

const TYPING = "priority_flag";
const TYPE_AT = 96;

/** Data-model view: field rows stack in like building a form, then "+ Create Field". */
export const FormsMock: React.FC<{ accent: string; uiScale?: number }> = ({
  accent,
  uiScale = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pulse = interpolate(
    frame % 30,
    [0, 15, 30],
    [0.35, 0.7, 0.35],
  );
  const typed = TYPING.slice(
    0,
    Math.max(0, Math.floor((frame - TYPE_AT) / 2)),
  );
  const caretOn = Math.floor(frame / 8) % 2 === 0;

  return (
    <AppWindow
      title="deliveries"
      subtitle="Data Model"
      accent={accent}
      uiScale={uiScale}
      activeRail={3}
      height={620}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {FIELDS.map((f, i) => {
          const at = 8 + i * 10;
          const p = spring({ frame: frame - at, fps, config: { damping: 14 } });
          return (
            <div
              key={f.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                height: 56,
                padding: "0 16px",
                borderRadius: 9,
                backgroundColor: UI.panel,
                border: `1px solid ${UI.border}`,
                opacity: p,
                translate: `${(1 - p) * -40}px 0px`,
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  backgroundColor: `${accent}22`,
                  color: accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon glyph={f.icon} size={17} />
              </div>
              <span style={{ color: UI.text, fontSize: 17, fontWeight: 600 }}>
                {f.name}
              </span>
              <span
                style={{ marginLeft: "auto", color: UI.muted, fontSize: 14 }}
              >
                {f.type}
              </span>
            </div>
          );
        })}
        {/* live-typing row — feels like someone building the form for real */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            height: 56,
            padding: "0 16px",
            borderRadius: 9,
            backgroundColor: UI.panel,
            border: `1px solid ${accent}`,
            opacity: interpolate(frame, [TYPE_AT - 6, TYPE_AT], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              backgroundColor: `${accent}22`,
              color: accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon glyph="bolt" size={17} />
          </div>
          <span style={{ color: UI.text, fontSize: 17, fontWeight: 600 }}>
            {typed}
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: 18,
                backgroundColor: accent,
                verticalAlign: "text-bottom",
                marginLeft: 2,
                opacity: caretOn ? 1 : 0,
              }}
            />
          </span>
          <span style={{ marginLeft: "auto", color: UI.muted, fontSize: 14 }}>
            Toggle
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            height: 52,
            borderRadius: 9,
            border: `1.5px dashed ${accent}`,
            color: accent,
            fontSize: 15,
            fontWeight: 600,
            opacity: interpolate(frame, [118, 130], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            boxShadow: `0 0 ${18 * pulse}px ${accent}44`,
          }}
        >
          <Icon glyph="plus" size={15} />
          Create Field
        </div>
      </div>
    </AppWindow>
  );
};
