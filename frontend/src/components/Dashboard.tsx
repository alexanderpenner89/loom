import { useState } from 'react'
import { InsightCard } from './InsightCard'
import { ProcessRow } from './ProcessRow'
import type { Process } from './ProcessRow'
import { CreateProcessModal } from './CreateProcessModal'
import { SpaceSwitcher } from './SpaceSwitcher'

export interface DashboardProps {
  /** Name des aktuellen Workspace */
  spaceName?: string
  /** Initialen des aktuellen Workspace */
  spaceInitials?: string
  /** Name des eingeloggten Nutzers */
  userName?: string
  /** Wird aufgerufen wenn "Neuen Prozess erstellen" → KI gewählt wird */
  onCreateAI?: () => void
  /** Wird aufgerufen wenn "Neuen Prozess erstellen" → Manuell gewählt wird */
  onCreateBlank?: () => void
  /** Wird aufgerufen wenn ein Prozess in der Liste angeklickt wird */
  onProcessClick?: (processId: string) => void
  /** Wird aufgerufen wenn ein Insight-Card angeklickt wird */
  onInsightClick?: (type: 'bottleneck' | 'deviation') => void
}

const PROCESSES: Process[] = [
  { id: 'onboarding-master', name: 'Onboarding Master', department: 'HR Abteilung', lastEdited: 'Vor 2 Std.', status: 'draft' },
  { id: 'warenausgang-muenchen', name: 'Warenausgang München', department: 'Logistik', lastEdited: 'Gestern', status: 'published' },
  { id: 'rechnungsfreigabe', name: 'Rechnungsfreigabe', department: 'Finanzen', lastEdited: 'Vor 3 Tagen', status: 'published' },
]

export function Dashboard({
  spaceName = 'Acme Corp',
  spaceInitials = 'AC',
  userName = 'Alex',
  onCreateAI,
  onCreateBlank,
  onProcessClick,
  onInsightClick,
}: DashboardProps) {
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'all' | 'drafts'>('all')

  const drafts = PROCESSES.filter(p => p.status === 'draft')
  const displayedProcesses = activeTab === 'drafts' ? drafts : PROCESSES

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F4F4] text-[#0A0A0A]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <header className="h-16 px-10 flex items-center justify-between bg-white border-b border-[#E5E5E5] relative z-40">
        {/* Space Switcher */}
        <SpaceSwitcher
          current={{ name: spaceName, initials: spaceInitials }}
        />

        {/* Search */}
        <div className="flex-1 max-w-md mx-12 h-full flex items-center border-x border-[#E5E5E5] px-4 group">
          <svg className="w-4 h-4 text-[#AAAAAA] group-focus-within:text-[#0033FF] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Prozesse oder Entwürfe durchsuchen..."
            className="w-full bg-transparent text-[13px] tracking-tight py-2 pl-3 pr-4 focus:outline-none placeholder:text-[#AAAAAA]"
          />
        </div>

        {/* Profile */}
        <div className="flex items-center gap-6">
          <span className="text-[12px] font-medium text-[#666666]">{userName}.</span>
          <button className="w-6 h-6 bg-[#E5E5E5] flex items-center justify-center text-[10px] font-medium text-[#0A0A0A] hover:bg-[#D4D4D4] transition-colors">
            {userName.slice(0, 2).toUpperCase()}
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-[1040px] w-full mx-auto px-10 pt-16 pb-24 flex flex-col gap-16">
        {/* Hero */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="text-[40px] font-medium tracking-tight leading-none mb-4 text-[#0A0A0A]">Modellierung.</h1>
            <p className="text-[16px] text-[#666666] font-light tracking-tight">Systemübersicht und Prozesskreation.</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="group flex items-center justify-between px-6 py-4 bg-[#0A0A0A] text-white hover:bg-[#0033FF] transition-colors duration-300"
          >
            <div className="flex items-center gap-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
              <span className="font-medium tracking-tight text-[14px]">Neuen Prozess erstellen</span>
            </div>
          </button>
        </section>

        {/* System Briefing */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-[#0A0A0A]"></div>
            <h2 className="text-[11px] font-semibold tracking-widest text-[#0A0A0A] uppercase">System-Briefing</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[#E5E5E5] border border-[#E5E5E5]">
            <InsightCard
              variant="action-required"
              title="Flaschenhals: Onboarding"
              description="Eine sequenzielle Freigabe verzögert den Master-Ablauf um ca. 4 Tage."
              onClick={() => onInsightClick?.('bottleneck')}
            />
            <InsightCard
              variant="deviation"
              title="Standort: München"
              description="Der Prozess 'Warenausgang' wurde lokal abweichend modelliert."
              onClick={() => onInsightClick?.('deviation')}
            />
          </div>
        </section>

        {/* Process List */}
        <section>
          <div className="flex items-end justify-between mb-4">
            <div className="flex gap-6">
              <button
                className={`text-[13px] font-medium tracking-tight pb-1 border-b-2 transition-colors ${activeTab === 'all' ? 'text-[#0A0A0A] border-[#0A0A0A]' : 'text-[#888888] border-transparent hover:text-[#0A0A0A]'}`}
                onClick={() => setActiveTab('all')}
              >
                Alle Prozesse
              </button>
              <button
                className={`text-[13px] font-medium tracking-tight pb-1 border-b-2 transition-colors ${activeTab === 'drafts' ? 'text-[#0A0A0A] border-[#0A0A0A]' : 'text-[#888888] border-transparent hover:text-[#0A0A0A]'}`}
                onClick={() => setActiveTab('drafts')}
              >
                Entwürfe ({drafts.length})
              </button>
            </div>
            <div className="flex items-center gap-2 text-[#666666] hover:text-[#0A0A0A] cursor-pointer transition-colors">
              <span className="text-[11px] font-medium uppercase tracking-widest">Zuletzt bearbeitet</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="border-t border-[#0A0A0A] bg-white">
            {displayedProcesses.map((process) => (
              <ProcessRow
                key={process.id}
                process={process}
                onClick={onProcessClick}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Create Process Modal */}
      {showModal && (
        <CreateProcessModal
          onCreateAI={onCreateAI}
          onCreateBlank={onCreateBlank}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
