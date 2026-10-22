/**
 * Renders compositions to MP4.
 *   node scripts/render-all.mjs                — all registered comps → ./out/
 *   node scripts/render-all.mjs 9x16           — only matching ids
 *   node scripts/render-all.mjs all ../docs/ads   — custom output dir
 *     (e.g. the site's docs/ads/ so videos ship with the landing page)
 */
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const COMPS = ["LikhaPromo-16x9", "LikhaPromo-1x1", "LikhaPromo-9x16"];

const filter = process.argv[2];
const outDir = process.argv[3] ?? "out";
const ids = COMPS.filter(
  (id) => !filter || filter === "all" || id.includes(filter),
);

mkdirSync(outDir, { recursive: true });
for (const id of ids) {
  console.log(`\n=== rendering ${id} ===`);
  execFileSync(
    "npx",
    ["remotion", "render", id, join(outDir, `${id}.mp4`), "--port=3500"],
    {
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );
}
console.log(`\nDone — ${ids.length} video(s) in ${outDir}`);
