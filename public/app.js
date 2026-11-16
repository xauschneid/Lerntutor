import { MISSIONS } from "./missions.js";

const app = document.getElementById("app");
const STORE_KEY = "lerntutor.v2";

// ---------- Speicher (nur im Browser, darf fehlen) ----------
function load() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { return {}; }
}
let state = Object.assign({ missions: {}, exam: {} }, load());
function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch {}
}
const mState = (id) => (state.missions[id] ||= { attempts: 0, passed: false });

// ---------- Hilfsfunktionen ----------
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const range = (n) => [...Array(n).keys()];
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
// Mischen, aber nie die Originalreihenfolge zurückgeben (sonst wäre die Lösung sichtbar)
function shuffleNew(n) {
  if (n < 2) return range(n);
  let p;
  do { p = shuffle(range(n)); } while (p.every((v, i) => v === i));
  return p;
}

// Deutsche und englische Zahlenschreibweise: "12.000", "12000 €", "1,21", "1.21", "20,95 %"
export function parseNumber(raw) {
  let s = String(raw || "").trim().replace(/\s/g, "").replace(/[^\d.,-]/g, "");
  if (!s) return NaN;
  if (s.includes(",")) s = s.replace(/\./g, "").replace(",", ".");
  else if (/^-?\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, "");
  return Number(s);
}
const fmt = (n) => n.toLocaleString("de-DE");

// ---------- Ein Testdurchlauf ----------
// items: [{ mission, task, key }]
function newRun(items) {
  return {
    items,
    submitted: false,
    shuffles: Object.fromEntries(items.map(({ task, key }) => {
      if (task.type === "choice" || task.type === "multi") return [key, task.keepOrder ? range(task.options.length) : shuffle(range(task.options.length))];
      if (task.type === "match") return [key, { left: shuffle(range(task.pairs.length)), right: shuffle(range(task.pairs.length)) }];
      if (task.type === "order") return [key, shuffleNew(task.items.length)];
      return [key, null];
    })),
    results: {},
  };
}

function taskInput(task, key, sh) {
  const name = `k${key.replace(".", "_")}`;
  switch (task.type) {
    case "choice":
    case "multi": {
      const t = task.type === "choice" ? "radio" : "checkbox";
      return `${task.type === "multi" ? `<p class="hint">Mehrere Antworten können richtig sein.</p>` : ""}
        <div class="opts">${sh.map((oi) => `
          <label class="opt"><input type="${t}" name="${name}" value="${oi}"><span>${esc(task.options[oi])}</span></label>`).join("")}
        </div>`;
    }
    case "number":
      return `<label class="num"><input type="text" inputmode="decimal" autocomplete="off" name="${name}" aria-label="Ergebnis">${task.unit ? `<span class="unit">${esc(task.unit)}</span>` : ""}</label>`;
    case "numbers":
      return `<div class="nums">${task.fields.map((f, fi) => `
        <label class="numrow"><span class="nlabel">${esc(f.label)}</span>
          <span class="num"><input type="text" inputmode="decimal" autocomplete="off" name="${name}_${fi}" aria-label="${esc(f.label)}">${f.unit ? `<span class="unit">${esc(f.unit)}</span>` : ""}</span>
        </label>`).join("")}</div>`;
    case "match":
      return `<div class="match">${sh.left.map((li) => `
        <label class="mrow"><span class="mleft">${esc(task.pairs[li][0])}</span>
          <select name="${name}_${li}"><option value="">Auswählen</option>${sh.right.map((ri) => `<option value="${ri}">${esc(task.pairs[ri][1])}</option>`).join("")}</select>
        </label>`).join("")}</div>`;
    case "order":
      return `<div class="match">${sh.map((ii) => `
        <label class="mrow"><span class="mleft">${esc(task.items[ii])}</span>
          <select name="${name}_${ii}" class="short"><option value="">Platz</option>${task.items.map((_, p) => `<option value="${p}">Platz ${p + 1}</option>`).join("")}</select>
        </label>`).join("")}</div>`;
  }
  return "";
}

