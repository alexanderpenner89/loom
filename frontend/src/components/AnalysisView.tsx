import { useEffect, useRef } from 'react'
import BpmnJS from 'bpmn-js/lib/Viewer'
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import { SuggestionPanel } from './SuggestionPanel'

const ONBOARDING_XML = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
                  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
                  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
                  xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
                  targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_Onboarding" isExecutable="false">
    <bpmn:startEvent id="Start" name="Start"/>
    <bpmn:task id="Task_VertraegeCheck" name="Verträge prüfen"/>
    <bpmn:task id="Task_FreigabeGF" name="Freigabe GF"/>
    <bpmn:endEvent id="End" name="IT Setup"/>
    <bpmn:sequenceFlow id="Flow_1" sourceRef="Start" targetRef="Task_VertraegeCheck"/>
    <bpmn:sequenceFlow id="Flow_2" sourceRef="Task_VertraegeCheck" targetRef="Task_FreigabeGF"/>
    <bpmn:sequenceFlow id="Flow_3" sourceRef="Task_FreigabeGF" targetRef="End"/>
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_Onboarding">
      <bpmndi:BPMNShape id="Start_di" bpmnElement="Start">
        <dc:Bounds x="152" y="242" width="36" height="36"/>
        <bpmndi:BPMNLabel><dc:Bounds x="155" y="285" width="30" height="14"/></bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_VertraegeCheck_di" bpmnElement="Task_VertraegeCheck">
        <dc:Bounds x="250" y="220" width="130" height="80"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_FreigabeGF_di" bpmnElement="Task_FreigabeGF">
        <dc:Bounds x="450" y="220" width="130" height="80"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="End_di" bpmnElement="End">
        <dc:Bounds x="652" y="242" width="36" height="36"/>
        <bpmndi:BPMNLabel><dc:Bounds x="642" y="285" width="55" height="14"/></bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1_di" bpmnElement="Flow_1">
        <di:waypoint x="188" y="260"/>
        <di:waypoint x="250" y="260"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_2_di" bpmnElement="Flow_2">
        <di:waypoint x="380" y="260"/>
        <di:waypoint x="450" y="260"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_3_di" bpmnElement="Flow_3">
        <di:waypoint x="580" y="260"/>
        <di:waypoint x="652" y="260"/>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`

export interface AnalysisViewProps {
  /** Name des analysierten Prozesses */
  processName?: string
  /** BPMN 2.0 XML des zu analysierenden Prozesses */
  xml?: string
  /** ID des Flaschenhals-Elements (wird rot hervorgehoben) */
  bottleneckId?: string
  /** ID der eingehenden Sequenzverbindung zum Flaschenhals */
  bottleneckFlowId?: string
  /** KI-Vorschlag im Seitenpanel */
  suggestion?: {
    title: string
    description: string
    latency?: string
  }
  /** Callback für Zurück-Navigation */
  onBack?: () => void
  /** Callback wenn "Anwenden" geklickt wird */
  onApplyFix?: () => void
  /** Callback wenn "Ignorieren" geklickt wird */
  onIgnoreFix?: () => void
}

const DARK_CSS = `
  .analysis-bpmn .djs-container {
    background: transparent !important;
  }
  .analysis-bpmn .djs-visual rect {
    fill: #111111 !important;
    stroke: #444444 !important;
  }
  .analysis-bpmn .djs-visual circle,
  .analysis-bpmn .djs-visual ellipse {
    fill: #111111 !important;
    stroke: #666666 !important;
  }
  .analysis-bpmn .djs-visual path {
    stroke: #555555 !important;
  }
  .analysis-bpmn .djs-visual polygon {
    fill: #555555 !important;
    stroke: #555555 !important;
  }
  .analysis-bpmn .djs-label text,
  .analysis-bpmn .djs-label tspan {
    fill: #CCCCCC !important;
    stroke: none !important;
  }
  .analysis-bpmn .djs-hit {
    fill: none !important;
    stroke: none !important;
  }
  .analysis-bpmn .djs-outline {
    display: none !important;
  }

  /* Flaschenhals-Overlay Animationen */
  @keyframes bottleneckPulse {
    0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(255, 34, 0, 0.4); }
    50% { opacity: 0.6; box-shadow: 0 0 12px 4px rgba(255, 34, 0, 0.15); }
  }
  @keyframes bottleneckFlow {
    to { stroke-dashoffset: -20; }
  }
  .bottleneck-overlay {
    animation: bottleneckPulse 1.5s ease-in-out infinite;
    border: 2px solid #FF2200;
    background: rgba(255, 34, 0, 0.05);
    pointer-events: none;
    box-sizing: border-box;
  }
  .bottleneck-flow-overlay path {
    stroke: #FF2200 !important;
    stroke-dasharray: 6 4 !important;
    stroke-width: 2 !important;
    animation: bottleneckFlow 0.8s linear infinite !important;
  }
  .bottleneck-flow-overlay polygon {
    fill: #FF2200 !important;
    stroke: #FF2200 !important;
  }
