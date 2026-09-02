# MiniMax H3 Attention & Workflow Comparison

This folder is a self-contained static documentation site for GitHub Pages. It contains:

- `index.html` — curated video gallery
- `benchmarks.html` — benchmark highlights and searchable timing index
- `methodology.html` — human reading guide and agent reuse protocol
- `assets/styles.css`
- `assets/app.js` and `assets/benchmark-page.js`
- `data/gallery-results.json` — all gallery cards and their displayed metrics
- `data/benchmark-records.json` — sanitized machine-readable evidence
- `data/benchmark-records.csv` — flat analysis export
- `canonical-prompt.txt`
- 16 MP4 test cards under `media/` (15 unique media payloads; two measured paths produced identical bytes)

No build step or server-side runtime is required.

## Publish with GitHub Pages

1. Create a repository and place the **contents of this folder** at its root.
2. Commit and push the files normally. Every video is below GitHub's 100 MB per-file limit.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the publishing branch and the root folder, then save.

The site uses relative links, so it works on both account-level and project-level GitHub Pages URLs.

## Refresh benchmark data

From the parent gallery project, run `npm run data:generate` to refresh the broad
sanitized evidence index, then run `npm run gallery:sync` to synchronize the
curated cards, card count, and `gallery-results.json`. The evidence generator
exposes only whitelisted statistics and relative evidence locators. It omits
source media, raw prompts, provider IDs, absolute paths, and private-reference
records.

## Evidence boundary

Only the four canonical cards share the fixed 768 × 1344, 15.084-second,
native-audio workload and seed `81390012120021180`. The Seed Hunter study labels
one full-resolution representative for each explicit recipe/path change; neighboring
seed and low-resolution preview variants are intentionally omitted. The short spot
checks are compatibility or directional evidence and are intentionally not presented
as one speed leaderboard.
