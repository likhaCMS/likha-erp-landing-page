# Likha ERP — Remotion Video

Branded promo video project for [LikhaERP.com](https://likhaerp.com), scaffolded with Remotion 4 (`create-video --blank`).

## Composition

`LikhaPromo-{16x9,1x1,9x16}` — ~27s @ 30fps, registered in three aspect
ratios (YouTube/web, FB/IG feed, Reels/TikTok/Shorts). Layout is
aspect-aware: copy + UI sit side-by-side on 16:9, stacked and zoomed on
1:1 and 9:16 (`layoutFor` in `src/brand.ts`).

1. **Intro** — logo reveal + "Power. Simplicity. Control." tagline
2. **4 component scenes** — each pairs its pitch with an *animated rebuild
   of the real product UX* (module rail, dark canvas, brand accent), not a
   static screenshot:
   - 01 Forms & Records (teal) — field rows stacking in + "Create Field"
   - 02 Roles & Permissions (cyan) — app-access toggle + permissions matrix
   - 03 Automation & Flows (yellow) — trigger → condition → email nodes connecting
   - 04 Dashboard Panels (magenta) — insight tiles dropping onto the grid
3. **Outro** — wordmark + LikhaERP.com CTA (two-tone "ERP.com")

UI mockups in `src/components/ui/` replicate the app's actual layout and
interactions (verified against the product source). Copy lives in
`src/brand.ts`; brand colors + Inter Tight font per the landing page.

## Commands

```bash
npm run dev          # Remotion Studio (preview)
npx remotion render LikhaPromo out/likha-promo.mp4   # render MP4
npm run render:all   # batch render all comps → out/
npm run gen:vo       # voiceover MP3s via edge-tts → public/vo/
npm run gen:sfx      # procedural SFX + music bed → public/sfx/, public/music/
npm run lint         # eslint + typecheck
```

Note: if port 3000 is already in use, pass a port explicitly, e.g.
`npm run dev -- --port=3400` or `npx remotion render --port=3400`.

## Audio / voiceover

Scene-synced voiceover (edge-tts `en-US-AndrewNeural`, same as the
DinkMatch ads) + procedural SFX/music bed (whoosh on each scene cut,
chime at the CTA, ducked loop underneath) — the same audio pipeline as
the DinkMatch ad studio.
SFX/music bed — pipeline ported from the DoublesQueueMaster ad studio.
Setup and voice options: [docs/VOICE.md](docs/VOICE.md).

## Agent skills

Remotion agent skills live in `.agents/skills/` (sourced from
`remotion-dev/skills`, hashes tracked in `skills-lock.json`). To update:
re-copy from a newer source or re-pull the upstream skills repo.

## Ad strategy

How these ads are designed to win against foreign ERPs (positioning,
audience, hooks, guardrails — incl. the no-Directus whitelabel rule):
[docs/STRATEGY.md](docs/STRATEGY.md).

## Assets

`public/` contains copies of the logo and product screenshots from the
site. Update them here if the site assets change.
