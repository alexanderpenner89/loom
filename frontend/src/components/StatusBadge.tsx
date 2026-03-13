// frontend/src/components/StatusBadge.tsx

type StatusBadgeVariant = 'draft' | 'released' | 'action-required' | 'deviation' | 'analysis'

interface StatusBadgeProps {
  variant: StatusBadgeVariant
  label?: string
}

const VARIANT_CONFIG: Record<
  StatusBadgeVariant,
  { defaultLabel: string; className: string }
> = {
  draft: {
    defaultLabel: 'Entwurf',
    className: 'text-[#666666] border border-[#E5E5E5]',
  },
  released: {
    defaultLabel: 'Freigegeben',
    className: 'text-[#22AA22] border border-[#22AA22]',
  },
  'action-required': {
    defaultLabel: 'Aktion Erforderlich',
    className: 'text-[#FF2200] border border-[#FF2200]',
  },
  deviation: {
    defaultLabel: 'Abweichung',
    className: 'text-[#0033FF] border border-[#0033FF]',
  },
  analysis: {
    defaultLabel: 'Analyse Modus',
    className: 'text-[#FF2200] border border-[#FF2200]',
  },
}

const BASE_CLASSES =
  'text-[9px] font-semibold px-1.5 py-0.5 uppercase tracking-widest'

export function StatusBadge({ variant, label }: StatusBadgeProps) {
  const { defaultLabel, className } = VARIANT_CONFIG[variant]
  return (
    <span className={`${BASE_CLASSES} ${className}`}>
      {label ?? defaultLabel}
    </span>
  )
}
