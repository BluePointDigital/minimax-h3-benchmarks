# MiniMax H3 Attention & Workflow Comparison

This folder is a self-contained static documentation site for GitHub Pages. It contains:

- `index.html` — curated video gallery
- `benchmarks.html` — benchmark highlights and searchable timing index
- `methodology.html` — human reading guide and agent reuse protocol
- `assets/styles.css`
- `assets/app.js` and `assets/benchmark-page.js`
- `data/gallery-results.json` — all gallery cards and their displayed metrics
- `data/benchmark-records.json` — sanitized launch evidence archive (September 2)
- `data/benchmark-records.csv` — flat launch archive export
- `canonical-prompt.txt`
- `camera-pov-prompt.txt` — corrected prompt used in the VDN comparison
- 29 MP4 test cards under `media/` (28 unique displayed media payloads; two historical measured paths produced identical bytes)

Updated September 7, 2026 with 15 distinct configurations: VDN, Standard + Kijai Sol, Larry v4, Silveroxides Fro099 v2, three progressive FL2VA recipes, Ref4/Ref8/Sol reference recipes, progressive Ref2VA and Ref8, and three 10Eros progressive-reference combinations. Reruns and structural smokes are omitted from these additions.

The VDN comparison retains the operator's final verdict: PDD has better quality and coherence, so PDD + Sage remains preferred. Each card states its timing scope and comparison limits. New public MP4s are stream-copied with embedded workflow metadata removed; audiovisual streams are unchanged.

September 8: removed all seven short-backend spot-check cards. Current Standard and Current Turbo now appear first in the default gallery view. Retained research media and the launch evidence archive are unchanged.

September 17: added the two **FastH3 8-Step V2** sparse-attention runs — the official ComfyUI template setting (10% retained, 239.042 s) and the V2 model-card setting (20% retained, 263.309 s). Both ran the canonical 15-second/768×1344 shot, seed `81390012120021180`, on an isolated ComfyUI 0.36.0 lab; the two dispatched graphs differ only in the VSA keep percentage, and sparse dispatch was verified with no cached sampler. The operator judged both clips slightly plasticky on skin and clearly below the Turbo clip used for comparison, so V2 is recorded as rejected rather than promoted. V2 is text-to-audio-video only and cannot replace the FL2VA or Ref2VA Turbo packages. The 10Eros hybrid Turbo clip shown for that comparison is the existing `10eros-author-recipe` card, not the restored PDD + Sage Turbo; the Current Turbo card remains the restored recipe.

Process: every completed comparative test gets a card here once its media validates, including negative and rejected results. Reruns, structural smokes and cached replays stay off the gallery.

Later on September 17: added the remaining runs from that sweep. **TaoMate-H3 3-step direct FL2VA** completed in 319.904 s with valid media and no adapter warning, but the operator verdict was "horrible" and it is rejected for the menu; its executed graph ran the native plain package without Sage or cache, so the timing ratio against Current Turbo is not an isolated adapter gain. The published two-stage TaoMate finishing variant never reached sampling — the third-party RES4LYF sampler fails H3 latent packing with a 24-versus-32 tensor mismatch at two resolutions on both lab cores — and is recorded as an implementation blocker. The **FL2VA/Ref2VA hybrid `b25-49`** completed at 624.557 s against 632.300 s for its matched **stock Ref2VA** control, with sampling 0.36 s apart across 20 steps, so it shows no speed benefit and its operator quality review is still open. The reference-video variants of that workload were stopped before the 15-minute ceiling on reference-conditioning cost; only the image-reference case is published.
