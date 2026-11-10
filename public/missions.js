// Lernstoff: BWL-Arbeitsblatt SmartBike GmbH.
// Wird vom Frontend und von der Netlify Function gemeinsam genutzt.

export const SUBJECT = "BWL – SmartBike GmbH";

export const MISSIONS = [
  {
    id: 1,
    title: "Die neue Maschine",
    topic: "Abschreibung",
    situation:
      "Die SmartBike GmbH kauft eine CNC-Maschine für 120.000 €. Der Gewinn soll aber nicht in diesem Jahr wegen der Maschine stark einbrechen. Die Maschine soll 10 Jahre genutzt werden.",
    tasks: [
      { q: "Welcher BWL-Begriff passt zu dieser Situation?", a: "Abschreibung (AfA)." },
      {
        q: "Erkläre den Begriff in eigenen Worten.",
        a: "Die Maschine verliert durch Nutzung an Wert. Die Anschaffungskosten werden deshalb auf die Nutzungsdauer verteilt und jedes Jahr anteilig als Aufwand gebucht.",
      },
      {
        q: "Warum wird die Maschine nicht vollständig als Aufwand des ersten Jahres behandelt?",
        a: "Die Maschine wird 10 Jahre genutzt und trägt jedes Jahr zum Unternehmenserfolg bei. Der Aufwand wird auf die Jahre der Nutzung verteilt – sonst würde der Gewinn im ersten Jahr stark einbrechen.",
      },
      {
        q: "Berechne bei linearer Abschreibung die jährliche Abschreibung.",
        a: "120.000 € : 10 Jahre = 12.000 € pro Jahr.",
        mistake: "120.000 : 12.000 = 10 Jahre rechnet rückwärts und liefert nur die bekannte Nutzungsdauer.",
      },
    ],
  },
  {
    id: 2,
    title: "Der Weg zum Kunden",
    topic: "Lieferkette",
    situation:
      "Ein E-Bike entsteht aus vielen Einzelteilen: Stahlwerk → Teilehersteller → SmartBike GmbH → Großhändler → Fahrradhändler → Kunde.",
    tasks: [
      {
        q: "Welcher BWL-Begriff beschreibt diese gesamte Kette (deutsch und englisch)?",
        a: "Lieferkette / Supply Chain (verwandt: Wertschöpfungskette).",
        mistake: "Den englischen Begriff vergessen.",
      },
      {
        q: "Erkläre den Begriff.",
        a: "Alle Unternehmen und Schritte, die nötig sind, damit aus Rohstoffen ein fertiges Produkt beim Kunden ankommt – mit Material-, Informations- und Geldfluss.",
      },
      {
        q: "Beschreibe die Kette mit Pfeilen und mehreren möglichen Zulieferern.",
        a: "Stahlwerk → Rahmenhersteller → SmartBike; Akkuhersteller → SmartBike; Bremsenhersteller → SmartBike; SmartBike → Großhändler → Fahrradhändler → Kunde.",
        mistake: "Das Stahlwerk liefert an die Teilehersteller, nicht direkt an SmartBike.",
      },
      {
        q: "Nenne zwei mögliche Probleme, wenn ein Glied der Kette ausfällt.",
        a: "Produktionsstopp bei allen folgenden Gliedern; Lieferverzögerungen; Umsatzausfall; höhere Kosten durch Ersatzlieferanten (zwei davon genügen).",
      },
    ],
  },
  {
    id: 3,
    title: "Das Lager: FIFO und LIFO",
    topic: "Lagerentnahme",
    situation:
      "Im Lager liegen Reifen. Im Januar werden 100 Reifen eingelagert, im Februar weitere 100 und im März weitere 100. Nun werden 100 Reifen entnommen. Aber welche?",
    tasks: [
      {
        q: "Was bedeuten FIFO und LIFO?",
        a: "FIFO = First In, First Out: was zuerst eingelagert wurde, wird zuerst entnommen. LIFO = Last In, First Out: was zuletzt eingelagert wurde, wird zuerst entnommen.",
      },
      { q: "Welche Reifen werden bei FIFO zuerst entnommen?", a: "Die Reifen aus dem Januar." },
      { q: "Welche Reifen werden bei LIFO zuerst entnommen?", a: "Die Reifen aus dem März." },
      {
        q: "Nenne je ein Beispiel aus dem Alltag für FIFO und LIFO.",
        a: "FIFO: Lebensmittel im Kühlschrank – ältere zuerst verbrauchen. LIFO: Stapel Teller im Schrank – der oberste wird zuerst genommen.",
      },
    ],
  },
  {
    id: 4,
    title: "Das Lager zählt",
    topic: "Inventur",
    situation:
      "Zum Jahresende werden sämtliche Fahrräder, Ersatzteile und Werkzeuge im Lager gezählt.",
    tasks: [
      { q: "Wie heißt dieser Vorgang?", a: "Inventur." },
      {
        q: "Erkläre den Begriff.",
        a: "Mengen- und wertmäßige Erfassung aller Vermögensgegenstände und Schulden eines Unternehmens zu einem Stichtag.",
      },
      {
        q: "Warum führt ein Unternehmen eine solche Erfassung durch?",
        a: "Sie ist gesetzlich vorgeschrieben (§ 240 HGB) und Grundlage für Inventar und Bilanz. Außerdem wird der Soll-Bestand der Buchhaltung mit dem Ist-Bestand abgeglichen, um Schwund, Diebstahl und Fehler zu erkennen.",
      },
      {
        q: "Nenne mindestens drei Dinge, die SmartBike dabei erfassen könnte.",
        a: "Fertige Fahrräder, Ersatzteile (z. B. Reifen, Akkus), Werkzeuge, Rohmaterial.",
        mistake: "Drei Fahrradtypen (E-Bike, Rennrad, Mountainbike) sind nur eine Kategorie.",
      },
    ],
  },
  {
    id: 5,
    title: "Verkaufserfolg",
    topic: "Umsatz und Gewinn",
    situation:
      "SmartBike verkauft im Jahr Fahrräder für 4.000.000 €. Die Gesamtkosten betragen 3.300.000 €.",
    tasks: [
      {
        q: "Erkläre die Begriffe Umsatz, Erlös, Kosten und Gewinn.",
        a: "Umsatz: Wert aller verkauften Waren und Leistungen (Menge × Preis). Erlös: Einnahmen aus dem Verkauf, oft gleichbedeutend mit Umsatzerlös. Kosten: bewerteter Verbrauch von Gütern und Dienstleistungen für die Leistungserstellung. Gewinn: was nach Abzug der Kosten übrig bleibt.",
      },
      { q: "Berechne den Gewinn.", a: "4.000.000 € − 3.300.000 € = 700.000 €." },
      {
        q: "Sind Umsatz und Gewinn dasselbe? Begründe.",
        a: "Nein. Umsatz ist alles, was durch Verkäufe hereinkommt. Gewinn ist erst der Rest nach Abzug der Kosten.",
      },
      {
        q: "Formuliere einen Merksatz, der Umsatz und Gewinn unterscheidet.",
        a: "Umsatz ist, was ein Unternehmen durch Verkäufe erzielt. Gewinn ist, was nach Abzug der Kosten übrig bleibt.",
      },
    ],
  },
  {
    id: 6,
    title: "Geld auf dem Konto",
    topic: "Liquidität",
    situation:
      "Die SmartBike GmbH muss morgen Lieferanten bezahlen. Auf dem Bankkonto befinden sich jedoch nur 8.000 €.",
    tasks: [
      { q: "Welcher Begriff beschreibt die Fähigkeit, Zahlungen fristgerecht leisten zu können?", a: "Liquidität." },
      {
        q: "Erkläre den Begriff.",
        a: "Die Fähigkeit, fällige Rechnungen und Schulden jederzeit pünktlich und in voller Höhe zu bezahlen.",
      },
      {
        q: "Warum kann ein Unternehmen Gewinn machen und trotzdem Zahlungsprobleme haben?",
        a: "Gewinn ist nicht gleich Geld auf dem Konto. Kunden haben zum Beispiel noch nicht bezahlt (Forderungen), oder das Geld steckt im Lager oder in Maschinen.",
      },
      {
        q: "Nenne zwei Maßnahmen, mit denen SmartBike seine Zahlungsfähigkeit verbessern könnte.",
        a: "Kundenrechnungen schneller einfordern; Ausgaben verschieben oder einen kurzfristigen Kredit aufnehmen.",
      },
    ],
  },
  {
    id: 7,
    title: "Blick in die Bilanz",
    topic: "Bilanz",
    situation:
      "SmartBike besitzt Maschinen, Gebäude, Bankguthaben und Forderungen. Gleichzeitig bestehen Bankkredite.",
    tasks: [
      {
        q: "Was zeigt eine Bilanz?",
        a: "Vermögen und Kapital eines Unternehmens zu einem Stichtag: welches Vermögen es besitzt und wie dieses finanziert wurde.",
      },
      { q: "Welche Seite zeigt das Vermögen?", a: "Die Aktivseite." },
      { q: "Welche Seite zeigt die Finanzierung bzw. das Kapital?", a: "Die Passivseite." },
      {
        q: "Ordne Maschinen, Bankguthaben, Bankkredite und Eigenkapital den passenden Bereichen zu.",
        a: "Maschinen → Aktiva, Anlagevermögen. Bankguthaben → Aktiva, Umlaufvermögen. Bankkredite → Passiva, Fremdkapital. Eigenkapital → Passiva, Eigenkapital.",
      },
    ],
  },
  {
    id: 8,
    title: "Finanzierung",
    topic: "Eigen- und Fremdkapital",
    situation:
      "Die Eigentümer investieren 300.000 €. Zusätzlich nimmt SmartBike einen Kredit über 700.000 € auf.",
    tasks: [
      {
        q: "Was ist Eigenkapital?",
        a: "Kapital, das die Eigentümer selbst ins Unternehmen einbringen, plus einbehaltene Gewinne.",
        mistake: "Nur „mein eigenes Geld“ ist zu ungenau.",
      },
      {
        q: "Was ist Fremdkapital?",
        a: "Kapital von außen, das zurückgezahlt werden muss, z. B. Kredite, Anleihen, Lieferantenschulden.",
      },
      { q: "Ordne die beiden Beträge zu.", a: "300.000 € = Eigenkapital, 700.000 € = Fremdkapital." },
      {
        q: "Nenne einen Vorteil und einen Nachteil von Fremdkapital.",
        a: "Vorteil: Investitionen und schnelleres Wachstum möglich, ohne dass neue Eigentümer mitreden. Nachteil: Zinsen und Tilgung müssen bezahlt werden, auch in schlechten Jahren.",
      },
    ],
  },
  {
    id: 9,
    title: "Lohnt sich die Produktion?",
    topic: "Deckungsbeitrag",
    situation:
      "Ein Fahrrad wird für 2.400 € verkauft. Die variablen Kosten betragen 1.600 €. Die Fixkosten betragen 320.000 € pro Jahr.",
    tasks: [
      {
        q: "Erkläre, was der Deckungsbeitrag aussagt.",
        a: "Deckungsbeitrag = Verkaufspreis − variable Kosten. Er zeigt, wie viel jedes verkaufte Stück zur Deckung der Fixkosten beiträgt. Sind die Fixkosten gedeckt, ist der Rest Gewinn.",
      },
      { q: "Berechne den Deckungsbeitrag je Fahrrad.", a: "2.400 € − 1.600 € = 800 €." },
      { q: "Berechne den Break-Even-Point in Stück.", a: "320.000 € : 800 € = 400 Fahrräder." },
      {
        q: "Was bedeutet das Ergebnis für SmartBike?",
        a: "Bei 400 Fahrrädern sind alle Kosten gedeckt, der Gewinn ist 0. Ab dem 401. Fahrrad macht SmartBike Gewinn.",
      },
    ],
  },
  {
    id: 10,
    title: "Das Unternehmen bewerten",
    topic: "Kennzahlen",
    situation:
      "SmartBike produziert 6.000 Fahrräder mit 30 Mitarbeitenden. Umsatzerlöse: 4.000.000 €. Kosten: 3.300.000 €. Gewinn: 420.000 €. Eigenkapital: 2.100.000 €.",
    formulas: [
      "Produktivität P = Produktionsmenge : Arbeitseinsatz (Stk. pro Mitarbeiter)",
      "Wirtschaftlichkeit W = Umsatzerlöse : Kosten (ohne Einheit, über 1 = wirtschaftlich)",
      "Eigenkapitalrentabilität REK = Gewinn : Eigenkapital × 100 (in %)",
    ],
    table: {
      head: ["", "Eigenkapital", "Gewinn", "Umsatz", "Kosten", "Fahrräder", "Mitarbeiter"],
      rows: [
        ["Jahr 1", "2.100.000 €", "420.000 €", "4.000.000 €", "3.300.000 €", "6.000", "30"],
        ["Jahr 2", "2.100.000 €", "440.000 €", "4.600.000 €", "3.500.000 €", "6.300", "30"],
        ["Jahr 3", "2.400.000 €", "450.000 €", "4.800.000 €", "3.900.000 €", "6.400", "35"],
      ],
    },
    tasks: [
      {
        q: "Berechne die Arbeitsproduktivität für Jahr 1.",
        a: "6.000 Fahrräder : 30 Mitarbeiter = 200 Stk. pro Mitarbeiter.",
        mistake: "Einheit vergessen.",
      },
      { q: "Berechne die Wirtschaftlichkeit für Jahr 1.", a: "4.000.000 € : 3.300.000 € ≈ 1,21." },
      { q: "Berechne die Eigenkapitalrentabilität für Jahr 1.", a: "420.000 € : 2.100.000 € × 100 = 20 %." },
      {
        q: "Erkläre in eigenen Worten, was jede der drei Kennzahlen aussagt.",
        a: "Produktivität: wie viel mit dem Arbeitseinsatz hergestellt wird (Menge pro Mitarbeiter). Wirtschaftlichkeit: wie gut Umsatz und Kosten zueinander stehen, über 1 heißt wirtschaftlich. REK: wie viel Prozent Gewinn das eingesetzte Eigenkapital bringt; lohnt sich, wenn sie höher ist als andere Anlagen.",
      },
      {
        q: "Berechne alle drei Kennzahlen für Jahr 2 und 3 und beurteile die Entwicklung.",
        a: "Jahr 2: P = 210 Stk./MA, W ≈ 1,31, REK ≈ 20,95 %. Jahr 3: P ≈ 182,86 Stk./MA, W ≈ 1,23, REK = 18,75 %. Jahr 2 ist das beste Jahr, alle Kennzahlen steigen. In Jahr 3 sinken alle drei: 5 zusätzliche Mitarbeiter senken die Produktivität, die Kosten steigen stärker als der Umsatz, und durch mehr Eigenkapital sinkt die Rendite. SmartBike arbeitet aber weiter wirtschaftlich (W > 1).",
        mistake: "REK Jahr 2 auf 20,9 % statt 20,95 % gerundet.",
      },
    ],
    note: "Die Zahlen der Aufgabe sind nicht ganz stimmig: Umsatz minus Kosten ergibt 700.000 €, angegeben ist ein Gewinn von 420.000 €. Für die Kennzahlen gilt der angegebene Gewinn.",
  },
];

// Kompletter Lernstoff als Text – Wissensbasis für den Tutor-Chat.
export function knowledgeText() {
  return MISSIONS.map((m) => {
    const parts = [`Mission ${m.id} – ${m.title} (${m.topic})`, `Situation: ${m.situation}`];
    if (m.formulas) parts.push("Formeln: " + m.formulas.join("; "));
    if (m.table) parts.push("Tabelle: " + m.table.rows.map((r) => r.join(" | ")).join(" / ") + ` (Spalten: ${m.table.head.slice(1).join(", ")})`);
    m.tasks.forEach((t, i) => {
      parts.push(`${m.id}.${i + 1} ${t.q}\nLösung: ${t.a}${t.mistake ? `\nTypischer Fehler: ${t.mistake}` : ""}`);
    });
    if (m.note) parts.push("Hinweis: " + m.note);
    return parts.join("\n");
  }).join("\n\n");
}
