const results = [
  {
    id: 'canonical-standard',
    title: 'Current Standard',
    shortName: 'Standard',
    group: 'canonical',
    groupLabel: 'Canonical comparison shot',
    video: './media/canonical-standard.mp4',
    attention: 'SageAttention2 + FirstBlockCache Safe',
    recipe: 'Standard FL2VA · signed 20-step graph',
    totalSeconds: 611.38,
    samplingSeconds: 558.131,
    speedup: '1.00× control',
    resolution: '768 × 1344',
    duration: '15.084 s',
    frames: 362,
    fps: 24,
    steps: '20',
    seed: '81390012120021180',
    audio: 'AAC stereo · 32 kHz',
    transcript: 'Passed normalized dialogue check',
    quality: 'Maximum-quality control and reference baseline.',
    comparisonNote:
      'Exact canonical prompt, seed, dimensions, duration, native audio, and executor.',
    evidence: 'EV-030 · canonical-standard-fl2va-r1',
  },
  {
    id: 'canonical-pdd-dense',
    title: 'Plain PDD — Dense Attention',
    shortName: 'PDD dense',
    group: 'canonical',
    groupLabel: 'Canonical comparison shot',
    video: './media/canonical-pdd-dense.mp4',
    attention: 'Dense native attention',
    recipe: 'Alibaba PDD · 8 steps · shifts 12/3 · no cache',
    totalSeconds: 756.555,
    totalLabel: 'Comfy execution',
    speedup: '0.81× vs Standard*',
    resolution: '768 × 1344',
    duration: '15.084 s',
    frames: 362,
    fps: 24,
    steps: '8',
    seed: '81390012120021180',
    audio: 'AAC stereo · 32 kHz',
    transcript: 'Exact alphanumeric dialogue stream',
    quality:
      'Technically valid, but visibly below the Sage-composed PDD result.',
    comparisonNote:
      'Same canonical media contract. Per-node timing was not recoverable; 756.555 s is authoritative Comfy execution, not matched wall time.',
    evidence: 'Recovered canonical PDD evidence · SHA 13d076f3…',
  },
  {
    id: 'canonical-pdd-sage',
    title: 'Current Turbo — PDD + Sage',
    shortName: 'PDD + Sage',
    group: 'canonical',
    groupLabel: 'Canonical comparison shot',
    video: './media/canonical-pdd-sage.mp4',
    attention: 'SageAttention2 after PDD sigma shift',
    recipe: 'Alibaba PDD · 8 steps · Euler/simple · shifts 12/3',
    totalSeconds: 375.042,
    samplingSeconds: 323.581,
    speedup: '1.63× vs Standard',
    resolution: '768 × 1344',
    duration: '15.084 s',
    frames: 362,
    fps: 24,
    steps: '8',
    seed: '81390012120021180',
    audio: 'AAC stereo · 32 kHz',
    transcript: 'Passed normalized dialogue check',
    quality:
      'Operator judged near-Standard and materially better than plain PDD.',
    comparisonNote:
      'Median of two uncached runs: 377.496 s and 372.589 s. Cached replay excluded.',
    evidence: 'EV-030 / EV-031 · minimax-h3@52',
    extraMetrics: [
      { label: 'Motion correlation', value: '0.9878 vs plain PDD' },
      { label: 'Sampling runs', value: '326.320 / 320.842 s' },
    ],
  },
  {
    id: 'canonical-seed-hunter',
    title: 'Seed Hunter — Direct One Seed',
    shortName: 'Seed Hunter',
    group: 'canonical',
    groupLabel: 'Canonical comparison shot',
    video: './media/canonical-seed-hunter.mp4',
    attention: 'Comfy-Kitchen attention in two-stage recipe',
    recipe: '0.3 MP 12-step first pass · learned 3D upscale · 4-step refine',
    totalSeconds: 285.765,
    samplingSeconds: 232.65,
    speedup: '2.14× Standard · 1.31× Turbo',
    resolution: '768 × 1344',
    duration: '15.084 s',
    frames: 362,
    fps: 24,
    steps: '12 + 4',
    seed: '81390012120021180',
    audio: 'AAC stereo · 32 kHz',
    transcript: 'Semantic match; “backends” split as “back ends”',
    quality: 'Awaiting final operator review and a second matched seed.',
    comparisonNote:
      'Direct result is byte-identical to the same selected seed from the three-preview creator workflow.',
    evidence: 'EV-032 · direct uncached manifest',
    extraMetrics: [
      { label: 'First sampler', value: '71.270 s' },
      { label: 'Target refine', value: '161.380 s' },
      { label: 'Latent upscale', value: '4.120 s' },
      { label: 'Decode / mux', value: '33.430 / 7.950 s' },
    ],
  },
  {
    id: 'seed-hunter-matched-interactive',
    title: 'Seed Hunter — Matched Interactive Target',
    shortName: 'Matched target',
    group: 'workflow-study',
    groupLabel: 'Seed Hunter & 10Eros workflow study',
    video: './media/07-seed-hunter-matched-768x1344.mp4',
    attention: 'Comfy-Kitchen attention in two-stage recipe',
    recipe: 'Three 12-step previews · learned 3D upscale · 4-step refine',
    totalSeconds: 460.888,
    totalLabel: 'Interactive total',
    samplingSeconds: 379.558,
    speedup: '1.33× Standard · 0.81× Turbo',
    resolution: '768 × 1344',
    duration: '15.084 s',
    frames: 362,
    fps: 24,
    steps: '3 × 12 + 4',
    seed: '81390012120021180',
    audio: 'AAC stereo · 32 kHz',
    transcript: 'Semantic match; “backends” split as “back ends”',
    quality: 'Matched-canvas target from selected preview N.',
    comparisonNote:
      '257.029-second preview stage plus a 203.859-second cached-selected final stage. The media bytes match the direct one-seed card, while the execution path and timing differ.',
    evidence: 'Seed Hunter comparison · file 07 · matched manifests',
    extraMetrics: [
      { label: 'Preview stage', value: '257.029 s' },
      { label: 'Final stage', value: '203.859 s' },
      { label: 'Target refine', value: '160.199 s' },
      { label: 'Media SHA-256', value: '65778d4f47d6…' },
    ],
  },
  {
    id: '10eros-author-recipe',
    title: '10Eros Max beta4 — Publisher Recipe',
    shortName: '10Eros author',
    group: 'workflow-study',
    groupLabel: 'Seed Hunter & 10Eros workflow study',
    video: './media/09-10eros-beta4-author-recipe-768x1344.mp4',
    attention: 'Comfy-Kitchen attention',
    recipe: 'Integrated-Turbo 10Eros beta4 · Euler/simple · shifts 12/7',
    totalSeconds: 373.961,
    samplingSeconds: 319.065,
    speedup: '1.63× Standard · 1.00× Turbo',
    resolution: '768 × 1344',
    duration: '15.084 s',
    frames: 362,
    fps: 24,
    steps: '8',
    seed: '81390012120021180',
    audio: 'AAC stereo · 32 kHz',
    transcript: 'Exact normalized dialogue',
    quality:
      'Strong facial identity; the crash passage shifts away from the intended selfie viewpoint and another phone becomes visible.',
    comparisonNote:
      'Exact canonical media contract. This is the checkpoint publisher’s direct recipe, without Seed Hunter refinement or another accelerator.',
    evidence: 'Seed Hunter comparison · file 09 · canonical-10eros-beta4-r1',
  },
  {
    id: '10eros-seed-hunter-canonical',
    title: '10Eros + Seed Hunter — Three-Preview Path',
    shortName: '10Eros 3-preview',
    group: 'workflow-study',
    groupLabel: 'Seed Hunter & 10Eros workflow study',
    video: './media/10-10eros-seed-hunter-reddit-canonical-768x1344.mp4',
    attention: 'Comfy-Kitchen attention in two-stage recipe',
    recipe: 'Three 4-step previews · learned 3D upscale · 4-step refine',
    totalSeconds: 328.394,
    totalLabel: 'Interactive total',
    samplingSeconds: 234.172,
    speedup: '1.86× Standard · 1.14× Turbo',
    resolution: '768 × 1344',
    duration: '15.084 s',
    frames: 362,
    fps: 24,
    steps: '3 × 4 + 4',
    seed: '81390012120021180',
    audio: 'AAC stereo · 32 kHz',
    transcript: 'Exact normalized dialogue',
    quality:
      'Exact dialogue and valid media; the phone becomes visible during the crash passage.',
    comparisonNote:
      '124.309-second three-preview stage plus a 204.085-second cached-selected final stage. This includes the full selection workflow.',
    evidence: 'Seed Hunter comparison · file 10 · Reddit recipe manifests',
    extraMetrics: [
      { label: 'Preview stage', value: '124.309 s' },
      { label: 'Final stage', value: '204.085 s' },
      { label: 'Target refine', value: '160.267 s' },
      { label: 'Decode / mux', value: '28.855 / 7.035 s' },
    ],
  },
  {
    id: '10eros-seed-hunter-independent',
    title: '10Eros + Seed Hunter — Direct Independent Seed',
    shortName: '10Eros direct',
    group: 'workflow-study',
    groupLabel: 'Seed Hunter & 10Eros workflow study',
    video: './media/11-10eros-seed-hunter-reddit-independent-seed-768x1344.mp4',
    attention: 'Comfy-Kitchen attention in two-stage recipe',
    recipe: 'One 4-step preview · learned 3D upscale · 4-step refine',
    totalSeconds: 243.521,
    samplingSeconds: 184.942,
    speedup: '2.51× Standard · 1.54× Turbo',
    resolution: '768 × 1344',
    duration: '15.084 s',
    frames: 362,
    fps: 24,
    steps: '4 + 4',
    seed: '6950586540139121736',
    audio: 'AAC stereo · 32 kHz',
    transcript: 'Exact normalized dialogue',
    quality:
      'Exact dialogue and valid media; the phone remains visible during the crash passage on this distant seed.',
    comparisonNote:
      'Direct one-seed path: 36.721-second preview plus 206.800-second cached-selected final refinement.',
    evidence: 'Seed Hunter comparison · file 11 · independent-seed manifest',
    extraMetrics: [
      { label: 'Preview stage', value: '36.721 s' },
      { label: 'Final stage', value: '206.800 s' },
      { label: 'Target refine', value: '162.388 s' },
      { label: 'Decode / mux', value: '32.475 / 7.774 s' },
    ],
  },
  {
    id: '10eros-camera-pov-independent-final',
    title: '10Eros Seed Hunter — Camera-POV Selected 768p',
    shortName: 'POV selected 768p',
    group: 'workflow-study',
    groupLabel: 'Seed Hunter & 10Eros workflow study',
    video: './media/19-10eros-seed-hunter-camera-pov-fixed-independent-768x1344.mp4',
    attention: 'Comfy-Kitchen attention in two-stage recipe',
    recipe:
      'Camera-POV prompt · one 4-step preview · learned upscale · 4-step refine',
    totalSeconds: 265.346,
    totalLabel: 'Warm selected path',
    samplingSeconds: 208.832,
    speedup: '2.30× Standard · 1.41× Turbo',
    resolution: '768 × 1344',
    duration: '15.084 s',
    frames: 362,
    fps: 24,
    steps: '4 + 4',
    seed: '6950586540139121736',
    audio: 'AAC stereo · 32 kHz',
    transcript: 'Exact dialogue confirmed by two transcription models',
    quality:
      'First-person staging is preserved; a dense 0.5-second review found no visible phone.',
    comparisonNote:
      '36.745-second warm preview plus a 228.601-second cached-selected final stage. A new prompt adds about 33 seconds once.',
    evidence: 'Seed Hunter comparison · file 19 · camera-POV final manifest',
    extraMetrics: [
      { label: 'Preview stage', value: '36.745 s' },
      { label: 'Final stage', value: '228.601 s' },
      { label: 'Target refine', value: '186.102 s' },
      { label: 'Decode / mux', value: '31.587 / 7.276 s' },
    ],
  },
  {
    id: 'short-sage',
    title: 'Sage Short Backend Check',
    shortName: 'Sage short',
    group: 'spot-check',
    groupLabel: 'Short backend spot checks',
    video: './media/short-sage.mp4',
    attention: 'SageAttention2',
    recipe: 'FL2VA · warm 4.459-second diagnostic',
    totalSeconds: 61.307,
    samplingSeconds: 53.811,
    speedup: '1.00× pair reference',
    resolution: '1024 × 576',
    duration: '4.459 s',
    frames: 107,
    fps: 24,
    steps: '20',
    seed: '260828001',
    audio: 'Native audio',
    transcript: 'Not a dialogue promotion fixture',
    quality:
      'Valid media; short diagnostics cannot predict canonical 15-second performance.',
    comparisonNote:
      'Compare only with Saganaki Sol using the same short seed/workload.',
    evidence: 'Short attention diagnostic',
  },
  {
    id: 'short-saganaki',
    title: 'Saganaki Sol-Attn',
    shortName: 'Saganaki Sol',
    group: 'spot-check',
    groupLabel: 'Short backend spot checks',
    video: './media/short-sol-saganaki.mp4',
    attention: 'Saganaki H3 Sol-Attn',
    recipe: 'FL2VA · one matched short diagnostic',
    totalSeconds: 61.462,
    samplingSeconds: 53.325,
    speedup: '1.009× sampling vs Sage',
    resolution: '1024 × 576',
    duration: '4.459 s',
    frames: 107,
    fps: 24,
    steps: '20',
    seed: '260828001',
    audio: 'Native audio',
    transcript: 'Not a dialogue promotion fixture',
    quality: 'Valid media; missed the required end-to-end gain.',
    comparisonNote:
      'This graph measured Sol alone after rewiring Sage out. It is not evidence for a composed Sage + Sol path.',
    evidence: 'EV-016 · Saganaki diagnostic',
  },
  {
    id: 'short-triton-sol',
    title: 'CuTe/Triton Sol-Attn',
    shortName: 'Triton Sol',
    group: 'spot-check',
    groupLabel: 'Short backend spot checks',
    video: './media/short-sol-triton.mp4',
    attention: 'CuTe/Triton Sol-Attn candidate',
    recipe: 'FL2VA · warm short diagnostic',
    totalSeconds: 72.209,
    samplingSeconds: 64.411,
    speedup: '0.84× vs Sage total',
    resolution: '1024 × 576',
    duration: '4.459 s',
    frames: 107,
    fps: 24,
    steps: '20',
    seed: '260828003',
    audio: 'Native audio',
    transcript: 'Not a dialogue promotion fixture',
    quality: 'Valid media; no supported Windows deployment path emerged.',
    comparisonNote:
      'Different seed from the Sage/Saganaki pair; included as compatibility evidence, not a speed ranking.',
    evidence: 'EV-016 · warm Triton diagnostic',
  },
  {
    id: 'short-comfy-kitchen',
    title: 'Comfy-Kitchen INT8 Attention',
    shortName: 'Comfy-Kitchen',
    group: 'spot-check',
    groupLabel: 'Short backend spot checks',
    video: './media/short-comfy-kitchen.mp4',
    attention: 'Fail-closed comfy_kitchen_int8',
    recipe: 'FL2VA compatibility canary · 20 steps',
    totalSeconds: 36.366,
    totalLabel: 'End to end',
    speedup: 'No matched Sage claim',
    resolution: '576 × 576',
    duration: '4.459 s',
    frames: 107,
    fps: 24,
    steps: '20',
    seed: '8293801',
    audio: 'AAC stereo · 32 kHz',
    transcript: 'Non-dialogue drummer canary',
    quality: 'Backend registered and rendered without fallback.',
    comparisonNote:
      'Small square compatibility run. It does not establish full-length quality or canonical speed.',
    evidence: 'EV-024 / EV-026 · render 35.338 s',
  },
  {
    id: 'fasth3',
    title: 'FastH3 Dense/Data-Free',
    shortName: 'FastH3',
    group: 'spot-check',
    groupLabel: 'Short backend spot checks',
    video: './media/fasth3-dense-datafree.mp4',
    attention: 'Dense native ComfyUI attention',
    recipe: 'Official 4-forward Dense/Data-Free ablation',
    totalSeconds: 165.566,
    samplingSeconds: 163.705,
    speedup: 'Not the published VSA path',
    resolution: '1024 × 576',
    duration: '14.375 s',
    frames: 345,
    fps: 24,
    steps: '4 forwards',
    seed: '8292026',
    audio: 'Native audio',
    transcript: 'Non-dialogue drummer fixture',
    quality:
      'Official adapter executed correctly; local path did not validate the publisher’s sparse speed claims.',
    comparisonNote:
      'Different prompt, canvas, frame geometry, base checkpoint, and attention contract.',
    evidence: 'EV-026 / EV-029',
  },
  {
    id: 'speedx6-sage',
    title: 'SpeedX6 Dense/Sage Control',
    shortName: 'SpeedX6 Sage',
    group: 'spot-check',
    groupLabel: 'Short backend spot checks',
    video: './media/speedx6-sage.mp4',
    attention: 'Sage control inside SpeedX6 two-pass graph',
    recipe: 'Two-pass latent upscale · 5.167-second canary',
    totalSeconds: 40.258,
    samplingSeconds: 32.265,
    speedup: '1.00× SpeedX6 control',
    resolution: '1024 × 576',
    duration: '5.167 s',
    frames: 124,
    fps: 24,
    steps: '15 + 5',
    seed: '260827001',
    audio: 'Native audio',
    transcript: 'Non-dialogue ceramic fox fixture',
    quality: 'Media valid; complete parent recipe failed visual review.',
    comparisonNote:
      'Use only against the SpeedX6 Sol card. This graph confounds latent upscale, refinement, and attention.',
    evidence: 'EV-005 · server 32.265 s',
  },
  {
    id: 'speedx6-sol',
    title: 'SpeedX6 Sol Variant',
    shortName: 'SpeedX6 Sol',
    group: 'spot-check',
    groupLabel: 'Short backend spot checks',
    video: './media/speedx6-sol.mp4',
    attention: 'Specialized Sol path inside SpeedX6',
    recipe: 'Two-pass latent upscale · 5.167-second canary',
    totalSeconds: 30.212,
    samplingSeconds: 28.014,
    speedup: '1.33× E2E vs SpeedX6 control',
    resolution: '1024 × 576',
    duration: '5.167 s',
    frames: 124,
    fps: 24,
    steps: '15 + 5',
    seed: '260827001',
    audio: 'Native audio',
    transcript: 'Non-dialogue ceramic fox fixture',
    quality:
      'Media valid and faster in this canary; overall graph failed visual review.',
    comparisonNote:
      'This graph does not isolate Sol as an independent variable.',
    evidence: 'EV-006 · server 28.014 s',
  },
];

