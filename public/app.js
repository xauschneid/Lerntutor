import { MISSIONS } from "./missions.js";

const app = document.getElementById("app");
const STORE_KEY = "lerntutor.v1";
const PW_KEY = "lerntutor.pw";

// ---------- Speicher (nur im Browser, darf fehlen) ----------
function load() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { return {}; }
}
let state = Object.assign({ tasks: {}, chat: [] }, load());
function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch {}
}
const key = (m, i) => `${m}.${i}`;
const taskState = (m, i) => (state.tasks[key(m, i)] ||= {});

const getPw = () => { try { return localStorage.getItem(PW_KEY) || ""; } catch { return ""; } };
const setPw = (v) => { try { localStorage.setItem(PW_KEY, v); } catch {} };

// ---------- Hilfsfunktionen ----------
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const totalTasks = MISSIONS.reduce((n, m) => n + m.tasks.length, 0);
const solvedIn = (m) => m.tasks.filter((_, i) => taskState(m.id, i).status === "richtig").length;
const solvedAll = () => MISSIONS.reduce((n, m) => n + solvedIn(m), 0);
const STATUS_LABEL = { richtig: "Richtig", teilweise: "Teilweise", falsch: "Noch nicht" };

// Kleine, sichere Markdown-Darstellung für Tutor-Antworten
function md(text) {
  const inline = (s) => esc(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
  const lines = String(text).replace(/\r/g, "").split("\n");
  let html = "", list = null, para = [], table = [];
  const flushPara = () => { if (para.length) { html += `<p>${para.map(inline).join("<br>")}</p>`; para = []; } };
  const flushList = () => { if (list) { html += `</${list}>`; list = null; } };
  const flushTable = () => {
    if (!table.length) return;
    const rows = table.filter((r) => !/^\|?\s*:?-{2,}/.test(r)).map((r) => r.replace(/^\||\|$/g, "").split("|").map((c) => c.trim()));
    html += `<div class="table-scroll"><table>${rows.map((r, i) => `<tr>${r.map((c) => i === 0 ? `<th>${inline(c)}</th>` : `<td>${inline(c)}</td>`).join("")}</tr>`).join("")}</table></div>`;
    table = [];
  };
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (/^\s*\|.*\|\s*$/.test(line)) { flushPara(); flushList(); table.push(line.trim()); continue; }
    flushTable();
    const ul = line.match(/^\s*[-*•]\s+(.*)/);
    const ol = line.match(/^\s*\d+[.)]\s+(.*)/);
    const h = line.match(/^#{1,4}\s+(.*)/);
    if (ul || ol) {
      flushPara();
      const type = ul ? "ul" : "ol";
      if (list !== type) { flushList(); html += `<${type}>`; list = type; }
      html += `<li>${inline((ul || ol)[1])}</li>`;
    } else if (h) {
      flushPara(); flushList(); html += `<p><strong>${inline(h[1])}</strong></p>`;
    } else if (!line.trim()) {
      flushPara(); flushList();
    } else {
      flushList(); para.push(line);
    }
  }
  flushPara(); flushList(); flushTable();
  return html;
}

// ---------- API ----------
function askPassword() {
  return new Promise((resolve) => {
    const dlg = document.getElementById("pw-dialog");
    const input = document.getElementById("pw-input");
    const form = document.getElementById("pw-form");
    input.value = "";
    form.onsubmit = (e) => { e.preventDefault(); dlg.close(); setPw(input.value); resolve(true); };
    dlg.oncancel = () => resolve(false);
    dlg.showModal();
    input.focus();
  });
}

async function api(body, retried = false) {
  const res = await fetch("/api/tutor", {
    method: "POST",
    headers: { "content-type": "application/json", "x-app-password": getPw() },
    body: JSON.stringify(body),
  });
  let data = {};
  try { data = await res.json(); } catch {}
  if (res.status === 401 && !retried) {
    if (await askPassword()) return api(body, true);
  }
  if (!res.ok) throw new Error(data.error || "Da ist etwas schiefgelaufen. Versuch es nochmal.");
  return data;
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
  const done = solvedAll();
  app.innerHTML = `
    <section class="intro">
      <h1>BWL üben mit der SmartBike GmbH</h1>
      <p>10 Missionen aus dem Arbeitsblatt. Schreib deine Antwort, lass sie prüfen und schau dir bei Bedarf die Lösung an.</p>
      <div class="progress">
        ${done} von ${totalTasks} Aufgaben richtig
        <div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="${totalTasks}" aria-valuenow="${done}" aria-label="Fortschritt"><span style="width:${(done / totalTasks) * 100}%"></span></div>
      </div>
    </section>
    <ol class="mlist">
      ${MISSIONS.map((m) => {
        const s = solvedIn(m), all = s === m.tasks.length;
        return `<li><a href="#/m/${m.id}">
          <span class="m-no">${m.id}</span>
          <span><span class="m-title">${esc(m.title)}</span><span class="m-topic">${esc(m.topic)}</span></span>
          <span class="m-count${all ? " done" : ""}">${all ? "Fertig" : `${s}/${m.tasks.length}`}</span>
        </a></li>`;
      }).join("")}
    </ol>
    <div class="row" style="margin-top:20px">
      <button class="linkbtn" id="reset">Fortschritt zurücksetzen</button>
    </div>`;
  document.getElementById("reset").onclick = () => {
    if (confirm("Alle Antworten und den Fortschritt löschen?")) { state.tasks = {}; save(); viewList(); }
  };
}

