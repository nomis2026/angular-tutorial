# Angular Tutorial: First App

Link: [https://angular.dev/tutorials/first-app](https://angular.dev/tutorials/first-app)

## Zwei wichtige Hinweise zum Tutorial

### 1. Kapitel *Angular Services*

Die `readonly baseUrl = "https://...";` Variable muss ebenfalls mit der `housingLocationList` und ihrem Wert in den `HousingService` kopiert werden!

### 2. Kapitel *Add HTTP communication*

Der `npm install -g json-server` muss nicht ausgeführt werden!  
Stattdessen einfach folgenden Befehl im Projektverzeichnis ausführen:

```bash
npm run json-server
```

## Aufgaben

- Beantworte folgende Fragen:
  - Wie erstellt man eine neue Angular Komponente?
  - Auf welche zwei Arten kann man eine Komponente anzeigen lassen?


- Zeige auf der Detailseite statt “true” oder “false” bei der Ausstattung “Yes” oder “No” an.


- Zeige eine Meldung wie “No houses found” an, wenn die Suche keine Resultate hatte.
  Stichwort: [`*ngIf / @if`](https://angular.dev/guide/templates/control-flow)


- Blende das gesamte “Apply now to live here” Formular auf der Detailseite aus, wenn keine Einheiten verfügbar sind.
  Stichwort: [`*ngIf / @if`](https://angular.dev/guide/templates/control-flow)


- Zeige auf der Detailseite eine Meldung an, wenn keine Housing Location gefunden wurde (z.b. Test durch Aufruf http://localhost:4200/details/999)


- Konfiguriere den “Apply now” Button auf der Detailseite so, dass dieser nur angeklickt werden kann, wenn alle Felder im Formular Eingaben enthalten.
  Stichwort: [`Validators.required`](https://angular.dev/guide/forms/form-validation#validating-input-in-reactive-forms), [`disabled`](https://www.w3schools.com/tags/att_button_disabled.asp), [`form.invalid`](https://angular.dev/api/forms/FormGroup#invalid)
