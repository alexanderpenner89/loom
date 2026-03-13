import { useEffect, useRef, useState } from 'react';
import BpmnJS from 'bpmn-js/lib/Viewer';
import { layoutProcess } from 'yet-another-bpmn-auto-layout';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';

interface BpmnDiagramProps {
  /** BPMN 2.0 XML string to render */
  xml?: string;
  /** Container height */
  height?: string | number;
  /** Container width */
  width?: string | number;
  /** Callback when an element is clicked */
  onElementClick?: (element: any) => void;
  /** Callback when diagram is rendered */
  onRender?: () => void;
  /** Callback when import fails */
  onError?: (error: Error) => void;
  /** Additional CSS class */
  className?: string;
  /** Whether to automatically layout the diagram if it lacks DI information */
  autoLayout?: boolean;
}

const defaultBpmnXml = `<?xml version="1.0" encoding="UTF-8"?>
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

export default function BpmnDiagram({
  xml = defaultBpmnXml,
  height = '600px',
  width = '100%',
  onElementClick,
  onRender,
  onError,
  className,
  autoLayout = false,
}: BpmnDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<BpmnJS | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize BPMN viewer
    viewerRef.current = new BpmnJS({
      container: containerRef.current,
      width,
      height,
    });

    const viewer = viewerRef.current;

    // Add event listeners
    if (onElementClick) {
      viewer.on('element.click', (event: any) => {
        onElementClick(event.element);
      });
    }

    // Import XML
    const importDiagram = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Apply auto-layout if enabled
        let processedXml = xml;
        if (autoLayout) {
          processedXml = await layoutProcess(xml);
        }

        const { warnings } = await viewer.importXML(processedXml);

        if (warnings.length) {
          console.warn('BPMN Import warnings:', warnings);
        }

        // Zoom to fit viewport
        const canvas = viewer.get('canvas') as { zoom: (scale: string, alignment?: string) => void };
        canvas.zoom('fit-viewport', 'auto');

        setIsLoading(false);
        onRender?.();
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to import BPMN diagram';
        console.error('BPMN Import error:', err);
        setError(errorMsg);
        setIsLoading(false);
        if (err instanceof Error) {
          onError?.(err);
        }
      }
    };

    importDiagram();

    // Cleanup
    return () => {
      viewer.destroy();
    };
  }, [xml, height, width, onElementClick, onRender, onError, autoLayout]);

  const containerStyle: React.CSSProperties = {
    width,
    height,
    position: 'relative',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    overflow: 'hidden',
  };

  return (
    <div style={containerStyle} className={className}>
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#666',
            fontFamily: 'system-ui, sans-serif',
            fontSize: '14px',
          }}
        >
          Loading diagram...
        </div>
      )}
      {error && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#d32f2f',
            fontFamily: 'system-ui, sans-serif',
            fontSize: '14px',
            textAlign: 'center',
            padding: '16px',
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>Error loading diagram</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{error}</div>
        </div>
      )}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          opacity: isLoading || error ? 0 : 1,
          transition: 'opacity 0.3s ease',
        }}
      />
    </div>
  );
}
