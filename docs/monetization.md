# Pilot.BM — Revenue Model & Monetization Integration Guide

**Last updated:** 2026-06-10  
**Status:** Phase 1 live; Phase 2 (paid directory billing) is the next milestone.

---

## Overview

Pilot.BM runs a **blended model** because no single stream can cover running + content costs alone.
Directory paid listings are the **load-bearing stream** — decoupled from traffic, active from day one of sales.

| Stream | Year 1 est. | Year 2 est. | Status |
|---|---|---|---|
| **Paid directory listings** | $2.4k–4.8k | $8k–12k | **Phase 2 (code done, Stripe TODO)** |
| Travel affiliates (hotel+tours) | $1.2k–1.5k | $3.5k–5k | **Placeholder IDs in affiliate-links.ts** |
| Display ads | $480–900 | $4k–6.3k | Phase 3 (after 25k PV/mo) |
| Concierge tier | $0 | $0–2k | Phase 3+ upside only |
| **Total (base)** | **$4k–7.5k** | **$16k–26k** | |

Costs: ~$2,500/yr infra. Break-even requires owner-written content (counted at $0 cash).

---

## 1. Directory Paid Listings (Load-bearing)

### Tier structure

| Tier | Price | What's included |
|---|---|---|
| **Free** | $0/mo | Name + category + parish. The upsell hook. |
| **Standard** | $30/mo | Full profile (description, photos, hours, phone, URL), dofollow link |
| **Featured** | $50/mo | Standard + top-of-category placement + "Pilot.BM Partner" badge + deals field |
| **Anchor** | $100/mo | Featured + homepage spotlight eligibility + category sponsorship + editorial placement |

### Stripe integration (TODO — Phase 2)

The claim flow at `/directory/claim` shows tier pricing and has Stripe CTAs clearly marked `[TODO]`.

When you're ready to wire payments:

1. **Create a Stripe account** at stripe.com
2. **Create products and prices** in Stripe dashboard:
   - Product: "Standard Listing" → Price: $30/month recurring
   - Product: "Featured Listing" → Price: $50/month recurring
   - Product: "Anchor Listing" → Price: $100/month recurring
3. **Replace the TODO buttons** in `/src/pages/directory/claim.astro` with Stripe Payment Links or a Checkout session (use Stripe's hosted payment page — no backend needed for MVP)
4. **Wire the webhook** (Phase 2): When a subscription is created/updated/cancelled, flip `listing.tier` and `listing.status` in your database
5. **Reconciliation job**: Run nightly to catch missed webhooks and sync Stripe subscription status to listing status

### Phase 2 hardening (before go-live)

Per the build plan:
- HMAC-signed, time-limited claim tokens (not bare UUIDs) — anti-claim-fraud
- Manual review of first 20 claims
- Handle all Stripe webhook events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`
- Nightly Stripe→database reconciliation job

---

## 2. Affiliate Links

All affiliate links live in `/src/data/affiliate-links.ts`. The `/go/[slug]` route serves them.

### How to activate

When an affiliate network approves your application:
1. Open `/src/data/affiliate-links.ts`
2. Find the link by `slug`
3. Replace `targetUrl` with the real affiliate deep-link
4. Set `active: true`
5. Deploy — the `/go/` redirect updates automatically

### Application order (by approval speed)

1. **GetYourGuide** (1–2 weeks) — partners.getyourguide.com. Apply first; fastest approval.
2. **Viator** (2–4 weeks) — supplier.viator.com
3. **Booking.com via CJ or Awin** (4–8 weeks) — NOT the old direct programme (closed May 2025). Apply through Commission Junction (cj.com) or Awin (awin.com), search "Booking.com" programme.
4. **OpenTable** — opentable.com/partnerships
5. **Travel insurance** (high-margin: 15–35%) — squaremouth.com/affiliates or insureMyTrip.com

### Timing note

Networks run a site-quality + traffic review. **Submit applications after Phase 1 content is live** (Getting Around + 5+ pages). Do NOT count affiliate revenue in Months 1–2.

Use `/go/:slug` with `fallbackUrl` (direct, non-affiliate link) until approval clears. Zero revenue impact — the visitor still reaches the destination.

### Affiliate disclosure

An affiliate disclosure is live at `/legal/affiliate-disclosure`. Every page with affiliate links includes the footer disclosure ("some links are affiliate links — we may earn a commission at no cost to you"). This is FTC-compliant.

All affiliate links use `rel="nofollow sponsored"` per Google's guidelines and the plan's HCU defence.

---

## 3. Display Ads (Phase 3 only)

**Do not run display ads before 25k sessions/month.** Below that threshold, ads earn less than hosting costs and hurt the "high-end" brand.

When traffic reaches 25k sessions/month:
- Apply to **Mediavine Journey** (25k sessions/mo minimum) or **Raptive** (100k PV/mo)
- Place ads on **Visitor pages only** — keep Movers and Residents sections ad-free
- Never add ads to tool pages (Assessment Number, Compensation Calculator, Pathway Finder) — these are the trust-building moat

---

## 4. Concierge Tier (Year 2 upside)

The **Concierge Relocation Pack ($250–500)** is a Stripe Payment Link on `/move` — available as a Phase 2/3 addition. Not included in Year 1 projections.

Corporate Concierge Bermuda has a 15-year head start; the sales cycle is 12–24 months. Do not build business-case scenarios that depend on concierge revenue until at least 12 months of Mover traffic data is available.

---

## 5. The directory sales motion (R1 kill-gate)

The load-bearing revenue stream requires **active in-person sales to local Bermuda businesses**. The directory does not sell itself.

**The R1 kill-gate (from the build plan):** Before Phase 2 billing engineering, attempt to close **3 paid listings in person** as a validation experiment. If you can't close 3, the economics revert to "ads can't pay for it in Year 1" — surface that decision explicitly rather than building the billing infrastructure for a stream that hasn't been validated.

**View/click analytics** (monthly report per listing) is the **renewal proof** — what you show a business to justify month 2, 3, 4. Build the reporting before the first renewal conversation.

---

## 6. Analytics setup (required for both revenue streams)

Both the affiliate click-tracking and the directory renewal proof depend on analytics being live.

**Recommended: Plausible** ($9/mo) or **Cloudflare Web Analytics** (free) — both privacy-first, no cookie consent banner needed (GDPR-light).

The analytics seam is already in `/src/layouts/Base.astro` as a comment block. To activate:
1. Sign up for Plausible or enable Cloudflare Web Analytics
2. Get your script tag / token
3. Uncomment and update the block in `Base.astro`
4. Also add **Google Search Console** (free, non-negotiable) — it's the traffic proof the directory sales pitch needs

---

## 7. The chicken-and-egg sequence

1. **Seed directory** with 50–100 free listings (done in Phase 1) — no payment asked yet
2. **Cold outreach**: "We've listed you free on Pilot.BM — claim and update your details" — foot-in-door
3. **Affiliates**: submit applications during Phase 1 with content live; use fallback links until approved
4. **Paid listings**: Phase 2 — once 3 listings are closed in person (R1 kill-gate)
5. **Ads**: Phase 3 — after 25k sessions/mo

---

*Revenue figures from research-synthesis.md. All projections are estimates; actual results depend on traffic growth and directory sales success.*
