import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { Dashboard } from './Dashboard'

const meta: Meta<typeof Dashboard> = {
  title: 'Loom/Dashboard',
  component: Dashboard,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Mission Control Dashboard – Systemübersicht für Prozessmodellierung.',
      },
    },
  },
  args: {
    onCreateAI: fn(),
    onCreateBlank: fn(),
    onProcessClick: fn(),
    onInsightClick: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

/** Standard-Ansicht des Dashboards */
export const Default: Story = {}

/** Dashboard mit geöffnetem Space-Menü */
export const MitSpaceMenu: Story = {
  parameters: {
    docs: {
      description: { story: 'Zeigt das Space-Wechsler-Dropdown in geöffnetem Zustand.' },
    },
  },
}

/** Dashboard mit einem anderen Workspace */
export const AndererWorkspace: Story = {
  args: {
    spaceName: 'Globex Inc',
    spaceInitials: 'GL',
    userName: 'Maria',
  },
}
