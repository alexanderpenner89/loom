// frontend/src/components/BpmnEditor.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import BpmnEditor from './BpmnEditor'
import { MOCK_GENERATED_XML } from './bpmnConstants'

const meta: Meta<typeof BpmnEditor> = {
  title: 'Loom/BpmnEditor',
  component: BpmnEditor,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'BPMN-Editor – Modeler (edit) oder Viewer (readOnly) je nach Prop.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/** Edit-Modus: Palette sichtbar, Label-Editing per Doppelklick */
export const Edit: Story = {
  args: {
    xml: MOCK_GENERATED_XML,
    readOnly: false,
    onXmlChange: fn(),
  },
  parameters: {
    layout: 'fullscreen',
  },
}

/** Read-Only-Modus: nur Navigation, keine Palette */
export const ReadOnly: Story = {
  args: {
    xml: MOCK_GENERATED_XML,
    readOnly: true,
  },
  parameters: {
    layout: 'fullscreen',
  },
}
