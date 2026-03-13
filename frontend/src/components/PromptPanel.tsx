import { useState } from 'react'

interface PromptPanelProps {
  onGenerate?: (prompt: string) => void
  isGenerating?: boolean
}

export function PromptPanel({ onGenerate, isGenerating = false }: PromptPanelProps) {
  const [prompt, setPrompt] = useState('')

  const handleGenerate = () => {
    if (!prompt.trim() || isGenerating) return
    onGenerate?.(prompt)
  }

  return (
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
  )
}
