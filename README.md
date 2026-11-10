# Lerntutor

DeepTutor 1.7.2 mit einer Wissensdatenbank zum BWL-Arbeitsblatt der SmartBike GmbH.

## Inhalt
- `BWL_SmartBike_Arbeitsblatt.pdf` – Arbeitsblatt mit 10 Missionen
- `BWL_SmartBike_Musterloesung.md` – Musterlösung mit typischen Fehlern

## Starten
```bash
python3 -m venv .venv && source .venv/bin/activate
python -m pip install -U "deeptutor[full,claude-code]"
deeptutor start
```
Danach in den Einstellungen ein Sprachmodell und ein Embedding-Modell eintragen und
eine Wissensdatenbank „BWL-SmartBike“ mit den beiden Dateien anlegen.
