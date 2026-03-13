interface SuggestionPanelProps {
  suggestion: { title: string; description: string; latency?: string }
  onApply?: () => void
  onIgnore?: () => void
}

export function SuggestionPanel({ suggestion, onApply, onIgnore }: SuggestionPanelProps) {
  return (
    <div
      className="absolute right-10 top-10 w-[360px] flex flex-col z-30 border"
      style={{ backgroundColor: '#0A0A0A', borderColor: '#333333' }}
    >
      <div
        className="px-6 py-4 border-b flex items-center gap-2"
        style={{ borderColor: '#333333', backgroundColor: '#111111' }}
      >
        <div className="w-1.5 h-1.5" style={{ backgroundColor: '#0033FF' }} />
        <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#0033FF' }}>
          System Vorschlag
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-[16px] font-medium tracking-tight mb-2 text-white">{suggestion.title}</h3>
        <p className="text-[13px] leading-relaxed font-light mb-8" style={{ color: '#AAAAAA' }}>
          {suggestion.description}
          {suggestion.latency && (
            <> Latenz: <span className="text-white">{suggestion.latency}</span>.</>
          )}
        </p>
        <div className="flex border" style={{ borderColor: '#333333' }}>
          <button
            onClick={onIgnore}
            className="flex-1 py-3 text-[12px] font-medium transition-colors border-r"
            style={{ color: '#888888', borderColor: '#333333' }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'white'
              e.currentTarget.style.backgroundColor = '#1A1A1A'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#888888'
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            Ignorieren
          </button>
          <button
            onClick={onApply}
            className="flex-1 py-3 text-[12px] font-medium text-white transition-colors"
            style={{ backgroundColor: '#0033FF' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#0022AA')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#0033FF')}
          >
            Anwenden
          </button>
        </div>
      </div>
    </div>
  )
}
