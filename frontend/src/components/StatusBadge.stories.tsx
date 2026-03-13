// frontend/src/components/StatusBadge.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { StatusBadge } from './StatusBadge'

const meta: Meta<typeof StatusBadge> = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['draft', 'released', 'action-required', 'deviation', 'analysis'],
    },
    label: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/** Entwurf – Prozess wurde noch nicht freigegeben */
export const Draft: Story = {
  args: {
    variant: 'draft',
  },
}

/** Freigegeben – Prozess ist offiziell freigegeben und aktiv */
export const Released: Story = {
  args: {
    variant: 'released',
  },
}

/** Aktion Erforderlich – manuelle Intervention wird benötigt */
export const ActionRequired: Story = {
  args: {
    variant: 'action-required',
  },
}

/** Abweichung – erkannte Abweichung vom Sollprozess */
export const Deviation: Story = {
  args: {
    variant: 'deviation',
  },
}

/** Analyse Modus – Prozess wird aktiv analysiert */
export const Analysis: Story = {
  args: {
    variant: 'analysis',
  },
}
