// frontend/src/components/EditorCanvas.tsx
import { useState, useRef } from 'react'
import BpmnEditor, { type BpmnEditorHandle } from './BpmnEditor'
import { MOCK_GENERATED_XML, BLANK_BPMN_XML } from './bpmnConstants'
import { StatusBadge } from './StatusBadge'
import { PromptPanel } from './PromptPanel'

export interface EditorCanvasProps {
  /** Modus: KI-gestützt oder manuell */
  mode?: 'ai' | 'blank'
  /** Name des Prozesses */
  processName?: string
  /** Callback für Zurück-Navigation */
  onBack?: () => void
  /** Callback wenn KI-Generierung gestartet wird */
  onGenerate?: (prompt: string) => void
  /** true = freigegebener Prozess, startet im View-Modus */
  readOnly?: boolean
  /** Pre-loaded XML (für readOnly=true oder bestehende Prozesse) */
  xml?: string
  /** Nur für Storybook/Tests: erzwingt initiale Phase */
  initialPhase?: 'prompt' | 'editing'
}

export function EditorCanvas({
  mode = 'ai',
  processName = 'Unbenannter Prozess',
  onBack,
  onGenerate,
  readOnly = false,
  xml,
  initialPhase,
}: EditorCanvasProps) {
  const editorRef = useRef<BpmnEditorHandle>(null)

  function getInitialPhase(): 'prompt' | 'editing' {
    if (initialPhase) return initialPhase
    if (mode === 'blank') return 'editing'
    if (readOnly) return 'editing'
    return 'prompt'
  }

  function getInitialXml(): string | null {
    if (mode === 'blank') return BLANK_BPMN_XML
    if (readOnly) return xml ?? MOCK_GENERATED_XML
    if (initialPhase === 'editing') return xml ?? MOCK_GENERATED_XML
    return null
  }

  const [phase, setPhase] = useState<'prompt' | 'editing'>(getInitialPhase)
  const [currentXml, setCurrentXml] = useState<string | null>(getInitialXml)
  const [isReadOnly, setIsReadOnly] = useState(readOnly)
  const [isGenerating, setIsGenerating] = useState(false)

  async function handleGenerate(prompt: string) {
    if (isGenerating) return
    setIsGenerating(true)
    try {
      onGenerate?.(prompt)
      await new Promise(r => setTimeout(r, 1200))
      setCurrentXml(MOCK_GENERATED_XML)
      setPhase('editing')
    } finally {
      setIsGenerating(false)
    }
  }

  async function handleRelease() {
    await editorRef.current?.flush()
    setIsReadOnly(true)
  }

  return (
    <div
      className="h-screen flex flex-col bg-white text-[#0A0A0A] overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Header */}
      <header className="h-16 px-10 flex items-center justify-between border-b border-[#E5E5E5] bg-white z-20 relative">
        <div className="flex items-center gap-6">
          <button
            onClick={onBack}
            className="text-[#888888] hover:text-[#0A0A0A] transition-colors flex items-center gap-2 text-[13px]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Zurück
          </button>
          <div className="w-px h-4 bg-[#E5E5E5]" />
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-medium tracking-tight text-[#0A0A0A]">{processName}</span>
            <StatusBadge variant={isReadOnly ? 'released' : 'draft'} />
          </div>
        </div>

        {/* Toolbar — only in editing phase */}
        {phase === 'editing' && (
          <div className="flex items-center gap-2">
            {!isReadOnly && (
              <>
                <button
                  onClick={() => editorRef.current?.undo()}
                  title="Rückgängig"
                  className="w-8 h-8 flex items-center justify-center text-[#666666] hover:text-[#0A0A0A] hover:bg-[#F4F4F4] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h10a8 8 0 010 16H3m0-16l4-4M3 10l4 4" />
                  </svg>
                </button>
                <button
                  onClick={() => editorRef.current?.redo()}
                  title="Wiederholen"
                  className="w-8 h-8 flex items-center justify-center text-[#666666] hover:text-[#0A0A0A] hover:bg-[#F4F4F4] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 10H11a8 8 0 000 16h10m0-16l-4-4m4 4l-4 4" />
                  </svg>
                </button>
                <div className="w-px h-4 bg-[#E5E5E5]" />
              </>
            )}
            <button
              onClick={() => editorRef.current?.zoomFit()}
              title="Ansicht anpassen"
              className="w-8 h-8 flex items-center justify-center text-[#666666] hover:text-[#0A0A0A] hover:bg-[#F4F4F4] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
            {!isReadOnly && (
              <>
                <div className="w-px h-4 bg-[#E5E5E5]" />
                <button
                  onClick={handleRelease}
                  className="px-4 py-2 text-[12px] font-medium text-white bg-[#0A0A0A] hover:bg-[#0033FF] transition-colors"
                >
                  Freigeben
                </button>
              </>
            )}
          </div>
        )}
      </header>

      {/* Canvas */}
      <main
        className="flex-1 relative flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(#E5E5E5 1px, transparent 1px), linear-gradient(90deg, #E5E5E5 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundColor: '#F4F4F4',
        }}
      >
        {phase === 'prompt' ? (
          <PromptPanel
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
        ) : (
          /* Editing / View phase: BpmnEditor fills the canvas */
          currentXml && (
            <BpmnEditor
              key={isReadOnly ? 'viewer' : 'modeler'}
              ref={editorRef}
              xml={currentXml}
              readOnly={isReadOnly}
              onXmlChange={setCurrentXml}
              className="absolute inset-0"
            />
          )
        )}
      </main>
    </div>
  )
}
