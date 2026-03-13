import { useState, useEffect, useRef } from 'react'

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

interface Process {
  id: string
  name: string
  department: string
  lastEdited: string
  status: 'draft' | 'published'
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
  const [showSpaceMenu, setShowSpaceMenu] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'all' | 'drafts'>('all')
  const spaceMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (spaceMenuRef.current && !spaceMenuRef.current.contains(e.target as Node)) {
        setShowSpaceMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const drafts = PROCESSES.filter(p => p.status === 'draft')
  const displayedProcesses = activeTab === 'drafts' ? drafts : PROCESSES

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F4F4] text-[#0A0A0A]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <header className="h-16 px-10 flex items-center justify-between bg-white border-b border-[#E5E5E5] relative z-40">
        {/* Space Switcher */}
        <div className="relative h-full flex items-center" ref={spaceMenuRef}>
          <button
            className="flex items-center gap-4 cursor-pointer h-full px-2 -ml-2 hover:bg-[#F4F4F4] transition-colors"
            onClick={() => setShowSpaceMenu(v => !v)}
          >
            <div className="w-6 h-6 bg-[#0A0A0A] text-white flex items-center justify-center text-[10px] font-medium tracking-widest">
              {spaceInitials}
            </div>
            <span className="font-medium text-[14px] tracking-tight text-[#0A0A0A]">{spaceName}</span>
            <svg className="w-3.5 h-3.5 text-[#888888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown */}
          {showSpaceMenu && (
            <div className="absolute top-16 left-0 w-[300px] bg-white border-x border-b border-[#E5E5E5] shadow-[0_20px_40px_rgba(0,0,0,0.05)] flex flex-col z-50">
              <div className="p-3 border-b border-[#E5E5E5]">
                <input
                  type="text"
                  placeholder="Suchen..."
                  className="w-full bg-white border border-[#E5E5E5] text-[13px] py-2 px-3 outline-none focus:border-[#0033FF] transition-colors placeholder:text-[#AAAAAA]"
                />
              </div>
              <div>
                <button className="w-full text-left px-5 py-3 flex items-center bg-[#F4F4F4] border-l-2 border-[#0033FF]">
                  <span className="text-[13px] font-medium text-[#0A0A0A]">{spaceName}</span>
                </button>
                <button className="w-full text-left px-5 py-3 flex items-center hover:bg-[#F9F9F9] border-l-2 border-transparent transition-colors">
                  <span className="text-[13px] text-[#666666]">Globex Inc</span>
                </button>
              </div>
            </div>
          )}
        </div>

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
            <button
              className="bg-white p-6 flex flex-col text-left group cursor-pointer hover:bg-[#FAFAFA] transition-colors"
              onClick={() => onInsightClick?.('bottleneck')}
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-[10px] font-semibold text-[#FF2200] border border-[#FF2200] px-2 py-0.5 uppercase tracking-widest">Aktion Erforderlich</span>
                <svg className="w-4 h-4 text-[#AAAAAA] group-hover:text-[#0A0A0A] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
              <h4 className="text-[15px] font-medium text-[#0A0A0A] tracking-tight mb-2">Flaschenhals: Onboarding</h4>
              <p className="text-[13px] text-[#666666] leading-relaxed font-light">Eine sequenzielle Freigabe verzögert den Master-Ablauf um ca. 4 Tage.</p>
            </button>
            <button
              className="bg-white p-6 flex flex-col text-left group cursor-pointer hover:bg-[#FAFAFA] transition-colors"
              onClick={() => onInsightClick?.('deviation')}
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-[10px] font-semibold text-[#0033FF] border border-[#0033FF] px-2 py-0.5 uppercase tracking-widest">Abweichung</span>
                <svg className="w-4 h-4 text-[#AAAAAA] group-hover:text-[#0A0A0A] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
              <h4 className="text-[15px] font-medium text-[#0A0A0A] tracking-tight mb-2">Standort: München</h4>
              <p className="text-[13px] text-[#666666] leading-relaxed font-light">Der Prozess 'Warenausgang' wurde lokal abweichend modelliert.</p>
            </button>
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
              <button
                key={process.id}
                className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#FAFAFA] transition-colors group border-b border-[#E5E5E5] last:border-b-0 text-left"
                onClick={() => onProcessClick?.(process.id)}
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
            ))}
          </div>
        </section>
      </main>

      {/* Create Process Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F4F4F4]/95 backdrop-blur-sm">
          <div className="bg-white border border-[#E5E5E5] w-full max-w-4xl h-[400px] flex flex-col shadow-[0_30px_60px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-between px-10 py-8 border-b border-[#E5E5E5]">
              <h2 className="text-[18px] font-medium tracking-tight text-[#0A0A0A]">Methodik wählen</h2>
              <button
                onClick={() => setShowModal(false)}
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
                onClick={() => { setShowModal(false); onCreateAI?.() }}
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
                onClick={() => { setShowModal(false); onCreateBlank?.() }}
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
      )}
    </div>
  )
}
