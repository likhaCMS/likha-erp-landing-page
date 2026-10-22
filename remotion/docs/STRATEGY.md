# Likha ERP Ads — How We Win

## The win thesis

We do **not** out-feature foreign ERPs. We **out-relate** them.

SAP/Oracle-style ERPs sell to enterprises: long sales cycles, per-user
licensing, 6–12 month implementations, consultant-dependent configuration.
Likha ERP is built for Philippine SMEs — and the ads must feel like they were
made *by* people who understand running a business here, not translated from
a US B2B playbook.

**Positioning (already on the site):** "The Philippine alternative to
complex, foreign ERPs."

## Guardrails

- **Never mention Directus.** Likha ERP is whitelabel — it is the product.
  No "powered by", no platform credits, no architecture name-dropping in
  ads. (Internally: features are inherited from the platform; externally:
  they are simply Likha ERP features.)
- **Never name competitors.** "Complex, foreign ERPs" is the category
  framing the site already uses — it positions without giving anyone free
  airtime or inviting legal complaints.
- **Only claims on the site:** zero per-user fees, no-code configuration,
  VAPT-certified security, hybrid SaaS (start on Likha Cloud, move
  in-house anytime), co-build option with Systems Experts.

## The audience (who we must relate to)

Philippine SME owners, CEOs, and operations managers. Their lived reality:

- Approvals happen in a **Viber/GC thread**, not a workflow
- Month-end means **Excel gymnastics** before they can see how the
  business did
- They got a foreign ERP quote once — the **per-user fees alone** killed it
- Software vendors want to "digital transform" them; they just want payroll,
  inventory, and approvals to stop being manual
- They've been burned by tools that needed a developer for every change

## Ad structure that wins

Every ad: **Hook → Pain → Proof → Payoff → CTA** in ~15–20s.

1. **Hook (first 1.5s)** — name their pain, in their words. No logo first;
   nobody stops scrolling for a logo.
2. **Pain** — one specific, relatable moment (see hooks below).
3. **Proof** — show the *actual product UX*: the scenes in
   `src/components/ui/` are animated rebuilds of the real app (data-model
   field rows, RBAC matrix, flows canvas, insights grid) — not stock
   footage or mockups that diverge from the product. Real screens beat
   promises.
4. **Payoff** — tie to one of the 4 building blocks:
   | # | Component | The win |
   |---|-----------|---------|
   | 01 | Forms & Records | no-code, deploy to frontline instantly |
   | 02 | Roles & Permissions | whole workforce, zero per-user fees |
   | 03 | Automation & Flows | SOPs run themselves — alerts, approvals |
   | 04 | Dashboard Panels | real-time numbers, no month-end wait |
5. **CTA** — `LikhaERP.com` / book a free co-build session.

## Relatable hooks (script bank)

- "Your approval process is a Viber group chat."
- "Adding one more employee to your ERP costs how much per month?"
- "It's the 30th. Where's your report?" *(Dashboard Panels)*
- "You paid for the ERP. Then paid again for someone to set it up."
- "Your inventory count lives in one person's head."
- "Foreign ERP: enterprise power. Also enterprise price, enterprise
  consultants, enterprise waiting time."

## Voice & tone

- **Voice:** baseline is `en-US-AndrewNeural` (same voice as the DinkMatch
  ads). `en-PH` voices are the drop-in alternative if a Filipino-accented
  read tests more relatable with this audience — and a real phone-recorded
  read (Taglish is fine and often better) beats any TTS. See
  [VOICE.md](VOICE.md).
- **Copy:** plain language, pesos not dollars, "team/kaso/gawa" energy —
  confident, never corporate.
- **Sound-off first** — design every ad to land with captions alone (most
  social is muted); audio is a bonus layer, not a dependency.

## Formats

Ships in all three placements, mirroring the DoublesQueueMaster pattern:
**`LikhaPromo-9x16`** (Reels/TikTok/Shorts), **`LikhaPromo-1x1`** (FB/IG
feed), **`LikhaPromo-16x9`** (YouTube/web). `layoutFor()` in
`src/brand.ts` drives per-aspect direction, padding, type scale, and UI
zoom. Same VO/music across all three — the audio bed is aspect-agnostic.