function taskHtml(m, t, i) {
  const ts = taskState(m.id, i);
  return `
    <li class="task" id="t${i}">
      <div class="task-q"><span class="no">${m.id}.${i + 1}</span><span>${esc(t.q)}</span>
        ${ts.status ? `<span class="badge s-${ts.status}">${STATUS_LABEL[ts.status]}</span>` : ""}</div>
      <textarea id="a${i}" aria-label="Deine Antwort zu ${m.id}.${i + 1}" placeholder="Deine Antwort">${esc(ts.answer || "")}</textarea>
      <div class="row">
        <button class="btn primary" data-check="${i}">Prüfen</button>
        <button class="btn" data-solution="${i}" aria-expanded="${ts.showSolution ? "true" : "false"}">${ts.showSolution ? "Lösung ausblenden" : "Lösung zeigen"}</button>
      </div>
      <div data-out="${i}" aria-live="polite">
        ${ts.feedback ? `<div class="feedback s-${ts.status}"><strong>${STATUS_LABEL[ts.status]}</strong><p>${esc(ts.feedback)}</p></div>` : ""}
      </div>
      ${ts.showSolution ? `<div class="solution"><span class="label">Musterlösung</span><p>${esc(t.a)}</p>${t.mistake ? `<p class="mistake">Typischer Fehler: ${esc(t.mistake)}</p>` : ""}</div>` : ""}
    </li>`;
}

