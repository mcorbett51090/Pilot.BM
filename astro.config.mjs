import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

// https://astro.build/config
//
// DEPLOY TARGET: GitHub Pages project site at
//   https://mcorbett51090.github.io/Pilot.BM/
// The repo is served from the /Pilot.BM/ subpath, so `base` is set below and all
// internal links/assets are prefixed with it.
//
// ── Migrating to the pilot.bm custom domain later ─────────────────────────────
//   1. set `site: 'https://pilot.bm'` and `base: '/'` (or remove `base`)
//   2. run the un-prefix step documented in README.md ("Deployment")
// ─────────────────────────────────────────────────────────────────────────────
export default defineConfig({
  output: 'static',
  integrations: [react()],
  site: 'https://mcorbett51090.github.io',
  base: '/Pilot.BM',
})
