import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { ProcessRow } from './ProcessRow'
import type { Process } from './ProcessRow'

const draftProcess: Process = {
  id: 'onboarding-master',
  name: 'Onboarding Master',
  department: 'HR Abteilung',
  lastEdited: 'Vor 2 Std.',
  status: 'draft',
}

const publishedProcess: Process = {
  id: 'warenausgang-muenchen',
  name: 'Warenausgang München',
  department: 'Logistik',
  lastEdited: 'Gestern',
  status: 'published',
}

const meta: Meta<typeof ProcessRow> = {
  title: 'Components/ProcessRow',
  component: ProcessRow,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    process: {
      control: 'object',
    },
  },
  args: {
    onClick: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

/** Prozess im Entwurfsstatus – zeigt das "Entwurf"-Badge an */
export const Draft: Story = {
  args: {
    process: draftProcess,
  },
}

/** Freigegebener Prozess – kein Badge, nur Pfeil-Chevron bei Hover */
export const Published: Story = {
  args: {
    process: publishedProcess,
  },
}

/** Interaktive Variante – onClick-Handler ist aktiv und wird in den Actions protokolliert */
export const Interactive: Story = {
  args: {
    process: publishedProcess,
    onClick: fn(),
  },
}
