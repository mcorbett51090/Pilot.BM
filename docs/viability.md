# Pilot.BM — Viability Assessment

**Verdict: MARGINAL**

Built on sound editorial instincts and genuine market gaps. Financial viability is not guaranteed — it depends on three load-bearing risks that must be resolved by the kill-gate (Month 4–6). Read this before building further.

---

## What "marginal" means

Marginal does not mean bad. It means the business can work, but only if specific conditions hold. The conditions are testable. This document names them so every subsequent builder can verify whether they're holding.

Positive signals:
- Real unmet need (no rental cars, Work From Bermuda closed without notice being spread, cost of living figures not reliably sourced)
- Small island, low content competition, high search intent
- Multiple revenue streams (directory, affiliate, tools)
- Founder credibility in the domain (financial/regulatory expertise)

Risk signals:
- Directory revenue requires in-person Bermuda relationships to close anchor/featured accounts
- Cost of living is extremely high → visitor traffic alone may not offset costs at early scale
- Solo operator running 3 income streams simultaneously

---

## The three load-bearing risks

### R1: Directory founder-fit / in-person sales kill-gate

**The risk:** The directory is the most defensible revenue line ($30–100/mo recurring from Standard/Featured/Anchor tier businesses). But closing those accounts — especially Anchor ($100/mo) — likely requires a phone call or a meeting. Remote sales of a local directory listing to Bermuda businesses is genuinely hard.

**The kill-gate (Month 4–6):** Can 3–5 paying Standard/Featured/Anchor accounts be closed by Month 6? If not, the directory revenue case does not hold and the model depends entirely on affiliate commissions — which take longer to ramp.

**Mitigation:** The directory is seeded with real, curated listings first. Businesses see themselves listed before being asked to pay for an upgrade. This reduces the cold-call problem. The Anchor tier ($100/mo) targets larger businesses (Fairmont, Oleander Cycles) who already have marketing budgets.

### R2: Owner-labor counted at $0 / opportunity cost reality

**The risk:** The financial projections below count the founder's time at $0. A financial analyst in the relevant sector (insurance/reinsurance/regulatory) earns $120k–250k+. Every hour on Pilot.BM has an opportunity cost.

**The kill-gate:** If this never reaches $1,500–2,000+/mo net revenue (the point where it justifies the time as a side project), it should be wound down cleanly. That target is achievable — see projections — but it requires the directory to convert.

**Mitigation:** The content is designed to compound (SEO builds over time; tools are built once). The hours per week requirement drops after Phase 1 is live. Phase 2 (Directus CMS + billing) further reduces maintenance overhead.

### R3: 3-job solo-owner burnout risk

**The risk:** Content creation + directory sales + tool development simultaneously, while maintaining a primary career. This is a high-context-switch load.

**The kill-gate:** If Phase 2 (billing + CMS) is not shipped within 6 months of Phase 1 launch, the project is likely stalled. Phase 2 is the revenue-enabling step — without automated billing, directory revenue stays manual and fragile.

**Mitigation:** Phase 1 is designed to be launchable in a weekend with one concentrated build session (this document is evidence it can be done). Phase 2 is scoped tightly to billing + CMS, not feature expansion.

---

## Financial projections

*Figures marked [unverified — synthesis estimate] where not derived from a primary source.*

| Month | Traffic (sessions) | Dir revenue | Affiliate | Tools/referral | Monthly total |
|---|---|---|---|---|---|
| 1 | 500–1,000 | $0 | $0 | $0 | $0 |
| 2 | 1,000–2,500 | $0 | $0 | $0 | $0 |
| 3 | 2,500–5,000 | $150 (5 Standard) | $50 | $0 | $200 |
| 4 | 5,000–8,000 | $400 | $150 | $0 | $550 |
| 6 | 8,000–15,000 | $800 | $400 | $50 | $1,250 |
| 12 | 20,000–40,000 | $2,000 | $1,000 | $200 | $3,200 |

Notes:
- Affiliate lag is real: GetYourGuide/Viator/Booking.com all have 4–8 week application review + attribution delay. Month 1–2 affiliate revenue is effectively zero.
- Directory projection assumes 10–15 paying listings at mix of Standard/Featured. Kill-gate is 3–5 by Month 6.
- Traffic projection for a niche destination guide with quality content is realistic for Month 6+ if launched with proper on-page SEO. [Unverified — based on comparable niche guide trajectories.]
- Costs: domain ($15/yr), hosting ($10–20/mo Vercel/Netlify), email ($10/mo), total ~$30/mo. Tiny.

---

## The billing security seam (Phase 2)

The directory claim form in Phase 1 collects name, email, and tier selection — no payment processing. This is intentional.

**Phase 2 billing requirement (FM-4):** Wire Stripe Checkout with HMAC-signed claim tokens and webhook-driven tier management. Specifically:
- Stripe Checkout session created server-side on claim submission
- Webhook listens for `checkout.session.completed` and `customer.subscription.*` events
- HMAC token in the claim URL verifies the claim is for the paying business
- Tier badge updated in Directus on successful payment, demoted on payment failure
- No manual tier management — the webhook is the source of truth

Until this is built, directory tier management is manual (email → update JSON manually → redeploy). Acceptable for Phase 1 with 0–10 listings. Not acceptable at 50+.

---

## Open items

### .bm domain eligibility

The `.bm` ccTLD is restricted. Registration requires a Bermuda connection — either a Bermuda-registered entity (company or personal presence) or a relationship with an authorised registrar (Bermuda domain registrar: Logic Communications).

**Current status:** The domain `pilot.bm` is the target. Whether it can be registered without a Bermuda entity is **[unverified — open item]**. The site should launch on `pilot.bm` if possible; fall back to `pilotbm.com` or similar if not. This must be resolved before any marketing.

**Sources to check:** Logic Communications (lc.bm), ICANN ccTLD policy for .bm.

### Directus CMS wiring (Phase 2)

Phase 1 uses Astro content collections + seeded JSON. This is the right choice for launch — no external dependency, no database, fast build.

Phase 2 upgrades the directory to Directus (self-hosted or cloud). The migration path:
1. Deploy Directus instance (Railway or Render, ~$10–20/mo)
2. Import JSON seed data via Directus API
3. Switch Astro to fetch from Directus API at build time (or use hybrid/SSR for real-time listings)
4. Add Directus admin UI for business claim review and tier management
5. Wire billing webhook to update Directus records

The content collection schema in `src/content/config.ts` was designed to match the future Directus schema. Migration should be straightforward.

---

## What Phase 0+1 built

- Content foundation: 20+ pages, real Bermuda content, no filler
- Getting Around guide + interactive React island
- 3 mover tools (Assessment Number, Compensation Calculator, Immigration Pathway Finder)
- Directory seeded with 15 verified listings across all audience segments
- Affiliate link infrastructure with clear activation seams
- Disclaimer framework on all regulated content
- `[unverified]` labelling on the 4 flagged claims
- E-E-A-T named-author About page
- Legal pages (Terms, Privacy, Disclaimer, Affiliate Disclosure)
- CI workflow for automated build verification

## What Phase 2 needs

- Stripe billing + HMAC claim tokens + webhook tier management (FM-4)
- Directus CMS for directory management
- Plausible Analytics integration
- Email digest / mailing list capture (residents section)
- Events calendar (residents section, genuine gap)
- Deeper visit content (Eat & Drink, Things to Do, Itineraries)
- Directory expansion beyond seed 15
- Social proof / testimonials as directory grows
