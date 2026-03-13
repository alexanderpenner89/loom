// frontend/src/components/EditorCanvas.tsx
import { useState, useRef } from 'react'
import BpmnEditor, { type BpmnEditorHandle } from './BpmnEditor'
import { MOCK_GENERATED_XML, BLANK_BPMN_XML } from './bpmnConstants'

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
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  async function handleGenerate() {
    if (!prompt.trim() || isGenerating) return
    setIsGenerating(true)
    onGenerate?.(prompt)
    await new Promise(r => setTimeout(r, 1200))
    setCurrentXml(MOCK_GENERATED_XML)
    setPhase('editing')
    setIsGenerating(false)
  }

  async function handleRelease() {
    await editorRef.current?.flush()
    setIsReadOnly(true)
  }

  const badge = isReadOnly
    ? <span className="text-[9px] text-[#22AA22] border border-[#22AA22] px-1.5 py-0.5 uppercase tracking-widest font-semibold">Freigegeben</span>
    : <span className="text-[9px] text-[#666666] border border-[#E5E5E5] px-1.5 py-0.5 uppercase tracking-widest font-semibold">Entwurf</span>

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
            {badge}
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
          <div className="w-full max-w-3xl bg-white border border-[#E5E5E5] shadow-[0_40px_80px_rgba(0,0,0,0.05)]">
            {/* Panel Header */}
            <div className="px-8 py-6 border-b border-[#E5E5E5] flex items-center gap-3 bg-[#FAFAFA]">
              <svg className="w-5 h-5 text-[#0033FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h2 className="text-[14px] font-medium tracking-tight text-[#0A0A0A]">Was soll modelliert werden?</h2>
            </div>
            {/* Textarea */}
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Beschreibe den Ablauf, lade eine Richtlinie hoch oder diktiere den Prozess..."
              className="w-full min-h-[160px] px-8 py-6 text-[15px] text-[#0A0A0A] bg-transparent resize-none outline-none placeholder:text-[#AAAAAA] font-light leading-relaxed"
              onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleGenerate() }}
            />
            {/* Toolbar */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-[#E5E5E5]">
              <div className="flex items-center gap-2">
                <button className="w-9 h-9 text-[#666666] hover:text-[#0033FF] hover:bg-[#F4F4F4] transition-colors flex items-center justify-center" title="Datei anhängen">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <button className="w-9 h-9 text-[#666666] hover:text-[#0033FF] hover:bg-[#F4F4F4] transition-colors flex items-center justify-center" title="Spracheingabe">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
              </div>
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="px-8 py-3 bg-[#0A0A0A] text-white text-[13px] font-medium hover:bg-[#0033FF] transition-colors flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#0A0A0A]"
              >
                {isGenerating ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ) : 'Generieren'}
              </button>
            </div>
          </div>
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
