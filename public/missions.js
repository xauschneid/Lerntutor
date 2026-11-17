// Lernstoff: BWL-Arbeitsblatt SmartBike GmbH – als automatisch prüfbare Aufgaben.
//
// Aufgabentypen:
//   choice  – genau eine Antwort richtig (options, correct: Index)
//   multi   – mehrere richtig (options, correct: [Indizes])
//   number  – Zahl eingeben (answer, unit, tol = erlaubte Abweichung)
//   numbers – mehrere Zahlen (fields: [{label, answer, unit, tol}])
//   match   – zuordnen (pairs: [[links, rechts]]), rechte Seite wird gemischt angeboten
//   order   – Reihenfolge (items in richtiger Reihenfolge)
// "explain" wird erst nach dem Bestehen angezeigt.

export const MISSIONS = [
  {
    id: 1,
    title: "Die neue Maschine",
    topic: "Abschreibung",
    situation:
      "Die SmartBike GmbH kauft eine CNC-Maschine für 120.000 €. Sie soll 10 Jahre genutzt werden. Der Gewinn soll nicht in diesem Jahr wegen der Maschine stark einbrechen.",
    tasks: [
      {
        type: "choice",
        q: "Welcher BWL-Begriff passt zu dieser Situation?",
        options: ["Abschreibung", "Inventur", "Deckungsbeitrag", "Liquidität"],
        correct: 0,
        explain: "Abschreibung (AfA): Der Wertverlust der Maschine wird über die Nutzungsdauer verteilt.",
      },
      {
        type: "choice",
        q: "Was bedeutet Abschreibung?",
        options: [
          "Die Anschaffungskosten werden auf die Nutzungsdauer verteilt und jedes Jahr anteilig als Aufwand gebucht.",
          "Der Kaufpreis wird sofort komplett als Aufwand gebucht.",
          "Die Maschine wird nach der Nutzung verkauft und der Erlös als Gewinn gebucht.",
          "Die Maschine wird jedes Jahr neu bewertet, damit der Gewinn steigt.",
        ],
        correct: 0,
        explain: "Die Maschine verliert durch Nutzung an Wert. Deshalb wird jedes Jahr ein Teil der Anschaffungskosten als Aufwand gebucht.",
      },
      {
        type: "choice",
        q: "Warum wird die Maschine nicht komplett als Aufwand des ersten Jahres behandelt?",
        options: [
          "Weil sie 10 Jahre genutzt wird und der Aufwand diesen Jahren zugeordnet wird.",
          "Weil die Maschine erst nach 10 Jahren bezahlt werden muss.",
          "Weil Maschinen keinen Wert verlieren.",
          "Weil das Finanzamt Maschinen nicht als Aufwand anerkennt.",
        ],
        correct: 0,
        explain: "Die Maschine trägt jedes Jahr zum Erfolg bei. Würde alles im ersten Jahr gebucht, bräche der Gewinn dort stark ein.",
      },
      {
        type: "number",
        q: "Berechne die jährliche Abschreibung bei linearer Abschreibung.",
        answer: 12000,
        unit: "€",
        tol: 0,
        explain: "120.000 € : 10 Jahre = 12.000 € pro Jahr.",
      },
    ],
  },
  {
    id: 2,
    title: "Der Weg zum Kunden",
    topic: "Lieferkette",
    situation:
      "Ein E-Bike entsteht aus vielen Einzelteilen. Rohstoffe und Teile gehen durch mehrere Unternehmen, bis das Fahrrad beim Kunden ankommt.",
    tasks: [
      {
        type: "multi",
        q: "Welche Begriffe beschreiben diese gesamte Kette?",
        options: ["Wertschöpfungskette", "Lieferkette", "Supply Chain", "Break-Even-Point", "Bilanz", "Inventur"],
        correct: [0, 1, 2],
        explain: "Deutsch: Wertschöpfungskette oder Lieferkette. Englisch: Supply Chain (genau genommen ist die Wertschöpfungskette die Value Chain, im Unterricht werden die Begriffe aber oft gleich verwendet).",
      },
      {
        type: "choice",
        q: "Was beschreibt dieser Begriff?",
        options: [
          "Alle Unternehmen und Schritte, die nötig sind, damit aus Rohstoffen ein fertiges Produkt beim Kunden ankommt.",
          "Nur der Transport vom Händler zum Kunden.",
          "Die Lagerhaltung eines einzelnen Unternehmens.",
          "Die Rangfolge der Vorgesetzten in einem Betrieb.",
        ],
        correct: 0,
        explain: "Dazu gehören Material-, Informations- und Geldfluss vom Rohstoff bis zum Kunden.",
      },
      {
        type: "order",
        q: "Bring die Glieder der Kette in die richtige Reihenfolge.",
        items: ["Stahlwerk", "Teilehersteller", "SmartBike GmbH", "Großhändler", "Fahrradhändler", "Kunde"],
        explain: "Stahlwerk → Teilehersteller → SmartBike GmbH → Großhändler → Fahrradhändler → Kunde. Das Stahlwerk liefert an die Teilehersteller, nicht direkt an SmartBike.",
      },
      {
        type: "multi",
        q: "Welche Probleme entstehen, wenn ein Glied der Kette ausfällt?",
        options: ["Produktionsstopp", "Lieferverzögerungen", "Umsatzausfall", "Die Fixkosten sinken automatisch", "Das Eigenkapital steigt"],
        correct: [0, 1, 2],
        explain: "Alle folgenden Glieder bekommen keine Ware mehr: Produktion steht, Lieferungen verzögern sich, Umsatz fällt weg.",
      },
    ],
  },
  {
    id: 3,
    title: "Das Lager: FIFO und LIFO",
    topic: "Lagerentnahme",
    situation:
      "Im Januar werden 100 Reifen eingelagert, im Februar weitere 100 und im März weitere 100. Nun werden 100 Reifen entnommen.",
    tasks: [
      {
        type: "match",
        q: "Ordne die Verfahren der richtigen Bedeutung zu.",
        pairs: [
          ["FIFO", "Was zuerst eingelagert wurde, wird zuerst entnommen."],
          ["LIFO", "Was zuletzt eingelagert wurde, wird zuerst entnommen."],
        ],
        explain: "FIFO = First In, First Out. LIFO = Last In, First Out.",
      },
      {
        type: "choice",
        q: "Welche Reifen werden bei FIFO zuerst entnommen?",
        options: ["Januar", "Februar", "März"],
        correct: 0,
        keepOrder: true,
        explain: "Die zuerst eingelagerten Reifen aus dem Januar.",
      },
      {
        type: "choice",
        q: "Welche Reifen werden bei LIFO zuerst entnommen?",
        options: ["Januar", "Februar", "März"],
        correct: 2,
        keepOrder: true,
        explain: "Die zuletzt eingelagerten Reifen aus dem März.",
      },
      {
        type: "match",
        q: "Ordne die Alltagsbeispiele zu.",
        pairs: [
          ["Lebensmittel im Kühlschrank – ältere zuerst essen", "FIFO"],
          ["Stapel Teller im Schrank – oberster zuerst", "LIFO"],
        ],
        explain: "Kühlschrank: das Älteste zuerst (FIFO). Tellerstapel: der zuletzt draufgelegte zuerst (LIFO).",
      },
    ],
  },
  {
    id: 4,
    title: "Das Lager zählt",
    topic: "Inventur",
    situation: "Zum Jahresende werden sämtliche Fahrräder, Ersatzteile und Werkzeuge im Lager gezählt.",
    tasks: [
      {
        type: "choice",
        q: "Wie heißt dieser Vorgang?",
        options: ["Inventur", "Bilanz", "Abschreibung", "Liquidität"],
        correct: 0,
        explain: "Das Zählen und Bewerten aller Bestände heißt Inventur.",
      },
      {
        type: "choice",
        q: "Was ist eine Inventur?",
        options: [
          "Mengen- und wertmäßige Erfassung aller Vermögensgegenstände und Schulden zu einem Stichtag.",
          "Eine Aufstellung aller Einnahmen und Ausgaben eines Jahres.",
          "Die Bestellung neuer Waren für das Lager.",
          "Das Zählen nur der verkauften Fahrräder.",
        ],
        correct: 0,
        explain: "Mengenmäßig (wie viel) und wertmäßig (wie viel Euro), zu einem festen Stichtag.",
      },
      {
        type: "multi",
        q: "Warum führt ein Unternehmen eine Inventur durch?",
        options: [
          "Sie ist gesetzlich vorgeschrieben (§ 240 HGB).",
          "Sie ist die Grundlage für die Bilanz.",
          "Schwund, Diebstahl und Buchungsfehler werden erkannt.",
          "Damit wird der Verkaufspreis festgelegt.",
          "Damit werden neue Mitarbeiter eingestellt.",
        ],
        correct: [0, 1, 2],
        explain: "Pflicht nach § 240 HGB, Grundlage für Inventar und Bilanz, Abgleich von Soll- und Ist-Bestand.",
      },
      {
        type: "multi",
        q: "Was erfasst SmartBike bei der Inventur?",
        options: ["Fertige Fahrräder", "Ersatzteile wie Reifen und Akkus", "Werkzeuge", "Kundenbewertungen", "Werbeslogans"],
        correct: [0, 1, 2],
        explain: "Erfasst werden Vermögensgegenstände – keine Meinungen oder Ideen.",
      },
    ],
  },
  {
    id: 5,
    title: "Verkaufserfolg",
    topic: "Umsatz und Gewinn",
    situation: "SmartBike verkauft im Jahr Fahrräder für 4.000.000 €. Die Gesamtkosten betragen 3.300.000 €.",
    tasks: [
      {
        type: "match",
        q: "Ordne die Begriffe der richtigen Erklärung zu.",
        pairs: [
          ["Umsatz", "Wert aller verkauften Waren (Menge × Preis)"],
          ["Kosten", "Bewerteter Verbrauch von Gütern und Leistungen für die Produktion"],
          ["Gewinn", "Was nach Abzug der Kosten übrig bleibt"],
        ],
        explain: "Erlös ist das, was aus dem Verkauf hereinkommt – meist gleichbedeutend mit Umsatzerlös.",
      },
      {
        type: "number",
        q: "Berechne den Gewinn.",
        answer: 700000,
        unit: "€",
        tol: 0,
        explain: "4.000.000 € − 3.300.000 € = 700.000 €.",
      },
      {
        type: "choice",
        q: "Sind Umsatz und Gewinn dasselbe?",
        options: [
          "Nein. Gewinn ist der Umsatz minus die Kosten.",
          "Ja, beide meinen die Einnahmen aus Verkäufen.",
          "Nein. Der Gewinn ist immer größer als der Umsatz.",
          "Ja, wenn keine Steuern anfallen.",
        ],
        correct: 0,
        explain: "Umsatz ist alles, was durch Verkäufe hereinkommt. Gewinn ist erst der Rest nach Abzug der Kosten.",
      },
      {
        type: "choice",
        q: "Welcher Merksatz stimmt?",
        options: [
          "Umsatz ist, was durch Verkäufe hereinkommt. Gewinn ist, was nach Abzug der Kosten übrig bleibt.",
          "Gewinn ist, was durch Verkäufe hereinkommt. Umsatz ist, was übrig bleibt.",
          "Umsatz minus Gewinn ergibt die Kosten pro Stück.",
          "Hoher Umsatz bedeutet immer hohen Gewinn.",
        ],
        correct: 0,
        explain: "Hoher Umsatz heißt nicht automatisch hoher Gewinn – die Kosten entscheiden mit.",
      },
    ],
  },
  {
    id: 6,
    title: "Geld auf dem Konto",
    topic: "Liquidität",
    situation: "SmartBike muss morgen Lieferanten bezahlen. Auf dem Bankkonto sind aber nur 8.000 €.",
    tasks: [
      {
        type: "choice",
        q: "Welcher Begriff beschreibt die Fähigkeit, Zahlungen fristgerecht zu leisten?",
        options: ["Liquidität", "Rentabilität", "Produktivität", "Wirtschaftlichkeit"],
        correct: 0,
        explain: "Liquidität = Zahlungsfähigkeit.",
      },
      {
        type: "choice",
        q: "Was bedeutet Liquidität?",
        options: [
          "Fällige Rechnungen und Schulden jederzeit pünktlich und vollständig bezahlen zu können.",
          "Möglichst viel Gewinn im Jahr zu machen.",
          "Möglichst viele Fahrräder pro Mitarbeiter herzustellen.",
          "Möglichst viel Eigenkapital zu besitzen.",
        ],
        correct: 0,
        explain: "Es geht um verfügbares Geld zum richtigen Zeitpunkt, nicht um Gewinn.",
      },
      {
        type: "choice",
        q: "Warum kann ein Unternehmen Gewinn machen und trotzdem Zahlungsprobleme haben?",
        options: [
          "Kunden haben noch nicht bezahlt oder das Geld steckt im Lager und in Maschinen.",
          "Gewinn wird immer sofort an die Mitarbeiter ausgezahlt.",
          "Banken dürfen Gewinne ein Jahr lang sperren.",
          "Das ist nicht möglich – wer Gewinn macht, hat immer Geld.",
        ],
        correct: 0,
        explain: "Gewinn ist nicht gleich Geld auf dem Konto. Offene Forderungen und gebundenes Kapital fehlen in der Kasse.",
      },
      {
        type: "multi",
        q: "Welche Maßnahmen verbessern die Zahlungsfähigkeit?",
        options: [
          "Kundenrechnungen schneller einfordern",
          "Kurzfristigen Kredit aufnehmen",
          "Ausgaben verschieben",
          "Eine neue Maschine bar kaufen",
          "Alle Lieferantenrechnungen sofort vorzeitig bezahlen",
        ],
        correct: [0, 1, 2],
        explain: "Mehr Geld schneller herein oder Ausgaben später – beides hilft. Barkäufe verschärfen das Problem.",
      },
    ],
  },
  {
    id: 7,
    title: "Blick in die Bilanz",
    topic: "Bilanz",
    situation: "SmartBike besitzt Maschinen, Gebäude, Bankguthaben und Forderungen. Gleichzeitig bestehen Bankkredite.",
    tasks: [
      {
        type: "choice",
        q: "Was zeigt eine Bilanz?",
        options: [
          "Vermögen und Kapital eines Unternehmens zu einem Stichtag.",
          "Alle Umsätze eines Jahres.",
          "Die Kosten pro Fahrrad.",
          "Die Zahl der Mitarbeitenden.",
        ],
        correct: 0,
        explain: "Welches Vermögen da ist und wie es finanziert wurde – an einem Stichtag.",
      },
      {
        type: "choice",
        q: "Welche Seite zeigt das Vermögen?",
        options: ["Aktivseite", "Passivseite"],
        correct: 0,
        keepOrder: true,
        explain: "Aktiva = Vermögen (Mittelverwendung).",
      },
      {
        type: "choice",
        q: "Welche Seite zeigt die Finanzierung bzw. das Kapital?",
        options: ["Aktivseite", "Passivseite"],
        correct: 1,
        keepOrder: true,
        explain: "Passiva = Kapital (Mittelherkunft).",
      },
      {
        type: "match",
        q: "Ordne die Posten zu.",
        pairs: [
          ["Maschinen", "Aktiva – Anlagevermögen"],
          ["Bankguthaben", "Aktiva – Umlaufvermögen"],
          ["Bankkredite", "Passiva – Fremdkapital"],
          ["Einlage der Eigentümer", "Passiva – Eigenkapital"],
        ],
        explain: "Anlagevermögen bleibt lange im Betrieb, Umlaufvermögen ändert sich ständig.",
      },
    ],
  },
  {
    id: 8,
    title: "Finanzierung",
    topic: "Eigen- und Fremdkapital",
    situation: "Die Eigentümer investieren 300.000 €. Zusätzlich nimmt SmartBike einen Kredit über 700.000 € auf.",
    tasks: [
      {
        type: "choice",
        q: "Was ist Eigenkapital?",
        options: [
          "Kapital, das die Eigentümer selbst einbringen, plus einbehaltene Gewinne.",
          "Geld, das die Bank dem Unternehmen leiht.",
          "Das Gehalt der Geschäftsführung.",
          "Geld, das Kunden noch bezahlen müssen.",
        ],
        correct: 0,
        explain: "Eigenkapital gehört den Eigentümern und muss nicht zurückgezahlt werden.",
      },
      {
        type: "choice",
        q: "Was ist Fremdkapital?",
        options: [
          "Kapital von außen, das zurückgezahlt werden muss, z. B. Kredite.",
          "Kapital, das die Eigentümer einbringen.",
          "Gewinne aus dem Ausland.",
          "Geld, das das Unternehmen anderen geliehen hat.",
        ],
        correct: 0,
        explain: "Kredite, Anleihen und Lieferantenschulden sind Fremdkapital.",
      },
      {
        type: "match",
        q: "Ordne die Beträge zu.",
        pairs: [
          ["300.000 € von den Eigentümern", "Eigenkapital"],
          ["700.000 € Kredit", "Fremdkapital"],
        ],
        explain: "Eigene Einlage = Eigenkapital, Kredit = Fremdkapital.",
      },
      {
        type: "match",
        q: "Vorteil oder Nachteil von Fremdkapital?",
        pairs: [
          ["Investitionen sind möglich, ohne eigenes Geld einzusetzen", "Vorteil"],
          ["Zinsen und Tilgung müssen auch in schlechten Jahren gezahlt werden", "Nachteil"],
        ],
        explain: "Fremdkapital ermöglicht Wachstum, kostet aber Zinsen und muss zurückgezahlt werden.",
      },
    ],
  },
  {
    id: 9,
    title: "Lohnt sich die Produktion?",
    topic: "Deckungsbeitrag",
    situation:
      "Ein Fahrrad wird für 2.400 € verkauft. Die variablen Kosten betragen 1.600 € pro Stück. Die Fixkosten betragen 320.000 € pro Jahr.",
    tasks: [
      {
        type: "choice",
        q: "Was ist der Deckungsbeitrag?",
        options: [
          "Verkaufspreis minus variable Kosten – der Betrag, den jedes Stück zur Deckung der Fixkosten beiträgt.",
          "Verkaufspreis minus Fixkosten.",
          "Umsatz minus Gesamtkosten.",
          "Fixkosten geteilt durch die Stückzahl.",
        ],
        correct: 0,
        explain: "Sind die Fixkosten gedeckt, ist jeder weitere Deckungsbeitrag Gewinn.",
      },
      {
        type: "number",
        q: "Berechne den Deckungsbeitrag je Fahrrad.",
        answer: 800,
        unit: "€",
        tol: 0,
        explain: "2.400 € − 1.600 € = 800 €.",
      },
      {
        type: "number",
        q: "Berechne den Break-Even-Point.",
        answer: 400,
        unit: "Stück",
        tol: 0,
        explain: "320.000 € : 800 € = 400 Fahrräder.",
      },
      {
        type: "number",
        q: "Ab dem wievielten Fahrrad macht SmartBike Gewinn?",
        answer: 401,
        unit: "",
        tol: 0,
        explain: "Bei 400 Fahrrädern ist der Gewinn genau 0. Ab dem 401. Fahrrad entsteht Gewinn.",
      },
    ],
  },
  {
    id: 10,
    title: "Das Unternehmen bewerten",
    topic: "Kennzahlen",
    situation: "Nutze die Tabelle. Runde auf zwei Nachkommastellen.",
    formulas: [
      "Produktivität = Produktionsmenge : Mitarbeiter",
      "Wirtschaftlichkeit = Umsatzerlöse : Kosten",
      "Eigenkapitalrentabilität = Gewinn : Eigenkapital × 100",
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
        type: "number",
        q: "Berechne die Produktivität für Jahr 1.",
        answer: 200,
        unit: "Stk. pro Mitarbeiter",
        tol: 0,
        explain: "6.000 : 30 = 200 Stk. pro Mitarbeiter.",
      },
      {
        type: "number",
        q: "Berechne die Wirtschaftlichkeit für Jahr 1.",
        answer: 1.21,
        unit: "",
        tol: 0.005,
        explain: "4.000.000 € : 3.300.000 € ≈ 1,21.",
      },
      {
        type: "number",
        q: "Berechne die Eigenkapitalrentabilität für Jahr 1.",
        answer: 20,
        unit: "%",
        tol: 0.005,
        explain: "420.000 € : 2.100.000 € × 100 = 20 %.",
      },
      {
        type: "match",
        q: "Was sagt welche Kennzahl aus?",
        pairs: [
          ["Produktivität", "Wie viel Menge pro Arbeitseinsatz hergestellt wird"],
          ["Wirtschaftlichkeit", "Wie Umsatz und Kosten zueinander stehen"],
          ["Eigenkapitalrentabilität", "Wie viel Prozent Gewinn das Eigenkapital bringt"],
        ],
        explain: "Produktivität ist ein Mengenverhältnis, Wirtschaftlichkeit ein Wertverhältnis (über 1 = wirtschaftlich), REK eine Verzinsung in Prozent.",
      },
      {
        type: "numbers",
        q: "Berechne die Kennzahlen für Jahr 2 und Jahr 3.",
        fields: [
          { label: "Produktivität Jahr 2", answer: 210, unit: "Stk./MA", tol: 0.005 },
          { label: "Produktivität Jahr 3", answer: 182.86, unit: "Stk./MA", tol: 0.005 },
          { label: "Wirtschaftlichkeit Jahr 2", answer: 1.31, unit: "", tol: 0.005 },
          { label: "Wirtschaftlichkeit Jahr 3", answer: 1.23, unit: "", tol: 0.005 },
          { label: "Eigenkapitalrentabilität Jahr 2", answer: 20.95, unit: "%", tol: 0.005 },
          { label: "Eigenkapitalrentabilität Jahr 3", answer: 18.75, unit: "%", tol: 0.005 },
        ],
        explain: "Jahr 2: 210 / 1,31 / 20,95 %. Jahr 3: 182,86 / 1,23 / 18,75 %.",
      },
      {
        type: "choice",
        q: "Wie entwickelt sich SmartBike?",
        options: [
          "Jahr 2 ist am besten. In Jahr 3 sinken alle drei Kennzahlen, SmartBike arbeitet aber weiter wirtschaftlich.",
          "Jahr 3 ist am besten, weil dort der höchste Gewinn erzielt wird.",
          "Alle drei Jahre sind gleich gut, weil immer Gewinn entsteht.",
          "In Jahr 3 arbeitet SmartBike unwirtschaftlich, weil die Wirtschaftlichkeit unter 1 fällt.",
        ],
        correct: 0,
        explain: "Mehr Mitarbeiter senken die Produktivität, Kosten steigen stärker als der Umsatz, mehr Eigenkapital senkt die Rendite. W bleibt über 1.",
      },
    ],
  },
];
