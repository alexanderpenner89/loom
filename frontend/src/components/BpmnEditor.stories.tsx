// frontend/src/components/BpmnEditor.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import BpmnEditor from './BpmnEditor'

const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
                  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
                  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
                  xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
                  targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_Generated" isExecutable="false">
    <bpmn:startEvent id="Start_1" name="Start"/>
    <bpmn:task id="Task_1" name="Antrag prüfen"/>
    <bpmn:task id="Task_2" name="Freigabe einholen"/>
    <bpmn:task id="Task_3" name="Benachrichtigung senden"/>
    <bpmn:endEvent id="End_1" name="Abgeschlossen"/>
    <bpmn:sequenceFlow id="Flow_1" sourceRef="Start_1" targetRef="Task_1"/>
    <bpmn:sequenceFlow id="Flow_2" sourceRef="Task_1" targetRef="Task_2"/>
    <bpmn:sequenceFlow id="Flow_3" sourceRef="Task_2" targetRef="Task_3"/>
    <bpmn:sequenceFlow id="Flow_4" sourceRef="Task_3" targetRef="End_1"/>
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_Generated">
      <bpmndi:BPMNShape id="Start_1_di" bpmnElement="Start_1">
        <dc:Bounds x="152" y="182" width="36" height="36"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_1_di" bpmnElement="Task_1">
        <dc:Bounds x="250" y="160" width="120" height="80"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_2_di" bpmnElement="Task_2">
        <dc:Bounds x="430" y="160" width="120" height="80"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_3_di" bpmnElement="Task_3">
        <dc:Bounds x="610" y="160" width="120" height="80"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="End_1_di" bpmnElement="End_1">
        <dc:Bounds x="792" y="182" width="36" height="36"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1_di" bpmnElement="Flow_1">
        <di:waypoint x="188" y="200"/>
        <di:waypoint x="250" y="200"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_2_di" bpmnElement="Flow_2">
        <di:waypoint x="370" y="200"/>
        <di:waypoint x="430" y="200"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_3_di" bpmnElement="Flow_3">
        <di:waypoint x="550" y="200"/>
        <di:waypoint x="610" y="200"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_4_di" bpmnElement="Flow_4">
        <di:waypoint x="730" y="200"/>
        <di:waypoint x="792" y="200"/>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`

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
    xml: SAMPLE_XML,
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
    xml: SAMPLE_XML,
    readOnly: true,
  },
  parameters: {
    layout: 'fullscreen',
  },
}
