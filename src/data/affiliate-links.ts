// Affiliate links registry — Phase 1
//
// NETWORK APPLICATION ORDER (by approval speed):
//   1. GetYourGuide Partner (fastest, typically 1-2 weeks) — apply at: partners.getyourguide.com
//   2. Viator/TripAdvisor — apply at: supplier.viator.com
//   3. Booking.com via Commission Junction (CJ) or Awin — NOT direct (Bookinggeddon May 2025 cut small affiliates)
//      CJ: https://www.cj.com — search for "Booking.com" program
//      Awin: https://www.awin.com — search for "Booking.com" program
//   4. OpenTable — apply at: opentable.com/partnerships
//   5. Travel insurance — apply at Squaremouth (AFFILIATE_ID TODO) or InsureMyTrip (highest margins: 15-35%)
//
// TIMING NOTE: Networks run a site-quality + traffic review; expect 4-8 week lag.
//   Submit applications AFTER Phase 1 content is live (Getting Around + 5+ pages).
//   Do NOT count affiliate revenue in Month 1-2.
//
// HOW TO ACTIVATE: When approval comes through:
//   1. Replace targetUrl with the real affiliate deep-link
//   2. Set active: true
//   3. Deploy — /go/[slug] will automatically serve the affiliate URL instead of fallback
//   No code change required beyond these two fields.
//
// PLACEHOLDER IDs in targetUrl are intentional — they prevent accidental live links.
// Search for "TODO_AFFILIATE_" to find all unset IDs.

export interface AffiliateLink {
  slug: string
  label: string
  network: string
  targetUrl: string
  fallbackUrl: string
  rel: string
  active: boolean
  notes?: string
}

