// Netlify Function: /api/tutor
// mode "check": prüft eine Antwort gegen die Musterlösung
// mode "chat":  Tutor-Chat mit dem Lernstoff als Wissensbasis
//
// Umgebungsvariablen (in Netlify setzen, nie ins Repo):
//   GROQ_API_KEY   – Pflicht
//   GROQ_MODEL     – optional, Standard: openai/gpt-oss-120b
//   APP_PASSWORD   – optional; wenn gesetzt, braucht die App dieses Passwort
//   MOCK_AI=1      – nur für lokale Tests, antwortet ohne Groq

import { MISSIONS, SUBJECT, knowledgeText } from "../../public/missions.js";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MAX_ANSWER = 2000;
const MAX_TURNS = 12;

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

const env = (k) => (globalThis.Netlify?.env?.get?.(k) ?? process.env[k] ?? "").trim();

const TUTOR_STYLE = `Du bist ein geduldiger BWL-Lerntutor für Auszubildende an einer deutschen Berufsschule.
Sprich den Lernenden mit „du“ an. Antworte auf Deutsch, kurz und konkret, ohne Floskeln und ohne Emojis.
Erkläre in einfachen Worten, mit Beispielen aus dem Fahrradbetrieb SmartBike. Rechnungen zeigst du Schritt für Schritt mit Einheit.
Halte dich an die Musterlösungen unten. Wenn etwas nicht im Lernstoff steht, sag das ehrlich und erkläre es trotzdem fachlich korrekt.`;

async function callGroq(messages, maxTokens) {
  const model = env("GROQ_MODEL") || "openai/gpt-oss-120b";
  const body = { model, messages, temperature: 0.3, max_completion_tokens: maxTokens };
  if (model.startsWith("openai/gpt-oss")) body.reasoning_effort = "low";

  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: { authorization: `Bearer ${env("GROQ_API_KEY")}`, "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("Groq-Fehler", res.status, detail.slice(0, 500));
    const err = new Error(res.status === 429 ? "rate" : "upstream");
    err.status = res.status;
    throw err;
  }
  const data = await res.json();
  return (data.choices?.[0]?.message?.content || "").trim();
}

function parseCheck(text) {
  const m = text.match(/STATUS:\s*(richtig|teilweise|falsch)/i);
  const status = m ? m[1].toLowerCase() : "teilweise";
  const feedback = text.replace(/^.*STATUS:.*$/im, "").trim() || text.trim();
  return { status, feedback };
}

async function handleCheck({ missionId, taskIndex, answer }) {
  const mission = MISSIONS.find((m) => m.id === Number(missionId));
  const task = mission?.tasks[Number(taskIndex)];
  if (!task) return json(400, { error: "Aufgabe nicht gefunden." });
  const text = String(answer || "").trim().slice(0, MAX_ANSWER);
  if (!text) return json(400, { error: "Schreib zuerst eine Antwort." });

  if (env("MOCK_AI") === "1") {
    return json(200, {
      status: text.length > 25 ? "richtig" : "teilweise",
      feedback: "Testmodus: Hier steht später die Rückmeldung der KI. Schau dir die Musterlösung an, um zu vergleichen.",
    });
  }

  const context = [
    `Mission ${mission.id} – ${mission.title}`,
    `Situation: ${mission.situation}`,
    mission.formulas ? `Formeln: ${mission.formulas.join("; ")}` : "",
    mission.table ? `Tabelle: ${mission.table.rows.map((r) => r.join(" | ")).join(" / ")}` : "",
    `Aufgabe: ${task.q}`,
    `Musterlösung: ${task.a}`,
    task.mistake ? `Typischer Fehler: ${task.mistake}` : "",
  ].filter(Boolean).join("\n");

  const system = `${TUTOR_STYLE}

Du bewertest jetzt eine Antwort. Inhaltlich gleichwertige Formulierungen sind richtig, Rechtschreibung zählt nicht.
Fehlt etwas Wichtiges (z. B. Einheit, zweiter Begriff, Begründung), ist die Antwort „teilweise“.
Verrate die Musterlösung nicht komplett, gib einen konkreten Hinweis, was fehlt oder falsch ist.
Format – genau so:
STATUS: richtig | teilweise | falsch
Danach 1 bis 3 kurze Sätze Rückmeldung.`;

  const out = await callGroq(
    [
      { role: "system", content: system },
      { role: "user", content: `${context}\n\nAntwort des Lernenden:\n${text}` },
    ],
    900,
  );
  return json(200, parseCheck(out));
}

async function handleChat({ messages }) {
  const history = (Array.isArray(messages) ? messages : [])
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_ANSWER) }));
  if (!history.length || history[history.length - 1].role !== "user") {
    return json(400, { error: "Keine Frage gefunden." });
  }

  if (env("MOCK_AI") === "1") {
    return json(200, { reply: "Testmodus: Hier antwortet später der Tutor über Groq. Deine Frage war: " + history.at(-1).content });
  }

  const system = `${TUTOR_STYLE}

Thema: ${SUBJECT}. Lernstoff mit Musterlösungen:

${knowledgeText()}`;
  const reply = await callGroq([{ role: "system", content: system }, ...history], 1500);
  return json(200, { reply });
}

export default async (req) => {
  if (req.method !== "POST") return json(405, { error: "Nur POST erlaubt." });

  const password = env("APP_PASSWORD");
  if (password && req.headers.get("x-app-password") !== password) {
    return json(401, { error: "Passwort falsch." });
  }
  if (!env("GROQ_API_KEY") && env("MOCK_AI") !== "1") {
    return json(500, { error: "Der Tutor ist noch nicht eingerichtet: GROQ_API_KEY fehlt." });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return json(400, { error: "Ungültige Anfrage." });
  }

  try {
    if (body.mode === "check") return await handleCheck(body);
    if (body.mode === "chat") return await handleChat(body);
    return json(400, { error: "Unbekannter Modus." });
  } catch (e) {
    if (e.message === "rate") return json(429, { error: "Gerade zu viele Anfragen. Versuch es in einer Minute nochmal." });
    console.error(e);
    return json(502, { error: "Die KI antwortet gerade nicht. Versuch es gleich nochmal." });
  }
};

export const config = { path: "/api/tutor" };