`

export function AnalysisView({
  processName = 'Onboarding Master',
  xml = ONBOARDING_XML,
  bottleneckId = 'Task_FreigabeGF',
  bottleneckFlowId = 'Flow_2',
  suggestion = {
    title: 'Sequenzielle Blockade',
    description:
      'Die Freigabe der Geschäftsführung blockiert nachfolgende Prozesse. Transformation in paralleles Gateway (AND) empfohlen.',
    latency: '4,2 Tage',
  },
  onBack,
  onApplyFix,
  onIgnoreFix,
}: AnalysisViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<BpmnJS | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Inject dark mode CSS once
    const styleId = 'analysis-bpmn-dark'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = DARK_CSS
      document.head.appendChild(style)
    }

    const viewer = new BpmnJS({ container: containerRef.current })
    viewerRef.current = viewer

    viewer.importXML(xml).then(() => {
      const canvas = viewer.get('canvas') as any
      canvas.zoom('fit-viewport', 'auto')

      const elementRegistry = viewer.get('elementRegistry') as any
      const overlays = viewer.get('overlays') as any

      // Flaschenhals-Task hervorheben
      const bottleneckEl = elementRegistry.get(bottleneckId)
      if (bottleneckEl) {
        const overlay = document.createElement('div')
        overlay.className = 'bottleneck-overlay'
        overlay.style.width = `${bottleneckEl.width}px`
        overlay.style.height = `${bottleneckEl.height}px`
        overlays.add(bottleneckId, { position: { top: 0, left: 0 }, html: overlay })
      }

      // Eingehenden Flow zum Flaschenhals hervorheben
      const flowEl = elementRegistry.get(bottleneckFlowId)
      if (flowEl) {
        const gfx = canvas.getGraphics(flowEl) as SVGElement | null
        if (gfx) gfx.classList.add('bottleneck-flow-overlay')
      }
    }).catch((err: Error) => {
      console.error('AnalysisView: BPMN import failed', err)
    })

    return () => {
      viewer.destroy()
    }
  }, [xml, bottleneckId, bottleneckFlowId])

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#050505', color: '#E5E5E5' }}
    >
      {/* Header */}
      <header
        className="h-16 px-10 flex items-center justify-between z-20 relative border-b flex-shrink-0"
        style={{ borderColor: '#222222', backgroundColor: '#0A0A0A' }}
      >
        <div className="flex items-center gap-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[13px] transition-colors"
            style={{ color: '#AAAAAA' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'white')}
            onMouseLeave={e => (e.currentTarget.style.color = '#AAAAAA')}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Zurück
          </button>
          <div className="w-px h-4" style={{ backgroundColor: '#333333' }} />
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-medium tracking-tight text-white">{processName}</span>
            <span
              className="text-[9px] px-1.5 py-0.5 uppercase tracking-widest font-semibold border"
              style={{ color: '#FF2200', borderColor: '#FF2200' }}
            >
              Analyse Modus
            </span>
          </div>
        </div>
        <button
          onClick={onBack}
          className="text-[12px] font-medium uppercase tracking-widest transition-colors"
          style={{ color: '#888888' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'white')}
          onMouseLeave={e => (e.currentTarget.style.color = '#888888')}
        >
          Beenden
        </button>
      </header>

      {/* Canvas */}
      <main
        className="flex-1 relative z-0 overflow-hidden"
        style={{
          backgroundImage:
            'linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundColor: '#050505',
        }}
      >
        {/* bpmn-js Canvas */}
        <div
          ref={containerRef}
          className="analysis-bpmn absolute inset-0 w-full h-full"
        />

        <SuggestionPanel
          suggestion={suggestion}
          onApply={onApplyFix}
          onIgnore={onIgnoreFix}
        />
      </main>
    </div>
  )
}
