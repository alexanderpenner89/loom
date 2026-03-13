import { layoutProcess } from 'yet-another-bpmn-auto-layout';

const xmlWithoutDi = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
                  targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1" name="Start"/>
    <bpmn:task id="Task_1" name="Validate Request"/>
    <bpmn:endEvent id="EndEvent_1" name="Success"/>
    <bpmn:sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="Task_1"/>
    <bpmn:sequenceFlow id="Flow_2" sourceRef="Task_1" targetRef="EndEvent_1"/>
  </bpmn:process>
</bpmn:definitions>`;

console.log('Input XML has DI:', xmlWithoutDi.includes('bpmndi:') || xmlWithoutDi.includes('BPMNDiagram'));

try {
  const result = await layoutProcess(xmlWithoutDi);
  console.log('Layout process succeeded!');
  console.log('Result contains DI:', result.includes('bpmndi:'));
} catch (err) {
  console.error('Layout process failed:', err.message);
}
