interface CreateProcessModalProps {
  onCreateAI?: () => void
  onCreateBlank?: () => void
  onClose?: () => void
}

export function CreateProcessModal({ onCreateAI, onCreateBlank, onClose }: CreateProcessModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F4F4F4]/95 backdrop-blur-sm">
      <div className="bg-white border border-[#E5E5E5] w-full max-w-4xl h-[400px] flex flex-col shadow-[0_30px_60px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between px-10 py-8 border-b border-[#E5E5E5]">
          <h2 className="text-[18px] font-medium tracking-tight text-[#0A0A0A]">Methodik wählen</h2>
          <button
            onClick={() => onClose?.()}
            className="text-[#888888] hover:text-[#0A0A0A] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 flex bg-[#F4F4F4] gap-[1px]">
          {/* AI Option */}
          <button
            className="flex-1 bg-white p-12 flex flex-col items-start justify-center hover:bg-[#FAFAFA] transition-colors group text-left"
            onClick={() => { onCreateAI?.(); onClose?.() }}
          >
            <svg className="w-8 h-8 text-[#0A0A0A] group-hover:text-[#0033FF] mb-6 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 className="font-medium text-[20px] text-[#0A0A0A] tracking-tight mb-2">KI-gestützt generieren</h3>
            <p className="text-[14px] text-[#666666] leading-relaxed font-light">Prozesslogik aus Text, Sprache oder PDF direkt auf dem Canvas extrahieren.</p>
          </button>
          {/* Blank Option */}
          <button
            className="flex-1 bg-white p-12 flex flex-col items-start justify-center hover:bg-[#FAFAFA] transition-colors group text-left"
            onClick={() => { onCreateBlank?.(); onClose?.() }}
          >
            <svg className="w-8 h-8 text-[#0A0A0A] mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
            <h3 className="font-medium text-[20px] text-[#0A0A0A] tracking-tight mb-2">Manuelles Canvas</h3>
            <p className="text-[14px] text-[#666666] leading-relaxed font-light">Ein leeres Grid öffnen und den Prozess klassisch über die Werkzeuge aufbauen.</p>
          </button>
        </div>
      </div>
    </div>
  )
}
