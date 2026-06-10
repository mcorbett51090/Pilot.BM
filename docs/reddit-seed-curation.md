# Reddit seed feed — curation guide

The `RedditFeed` component on each section page renders a hand-curated list of r/Bermuda posts
from `src/data/reddit-seed/{visit,move,live}.json`. All three files currently hold **placeholder
entries** (see `"PLACEHOLDER": true`) because the automated Reddit fetch was blocked during the
initial build session. **You must replace these with real posts before this section adds value.**

## What ships in V1

- Three JSON seed files (one per audience section: Visitors, Movers, Residents)
- `RedditFeed.astro` — static Astro component; no API calls, no serverless, no JS island required
- Attribution footer on every section: "Source: r/Bermuda on Reddit ↗"
- Graceful empty state: posts marked `PLACEHOLDER: true` or missing a `permalink` are filtered out;
  if nothing real remains the widget shows "Community highlights coming soon"

## How to add real posts

1. Browse [r/Bermuda](https://www.reddit.com/r/Bermuda/) — sort by Top (past year) or Hot.
2. Pick 3–6 posts per section that are **brand-safe and on-topic** (see screens below).
3. Copy the post's title and permalink (full `https://www.reddit.com/r/Bermuda/comments/…` URL).
4. Open the relevant JSON file and replace one placeholder entry:

```json
{
  "title": "The actual post title from Reddit",
  "permalink": "https://www.reddit.com/r/Bermuda/comments/abc123/actual_post_slug/",
  "subreddit": "Bermuda",
  "score": 142,
  "date": "2025-11-04",
  "why": "One line on why this is useful for this audience"
}
```

Remove the `"PLACEHOLDER": true` line — the component filters on that flag.

### Topic guidance per section

| File | Target topics |
|---|---|
| `visit.json` | Things to do, beach recommendations, travel tips, visitor experiences, transport questions |
| `move.json` | Relocation experiences, cost of living, housing/rental, expat advice, work permit discussions |
| `live.json` | Local events, community news, resident recommendations, services, neighbourhood discussion |

### Brand-safety screen — include only posts that are:

- High-quality discussion (score > ~20 for a low-volume subreddit)
- On-topic for the target section
- Not `over_18` / NSFW (check the post's flair and content)
- Not removed, locked, or stickied admin/mod posts
- Not toxic, inflammatory, or commercially self-promotional
- Something you'd put the Pilot.BM name next to

Exclude: political flamewars, complaints about specific individuals, anything embarrassing or
defamatory, posts with misleading information.

### Attribution

The component shows only **titles + links** (no post bodies, no comments). This respects Reddit
content copyright — we're providing a curated link list, not republishing user content.

## Refresh cadence

r/Bermuda is a low-volume subreddit. Monthly refresh is fine. A useful trigger: when you notice
a particularly good discussion thread, add it to the relevant JSON before you forget.

## V2 live feed (gated — do not build yet)

The plan document
([docs/plans/2026-06-10-pilot-bm-reddit-feed/plan.md](../RavenClaude/docs/plans/2026-06-10-pilot-bm-reddit-feed/plan.md)
in the RavenClaude repo, or request a copy) describes a live Cloudflare Worker path that refreshes
the feed automatically via Reddit's OAuth API.

**V2 is blocked on two prerequisites:**

1. **Reddit commercial API approval** — apply via the [Reddit Developer Platform](https://www.reddit.com/dev/api/);
   commercial use requires a contract (2–4 week review; cost is trivial ~$0.69/mo but the *approval*
   is the gate).
2. **No-ads clause ruling** — Reddit's terms likely prohibit displaying their API content alongside
   display ads on the same page. Pilot.BM uses ad/affiliate monetization, so this needs a definitive
   legal read before committing to the live path. Verify against Reddit's current Developer Terms.

Until both are resolved, the seed feed is the right call: zero ToS risk, curated = higher quality
than a raw feed, and works on GitHub Pages with no infrastructure changes.
