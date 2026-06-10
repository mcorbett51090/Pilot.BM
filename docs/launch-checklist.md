# Pilot.BM — Launch Checklist

**Status:** Phase 1 MVP built. Working toward launch-ready.

Mark each item ✅ before going live. Items marked [OWNER] require action from the site owner.

---

## Domain & Hosting

- [ ] **[OWNER] `.bm` domain eligibility** — The `.bm` ccTLD is restricted; registering typically requires a Bermuda-registered business entity (a sole proprietorship or limited company registered with the Bermuda Registrar of Companies). Contact the `.bm` registry at **bm-registry.bm** to confirm eligibility and current requirements.  
  _Fallback decision [verify-at-use]:_ If `.bm` is not available/feasible for a US-based individual without a Bermuda entity, the recommended fallbacks are:
  - `pilotbermuda.com` — clean, descriptive
  - `pilot-bm.com` — mirrors the repo name
  - `bermudaguide.com` — if available
  
  **Decide before starting any design/branding work.** The brand is currently built around "Pilot.BM" — if `.bm` is unavailable, update the brand before investing further in design assets.

- [ ] **[OWNER] Deploy to Cloudflare Pages** — Connect the GitHub repo to Cloudflare Pages. Static site, free tier is sufficient for Phase 1.
  - Build command: `npm run build`
  - Output directory: `dist`

- [ ] **[OWNER] Custom domain configured** — Point DNS to Cloudflare Pages. SSL auto-provisioned.

- [ ] **[OWNER] Google Search Console** — Verify ownership (HTML file or DNS record). Submit sitemap at `/sitemap.xml`. Non-negotiable — this is the traffic proof needed for the directory sales pitch.

- [ ] **[OWNER] Bing Webmaster Tools** — Also submit sitemap. Often overlooked but worth doing.

---

## Analytics

- [ ] **[OWNER] Choose and wire analytics** — Plausible ($9/mo, privacy-first, no consent banner) or Cloudflare Web Analytics (free). The seam is already in `src/layouts/Base.astro` — uncomment and fill in your script/token. Wire this on Day 1 of live traffic.

---

## Content review

- [ ] **All `/move/*` pages reviewed** — Every Mover page must show the `<Disclaimer/>` component above the fold and carry a "Verify at gov.bm" link. Run a crawler or manual review before launch.
- [ ] **Tool figures verified** — Compensation calculator uses ~10% payroll tax rate `[unverified]`. Read the Bermuda payroll tax schedule at gov.bm before the tool goes out of beta. Update `src/pages/move/tools/compensation.astro` with verified rate and remove the beta banner.
- [ ] **SHB rate current** — Currently $400.31/adult/month (verified 2026-06-10). Bermuda Health Council updates this rate periodically. Check bhec.bm before launch and set a 90-day calendar reminder.
- [ ] **WFB closure notice current** — Work From Bermuda digital-nomad programme closed 28 Feb 2025. Confirmed closed. Verify status has not changed at gov.bm before launch.
- [ ] **Car duty rates verified** — 75% on first $10k assessed value, 150% above — check at Bermuda Customs & Excise (gov.bm) before launch.
- [ ] **School fees verified** — Figures are estimates. Contact schools directly before launch; add "fees approximate — verify with school" notice (already included in schools page).

---

## Legal pages

- [ ] **Legal pages reviewed** — Read `/legal/terms`, `/legal/privacy`, `/legal/disclaimer`, `/legal/affiliate-disclosure` before launch. They are template-quality; have a lawyer review if you're adding Stripe billing.
- [ ] **Affiliate disclosure visible** — Footer on every page already includes the disclosure sentence. The full page is at `/legal/affiliate-disclosure`. Confirm it accurately describes all active affiliate relationships before wiring any live affiliate links.
- [ ] **Privacy policy covers analytics** — If using Google Analytics (not recommended), you need a cookie consent banner. Plausible and Cloudflare Web Analytics are cookieless — no banner needed. Update the privacy policy to name your specific analytics provider once chosen.

---

## Affiliate links

- [ ] **[OWNER] Apply to affiliate networks** — In this order:
  1. GetYourGuide (fastest, 1–2 weeks) — partners.getyourguide.com
  2. Viator — supplier.viator.com
  3. Booking.com via CJ or Awin (NOT direct — Bookinggeddon May 2025)
  4. OpenTable — opentable.com/partnerships
  5. Travel insurance — squaremouth.com/affiliates
  
  **Timing:** Apply after Phase 1 content is live (Getting Around + at least 5 pages). Networks reject pre-content sites.