function grade(task, key, form) {
  const name = `k${key.replace(".", "_")}`;
  const val = (n) => form.elements[n]?.value ?? "";
  switch (task.type) {
    case "choice": {
      const sel = form.querySelector(`input[name="${name}"]:checked`);
      return !!sel && Number(sel.value) === task.correct;
    }
    case "multi": {
      const sel = [...form.querySelectorAll(`input[name="${name}"]:checked`)].map((x) => Number(x.value)).sort();
      const want = [...task.correct].sort();
      return sel.length === want.length && sel.every((v, i) => v === want[i]);
    }
    case "number": {
      const n = parseNumber(val(name));
      return Number.isFinite(n) && Math.abs(n - task.answer) <= task.tol + 1e-9;
    }
    case "numbers":
      return task.fields.every((f, fi) => {
        const n = parseNumber(val(`${name}_${fi}`));
        return Number.isFinite(n) && Math.abs(n - f.answer) <= f.tol + 1e-9;
      });
    case "match":
      return task.pairs.every((_, li) => val(`${name}_${li}`) === String(li));
    case "order":
      return task.items.every((_, ii) => val(`${name}_${ii}`) === String(ii));
  }
  return false;
}

function missionIntro(m) {
  return `<div class="situation">
    <p>${esc(m.situation)}</p>
    ${m.formulas ? `<ul class="formulas">${m.formulas.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}
    ${m.table ? `<div class="table-scroll"><table><thead><tr>${m.table.head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${m.table.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>` : ""}
  </div>`;
}

function taskHtml({ mission, task, key }, run, idx) {
  const res = run.results[key];
  return `<li class="task${res === true ? " is-ok" : res === false ? " is-bad" : ""}" id="t-${key.replace(".", "_")}">
    <div class="task-q"><span class="no">${key}</span><span>${esc(task.q)}</span>
      ${res === true ? `<span class="badge s-richtig">Richtig</span>` : res === false ? `<span class="badge s-falsch">Falsch</span>` : ""}
    </div>
    ${taskInput(task, key, run.shuffles[key])}
    <div class="explain" hidden><span class="label">Erklärung</span><p>${esc(task.explain)}</p></div>
  </li>`;
}

// Rendert einen Test (Mission oder Abschlussprüfung) in ein Element
function renderTest(el, { items, grouped, onFinish, onRestart }) {
  let run = newRun(items);

  const draw = () => {
    let html = `<form id="test" novalidate>`;
    if (grouped) {
      const byMission = MISSIONS.map((m) => ({ m, its: run.items.filter((x) => x.mission.id === m.id) })).filter((g) => g.its.length);
      html += byMission.map(({ m, its }) => `
        <section class="group">
          <h2><span class="gno">${m.id}</span> ${esc(m.title)}</h2>
          ${missionIntro(m)}
          <ol class="tasks">${its.map((it) => taskHtml(it, run)).join("")}</ol>
        </section>`).join("");
    } else {
      html += `<ol class="tasks">${run.items.map((it) => taskHtml(it, run)).join("")}</ol>`;
    }
    html += `<div id="result" aria-live="polite"></div>
      <div class="row submit-row"><button type="submit" class="btn primary">Abgeben</button></div>
    </form>`;
    el.innerHTML = html;

    const form = el.querySelector("#test");
    form.onsubmit = (e) => {
      e.preventDefault();
      if (run.submitted) return;
      run.submitted = true;
      let ok = 0;
      for (const it of run.items) {
        const r = grade(it.task, it.key, form);
        run.results[it.key] = r;
        if (r) ok++;
      }
      const total = run.items.length;
      const pct = Math.floor((ok / total) * 100);
      const passed = ok === total;

      // Markierungen setzen, Eingaben sperren
      for (const it of run.items) {
        const li = el.querySelector(`#t-${it.key.replace(".", "_")}`);
        li.classList.add(run.results[it.key] ? "is-ok" : "is-bad");
        li.querySelector(".task-q").insertAdjacentHTML("beforeend",
          run.results[it.key] ? `<span class="badge s-richtig">Richtig</span>` : `<span class="badge s-falsch">Falsch</span>`);
        if (passed) li.querySelector(".explain").hidden = false;
      }
      form.querySelectorAll("input, select").forEach((x) => (x.disabled = true));
      form.querySelector(".submit-row").remove();

      const attempts = onFinish(passed);
      const res = el.querySelector("#result");
      res.innerHTML = passed
        ? `<div class="verdict pass"><strong>Bestanden – 100 %</strong><p>${ok} von ${total} Aufgaben richtig${attempts > 1 ? `, im ${attempts}. Versuch` : ""}. Die Erklärungen stehen jetzt bei jeder Aufgabe.</p></div>`
        : `<div class="verdict fail"><strong>Durchgefallen – ${pct} %</strong><p>${ok} von ${total} Aufgaben richtig. Bestanden ist nur mit 100 %. Schau dir die falschen Aufgaben an und starte den Test neu – alles wird neu gemischt.</p>
            <div class="row"><button type="button" class="btn primary" id="retry">Nochmal versuchen</button></div></div>`;
      el.querySelector("#retry")?.addEventListener("click", () => { onRestart?.(); run = newRun(items); draw(); window.scrollTo(0, 0); });
      res.scrollIntoView({ block: "center", behavior: "smooth" });
      // Fehlerzusammenfassung oben
      el.insertAdjacentHTML("afterbegin", passed
        ? `<div class="verdict pass top"><strong>Bestanden – 100 %</strong></div>`
        : `<div class="verdict fail top"><strong>Durchgefallen – ${pct} %</strong><p>Falsch: ${run.items.filter((it) => !run.results[it.key]).map((it) => `<a href="#t-${it.key.replace(".", "_")}" data-jump>${it.key}</a>`).join(" ")}</p></div>`);
      el.querySelectorAll("[data-jump]").forEach((a) => a.onclick = (ev) => { ev.preventDefault(); el.querySelector(a.getAttribute("href")).scrollIntoView({ block: "start", behavior: "smooth" }); });
    };
  };
  draw();
}

