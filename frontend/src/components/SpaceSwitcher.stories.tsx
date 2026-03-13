import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { SpaceSwitcher } from './SpaceSwitcher'

const meta: Meta<typeof SpaceSwitcher> = {
  title: 'Components/SpaceSwitcher',
  component: SpaceSwitcher,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    current: {
      control: 'object',
    },
    spaces: {
      control: 'object',
    },
  },
  args: {
    current: { name: 'Acme Corp', initials: 'AC' },
    spaces: [
      { name: 'Globex Inc', initials: 'GI' },
      { name: 'Initech', initials: 'IN' },
    ],
    onSwitch: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

/** Standard-Ansicht – Dropdown ist geschlossen */
export const Closed: Story = {}

/** Dropdown geöffnet – zeigt die Workspace-Liste beim Laden */
export const Open: Story = {
  args: {
    initialOpen: true,
  },
}