- [ ] **Fallback links tested** — All `/go/:slug` routes should resolve to their `fallbackUrl` while affiliates are pending. Test each one before launch.

---

## Directory

- [ ] **[OWNER] Seed outreach** — The directory currently has ~25 seed listings. Target 50–100 for launch. Add listings manually from BermudaYP, Google Maps, gov.bm business registry. Focus on: accommodation, restaurants, transport, insurance, relocation, schools, real estate.
- [ ] **[OWNER] Start sales experiment (R1 kill-gate)** — Attempt to close 3 paid directory listings in person DURING the build (before Phase 2 billing). This is the load-bearing validation. If you can't close 3 before billing goes live, that's a signal — surface it explicitly. See `docs/monetization.md` section 5.
- [ ] **Claim flow tested** — Visit `/directory/claim`, confirm the tier pricing table renders, the claim form displays, and the Stripe TODO notes are clearly visible and don't accidentally send anything.

---

## Stripe / Payments (Phase 2 prerequisite)

- [ ] **[OWNER] Stripe account created** — stripe.com. Use Stripe's hosted Checkout (no backend needed for MVP billing).
- [ ] **[OWNER] Products and prices created** in Stripe dashboard — Standard $30/mo, Featured $50/mo, Anchor $100/mo recurring.
- [ ] **[OWNER] Payment Links generated** and wired into `/directory/claim.astro` — replace the `[TODO: Wire Stripe Checkout]` notes.
- [ ] **Webhook endpoint created** — Phase 2. Required before accepting live payments. Handle `checkout.session.completed`, `customer.subscription.updated/deleted`, `invoice.payment_failed`.
- [ ] **Nightly reconciliation job** — Phase 2, before go-live of billing. Catches missed webhooks.

---

## SEO & performance

- [ ] **Sitemap verified** — Visit `/sitemap.xml` on the deployed site. Confirm new pages (visit/do, visit/eat, visit/stay, visit/itineraries, move/healthcare, move/schools, move/banking, live/events, live/deals) are included. If any are missing, update `src/pages/sitemap.xml.ts`.
- [ ] **robots.txt verified** — Visit `/robots.txt`. Confirm it allows crawlers on all public pages and disallows nothing important.
- [ ] **Lighthouse ≥85 perf/SEO** — Run Lighthouse on the homepage and the Getting Around page from the deployed URL. Core Web Vitals matter for Google HCU ranking.
- [ ] **Mobile layout tested** — Test on a real mobile device or BrowserStack. Key pages: homepage, Getting Around tool, Compensation Calculator, Directory.
- [ ] **All meta/OG tags correct** — Every page has `title` and `description` in the Base.astro props. Check there are no generic "Pilot.BM" titles without page-specific descriptions.

---

## Photography & design

- [ ] **[OWNER] Hero images** — The current design does not require photography (hero is text-only on the ocean gradient). When photography is ready, the recommended approach is a rights-cleared on-island Bermuda photo shoot (budget $500–1,500 for 30–50 images). Until then, Wikimedia Commons CC images (attributed) are the acceptable placeholder — NOT Unsplash (licensing issues for commercial use).
- [ ] **[OWNER] Apply for BTA Approved Partner status** — The Bermuda Tourism Authority has an approved-partner programme that unlocks licensed imagery and adds legitimacy to the directory sales pitch. Apply at gotobermuda.com (partner section).

---

## Post-launch (Month 1)

- [ ] Analytics data reviewed — confirm sessions are being tracked
- [ ] Google Search Console first impressions data checked
- [ ] Directory view/click counts reviewed for each listing
- [ ] First affiliate application follow-up (check approval status after 2 weeks)
- [ ] First in-person directory sales conversation scheduled

---

## Known unresolved items (mark resolved before launch)

| Item | Status | Notes |
|---|---|---|
| `.bm` domain eligibility | [OWNER TO VERIFY] | Contact bm-registry.bm; `.com` fallback is fine |
| Annual mover-inflow volume | [unverified] | Pull from Bermuda Dept of Immigration; blocks projection accuracy, not the build |
| Consumer-facing business count | [unverified] | Manual count from BermudaYP; affects directory ARR model |
| Payroll tax rate (comp calculator) | [unverified] | Read gov.bm payroll tax schedule; currently assumed ~10% |
| School fees (precise) | [unverified] | Contact each school; current figures are estimates |
