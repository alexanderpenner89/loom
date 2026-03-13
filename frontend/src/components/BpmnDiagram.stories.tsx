import type { Meta, StoryObj } from '@storybook/react';
import BpmnDiagram from './BpmnDiagram';

/**
 * BpmnDiagram ist eine React-Komponente für die Anzeige von BPMN 2.0 Diagrammen.
 * Sie verwendet bpmn-js für das Rendering und unterstützt Interaktionen wie
 * Klick-Events auf Elemente.
 */
const meta = {
  title: 'Components/BpmnDiagram',
  component: BpmnDiagram,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Eine Komponente zur Anzeige von BPMN 2.0 Diagrammen. Unterstützt XML-Import, Zoom, Pan und Event-Handling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    xml: {
      control: 'text',
      description: 'BPMN 2.0 XML string',
    },
    height: {
      control: 'text',
      description: 'Container height',
      defaultValue: '600px',
    },
    width: {
      control: 'text',
      description: 'Container width',
      defaultValue: '100%',
    },
    onElementClick: {
      action: 'element clicked',
      description: 'Callback when an element is clicked',
    },
    onRender: {
      action: 'rendered',
      description: 'Callback when diagram is rendered',
    },
    onError: {
      action: 'error',
      description: 'Callback when import fails',
    },
    autoLayout: {
      control: 'boolean',
      description: 'Automatically layout the diagram if it lacks DI information',
      defaultValue: false,
    },
  },
} satisfies Meta<typeof BpmnDiagram>;

export default meta;
type Story = StoryObj<typeof meta>;

// Beispiel-BPMN XML für einen einfachen Prozess
const simpleProcessXml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
                  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
                  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
                  targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1" name="Start"/>
    <bpmn:task id="Task_1" name="Process Order"/>
    <bpmn:endEvent id="EndEvent_1" name="End"/>
    <bpmn:sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="Task_1"/>
    <bpmn:sequenceFlow id="Flow_2" sourceRef="Task_1" targetRef="EndEvent_1"/>
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="StartEvent_1_di" bpmnElement="StartEvent_1">
        <dc:Bounds x="180" y="100" width="36" height="36"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_1_di" bpmnElement="Task_1">
        <dc:Bounds x="300" y="80" width="100" height="80"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_1_di" bpmnElement="EndEvent_1">
        <dc:Bounds x="480" y="102" width="36" height="36"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1_di" bpmnElement="Flow_1">
        <di:waypoint x="216" y="118"/>
        <di:waypoint x="300" y="120"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_2_di" bpmnElement="Flow_2">
        <di:waypoint x="400" y="120"/>
        <di:waypoint x="480" y="120"/>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;

