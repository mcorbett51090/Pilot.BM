// ============================================================
// Pilot.BM — Bermuda voices: notable quotes + media recognition
// ------------------------------------------------------------
// Every item here is sourced. Where attribution or wording is
// uncertain, we say so in `note` — this matches the site's
// editorial standard (flag what's unverified; never present
// uncertain material as fact). Modern (in-copyright) quotes are
// kept to short attributed snippets; pre-1928 works are public
// domain and quoted more fully.
// ============================================================

export interface Quote {
  text: string
  /** Who said or wrote it. */
  attribution: string
  /** Work, publication, or context. */
  context: string
  /** Year or approximate year. */
  year: string
  /** Citation URL (best available). */
  url?: string
  /** Transparency note — shown when wording/attribution is disputed. */
  note?: string
  /** Pre-1928 / clearly public-domain works can be quoted in full. */
  publicDomain?: boolean
}

export const quotes: Quote[] = [
  {
    text: 'You can go to heaven if you want to. I’d rather stay in Bermuda.',
    attribution: 'Mark Twain',
    context: 'Widely attributed, from his later years visiting the island',
    year: 'c. 1910',
    url: 'https://www.bermuda.com/150-years-mark-twain-bermuda/',
    note: 'Widely attributed to Mark Twain; the exact wording and original source are undocumented.',
  },
  {
    text: 'He hangs in shades the orange bright, like golden lamps in a green night.',
    attribution: 'Andrew Marvell',
    context: 'From the poem “Bermudas”',
    year: 'c. 1653',
    url: 'https://www.poetryfoundation.org/poems/44677/bermudas',
    publicDomain: true,
  },
  {
    text: 'From the still-vex’d Bermoothes.',
    attribution: 'William Shakespeare',
    context: 'Ariel, in “The Tempest” — thought to be inspired in part by the 1609 wreck of the Sea Venture on Bermuda',
    year: 'c. 1611',
    url: 'https://en.wikipedia.org/wiki/Sea_Venture',
    note: 'The Tempest’s link to the 1609 Sea Venture wreck is the leading scholarly view, not a unanimous one.',
    publicDomain: true,
  },
  {
    text: 'There are several “sights” in the Bermudas, of course, but they are all easily avoided.',
    attribution: 'Mark Twain',
    context: 'From the essay “Some Rambling Notes of an Idle Excursion,” written after his 1877 visit',
    year: '1877',
    url: 'https://www.bermuda.com/150-years-mark-twain-bermuda/',
    publicDomain: true,
  },
  {
    text: 'It’s a type of flower, a type of freesia… if two people picture the same image at the same time, that is the secret.',
    attribution: 'John Lennon',
    context: 'On naming the album “Double Fantasy” after a flower seen in Bermuda’s Botanical Gardens',
    year: '1980',
    url: 'https://www.royalgazette.com/other/news/article/20111123/was-john-lennons-double-fantasy-a-freesia-or-hibiscus/',
    note: 'The naming story is well documented; whether the flower was a freesia or a hibiscus is disputed locally.',
  },
]

export interface Award {
  /** Publication or body granting the recognition. */
  publication: string
  /** What was recognised. */
  honour: string
  /** Year(s). */
  year: string
  /** Citation URL. */
  url: string
  /** 'destination' = island-level; 'event' = hosted event; 'feature' = editorial. */
  kind: 'destination' | 'event' | 'feature'
}

// Destination-level recognition only — hotel-specific awards are deliberately
// left to the directory listings so this strip stays about Bermuda itself.
export const awards: Award[] = [
  {
    publication: 'Condé Nast Traveler',
    honour: '#1 Island in the Caribbean & Atlantic, Readers’ Choice Awards',
    year: '2023–2025',
    url: 'https://bernews.com/2025/10/bermuda-named-1-island-in-caribbean-atlantic/',
    kind: 'destination',
  },
  {
    publication: 'Travel + Leisure',
    honour: 'Named a Top Island, World’s Best Awards',
    year: '2024',
    url: 'https://bernews.com/2024/07/bermuda-named-top-island-by-travel-leisure/',
    kind: 'destination',
  },
  {
    publication: 'America’s Cup',
    honour: 'Host of the 35th America’s Cup on the Great Sound',
    year: '2017',
    url: 'https://bernews.com/2017/11/acbda-event-cost-64-1m-generated-336-4m/',
    kind: 'event',
  },
  {
    publication: 'SailGP',
    honour: 'Recurring host of the Bermuda Sail Grand Prix',
    year: '2021–',
    url: 'https://sailgp.com/news/great-britain-win-bermuda/',
    kind: 'event',
  },
]
