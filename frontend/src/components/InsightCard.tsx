interface InsightCardProps {
  variant: 'action-required' | 'deviation'
  title: string
  description: string
  onClick?: () => void
}

export function InsightCard({ variant, title, description, onClick }: InsightCardProps) {
  const isActionRequired = variant === 'action-required'

  const badgeLabel = isActionRequired ? 'Aktion Erforderlich' : 'Abweichung'
  const badgeColor = isActionRequired ? '#FF2200' : '#0033FF'

  return (
    <button
      className="bg-white p-6 flex flex-col text-left group cursor-pointer hover:bg-[#FAFAFA] transition-colors"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-6">
        <span
          className="text-[10px] font-semibold px-2 py-0.5 uppercase tracking-widest border"
          style={{ color: badgeColor, borderColor: badgeColor }}
        >
          {badgeLabel}
        </span>
        <svg
          className="w-4 h-4 text-[#AAAAAA] group-hover:text-[#0A0A0A] transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
      <h4 className="text-[15px] font-medium text-[#0A0A0A] tracking-tight mb-2">{title}</h4>
      <p className="text-[13px] text-[#666666] leading-relaxed font-light">{description}</p>
    </button>
  )
}
