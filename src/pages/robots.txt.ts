// robots.txt — allow all crawlers, provide sitemap reference.
// Skeleton pages without depth are handled with noindex per-page (not blocked here).
// The /go/ redirect pages are noindex by design to avoid affiliate link dilution.

export async function GET() {
  const content = `User-agent: *
Allow: /

# Noindex pages are marked per-page; we do not block crawlers here.
# The /go/ redirect pages carry noindex meta tags individually.

Sitemap: https://mcorbett51090.github.io/Pilot.BM/sitemap.xml
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
