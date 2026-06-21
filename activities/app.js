/* Activity Library — vanilla JS, no build step. Reads global ACTIVITIES. */
(function () {
  "use strict";

  const SUBJECTS = ["History", "Math", "Literacy", "Science", "Geography"];
  const TYPES = ["written", "visual", "vocabulary"];
  const AGES = ["5-7", "8-11", "12-14", "15-20"];

  const SUBJECT_COLORS = {
    History: "#C2410C", Math: "#2563EB", Literacy: "#7C3AED",
    Science: "#059669", Geography: "#0E7490",
  };
  const AGE_COLORS = {
    "5-7": "#DB2777", "8-11": "#D97706", "12-14": "#4F46E5", "15-20": "#475569",
  };
  const TYPE_LABELS = { written: "Written", visual: "Visual", vocabulary: "Vocabulary" };

  const state = { subject: "all", type: "all", ageBand: "all" };

  const grid = document.getElementById("grid");
  const resultCount = document.getElementById("resultCount");
  const emptyState = document.getElementById("emptyState");

  // Escape any text before injecting as HTML.
  function esc(s) {
    return String(s).replace(/[&<>"']/g, (ch) => (
      { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]
    ));
  }

  // ── Build a filter chip group ────────────────────────────
  function buildChips(containerId, key, values, labelFn, colorFn) {
    const container = document.getElementById(containerId);
    const all = [["all", "All"]].concat(values.map((v) => [v, labelFn(v)]));
    container.innerHTML = all.map(([val, label]) => {
      const color = val !== "all" && colorFn ? colorFn(val) : "";
      const pressed = state[key] === val;
      return (
        '<button class="chip" type="button"' +
        ' data-key="' + key + '" data-val="' + esc(val) + '"' +
        ' aria-pressed="' + pressed + '"' +
        (color ? ' style="--chip-color:' + color + '"' : "") +
        ">" + esc(label) + "</button>"
      );
    }).join("");
  }

  function syncChips() {
    document.querySelectorAll(".chip").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(state[btn.dataset.key] === btn.dataset.val));
    });
  }

  // ── Render the matching cards ────────────────────────────
  function render() {
    const list = ACTIVITIES.filter((a) =>
      (state.subject === "all" || a.subject === state.subject) &&
      (state.type === "all" || a.type === state.type) &&
      (state.ageBand === "all" || a.ageBand === state.ageBand)
    );

    resultCount.textContent =
      "Showing " + list.length + " of " + ACTIVITIES.length + " activities";
    emptyState.hidden = list.length !== 0;

    grid.innerHTML = list.map((a) => {
      const sc = SUBJECT_COLORS[a.subject];
      const ac = AGE_COLORS[a.ageBand];
      const meta = [];
      if (a.materials) meta.push("<span><b>Materials:</b> " + esc(a.materials) + "</span>");
      if (a.estimatedTime) meta.push("<span><b>Time:</b> " + esc(a.estimatedTime) + "</span>");

      const vocab = a.type === "vocabulary" && a.vocabAnswer
        ? '<div class="vocab">' +
            '<button class="reveal-btn" type="button" aria-expanded="false">Reveal answer</button>' +
            '<span class="vocab-answer" hidden>' + esc(a.vocabAnswer) + "</span>" +
          "</div>"
        : "";

      return (
        '<article class="card" style="--subject-color:' + sc + '">' +
          '<div class="card-tags">' +
            '<span class="tag" style="background:' + sc + '22;color:' + sc + '">' + esc(a.subject) + "</span>" +
            '<span class="tag tag-type">' + esc(TYPE_LABELS[a.type]) + "</span>" +
            '<span class="tag" style="background:' + ac + '22;color:' + ac + '">Ages ' + esc(a.ageBand) + "</span>" +
          "</div>" +
          '<h3 class="card-title">' + esc(a.title) + "</h3>" +
          '<p class="card-instr">' + esc(a.instructions) + "</p>" +
          vocab +
          (meta.length ? '<div class="card-meta">' + meta.join("") + "</div>" : "") +
        "</article>"
      );
    }).join("");
  }

  // ── Events ───────────────────────────────────────────────
  document.querySelector(".filter-bar").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    state[chip.dataset.key] = chip.dataset.val;
    syncChips();
    render();
  });

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".reveal-btn");
    if (!btn) return;
    const card = btn.closest(".card");
    const answer = card.querySelector(".vocab-answer");
    answer.hidden = false;
    btn.hidden = true;
    btn.setAttribute("aria-expanded", "true");
    card.classList.add("revealed");
  });

  document.getElementById("printBtn").addEventListener("click", () => window.print());

  // ── Init ─────────────────────────────────────────────────
  buildChips("subjectChips", "subject", SUBJECTS, (v) => v, (v) => SUBJECT_COLORS[v]);
  buildChips("typeChips", "type", TYPES, (v) => TYPE_LABELS[v], null);
  buildChips("ageChips", "ageBand", AGES, (v) => "Ages " + v, (v) => AGE_COLORS[v]);
  render();
})();
