export interface Process {
  id: string
  name: string
  department: string
  lastEdited: string
  status: 'draft' | 'published'
}

interface ProcessRowProps {
  process: Process
  onClick?: (id: string) => void
}

export function ProcessRow({ process, onClick }: ProcessRowProps) {
  return (
    <button
      className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#FAFAFA] transition-colors group border-b border-[#E5E5E5] last:border-b-0 text-left"
      onClick={() => onClick?.(process.id)}
    >
      <div className="flex items-center gap-4 w-5/12">
        <svg className="w-4 h-4 text-[#AAAAAA] group-hover:text-[#0033FF] transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
        <span className="font-medium text-[14px] text-[#0A0A0A] tracking-tight">{process.name}</span>
      </div>
      <div className="w-3/12 text-[13px] text-[#666666]">{process.department}</div>
      <div className="w-2/12 text-[13px] text-[#666666]">{process.lastEdited}</div>
      <div className="w-2/12 flex justify-end items-center gap-4">
        {process.status === 'draft' && (
          <span className="text-[10px] font-semibold px-2 py-0.5 border border-[#E5E5E5] text-[#666666] uppercase tracking-widest">Entwurf</span>
        )}
        <svg className="w-4 h-4 text-transparent group-hover:text-[#0A0A0A] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  )
}