function viewMission(id) {
  const m = MISSIONS.find((x) => x.id === id);
  if (!m) return viewList();
  setNav("missions");
  document.title = `Mission ${m.id}: ${m.title} – Lerntutor`;
  const prev = MISSIONS.find((x) => x.id === id - 1);
  const next = MISSIONS.find((x) => x.id === id + 1);

  app.innerHTML = `
    <a href="#/" class="back">← Alle Missionen</a>
    <div class="mhead">
      <span class="big">${m.id}</span>
      <div><h1>${esc(m.title)}</h1><div class="m-topic">${esc(m.topic)}</div></div>
    </div>
    <div class="situation">
      <p>${esc(m.situation)}</p>
      ${m.formulas ? `<ul class="formulas">${m.formulas.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}
      ${m.table ? `<div class="table-scroll"><table><thead><tr>${m.table.head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${m.table.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>` : ""}
      ${m.note ? `<p class="note">${esc(m.note)}</p>` : ""}
    </div>
    <ol class="tasks">${m.tasks.map((t, i) => taskHtml(m, t, i)).join("")}</ol>
    <nav class="next" aria-label="Missionen blättern">
      ${prev ? `<a href="#/m/${prev.id}">← ${prev.id}. ${esc(prev.title)}</a>` : "<span></span>"}
      ${next ? `<a href="#/m/${next.id}">${next.id}. ${esc(next.title)} →</a>` : `<a href="#/chat">Tutor fragen →</a>`}
    </nav>`;

  const rerenderTask = (i, focusSelector) => {
    const li = document.getElementById(`t${i}`);
    li.outerHTML = taskHtml(m, m.tasks[i], i);
    bind();
    if (focusSelector) document.querySelector(focusSelector)?.focus();
  };

  function bind() {
    app.querySelectorAll("textarea[id^=a]").forEach((ta) => {
      ta.oninput = () => { taskState(m.id, Number(ta.id.slice(1))).answer = ta.value; save(); };
    });
    app.querySelectorAll("[data-solution]").forEach((b) => {
      b.onclick = () => {
        const i = Number(b.dataset.solution);
        const ts = taskState(m.id, i);
        ts.showSolution = !ts.showSolution; save();
        rerenderTask(i, `[data-solution="${i}"]`);
      };
    });
    app.querySelectorAll("[data-check]").forEach((b) => {
      b.onclick = async () => {
        const i = Number(b.dataset.check);
        const ts = taskState(m.id, i);
        const out = app.querySelector(`[data-out="${i}"]`);
        const answer = (document.getElementById(`a${i}`).value || "").trim();
        if (!answer) { out.innerHTML = `<p class="error">Schreib zuerst eine Antwort.</p>`; return; }
        b.disabled = true; b.textContent = "Wird geprüft …";
        try {
          const r = await api({ mode: "check", missionId: m.id, taskIndex: i, answer });
          ts.status = r.status; ts.feedback = r.feedback; ts.answer = answer; save();
          rerenderTask(i, `[data-check="${i}"]`);
        } catch (e) {
          b.disabled = false; b.textContent = "Prüfen";
          out.innerHTML = `<p class="error">${esc(e.message)}</p>`;
        }
      };
    });
  }
  bind();
}

const SUGGESTIONS = [
  "Erklär mir den Unterschied zwischen Umsatz und Gewinn",
  "Wie rechne ich den Break-Even-Point?",
  "Stell mir eine Übungsfrage zur Bilanz",
  "Was ist der Unterschied zwischen Liquidität und Gewinn?",
];

function viewChat() {
  setNav("chat");
  document.title = "Tutor fragen – Lerntutor";
  app.innerHTML = `
    <div class="chat-head">
      <h1>Tutor fragen</h1>
      <p>Frag alles zum Stoff der 10 Missionen. Der Tutor kennt die Musterlösungen und erklärt Schritt für Schritt.</p>
    </div>
    ${state.chat.length ? "" : `<div class="suggest">${SUGGESTIONS.map((s) => `<button type="button" data-suggest>${esc(s)}</button>`).join("")}</div>`}
    <div class="msgs" id="msgs" aria-live="polite">
      ${state.chat.map((m) => `<div class="msg ${m.role}">${m.role === "assistant" ? md(m.content) : `<p>${esc(m.content)}</p>`}</div>`).join("")}
    </div>
    <form class="chat-input" id="chat-form">
      <textarea id="q" rows="1" placeholder="Deine Frage" aria-label="Deine Frage" required></textarea>
      <button class="btn primary" type="submit">Senden</button>
    </form>
    ${state.chat.length ? `<button class="linkbtn" id="clear">Verlauf löschen</button>` : ""}`;

  const form = document.getElementById("chat-form");
  const q = document.getElementById("q");
  const msgs = document.getElementById("msgs");
  q.addEventListener("input", () => { q.style.height = "auto"; q.style.height = Math.min(q.scrollHeight, 160) + "px"; });
  q.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.isComposing) { e.preventDefault(); form.requestSubmit(); }
  });
  document.getElementById("clear")?.addEventListener("click", () => { state.chat = []; save(); viewChat(); });
  app.querySelectorAll("[data-suggest]").forEach((b) => b.onclick = () => { q.value = b.textContent; form.requestSubmit(); });

  form.onsubmit = async (e) => {
    e.preventDefault();
    const text = q.value.trim();
    if (!text) return;
    const btn = form.querySelector("button");
    state.chat.push({ role: "user", content: text }); save();
    app.querySelector(".suggest")?.remove();
    msgs.insertAdjacentHTML("beforeend", `<div class="msg user"><p>${esc(text)}</p></div><div class="msg assistant pending" id="pending"><p>Tutor schreibt …</p></div>`);
    q.value = ""; q.style.height = "auto";
    btn.disabled = true;
    document.getElementById("pending").scrollIntoView({ block: "end", behavior: "smooth" });
    try {
      const r = await api({ mode: "chat", messages: state.chat });
      state.chat.push({ role: "assistant", content: r.reply }); save();
      const p = document.getElementById("pending");
      p.classList.remove("pending"); p.removeAttribute("id"); p.innerHTML = md(r.reply);
      if (!document.getElementById("clear")) {
        form.insertAdjacentHTML("afterend", `<button class="linkbtn" id="clear">Verlauf löschen</button>`);
        document.getElementById("clear").onclick = () => { state.chat = []; save(); viewChat(); };
      }
    } catch (err) {
      state.chat.pop(); save();
      const p = document.getElementById("pending");
      p.classList.remove("pending"); p.removeAttribute("id"); p.innerHTML = `<p class="error">${esc(err.message)}</p>`;
      q.value = text;
    } finally {
      btn.disabled = false; q.focus();
    }
  };
}

// ---------- Router ----------
function route() {
  const h = location.hash;
  const m = h.match(/^#\/m\/(\d+)/);
  if (m) viewMission(Number(m[1]));
  else if (h.startsWith("#/chat")) viewChat();
  else viewList();
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", route);
route();