const groups = {
  canonical: {
    label: "Canonical comparison shot",
    description:
      "Exact crash-pan prompt, 768 × 1344, 15.084 seconds, native audio, and seed 81390012120021180. These are the strongest direct comparisons.",
  },
  "workflow-study": {
    label: "Seed Hunter & 10Eros workflow study",
    description:
      "One full-resolution representative for each explicit Seed Hunter v1.2.2 or 10Eros beta4 recipe/path change. Neighboring-seed and low-resolution preview variants are intentionally omitted; the final card uses a camera-POV prompt clarification while preserving the shot and dialogue.",
  },
  "spot-check": {
    label: "Short backend spot checks",
    description:
      "Useful compatibility and directional evidence. These cards differ in prompt, duration, dimensions, seed, conditioning, or graph architecture and must not share one speed leaderboard.",
  },
};

const state = {
  filter: "all",
  sort: "evidence",
};

const root = document.querySelector("#results");
const sort = document.querySelector("#sort");
const filterButtons = [...document.querySelectorAll("[data-filter]")];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return minutes > 0
    ? `${minutes}:${remainder.toFixed(1).padStart(4, "0")}`
    : `${remainder.toFixed(1)}s`;
}

function metric(label, value) {
  return `
    <div class="metric">
      <dt>${escapeHtml(label)}</dt>
      <dd title="${escapeHtml(value)}">${escapeHtml(value)}</dd>
    </div>
  `;
}

