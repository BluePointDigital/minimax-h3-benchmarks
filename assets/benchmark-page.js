const elements = {
  stats: document.querySelector("#data-stats"),
  tenRun: document.querySelector("#ten-run-summary"),
  measurements: document.querySelector("#additional-measurements"),
  privacy: document.querySelector("#privacy-count"),
  search: document.querySelector("#record-search"),
  mode: document.querySelector("#mode-filter"),
  category: document.querySelector("#category-filter"),
  sort: document.querySelector("#record-sort"),
  includeCached: document.querySelector("#include-cached"),
  count: document.querySelector("#record-count"),
  snapshot: document.querySelector("#snapshot-time"),
  body: document.querySelector("#records-body"),
  inventory: document.querySelector("#inventory-note"),
};

const state = {
  data: null,
  query: "",
  mode: "all",
  category: "all",
  sort: "latest",
  includeCached: false,
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatSeconds(value) {
  if (value === null || value === undefined) return "—";
  if (value < 60) return `${value.toFixed(2)} s`;
  const minutes = Math.floor(value / 60);
  return `${minutes}:${(value % 60).toFixed(1).padStart(4, "0")}`;
}

function median(values) {
  if (!values.length) return null;
  const ordered = [...values].sort((a, b) => a - b);
  const midpoint = Math.floor(ordered.length / 2);
  return ordered.length % 2
    ? ordered[midpoint]
    : (ordered[midpoint - 1] + ordered[midpoint]) / 2;
}

function titleCase(value) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function workload(record) {
  const request = record.requested;
  const size = request.width && request.height ? `${request.width}×${request.height}` : "size n/a";
  const duration = request.durationSeconds ? `${request.durationSeconds}s` : "duration n/a";
  const steps = request.steps ? `${request.steps} steps` : "steps n/a";
  return `${size} · ${duration} · ${steps}`;
}

function renderSummary() {
  const data = state.data;
  const samplerTimings = data.records.filter(
    (record) => record.samplingSeconds !== null && record.samplingSeconds > 0,
  ).length;
  const validMedia = data.records.filter((record) => record.media.valid === true).length;
  const stats = [
    ["Timing records", data.inventory.normalizedTimingRecords],
    ["Sampler timings", samplerTimings],
    ["Valid media probes", validMedia],
    ["Exact transcript checks", `${data.inventory.exactTranscriptChecks} / ${data.inventory.transcriptChecks}`],
  ];
  elements.stats.innerHTML = stats
    .map(
      ([label, value]) => `
        <div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>
      `,
    )
    .join("");

  const canaryGroups = [
    ["Standard FL2VA", "canary-standard-fl-"],
    ["Standard Ref2VA", "canary-standard-ref-"],
    ["Turbo FL2VA", "canary-turbo-fl-"],
    ["Turbo Ref2VA", "canary-turbo-ref-"],
  ];
  elements.tenRun.innerHTML = canaryGroups
    .map(([label, prefix]) => {
      const rows = data.records.filter(
        (record) => record.label.startsWith(prefix) && !record.likelyCachedReplay,
      );
      const times = rows.map((record) => record.elapsedSeconds);
      return `
        <div>
          <span><strong>${escapeHtml(label)}</strong><small>${rows.length} runs · ${formatSeconds(Math.min(...times))}–${formatSeconds(Math.max(...times))}</small></span>
          <b>${formatSeconds(median(times))}</b>
        </div>
      `;
    })
    .join("");

  const vram = data.peakVram
    .map(
      (record) => `
        <div>
          <span>Peak VRAM</span>
          <strong>${(record.peakVramMiB / 1024).toFixed(2)} GiB</strong>
          <small>${escapeHtml(record.samples ?? "n/a")} samples · ${escapeHtml(record.sourceFile.split("/")[0])}</small>
        </div>
      `,
    )
    .join("");
  const reviews = data.blindedReviewSummaries
    .map(
      (record) => `
        <div>
          <span>Blinded still-frame review</span>
          <strong>${record.medianVisualQuality.toFixed(1)} / 5 median</strong>
          <small>${record.scoreCount} scores · range ${record.minVisualQuality.toFixed(1)}–${record.maxVisualQuality.toFixed(1)}</small>
        </div>
      `,
    )
    .join("");
  elements.measurements.innerHTML = vram + reviews;
  elements.privacy.textContent = `${data.inventory.sensitiveJsonFilesExcluded} private-reference JSON files omitted`;
  elements.snapshot.textContent = `Snapshot ${new Date(data.generatedAt).toLocaleString()}`;
  elements.inventory.textContent =
    `The source inventory includes ${data.inventory.sourceFilesScanned} files, ` +
    `including ${data.inventory.sourceJsonFiles} JSON records and ` +
    `${data.inventory.sourceVideoFiles} videos. Source media is counted but never copied to this page.`;
}

function renderRecords() {
  const query = state.query.trim().toLowerCase();
  const rows = state.data.records
    .filter((record) => {
      if (!state.includeCached && record.likelyCachedReplay) return false;
      if (state.mode !== "all" && (record.mode ?? "unspecified") !== state.mode) return false;
      if (state.category !== "all" && record.category !== state.category) return false;
      if (!query) return true;
      return [
        record.label,
        record.arm,
        record.mode,
        record.category,
        record.workflow.revisionId,
        record.workflow.packageId,
        record.workflow.attentionBackend,
        record.source.file,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));
    })
    .sort((a, b) => {
      if (state.sort === "fastest") return a.elapsedSeconds - b.elapsedSeconds;
      if (state.sort === "slowest") return b.elapsedSeconds - a.elapsedSeconds;
      if (state.sort === "label") return a.label.localeCompare(b.label);
      return (b.completedAt ?? "").localeCompare(a.completedAt ?? "");
    });

  elements.count.textContent = `${rows.length} records shown`;
  elements.body.innerHTML = rows
    .map((record) => {
      const backend =
        record.workflow.attentionBackend ?? record.arm ?? "not recorded";
      const packageId =
        record.workflow.packageId ?? record.workflow.revisionId ?? "n/a";
      return `
        <tr>
          <td><strong>${escapeHtml(record.label)}</strong><small>seed ${escapeHtml(record.seed ?? "n/a")}</small></td>
          <td>${escapeHtml(titleCase(record.category))}<small>${escapeHtml(record.mode ?? "unspecified")}</small></td>
          <td class="mono nowrap">${escapeHtml(workload(record))}</td>
          <td class="number nowrap">${formatSeconds(record.elapsedSeconds)}${record.likelyCachedReplay ? "<small class=\"cache-note\">cached replay</small>" : ""}</td>
          <td class="mono nowrap">${formatSeconds(record.samplingSeconds)}</td>
          <td>${escapeHtml(backend)}<small class="break">${escapeHtml(packageId)}</small></td>
          <td class="mono source-cell">${escapeHtml(record.source.file)}</td>
        </tr>
      `;
    })
    .join("");
}

function bindControls() {
  const categories = [...new Set(state.data.records.map((record) => record.category))].sort();
  elements.category.insertAdjacentHTML(
    "beforeend",
    categories
      .map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(titleCase(category))}</option>`)
      .join(""),
  );
  elements.search.addEventListener("input", () => {
    state.query = elements.search.value;
    renderRecords();
  });
  elements.mode.addEventListener("change", () => {
    state.mode = elements.mode.value;
    renderRecords();
  });
  elements.category.addEventListener("change", () => {
    state.category = elements.category.value;
    renderRecords();
  });
  elements.sort.addEventListener("change", () => {
    state.sort = elements.sort.value;
    renderRecords();
  });
  elements.includeCached.addEventListener("change", () => {
    state.includeCached = elements.includeCached.checked;
    renderRecords();
  });
}

fetch("./data/benchmark-records.json")
  .then((response) => {
    if (!response.ok) throw new Error(`Dataset request failed with ${response.status}`);
    return response.json();
  })
  .then((data) => {
    state.data = data;
    renderSummary();
    bindControls();
    renderRecords();
  })
  .catch(() => {
    elements.count.textContent = "The benchmark dataset could not be loaded.";
  });