// ---------- Ansichten ----------
function setNav(name) {
  document.querySelectorAll("[data-nav]").forEach((a) => {
    if (a.dataset.nav === name) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
  });
}

function viewList() {
  setNav("missions");
  document.title = "Lerntutor BWL";
  const passedCount = MISSIONS.filter((m) => mState(m.id).passed).length;
  const ex = state.exam;
  app.innerHTML = `
    <section class="intro">
      <h1>BWL üben mit der SmartBike GmbH</h1>
      <p>10 Missionen aus dem Arbeitsblatt. Jede Mission ist ein Test. Bestanden hast du erst mit 100 % – sonst geht es von vorn los.</p>
      <div class="progress">
        ${passedCount} von ${MISSIONS.length} Missionen bestanden
        <div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="${MISSIONS.length}" aria-valuenow="${passedCount}" aria-label="Fortschritt"><span style="width:${(passedCount / MISSIONS.length) * 100}%"></span></div>
      </div>
    </section>
    <ol class="mlist">
      ${MISSIONS.map((m) => {
        const s = mState(m.id);
        const status = s.passed ? `<span class="m-count done">Bestanden</span>` : s.attempts ? `<span class="m-count fail">${s.attempts}× durchgefallen</span>` : `<span class="m-count">Offen</span>`;
        return `<li><a href="#/m/${m.id}">
          <span class="m-no">${m.id}</span>
          <span><span class="m-title">${esc(m.title)}</span><span class="m-topic">${esc(m.topic)} · ${m.tasks.length} Aufgaben</span></span>
          ${status}
        </a></li>`;
      }).join("")}
    </ol>
    <a class="exam-link" href="#/pruefung">
      <span><span class="m-title">Abschlussprüfung</span><span class="m-topic">Alle ${MISSIONS.reduce((n, m) => n + m.tasks.length, 0)} Aufgaben am Stück</span></span>
      <span class="m-count${ex.passed ? " done" : ex.attempts ? " fail" : ""}">${ex.passed ? "Bestanden" : ex.attempts ? `${ex.attempts}× durchgefallen` : "Offen"}</span>
    </a>
    <div class="row" style="margin-top:20px">
      <button class="linkbtn" id="reset">Fortschritt zurücksetzen</button>
    </div>`;
  document.getElementById("reset").onclick = () => {
    if (confirm("Gesamten Fortschritt löschen?")) { state = { missions: {}, exam: {} }; save(); viewList(); }
  };
}

