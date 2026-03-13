import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { CreateProcessModal } from './CreateProcessModal'

const meta: Meta<typeof CreateProcessModal> = {
  title: 'Components/CreateProcessModal',
  component: CreateProcessModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onCreateAI: fn(),
    onCreateBlank: fn(),
    onClose: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

/** Methodik-Dialog – immer sichtbar, kein Backdrop-Logik für Stories */
export const Default: Story = {}