function card(result, maxSeconds) {
  const sampling = result.samplingSeconds
    ? formatTime(result.samplingSeconds)
    : "Not recovered";
  const width = Math.max(4, (result.totalSeconds / maxSeconds) * 100);
  const extras = (result.extraMetrics || [])
    .map((item) => metric(item.label ?? item[0], item.value ?? item[1]))
    .join("");

  return `
    <article class="result-card" id="${escapeHtml(result.id)}">
      <div class="video-wrap">
        <video controls playsinline preload="metadata" aria-label="${escapeHtml(result.title)} generation">
          <source src="${escapeHtml(result.video)}" type="video/mp4" />
          Your browser does not support embedded video.
        </video>
      </div>
      <div class="details">
        <header class="card-head">
          <p class="section-label">${escapeHtml(result.groupLabel)}</p>
          <h3>${escapeHtml(result.title)}</h3>
          <p class="recipe">${escapeHtml(result.recipe)}</p>
        </header>
        <div class="card-body">
          <dl class="metrics">
            ${metric(result.totalLabel || "Total time", formatTime(result.totalSeconds))}
            ${metric("Sampling", sampling)}
            ${metric("Relative", result.speedup)}
            ${metric("Resolution", result.resolution)}
            ${metric("Duration", `${result.duration} · ${result.fps} fps`)}
            ${metric("Steps / frames", `${result.steps} / ${result.frames}`)}
            ${extras}
          </dl>
          <div class="timing">
            <div class="timing-head">
              <span>Current view scale · lower is faster</span>
              <span>${formatTime(result.totalSeconds)}</span>
            </div>
            <div class="bar"><span style="width:${width}%"></span></div>
          </div>
          <div class="facts">
            <div><span>Seed </span><code>${escapeHtml(result.seed)}</code></div>
            <div><span>Audio </span>${escapeHtml(result.audio)}</div>
            <div><span>Attention </span>${escapeHtml(result.attention)}</div>
          </div>
          <section class="verdict">
            <h4>Observed result</h4>
            <p>${escapeHtml(result.quality)}</p>
            <p class="transcript">Transcript: ${escapeHtml(result.transcript)}</p>
          </section>
          <section class="boundary">
            <h4>Comparison boundary</h4>
            <p>${escapeHtml(result.comparisonNote)}</p>
          </section>
          <p class="evidence">Evidence: <code>${escapeHtml(result.evidence)}</code></p>
        </div>
      </div>
    </article>
  `;
}

