// Lokaler Testserver ohne Netlify-CLI: liefert public/ aus und leitet /api/tutor an die Function.
// Start: MOCK_AI=1 node dev-server.mjs   (oder mit GROQ_API_KEY=... für echte Antworten)
import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import handler from "./netlify/functions/tutor.mjs";

const root = new URL("./public/", import.meta.url).pathname;
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" };
const port = Number(process.env.PORT || 8888);

http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`);
  if (url.pathname === "/api/tutor") {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const request = new Request(url, { method: req.method, headers: req.headers, body: req.method === "POST" ? Buffer.concat(chunks) : undefined });
    const r = await handler(request);
    res.writeHead(r.status, Object.fromEntries(r.headers));
    return res.end(await r.text());
  }
  const path = normalize(join(root, url.pathname === "/" ? "index.html" : url.pathname));
  if (!path.startsWith(root)) { res.writeHead(403); return res.end(); }
  try {
    const body = await readFile(path);
    res.writeHead(200, { "content-type": types[extname(path)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404); res.end("Nicht gefunden");
  }
}).listen(port, () => console.log(`Lerntutor läuft auf http://localhost:${port}`));
