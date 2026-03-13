import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { AnalysisView } from './AnalysisView'

const meta: Meta<typeof AnalysisView> = {
  title: 'Loom/AnalysisView',
  component: AnalysisView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'KI-Röntgenblick – Analyse-Modus zur Identifikation von Prozess-Engpässen.',
      },
    },
  },
  args: {
    onBack: fn(),
    onApplyFix: fn(),
    onIgnoreFix: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

/** Analyse-Modus mit erkanntem Flaschenhals */
export const MitFlaschenhals: Story = {}

/** Analyse eines anderen Prozesses */
export const AndererProzess: Story = {
  args: {
    processName: 'Warenausgang München',
  },
}