// Beispiel-BPMN XML für einen komplexeren Prozess mit Gateway
const gatewayProcessXml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
                  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
                  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
                  targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1" name="Order Received"/>
    <bpmn:task id="Task_1" name="Check Inventory"/>
    <bpmn:exclusiveGateway id="Gateway_1" name="In Stock?"/>
    <bpmn:task id="Task_2" name="Process Order"/>
    <bpmn:task id="Task_3" name="Notify Customer"/>
    <bpmn:endEvent id="EndEvent_1" name="Order Complete"/>
    <bpmn:endEvent id="EndEvent_2" name="Out of Stock"/>
    <bpmn:sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="Task_1"/>
    <bpmn:sequenceFlow id="Flow_2" sourceRef="Task_1" targetRef="Gateway_1"/>
    <bpmn:sequenceFlow id="Flow_3" sourceRef="Gateway_1" targetRef="Task_2" name="Yes"/>
    <bpmn:sequenceFlow id="Flow_4" sourceRef="Task_2" targetRef="EndEvent_1"/>
    <bpmn:sequenceFlow id="Flow_5" sourceRef="Gateway_1" targetRef="Task_3" name="No"/>
    <bpmn:sequenceFlow id="Flow_6" sourceRef="Task_3" targetRef="EndEvent_2"/>
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="StartEvent_1_di" bpmnElement="StartEvent_1">
        <dc:Bounds x="152" y="182" width="36" height="36"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_1_di" bpmnElement="Task_1">

        <dc:Bounds x="240" y="160" width="100" height="80"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1_di" bpmnElement="Gateway_1" isMarkerVisible="true">
        <dc:Bounds x="400" y="175" width="50" height="50"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_2_di" bpmnElement="Task_2">
        <dc:Bounds x="510" y="100" width="100" height="80"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_1_di" bpmnElement="EndEvent_1">
        <dc:Bounds x="672" y="122" width="36" height="36"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_3_di" bpmnElement="Task_3">
        <dc:Bounds x="510" y="240" width="100" height="80"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_2_di" bpmnElement="EndEvent_2">
        <dc:Bounds x="672" y="262" width="36" height="36"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1_di" bpmnElement="Flow_1">
        <di:waypoint x="188" y="200"/>
        <di:waypoint x="240" y="200"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_2_di" bpmnElement="Flow_2">
        <di:waypoint x="340" y="200"/>
        <di:waypoint x="400" y="200"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_3_di" bpmnElement="Flow_3">
        <di:waypoint x="425" y="175"/>
        <di:waypoint x="560" y="140"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_4_di" bpmnElement="Flow_4">
        <di:waypoint x="610" y="140"/>
        <di:waypoint x="672" y="140"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_5_di" bpmnElement="Flow_5">
        <di:waypoint x="425" y="225"/>
        <di:waypoint x="560" y="280"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_6_di" bpmnElement="Flow_6">
        <di:waypoint x="610" y="280"/>
        <di:waypoint x="672" y="280"/>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;

/**
 * Standard-Story mit einem einfachen Prozessdiagramm.
 */
export const Default: Story = {
  args: {
    xml: simpleProcessXml,
    height: '500px',
    width: '800px',
  },
};

/**
 * Story mit einem Gateway-Prozess, der eine Entscheidung zeigt.
 */
export const WithGateway: Story = {
  args: {
    xml: gatewayProcessXml,
    height: '500px',
    width: '900px',
  },
  parameters: {
    docs: {
      description: {
        story: 'Ein komplexerer Prozess mit einem Exclusive Gateway, das je nach Bestandsverfügbarkeit unterschiedliche Pfade zeigt.',
      },
    },
  },
};

/**
 * Story mit benutzerdefinierten Dimensionen.
 */
export const CustomSize: Story = {
  args: {
    xml: simpleProcessXml,
    height: '300px',
    width: '500px',
  },
  parameters: {
    docs: {
      description: {
        story: 'Beispiel mit kleineren Dimensionen.',
      },
    },
  },
};

/**
 * Story mit Event-Handling.
 */
export const WithEventHandling: Story = {
  args: {
    xml: simpleProcessXml,
    height: '500px',
    width: '800px',
    onElementClick: (element: any) => {
      console.log('Element clicked:', element.id, element.type);
      alert(`Element clicked: ${element.id} (${element.type})`);
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Klicken Sie auf ein Element im Diagramm, um einen Alert zu sehen.',
      },
    },
  },
};

/**
 * Story mit einem ungültigen XML, um die Fehlerbehandlung zu zeigen.
 */
export const WithInvalidXml: Story = {
  args: {
    xml: '<invalid>xml</invalid>',
    height: '400px',
    width: '600px',
  },
  parameters: {
    docs: {
      description: {
        story: 'Zeigt die Fehlerbehandlung bei ungültigem BPMN XML.',
      },
    },
  },
};

/**
 * Story ohne XML (zeigt den Ladezustand mit default Diagramm).
 */
export const Loading: Story = {
  args: {
    height: '500px',
    width: '800px',
  },
  parameters: {
    docs: {
      description: {
        story: 'Zeigt den Ladezustand mit einem Standard-Diagramm.',
      },
    },
  },
};

