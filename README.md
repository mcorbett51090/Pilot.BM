# Pilot.BM

Bermuda, honestly. The independent guide for discerning visitors, people making the move, and those who call it home.

---

## What this is

Pilot.BM fills the gap between tourism-board brochures and budget-backpacker blogs. It answers the questions every Bermuda guide skips: how do you actually get around without a rental car? What salary do you need to live here? What's the one-car-per-household rule?

---

## Stack

- **Astro 5** — static-first, content collections, minimal islands
- **React 18** — client islands only (Getting Around tool, Compensation Calculator, Pathway Finder)
- **TypeScript** throughout
- **Astro Content Collections** — directory listings (JSON), articles (MDX-ready)
- **CSS custom properties** — design system in `src/styles/global.css`, no CSS framework

No database in Phase 1. No CMS in Phase 1. Pure static + Astro.

---

## Dev setup

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview  # preview the built site
```

---

## Phase status

### Phase 0 + Phase 1 (this build) — complete

- Content foundation: home, visit, move, live, directory, about, legal
- Getting Around guide + interactive transport finder (React island)
- Mover tools: Assessment Number explainer, Compensation Calculator (beta), Immigration Pathway Finder
- Directory seeded with 15 Bermuda businesses across all audience segments
- Affiliate link infrastructure with `/go/[slug]` redirect pages
- Disclaimer framework on all `/move/*` pages (non-negotiable)
- `[unverified]` labels on 4 flagged claims (payroll tax rate, business count, mover volume, .bm domain)
- E-E-A-T About page (named author, editorial policy, contact)
- Legal pages (Terms, Privacy, Disclaimer, Affiliate Disclosure)
- CI workflow (`.github/workflows/ci.yml`)

### Phase 2 (pending)

- Stripe billing + HMAC-signed claim tokens + webhook tier management
- Directus CMS for directory management (migration path defined in `docs/viability.md`)
- Plausible Analytics integration
- Events calendar (residents section)
- Deeper visit content (Eat & Drink, Things to Do, Itineraries)

---

## Open items

### `.bm` domain eligibility — UNRESOLVED

The `.bm` ccTLD is restricted. Registration may require a Bermuda-registered entity.
**Verify with Logic Communications (lc.bm) before launch marketing.**
Fallback: `pilotbm.com` or similar.

### Directus CMS wiring — Phase 2

Phase 1 uses JSON content collections. Phase 2 migrates to Directus.
Migration path documented in `docs/viability.md`.

### Stripe billing — Phase 2

Directory claim form collects name/email/tier but has no payment processing.
Phase 2 wires Stripe Checkout + webhook tier management.
Seam is marked with `// TODO: Wire Stripe Checkout` in `src/pages/directory/claim.astro`.

---

## Honest viability

See `docs/viability.md` for the full viability assessment. Verdict: **MARGINAL** — viable if the directory sales kill-gate (3–5 paying accounts by Month 6) is met. Read it before building further.

---

## Content notes

- Every `/move/*` page includes a `<Disclaimer>` component above the fold — non-negotiable
- The Work From Bermuda digital-nomad programme closed 28 February 2025 — do not present as available
- Tourists cannot rent cars in Bermuda — the Getting Around guide leads with this
- Mandatory health insurance: SHB $400.31/adult/month (Bermuda Health Council, verified 2026-06-10)
- Payroll tax rate in Compensation Calculator is `[unverified]` — settling step noted in the tool

