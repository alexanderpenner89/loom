import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { SuggestionPanel } from './SuggestionPanel'

const meta: Meta<typeof SuggestionPanel> = {
  title: 'Components/SuggestionPanel',
  component: SuggestionPanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    suggestion: {
      control: 'object',
    },
  },
  args: {
    onApply: fn(),
    onIgnore: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

/** Standardvorschlag mit erkannter sequenzieller Blockade und Latenzangabe */
export const Default: Story = {
  args: {
    suggestion: {
      title: 'Sequenzielle Blockade',
      description:
        'Die Freigabe der Geschäftsführung blockiert nachfolgende Prozesse. Transformation in paralleles Gateway (AND) empfohlen.',
      latency: '4,2 Tage',
    },
  },
}

/** Vorschlag ohne Latenzangabe – der Latenz-Abschnitt wird nicht gerendert */
export const WithoutLatency: Story = {
  args: {
    suggestion: {
      title: 'Redundante Prüfschleife',
      description:
        'Schritt "Compliance-Prüfung" wird dreifach durchlaufen ohne unterschiedliche Ergebnisse. Zusammenführung in einen einzigen Prüfschritt empfohlen.',
    },
  },
}

/** Abweichender Vorschlag – zeigt einen anderen Titel und eine andere Beschreibung */
export const AnotherSuggestion: Story = {
  args: {
    suggestion: {
      title: 'Fehlende Eskalationspfade',
      description:
        'Bei Zeitüberschreitung existiert kein definierter Eskalationspfad. Einführung eines Timer-Boundary-Events mit Benachrichtigungsschritt empfohlen.',
      latency: '1,8 Tage',
    },
  },
}