// BPMN XML ohne DI-Informationen (für Auto-Layout-Test)
const xmlWithoutDi = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
                  targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1" name="Order Received"/>
    <bpmn:task id="Task_1" name="Validate Order"/>
    <bpmn:task id="Task_2" name="Process Payment"/>
    <bpmn:task id="Task_3" name="Ship Order"/>
    <bpmn:endEvent id="EndEvent_1" name="Complete"/>
    <bpmn:sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="Task_1"/>
    <bpmn:sequenceFlow id="Flow_2" sourceRef="Task_1" targetRef="Task_2"/>
    <bpmn:sequenceFlow id="Flow_3" sourceRef="Task_2" targetRef="Task_3"/>
    <bpmn:sequenceFlow id="Flow_4" sourceRef="Task_3" targetRef="EndEvent_1"/>
  </bpmn:process>
</bpmn:definitions>`;

/**
 * Story mit automatischem Layout (XML ohne DI-Informationen).
 * Verwendet yet-another-bpmn-auto-layout um automatisch Positionen zu berechnen.
 */
export const WithAutoLayout: Story = {
  args: {
    xml: xmlWithoutDi,
    height: '500px',
    width: '800px',
    autoLayout: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstration der automatischen Layout-Funktion. Das XML enthält keine Diagramm-Informationen (DI), daher wird das Layout automatisch mit yet-another-bpmn-auto-layout berechnet.',
      },
    },
  },
};

/**
 * Story ohne Auto-Layout (XML ohne DI-Informationen).
 * Zeigt wie das Diagramm ohne Layout-Informationen aussieht.
 */
export const WithoutAutoLayout: Story = {
  args: {
    xml: xmlWithoutDi,
    height: '500px',
    width: '800px',
    autoLayout: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Zeigt das gleiche XML ohne automatisches Layout. Ohne DI-Informationen können die Elemente nicht korrekt positioniert werden.',
      },
    },
  },
};

// BPMN XML ohne Diagramminformationen (DI) - für Auto-Layout Demo
const xmlWithoutDi = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
                  targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1" name="Start"/>
    <bpmn:task id="Task_1" name="Validate Request"/>
    <bpmn:task id="Task_2" name="Process Data"/>
    <bpmn:exclusiveGateway id="Gateway_1" name="Valid?"/>
    <bpmn:task id="Task_3" name="Send Confirmation"/>
    <bpmn:task id="Task_4" name="Send Rejection"/>
    <bpmn:endEvent id="EndEvent_1" name="Success"/>
    <bpmn:endEvent id="EndEvent_2" name="Failed"/>
    <bpmn:sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="Task_1"/>
    <bpmn:sequenceFlow id="Flow_2" sourceRef="Task_1" targetRef="Task_2"/>
    <bpmn:sequenceFlow id="Flow_3" sourceRef="Task_2" targetRef="Gateway_1"/>
    <bpmn:sequenceFlow id="Flow_4" sourceRef="Gateway_1" targetRef="Task_3" name="Yes"/>
    <bpmn:sequenceFlow id="Flow_5" sourceRef="Task_3" targetRef="EndEvent_1"/>
    <bpmn:sequenceFlow id="Flow_6" sourceRef="Gateway_1" targetRef="Task_4" name="No"/>
    <bpmn:sequenceFlow id="Flow_7" sourceRef="Task_4" targetRef="EndEvent_2"/>
  </bpmn:process>
</bpmn:definitions>`;

/**
 * Story mit Auto-Layout - BPMN XML ohne Diagramminformationen wird automatisch angeordnet.
 */
export const WithAutoLayout: Story = {
  args: {
    xml: xmlWithoutDi,
    height: '600px',
    width: '1000px',
    autoLayout: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Verwendet yet-another-bpmn-auto-layout um ein BPMN-Diagramm ohne vorhandene Diagramminformationen (DI) automatisch anzuordnen.',
      },
    },
  },
};

/**
 * Story ohne Auto-Layout - zeigt wie XML ohne DI ohne Layout aussieht.
 */
export const WithoutAutoLayout: Story = {
  args: {
    xml: xmlWithoutDi,
    height: '600px',
    width: '1000px',
    autoLayout: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Zeigt das gleiche XML ohne DI, aber ohne Auto-Layout. Die Elemente werden überlappend dargestellt oder möglicherweise nicht korrekt positioniert.',
      },
    },
  },
};
