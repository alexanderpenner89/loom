import BpmnDiagram from './components/BpmnDiagram';
import './App.css';

// Beispiel-BPMN XML für einen einfachen Bestellprozess
const orderProcessXml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
                  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
                  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
                  targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="OrderProcess" name="Order Process" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1" name="Order Received">
      <bpmn:outgoing>Flow_1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Task_1" name="Check Inventory">
      <bpmn:incoming>Flow_1</bpmn:incoming>
      <bpmn:outgoing>Flow_2</bpmn:outgoing>
    </bpmn:task>
    <bpmn:task id="Task_2" name="Process Payment">
      <bpmn:incoming>Flow_2</bpmn:incoming>
      <bpmn:outgoing>Flow_3</bpmn:outgoing>
    </bpmn:task>
    <bpmn:task id="Task_3" name="Ship Order">
      <bpmn:incoming>Flow_3</bpmn:incoming>
      <bpmn:outgoing>Flow_4</bpmn:outgoing>
    </bpmn:task>
    <bpmn:endEvent id="EndEvent_1" name="Order Complete">
      <bpmn:incoming>Flow_4</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="Task_1"/>
    <bpmn:sequenceFlow id="Flow_2" sourceRef="Task_1" targetRef="Task_2"/>
    <bpmn:sequenceFlow id="Flow_3" sourceRef="Task_2" targetRef="Task_3"/>
    <bpmn:sequenceFlow id="Flow_4" sourceRef="Task_3" targetRef="EndEvent_1"/>
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="OrderProcess">
      <bpmndi:BPMNShape id="StartEvent_1_di" bpmnElement="StartEvent_1">
        <dc:Bounds x="152" y="182" width="36" height="36"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_1_di" bpmnElement="Task_1">
        <dc:Bounds x="240" y="160" width="100" height="80"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_2_di" bpmnElement="Task_2">
        <dc:Bounds x="400" y="160" width="100" height="80"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_3_di" bpmnElement="Task_3">
        <dc:Bounds x="560" y="160" width="100" height="80"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_1_di" bpmnElement="EndEvent_1">
        <dc:Bounds x="732" y="182" width="36" height="36"/>
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
        <di:waypoint x="500" y="200"/>
        <di:waypoint x="560" y="200"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_4_di" bpmnElement="Flow_4">
        <di:waypoint x="660" y="200"/>
        <di:waypoint x="732" y="200"/>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ marginBottom: '24px' }}>
        <h1>BPMN Diagram Viewer</h1>
        <p style={{ color: '#666' }}>
          Ein React + Vite + TypeScript Projekt mit bpmn-js Integration
        </p>
      </header>

      <section>
        <h2>Bestellprozess</h2>
        <BpmnDiagram
          xml={orderProcessXml}
          height="500px"
          width="100%"
          onElementClick={(element) => {
            console.log('Element clicked:', element);
            // eslint-disable-next-line no-alert
            alert(`Element: ${element.id} (${element.type})`);
          }}
          onRender={() => console.log('Diagram rendered successfully')}
        />
      </section>

      <footer
        style={{
          marginTop: '40px',
          paddingTop: '20px',
          borderTop: '1px solid #e0e0e0',
          color: '#666',
          fontSize: '14px',
        }}
      >
        <p>Tech Stack: Vite + React + TypeScript + bpmn-js + Storybook</p>
        <p>
          <a href="https://github.com/bpmn-io/bpmn-js" target="_blank" rel="noopener noreferrer">
            bpmn-js Documentation
          </a>
          {' | '}
          <a href="https://storybook.js.org/" target="_blank" rel="noopener noreferrer">
            Storybook Documentation
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
