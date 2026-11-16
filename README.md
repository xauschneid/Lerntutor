# Lerntutor

Web-App zum BWL-Üben mit der SmartBike GmbH: 10 Missionen aus dem Arbeitsblatt und eine
Abschlussprüfung. Die Seite prüft alle Antworten selbst – ohne KI. Bestanden ist nur mit 100 %,
sonst startet der Test neu gemischt.

## Aufbau
- `public/` – die komplette App (HTML, CSS, JS ohne Build-Schritt)
- `public/missions.js` – Aufgaben mit Lösungen
- `BWL_SmartBike_Musterloesung.md`, `BWL_SmartBike_Arbeitsblatt.pdf` – Original-Lernstoff

Aufgabentypen: Auswahl, Mehrfachauswahl, Zahl, mehrere Zahlen, Zuordnen, Reihenfolge.
Zahlen dürfen deutsch oder englisch geschrieben werden (12.000 / 1,21 / 1.21).

## Lokal testen
```bash
npm run dev   # http://localhost:8888
```

## Neuen Stoff hinzufügen
Missionen in `public/missions.js` ergänzen – die Seite übernimmt sie automatisch.
