import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { EditorCanvas } from './EditorCanvas'
import { MOCK_GENERATED_XML } from './bpmnConstants'

const meta: Meta<typeof EditorCanvas> = {
  title: 'Loom/EditorCanvas',
  component: EditorCanvas,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Editor-Canvas – Arbeitsfläche für die Prozessmodellierung.',
      },
    },
  },
  args: {
    onBack: fn(),
    onGenerate: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

/** KI-Eingabemodus – Canvas mit KI-Prompt-Panel */
export const KIModus: Story = {
  args: { mode: 'ai' },
}

/** Manueller Canvas – leere Arbeitsfläche */
export const ManuellerCanvas: Story = {
  args: {
    mode: 'blank',
    processName: 'Warenausgang München',
  },
}

/** Nach KI-Generierung: Editor bereits im Bearbeitungsmodus */
export const NachGenerierung: Story = {
  args: {
    mode: 'ai',
    initialPhase: 'editing',
    xml: MOCK_GENERATED_XML,
    processName: 'Onboarding Master',
  },
}

/** Blank-Canvas: direkt im Edit-Modus */
export const BlankBearbeitung: Story = {
  args: {
    mode: 'blank',
    processName: 'Neuer Prozess',
  },
}
