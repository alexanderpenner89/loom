import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { PromptPanel } from './PromptPanel'

const meta: Meta<typeof PromptPanel> = {
  title: 'Components/PromptPanel',
  component: PromptPanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    onGenerate: fn(),
  },
  argTypes: {
    isGenerating: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/** Leeres Panel – Standardzustand ohne Nutzereingabe */
export const Empty: Story = {}

/** Nutzer hat bereits Text eingegeben – das Textfeld startet leer, da der Prompt-State intern verwaltet wird */
export const WithText: Story = {
  args: {
    isGenerating: false,
  },
}

/** Generierung läuft – Spinner-Zustand des Absende-Buttons */
export const Generating: Story = {
  args: {
    isGenerating: true,
  },
}
