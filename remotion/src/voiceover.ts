import type { VoLine } from "./components/AdAudio";
import manifest from "./vo-manifest.json";

/**
 * Renders skip audio if files are missing — run `npm run gen:vo` and
 * `npm run gen:sfx` first (files are gitignored anyway).
 */
export const VOICEOVER_ENABLED = true;

/**
 * Scene anchors for LikhaPromo @30fps — preferred start frame per line.
 * Timeline: intro 0–120, scenes 120/260/400/540 (140f each), outro 680–800.
 *
 * Actual `at` values are computed below: each line starts at its anchor OR
 * after the previous line ends (+PAD) — whichever is later — so narration
 * can never overlap no matter how long the generated clips are.
 * Durations come from src/vo-manifest.json, written by scripts/gen-vo.mjs.
 */
const FPS = 30;
const PAD = 8; // minimum silent frames between lines
const ANCHORS: { file: keyof typeof manifest; at: number }[] = [
  { file: "lp_hook", at: 8 },
  { file: "lp_forms", at: 128 },
  { file: "lp_roles", at: 268 },
  { file: "lp_flows", at: 408 },
  { file: "lp_dash", at: 548 },
  { file: "lp_cta", at: 688 },
];

export const VO_LINES: VoLine[] = (() => {
  let cursor = 0;
  return ANCHORS.map(({ file, at }) => {
    const start = Math.max(at, cursor);
    const durationSec = manifest[file]?.durationSec ?? 0;
    cursor = start + Math.ceil(durationSec * FPS) + PAD;
    return { at: start, file };
  });
})();
