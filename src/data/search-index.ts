// ============================================================
// Pilot.BM — Site search index
// ------------------------------------------------------------
// A curated, hand-maintained index of every searchable page.
// Small page count (~30) means a curated index gives better,
// more deliberate results than crawling — and it lets us add
// rich `keywords` so a search for "scooter" finds Getting Around,
// "pink sand" finds Beaches, "SHB" finds Healthcare, etc.
//
// `url` is the path WITHOUT the base prefix (e.g. '/visit/beaches').
// The base ('/Pilot.BM/' on Pages, '/' on the root domain) is
// applied at render time via import.meta.env.BASE_URL, so this
// file does not need touching during the custom-domain migration.
//
// When you add a page, add an entry here.
// ============================================================

export interface SearchEntry {
  title: string
  description: string
  /** Path without the base prefix, no leading 'Pilot.BM'. e.g. '/move/banking' */
  url: string
  /** Top-level grouping shown as a chip on the result. */
  section: 'Visit' | 'Move' | 'Live' | 'Directory' | 'Tools' | 'Reference' | 'Legal'
  /** Extra search terms (synonyms, abbreviations, place names). Space-separated. */
  keywords: string
}

export const searchIndex: SearchEntry[] = [
  // ---- Top level ----
  {
    title: 'Home',
    description: 'Bermuda, honestly — the independent guide for visitors, movers, and residents.',
    url: '/',
    section: 'Reference',
    keywords: 'pilot bermuda home start guide honest',
  },
  {
    title: 'Bermuda by the Numbers',
    description:
      'The island in statistics: visitor arrivals, tourism spend, population, the expat workforce, density, and land area — every figure sourced.',
    url: '/bermuda-by-the-numbers',
    section: 'Reference',
    keywords:
      'statistics stats data visitors tourism arrivals population expat expatriate work permits density facts figures numbers economy demographics',
  },
  {
    title: 'About Pilot.BM',
    description: 'Who built Pilot.BM, how we research, and the editorial standard we hold.',
    url: '/about',
    section: 'Reference',
    keywords: 'about author matt corbett editorial standard contact who we are',
  },

  // ---- Visit ----
  {
    title: 'Visiting Bermuda',
    description: 'Plan a Bermuda trip: getting around, beaches, eating, where to stay, and what to do.',
    url: '/visit',
    section: 'Visit',
    keywords: 'visit trip holiday vacation tourist travel plan',
  },
  {
    title: 'Getting Around Bermuda',
    description:
      'Tourists cannot rent cars in Bermuda. Scooters, electric minicars, buses, ferries, and taxis — with an interactive transport finder.',
    url: '/visit/getting-around',
    section: 'Visit',
    keywords:
      'transport scooter moped cycle bus ferry taxi rental car twizy minicar no rental cars how to get around drive left',
  },
  {
    title: 'Best Time to Visit & Climate',
    description:
      'Month-by-month temperatures and sea conditions, the seasons explained, hurricane season, and honest advice on when to go.',
    url: '/visit/best-time-to-visit',
    section: 'Visit',
    keywords:
      'climate weather temperature season seasons best time when to go hurricane rain rainfall sea water temperature winter summer spring fall shoulder off-season peak swimming month by month',
  },
  {
    title: 'Bermuda Beaches',
    description: 'Five beaches worth your time — Horseshoe Bay pink sand, locals’ favourites, and quiet coves.',
    url: '/visit/beaches',
    section: 'Visit',
    keywords: 'beach beaches pink sand horseshoe bay snorkel swimming coves south shore',
  },
  {
    title: 'Where to Eat in Bermuda',
    description: 'Fish chowder, wahoo, the Bermuda fish sandwich, Dark ’n’ Stormy — splurge to best-value.',
    url: '/visit/eat',
    section: 'Visit',
    keywords: 'eat food restaurant dining fish chowder sandwich rum dark and stormy drink cuisine',
  },
  {
    title: 'Where to Stay in Bermuda',
    description: 'Luxury, upscale, and mid-range accommodation with honest advice on location.',
    url: '/visit/stay',
    section: 'Visit',
    keywords: 'stay hotel hotels resort accommodation lodging where to stay booking',
  },
  {
    title: 'Things to Do in Bermuda',
    description: 'St. George’s, helmet diving, glass-bottom boats, Cup Match, the Railway Trail, snorkelling, and more.',
    url: '/visit/do',
    section: 'Visit',
    keywords:
      'things to do activities attractions snorkel diving golf st georges railway trail crystal caves dockyard cup match sightseeing',
  },
  {
    title: 'Bermuda Itineraries: 3, 5 & 7 Days',
    description: 'Opinionated day-by-day plans for trips of 3, 5, and 7 days.',
    url: '/visit/itineraries',
    section: 'Visit',
    keywords: 'itinerary itineraries plan days schedule what to do week trip plan',
  },

  // ---- Move ----
  {
    title: 'Moving to Bermuda',
    description: 'The honest guide: work permits, cost of living, immigration pathways, and what salary you actually need.',
    url: '/move',
    section: 'Move',
    keywords: 'move moving relocate relocation expat emigrate live work permit immigration',
  },
  {
    title: 'Work Permits',
    description: 'How employer sponsorship works, what the employer must do, EIRC for investors, fees and timelines.',
    url: '/move/work-permit',
    section: 'Move',
    keywords: 'work permit visa immigration employer sponsorship eirc job offer guest worker',
  },
  {
    title: 'Cost of Living in Bermuda',
    description: 'Real figures: rent, groceries, health insurance, school fees, and car import duty — with sources.',
    url: '/move/cost-of-living',
    section: 'Move',
    keywords: 'cost of living expensive rent groceries prices salary budget how much money expensive',
  },
  {
    title: 'Healthcare in Bermuda',
    description: 'The mandatory Standard Health Benefit (SHB), what it covers, and how employer plans top it up.',
    url: '/move/healthcare',
    section: 'Move',
    keywords: 'healthcare health insurance shb standard health benefit hospital kemh doctor medical mandatory',
  },
  {
    title: 'Schools in Bermuda',
    description: 'Saltus, Bermuda High School, Warwick Academy, The Bermuda Institute — fees, curricula, and how early to apply.',
    url: '/move/schools',
    section: 'Move',
    keywords:
      'schools school education private school saltus bermuda high school bhs warwick academy ib a-levels fees children kids nursery',
  },
  {
    title: 'Banking for Expats',
    description: 'Butterfield, HSBC Bermuda, Clarien — account opening, monthly fees, and US investment restrictions.',
    url: '/move/banking',
    section: 'Move',
    keywords: 'bank banking account butterfield hsbc clarien money transfer fees open account',
  },
  {
    title: 'Insurance in Bermuda: Car, Bike & Home',
    description:
      'Mandatory third-party motor cover, what car and scooter insurance actually costs, vehicle licensing fees, and home contents cover.',
    url: '/move/insurance',
    section: 'Move',
    keywords:
      'insurance car insurance bike insurance scooter cycle motorcycle motor third party tpl comprehensive premium home contents argus bfm colonial freisenbruch coverage cost licensing tcd',
  },

  // ---- Tools ----
  {
    title: 'The Car Trap: Assessment Numbers',
    description: 'One car per household, explained — and why this surprises almost every mover.',
    url: '/move/tools/assessment-number',
    section: 'Tools',
    keywords: 'car assessment number one car per household vehicle rule tcd import duty',
  },
  {
    title: 'Compensation Calculator',
    description: 'What gross salary do you need in Bermuda to match your current lifestyle?',
    url: '/move/tools/compensation',
    section: 'Tools',
    keywords: 'compensation calculator salary pay gross income how much do i need money tool',
  },
  {
    title: 'Immigration Pathway Finder',
    description: 'Do you qualify to move to Bermuda? Work through the decision tree.',
    url: '/move/tools/pathway',
    section: 'Tools',
    keywords: 'immigration pathway eligibility qualify decision tree work permit spousal eirc tool',
  },

  // ---- Live ----
  {
    title: 'Living in Bermuda',
    description: 'For people who call it home: events, deals, the directory, and what you learn after six months.',
    url: '/live',
    section: 'Live',
    keywords: 'live living resident residents home local',
  },
  {
    title: 'Bermuda News',
    description: 'A live feed of Bermuda news from local sources.',
    url: '/live/news',
    section: 'Live',
    keywords: 'news headlines royal gazette bernews current events updates',
  },
  {
    title: 'Bermuda Events Calendar',
    description: 'Cup Match, Bermuda Day, Heroes Weekend, Restaurant Week, the Christmas Boat Parade — month by month.',
    url: '/live/events',
    section: 'Live',
    keywords: 'events calendar cup match bermuda day restaurant week boat parade festival what is on',
  },
  {
    title: 'Local Deals',
    description: 'Restaurant Week prix-fixe, the Bus+Ferry pass, grocery strategies, and free things worth your time.',
    url: '/live/deals',
    section: 'Live',
    keywords: 'deals discounts savings offers cheap value restaurant week bus pass',
  },

  // ---- Directory ----
  {
    title: 'Bermuda Directory',
    description: 'Hotels, restaurants, transport, real estate, insurance, schools — curated and verified.',
    url: '/directory',
    section: 'Directory',
    keywords: 'directory businesses listings companies find search hotels restaurants services',
  },
  {
    title: 'Claim a Directory Listing',
    description: 'Own a Bermuda business? Claim or add your listing.',
    url: '/directory/claim',
    section: 'Directory',
    keywords: 'claim listing add business directory submit free listing',
  },

  // ---- Legal ----
  {
    title: 'Terms of Use',
    description: 'Pilot.BM terms of use.',
    url: '/legal/terms',
    section: 'Legal',
    keywords: 'terms legal conditions',
  },
  {
    title: 'Privacy Policy',
    description: 'How Pilot.BM handles data and privacy.',
    url: '/legal/privacy',
    section: 'Legal',
    keywords: 'privacy data cookies policy',
  },
  {
    title: 'Disclaimer',
    description: 'Editorial and information disclaimer.',
    url: '/legal/disclaimer',
    section: 'Legal',
    keywords: 'disclaimer not advice legal',
  },
  {
    title: 'Affiliate Disclosure',
    description: 'How affiliate links work on Pilot.BM.',
    url: '/legal/affiliate-disclosure',
    section: 'Legal',
    keywords: 'affiliate disclosure links commission sponsored',
  },
]
