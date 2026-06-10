// Affiliate links registry — Phase 1
// TODO: Wire real affiliate IDs after Phase 1 content is live.
// Apply to networks in this order: GetYourGuide (fastest), Viator, Booking.com via CJ/Awin.
// Do NOT count affiliate revenue in Month 1–2 (networks have 4–8 week review lag).
//
// The /go/[slug] route serves fallbackUrl until active: true + real targetUrl is set.
// Switching from fallback → live affiliate: set active: true and replace targetUrl.
// Five-minute fix per link — no redeploy if using a redirect table (Phase 2 upgrade path).

export interface AffiliateLink {
  slug: string
  label: string
  network: string
  targetUrl: string // TODO: replace with real affiliate URL after approval
  fallbackUrl: string // direct URL — used until affiliate approved
  rel: string // always "nofollow sponsored"
  active: boolean
}

export const affiliateLinks: AffiliateLink[] = [
  // Accommodation
  {
    slug: 'hotels-bermuda',
    label: 'Search Hotels in Bermuda',
    network: 'booking-cj-awin',
    targetUrl: 'TODO_AFFILIATE_URL',
    fallbackUrl: 'https://www.booking.com/country/bm.html',
    rel: 'nofollow sponsored',
    active: false,
  },
  // Tours
  {
    slug: 'gyg-bermuda-tours',
    label: 'Bermuda Tours on GetYourGuide',
    network: 'getyourguide',
    targetUrl: 'TODO_AFFILIATE_URL',
    fallbackUrl: 'https://www.getyourguide.com/-l96/',
    rel: 'nofollow sponsored',
    active: false,
  },
  {
    slug: 'viator-bermuda',
    label: 'Bermuda Activities on Viator',
    network: 'viator',
    targetUrl: 'TODO_AFFILIATE_URL',
    fallbackUrl: 'https://www.viator.com/Bermuda/d4152-ttd',
    rel: 'nofollow sponsored',
    active: false,
  },
  // Transport — direct link (no affiliate needed)
  {
    slug: 'oleander-cycles',
    label: 'Rent a Scooter — Oleander Cycles',
    network: 'direct',
    targetUrl: 'https://www.oleandercycles.bm',
    fallbackUrl: 'https://www.oleandercycles.bm',
    rel: 'nofollow',
    active: true,
  },
  // Dining
  {
    slug: 'opentable-bermuda',
    label: 'Reserve a Table — OpenTable',
    network: 'opentable',
    targetUrl: 'TODO_AFFILIATE_URL',
    fallbackUrl: 'https://www.opentable.com/bermuda-restaurant-reservations',
    rel: 'nofollow sponsored',
    active: false,
  },
]

/**
 * Get affiliate link by slug.
 * Returns the active targetUrl, or fallbackUrl if not yet approved.
 */
export function getAffiliateUrl(slug: string): string | null {
  const link = affiliateLinks.find((l) => l.slug === slug)
  if (!link) return null
  return link.active && link.targetUrl !== 'TODO_AFFILIATE_URL'
    ? link.targetUrl
    : link.fallbackUrl
}

export function getAffiliateLink(slug: string): AffiliateLink | null {
  return affiliateLinks.find((l) => l.slug === slug) ?? null
}