function render() {
  let visible =
    state.filter === "all"
      ? [...results]
      : results.filter((result) => result.group === state.filter);

  if (state.sort === "fastest") {
    visible.sort((a, b) => a.totalSeconds - b.totalSeconds);
  } else if (state.sort === "slowest") {
    visible.sort((a, b) => b.totalSeconds - a.totalSeconds);
  }

  if (!visible.length) {
    root.innerHTML = '<div class="empty">No results match this view.</div>';
    return;
  }

  const maxSeconds = Math.max(...visible.map((result) => result.totalSeconds), 1);

  if (state.sort !== "evidence") {
    root.innerHTML = `<section class="cards" aria-label="Sorted generation results">${visible
      .map((result) => card(result, maxSeconds))
      .join("")}</section>`;
    return;
  }

  root.innerHTML = Object.entries(groups)
    .map(([group, details], index) => {
      const items = visible.filter((result) => result.group === group);
      if (!items.length) return "";
      return `
        <section class="group" aria-labelledby="group-${escapeHtml(group)}">
          <div class="group-head">
            <div>
              <p class="group-index">0${index + 1} / ${String(items.length).padStart(2, "0")} results</p>
              <h2 id="group-${escapeHtml(group)}">${escapeHtml(details.label)}</h2>
            </div>
            <p class="group-description">${escapeHtml(details.description)}</p>
          </div>
          <div class="cards">${items.map((result) => card(result, maxSeconds)).join("")}</div>
        </section>
      `;
    })
    .join("");
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    render();
  });
});

sort.addEventListener("change", () => {
  state.sort = sort.value;
  render();
});

render();
