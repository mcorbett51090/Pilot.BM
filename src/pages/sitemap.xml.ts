// Static sitemap generation
// All main pages — noindex pages are intentionally excluded

const siteUrl = 'https://pilot.bm'

const pages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/visit/', priority: '0.9', changefreq: 'weekly' },
  { url: '/visit/getting-around/', priority: '0.9', changefreq: 'weekly' },
  { url: '/visit/beaches/', priority: '0.8', changefreq: 'monthly' },
  { url: '/move/', priority: '0.9', changefreq: 'weekly' },
  { url: '/move/work-permit/', priority: '0.8', changefreq: 'monthly' },
  { url: '/move/cost-of-living/', priority: '0.8', changefreq: 'monthly' },
  { url: '/move/tools/assessment-number/', priority: '0.7', changefreq: 'monthly' },
  { url: '/move/tools/compensation/', priority: '0.7', changefreq: 'monthly' },
  { url: '/move/tools/pathway/', priority: '0.7', changefreq: 'monthly' },
  { url: '/live/', priority: '0.6', changefreq: 'weekly' },
  { url: '/directory/', priority: '0.8', changefreq: 'weekly' },
  { url: '/directory/claim/', priority: '0.6', changefreq: 'monthly' },
  { url: '/about/', priority: '0.6', changefreq: 'monthly' },
  { url: '/legal/terms/', priority: '0.3', changefreq: 'yearly' },
  { url: '/legal/privacy/', priority: '0.3', changefreq: 'yearly' },
  { url: '/legal/disclaimer/', priority: '0.4', changefreq: 'monthly' },
  { url: '/legal/affiliate-disclosure/', priority: '0.4', changefreq: 'monthly' },
]

const today = new Date().toISOString().split('T')[0]

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${siteUrl}${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