export const affiliateLinks: AffiliateLink[] = [
  // ── Accommodation ────────────────────────────────────────────────────────────
  {
    slug: 'hotels-bermuda',
    label: 'Search Hotels in Bermuda',
    network: 'booking-cj-awin',
    // TODO_AFFILIATE_BOOKING: replace with your CJ or Awin deep-link after approval
    // Example CJ format: https://www.anrdoezrs.net/click-TODO_CJ_PID-TODO_AID/https%3A%2F%2Fwww.booking.com%2Fcountry%2Fbm.html
    targetUrl: 'TODO_AFFILIATE_BOOKING_CJ_OR_AWIN',
    fallbackUrl: 'https://www.booking.com/country/bm.html',
    rel: 'nofollow sponsored',
    active: false,
    notes: 'Apply via CJ or Awin — NOT the old Booking.com direct affiliate program (closed May 2025)',
  },
  {
    slug: 'hamilton-princess',
    label: 'Hamilton Princess & Beach Club — Book Now',
    network: 'booking-cj-awin',
    // TODO_AFFILIATE_BOOKING: replace with deep-link to Hamilton Princess property page
    targetUrl: 'TODO_AFFILIATE_BOOKING_CJ_OR_AWIN',
    fallbackUrl: 'https://www.booking.com/hotel/bm/the-hamilton-princess.html',
    rel: 'nofollow sponsored',
    active: false,
  },
  {
    slug: 'rosewood-tuckers-point',
    label: "Rosewood Tucker's Point — Book Now",
    network: 'booking-cj-awin',
    targetUrl: 'TODO_AFFILIATE_BOOKING_CJ_OR_AWIN',
    fallbackUrl: 'https://www.booking.com/hotel/bm/rosewood-tuckers-point.html',
    rel: 'nofollow sponsored',
    active: false,
  },
  {
    slug: 'the-reefs-resort',
    label: 'The Reefs Resort & Club — Book Now',
    network: 'booking-cj-awin',
    targetUrl: 'TODO_AFFILIATE_BOOKING_CJ_OR_AWIN',
    fallbackUrl: 'https://www.booking.com/hotel/bm/the-reefs.html',
    rel: 'nofollow sponsored',
    active: false,
  },
  {
    slug: 'elbow-beach-bermuda',
    label: 'Elbow Beach Bermuda — Book Now',
    network: 'booking-cj-awin',
    targetUrl: 'TODO_AFFILIATE_BOOKING_CJ_OR_AWIN',
    fallbackUrl: 'https://www.booking.com/hotel/bm/elbow-beach.html',
    rel: 'nofollow sponsored',
    active: false,
  },

  // ── Tours & Activities ────────────────────────────────────────────────────────
  {
    slug: 'gyg-bermuda-tours',
    label: 'Bermuda Tours & Activities on GetYourGuide',
    network: 'getyourguide',
    // TODO_AFFILIATE_GYG: replace with your GYG affiliate partner deep-link
    // Format: https://www.getyourguide.com/-l96/?partner_id=TODO_GYG_PID
    targetUrl: 'TODO_AFFILIATE_GYG_PARTNER_ID',
    fallbackUrl: 'https://www.getyourguide.com/-l96/',
    rel: 'nofollow sponsored',
    active: false,
    notes: 'GYG = fastest approval. Apply first at partners.getyourguide.com. 8% commission, 30-day cookie.',
  },
  {
    slug: 'viator-bermuda',
    label: 'Bermuda Activities on Viator',
    network: 'viator',
    // TODO_AFFILIATE_VIATOR: replace with your Viator affiliate deep-link
    // Format: https://www.viator.com/Bermuda/d4152-ttd?pid=TODO_VIATOR_PID&uid=TODO_UID&mcid=42383
    targetUrl: 'TODO_AFFILIATE_VIATOR_PID',
    fallbackUrl: 'https://www.viator.com/Bermuda/d4152-ttd',
    rel: 'nofollow sponsored',
    active: false,
    notes: '8% commission, 30-day cookie.',
  },
  {
    slug: 'gyg-bermuda-snorkel',
    label: 'Bermuda Snorkelling Tours on GetYourGuide',
    network: 'getyourguide',
    targetUrl: 'TODO_AFFILIATE_GYG_PARTNER_ID',
    fallbackUrl: 'https://www.getyourguide.com/bermuda-l96/snorkeling-tc34/',
    rel: 'nofollow sponsored',
    active: false,
  },
  {
    slug: 'gyg-bermuda-glass-bottom',
    label: 'Glass-Bottom Boat Tours — Bermuda',
    network: 'getyourguide',
    targetUrl: 'TODO_AFFILIATE_GYG_PARTNER_ID',
    fallbackUrl: 'https://www.getyourguide.com/bermuda-l96/glass-bottom-boat-tc213/',
    rel: 'nofollow sponsored',
    active: false,
  },

  // ── Transport — direct links (no affiliate) ──────────────────────────────────
  {
    slug: 'oleander-cycles',
    label: 'Rent a Scooter — Oleander Cycles',
    network: 'direct',
    targetUrl: 'https://www.oleandercycles.bm',
    fallbackUrl: 'https://www.oleandercycles.bm',
    rel: 'nofollow',
    active: true,
    notes: 'Direct link — Oleander Cycles is the main scooter rental operator. No affiliate needed.',
  },

  // ── Dining ───────────────────────────────────────────────────────────────────
  {
    slug: 'opentable-bermuda',
    label: 'Reserve a Table in Bermuda — OpenTable',
    network: 'opentable',
    // TODO_AFFILIATE_OPENTABLE: replace with your OpenTable affiliate link
    // OpenTable affiliate pays ~$1-2/confirmed reservation
    targetUrl: 'TODO_AFFILIATE_OPENTABLE_ID',
    fallbackUrl: 'https://www.opentable.com/bermuda-restaurant-reservations',
    rel: 'nofollow sponsored',
    active: false,
  },
  {
    slug: 'table-bm',
    label: 'Table.bm — Bermuda Restaurant Booking',
    network: 'direct',
    targetUrl: 'https://www.table.bm',
    fallbackUrl: 'https://www.table.bm',
    rel: 'nofollow',
    active: true,
    notes: 'Direct link — Table.bm is the local Bermuda restaurant booking platform.',
  },

  // ── Travel Insurance (high-margin: 15-35%) ──────────────────────────────────
  {
    slug: 'travel-insurance-bermuda',
    label: 'Travel Insurance for Bermuda',
    network: 'squaremouth',
    // TODO_AFFILIATE_TRAVELINS: apply at Squaremouth (squaremouth.com/affiliates) or InsureMyTrip
    // These pay 15-35% commission — among the highest-margin affiliate categories
    targetUrl: 'TODO_AFFILIATE_TRAVEL_INSURANCE',
    fallbackUrl: 'https://www.squaremouth.com',
    rel: 'nofollow sponsored',
    active: false,
    notes: 'High-margin affiliate. Apply at squaremouth.com/affiliates or insureMyTrip.com',
  },
]

/**
 * Get the resolved URL for an affiliate slug.
 * Returns the live affiliate URL if active and set, otherwise the fallback direct URL.
 */
export function getAffiliateUrl(slug: string): string | null {
  const link = affiliateLinks.find((l) => l.slug === slug)
  if (!link) return null
  return link.active && !link.targetUrl.startsWith('TODO_')
    ? link.targetUrl
    : link.fallbackUrl
}

export function getAffiliateLink(slug: string): AffiliateLink | null {
  return affiliateLinks.find((l) => l.slug === slug) ?? null
}
