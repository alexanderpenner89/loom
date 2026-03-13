import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { InsightCard } from './InsightCard'

const meta: Meta<typeof InsightCard> = {
  title: 'Components/InsightCard',
  component: InsightCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['action-required', 'deviation'],
    },
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
  },
  args: {
    onClick: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

/** Aktion Erforderlich – rotes Badge, manuelle Intervention wird benötigt */
export const ActionRequired: Story = {
  args: {
    variant: 'action-required',
    title: 'Flaschenhals: Onboarding',
    description: 'Eine sequenzielle Freigabe verzögert den Master-Ablauf um ca. 4 Tage.',
  },
}

/** Abweichung – blaues Badge, erkannte Abweichung vom Sollprozess */
export const Deviation: Story = {
  args: {
    variant: 'deviation',
    title: 'Standort: München',
    description: "Der Prozess 'Warenausgang' wurde lokal abweichend modelliert.",
  },
}

/** Ohne Click-Handler – keine onClick-Prop, Karte ist nicht interaktiv */
export const WithoutClickHandler: Story = {
  args: {
    variant: 'action-required',
    title: 'Flaschenhals: Onboarding',
    description: 'Eine sequenzielle Freigabe verzögert den Master-Ablauf um ca. 4 Tage.',
    onClick: undefined,
  },
}
