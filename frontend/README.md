# Frontend - Vite + React + TypeScript + bpmn-js + Storybook

Ein modernes Frontend-Setup für BPMN-Diagramme mit Vite, React, TypeScript, bpmn-js und Storybook.

## Tech Stack

- **Vite** - Ultrafastes Build-Tool und Dev-Server
- **React 19** - Moderne React-Version mit TypeScript
- **bpmn-js** - BPMN 2.0 Diagram Viewer und Modeler
- **Storybook** - Komponenten-Dokumentation und Testing
- **Vitest** - Testing-Framework
- **Playwright** - Browser-Automatisierung für Tests

## Verfügbare Scripts

```bash
# Entwicklungsserver starten
npm run dev

# Produktionsbuild
npm run build

# Build-Preview
npm run preview

# Storybook starten
npm run storybook

# Storybook builden
npm run build-storybook

# Tests ausführen
npx vitest --project=storybook

# Linting
npm run lint
```

## bpmn-js Integration

Das Projekt enthält eine Beispielkomponente `BpmnDiagram`, die bpmn-js für die Anzeige und Bearbeitung von BPMN-Diagrammen verwendet.

### Beispiel-Nutzung:

```tsx
import BpmnDiagram from './components/BpmnDiagram';

function App() {
  return (
    <BpmnDiagram
      xml={bpmnXmlString}
      height="600px"
      onElementClick={(element) => console.log('Clicked:', element)}
    />
  );
}
```

### Features:

- **Viewer**: Anzeige von BPMN 2.0 Diagrammen
- **NavigatedViewer**: Interaktive Diagramme mit Pan/Zoom
- **Modeler**: Vollständige Diagramm-Erstellung und Bearbeitung

## Storybook

Storybook ist für die Vite-Integration konfiguriert und enthält:

- **@storybook/react-vite** - React-Vite-Framework
- **@storybook/addon-a11y** - Barrierefreiheit-Tests
- **@storybook/addon-vitest** - Vitest-Integration
- **@storybook/addon-docs** - Automatische Dokumentation

### Storybook starten:

```bash
npm run storybook
```

## Projektstruktur

```
frontend/
├── .storybook/          # Storybook-Konfiguration
├── src/
│   ├── components/      # React-Komponenten
│   │   ├── BpmnDiagram.tsx
│   │   └── BpmnDiagram.stories.tsx
│   ├── assets/          # Statische Assets
│   ├── App.tsx
│   └── main.tsx
├── public/              # Öffentliche Dateien
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Weiterführende Links

- [Vite Dokumentation](https://vitejs.dev/)
- [bpmn-js Dokumentation](https://github.com/bpmn-io/bpmn-js)
- [Storybook Dokumentation](https://storybook.js.org/)
- [BPMN 2.0 Spezifikation](https://www.omg.org/spec/BPMN/2.0.2/)
