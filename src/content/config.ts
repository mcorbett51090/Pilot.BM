import { defineCollection, z } from 'astro:content'

// ============================================================
// Directory collection — business listings
// ============================================================
const directory = defineCollection({
  type: 'data',
  schema: z.object({
    slug: z.string(),
    name: z.string(),
    category: z.enum([
      'accommodation',
      'attraction',
      'restaurant',
      'retail',
      'transport',
      'real_estate',
      'insurance',
      'relocation',
      'education',
      'tourism',
      'dining_event',
      'financial',
      'legal',
      'healthcare',
      'other',
    ]),
    parish: z.enum([
      'Hamilton',
      'Paget',
      'Pembroke',
      'Devonshire',
      'Smith',
      'Hamilton Parish',
      'Saint George',
      'Saint Georges',
      'Sandys',
      'Southampton',
      'Warwick',
    ]),
    audience_tags: z
      .array(z.enum(['visit', 'move', 'live']))
      .default(['visit', 'move', 'live']),
    description: z.string(),
    phone: z.string().optional(),
    url: z.string().url().optional(),
    hours: z.string().optional(),
    tier: z.enum(['free', 'standard', 'featured', 'anchor']),
    status: z.enum(['active', 'inactive', 'pending']).default('active'),
    featured_image: z.string().optional(),
    verified_on: z.string().optional(), // ISO date string
    // Custom maps search string. Defaults to "<name>, <parish>, Bermuda".
    map_query: z.string().optional(),
    // Set true for online-only services with no visitable location (no directions link).
    no_directions: z.boolean().default(false),
  }),
})

// ============================================================
// Articles collection — editorial content
// ============================================================
const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    audience: z.enum(['visit', 'move', 'live']),
    section: z.string(), // e.g. "getting-around", "work-permits", "beaches"
    slug: z.string(),
    pubDate: z.date(),
    /** Move-audience pages MUST have disclaimer: true */
    disclaimer: z.boolean().default(false),
    regulated: z.boolean().default(false),
    verified_on: z.string().optional(),
    source_url: z.string().url().optional(),
    noindex: z.boolean().default(false),
  }),
})

export const collections = {
  directory,
  articles,
}
