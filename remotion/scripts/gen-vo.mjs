/**
 * Generates per-scene voiceover lines via edge-tts (neural voice) into
 * public/vo/. One mp3 per line so each line can be scheduled at the exact
 * frame its scene starts — keeps narration in sync with visuals.
 *
 * After generating, measures each clip's duration (ffprobe) and writes
 * src/vo-manifest.json — voiceover.ts uses it to schedule lines with
 * padding so they can never overlap, even after re-generating.
 *
 *   pip install edge-tts
 *   node scripts/gen-vo.mjs
 *
 * Change voice/rate below; scene anchors are in src/voiceover.ts.
 * See docs/VOICE.md.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Default voice. For a human ad-read, prefer the Natural multilingual
// voice via a per-line `voice` override on the LINES entry:
//   my_line: { text: "...", voice: "en-US-AndrewMultilingualNeural" }
// AndrewMultilingual delivers conversationally (~15% slower — the
// vo-manifest scheduler handles spacing, just verify last-line fit).
// en-PH-JamesNeural is the PH-accented alternative (see docs/VOICE.md).
const VOICE = "en-US-AndrewNeural";
const RATE = "+8%";
const OUT = join(dirname(fileURLToPath(import.meta.url)), "../public/vo");
const MANIFEST = join(
  dirname(fileURLToPath(import.meta.url)),
  "../src/vo-manifest.json",
);

/** Per-scene lines — filenames must match VO_LINES in src/voiceover.ts. */
const LINES = {
  // LikhaPromo (scenes at 0 / 120 / 260 / 400 / 540 / 680)
  lp_hook: "Still running your business on spreadsheets?",
  lp_forms: "Build forms and records. No coding.",
  lp_roles: "Add the whole team. Zero per-user fees.",
  lp_flows: "Automate approvals. Stop the manual work.",
  lp_dash: "Your whole business, live on one dashboard.",
  // "Likha" is pronounced leek-HAH — spell it phonetically for TTS;
  // spaced caps force letter-by-letter "E R P". Slower rate so the
  // brand name lands. On-screen copy keeps the real spelling.
  lp_cta: {
    text: "Your business, built your way. Leek-hah, E R P, dot com.",
    rate: "+0%",
  },
};

const probe = (file) =>
  parseFloat(
    execFileSync(
      "npx",
      [
        "remotion",
        "ffprobe",
        "-v",
        "quiet",
        "-show_entries",
        "format=duration",
        "-of",
        "csv=p=0",
        file,
      ],
      { encoding: "utf-8", shell: process.platform === "win32" },
    ).trim(),
  );

mkdirSync(OUT, { recursive: true });
const manifest = {};
for (const [name, line] of Object.entries(LINES)) {
  const file = join(OUT, `${name}.mp3`);
  const text = typeof line === "string" ? line : line.text;
  const rate = typeof line === "string" ? RATE : (line.rate ?? RATE);
  const voice = typeof line === "string" ? VOICE : (line.voice ?? VOICE);
  execFileSync(
    "python",
    [
      "-m",
      "edge_tts",
      "--voice",
      voice,
      `--rate=${rate}`,
      "--text",
      text,
      "--write-media",
      file,
    ],
    { stdio: "inherit" },
  );
  manifest[name] = { durationSec: probe(file) };
  console.log(`wrote vo/${name}.mp3 (${manifest[name].durationSec}s)`);
}
writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`wrote ${MANIFEST}`);
