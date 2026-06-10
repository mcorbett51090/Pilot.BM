# Deploying Pilot.BM — Owner's Guide

Your site builds to plain HTML files in a `dist/` folder. Any static host can serve it. The recommended path is **Cloudflare Pages** — free, two-minute setup, live at a `*.pages.dev` URL, and every push to `main` auto-redeploys.

---

## RECOMMENDED: Cloudflare Pages (~2 minutes)

> No code changes needed. The site deploys exactly as-is.

1. Go to **[dash.cloudflare.com](https://dash.cloudflare.com)** and sign in (free account is fine).
2. In the left sidebar: **Workers & Pages → Create → Pages → Connect to Git**.
3. Authorize Cloudflare to access your GitHub account, then pick **`mcorbett51090/Pilot.BM`**.
4. On the build settings screen:
   - **Framework preset:** Astro
   - **Build command:** `npm run build` *(auto-filled)*
   - **Build output directory:** `dist` *(auto-filled)*
5. Click **Save and Deploy**.

That's it. Cloudflare builds the site (takes ~60–90 seconds) and gives you a live URL like:

```
https://pilot-bm.pages.dev
```

From that point on, every push to `main` triggers an automatic redeploy.

---

## Adding your custom domain (`pilot.bm`) later

Once the Cloudflare Pages project is live:

1. Open the project → **Custom domains → Add a custom domain**.
2. Type `pilot.bm` and follow the on-screen DNS instructions.
3. Cloudflare walks you through the DNS settings — it's easiest if your domain is also registered/managed inside Cloudflare.

**Important — `.bm` domain eligibility:** The `.bm` ccTLD is restricted to Bermuda-registered entities. You may need a local business registration to claim it. Verify with **Logic Communications (lc.bm)** before launch. If `.bm` isn't available to you yet, `pilotbm.com` or `pilot-bm.com` are clean fallbacks and work identically with Cloudflare Pages.

---

## ALTERNATIVE: Netlify (~2 minutes)

A close second if you prefer Netlify's interface.

1. Go to **[app.netlify.com](https://app.netlify.com)** and sign in.
2. **Add new site → Import an existing project → GitHub**.
3. Authorize Netlify, pick **`mcorbett51090/Pilot.BM`**.
4. Netlify auto-detects Astro and fills in `npm run build` / `dist`.
5. Click **Deploy site**.

Live at `https://[random-name].netlify.app` in ~60 seconds. Custom domains work the same way via **Site settings → Domain management**.

---

## NOT RECOMMENDED: GitHub Pages

GitHub Pages serves project repositories at a **sub-path** (`https://mcorbett51090.github.io/Pilot.BM/`). This creates a problem: every internal link in the site (`/visit`, `/move`, `/directory`, etc.) would 404 because they point to the root, not to `/Pilot.BM/visit`.

Fixing it requires:
- Adding `base: '/Pilot.BM'` to `astro.config.mjs`
- Making every internal link across the entire site base-aware
- Ongoing maintenance every time a new page or link is added

That's fragile, error-prone work that a Cloudflare Pages or Netlify deploy avoids entirely. **Use GitHub Pages only if you specifically want a `github.io` URL and are prepared for that surgery.**

---

## Local preview (anytime)

```bash
npm install        # first time only
npm run dev        # opens at http://localhost:4321
npm run build      # build to dist/ (same as production)
npm run preview    # preview the built site locally
```

---

## Build verification (as of June 2026)

- `npm run build` ✅ exits clean — 23 pages generated
- `dist/index.html` ✅ exists
- All internal links are root-absolute: `/visit`, `/move`, `/live`, `/directory`, `/about` — no sub-path prefix anywhere
- `astro.config.mjs`: `output: 'static'`, `site: 'https://pilot.bm'`, no `base` set — **already correct for root deployment**