function viewMission(id) {
  const m = MISSIONS.find((x) => x.id === id);
  if (!m) return viewList();
  setNav("missions");
  document.title = `Mission ${m.id}: ${m.title} – Lerntutor`;
  const s = mState(m.id);
  const prev = MISSIONS.find((x) => x.id === id - 1);
  const next = MISSIONS.find((x) => x.id === id + 1);

  app.innerHTML = `
    <a href="#/" class="back">← Alle Missionen</a>
    <div class="mhead">
      <span class="big">${m.id}</span>
      <div><h1>${esc(m.title)}</h1><div class="m-topic">${esc(m.topic)}${s.passed ? " · bestanden" : s.attempts ? ` · ${s.attempts}× durchgefallen` : ""}</div></div>
    </div>
    ${missionIntro(m)}
    <div id="testbox"></div>
    <nav class="next" aria-label="Missionen blättern">
      ${prev ? `<a href="#/m/${prev.id}">← ${prev.id}. ${esc(prev.title)}</a>` : "<span></span>"}
      ${next ? `<a href="#/m/${next.id}">${next.id}. ${esc(next.title)} →</a>` : `<a href="#/pruefung">Abschlussprüfung →</a>`}
    </nav>`;

  renderTest(document.getElementById("testbox"), {
    items: m.tasks.map((task, i) => ({ mission: m, task, key: `${m.id}.${i + 1}` })),
    onFinish: (passed) => {
      s.attempts += passed ? 0 : 1;
      if (passed) s.passed = true;
      save();
      return s.attempts + 1;
    },
  });
}

function viewExam() {
  setNav("exam");
  document.title = "Abschlussprüfung – Lerntutor";
  const ex = state.exam;
  const items = MISSIONS.flatMap((m) => m.tasks.map((task, i) => ({ mission: m, task, key: `${m.id}.${i + 1}` })));
  app.innerHTML = `
    <a href="#/" class="back">← Alle Missionen</a>
    <section class="intro">
      <h1>Abschlussprüfung</h1>
      <p>Alle ${items.length} Aufgaben am Stück. Eine falsche Antwort und du bist durchgefallen.${ex.passed ? " Du hast sie schon bestanden." : ex.attempts ? ` Bisher ${ex.attempts}× durchgefallen.` : ""}</p>
    </section>
    <div id="testbox"></div>`;
  renderTest(document.getElementById("testbox"), {
    items,
    grouped: true,
    onFinish: (passed) => {
      ex.attempts = (ex.attempts || 0) + (passed ? 0 : 1);
      if (passed) ex.passed = true;
      save();
      return ex.attempts + 1;
    },
  });
}

// ---------- Router ----------
function route() {
  const h = location.hash;
  const m = h.match(/^#\/m\/(\d+)/);
  if (m) viewMission(Number(m[1]));
  else if (h.startsWith("#/pruefung")) viewExam();
  else viewList();
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", route);
route();
