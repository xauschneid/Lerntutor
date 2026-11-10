# Lerntutor

Web-App zum BWL-Üben mit der SmartBike GmbH: 10 Missionen aus dem Arbeitsblatt,
KI-Rückmeldung auf deine Antworten und ein Tutor-Chat. Läuft komplett auf Netlify,
die KI kommt von Groq.

## Aufbau
- `public/` – Oberfläche (HTML, CSS, JS ohne Build-Schritt)
- `public/missions.js` – Lernstoff mit Musterlösungen (wird von Seite und Function genutzt)
- `netlify/functions/tutor.mjs` – `/api/tutor`: Antwort prüfen und Chat über Groq
- `BWL_SmartBike_Musterloesung.md`, `BWL_SmartBike_Arbeitsblatt.pdf` – Original-Lernstoff

## Netlify einrichten
1. Repo in Netlify importieren (Build-Einstellungen kommen aus `netlify.toml`).
2. Unter *Site configuration → Environment variables* setzen:
   - `GROQ_API_KEY` – dein Key von console.groq.com (Pflicht)
   - `APP_PASSWORD` – Passwort für die App (empfohlen, sonst kann jeder deinen Key verbrauchen)
   - `GROQ_MODEL` – optional, Standard `openai/gpt-oss-120b`
3. Neu deployen.

## Lokal testen
```bash
npm run dev            # Testmodus ohne KI auf http://localhost:8888
GROQ_API_KEY=... node dev-server.mjs   # mit echter KI
```

## Neuen Lernstoff hinzufügen
Missionen in `public/missions.js` ergänzen – Seite und Tutor übernehmen sie automatisch.
