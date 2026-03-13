import { useState, useEffect, useRef } from 'react'

interface Space {
  name: string
  initials: string
}

interface SpaceSwitcherProps {
  current: Space
  spaces?: Space[]
  onSwitch?: (space: Space) => void
  initialOpen?: boolean
}

const DEFAULT_SPACES: Space[] = [{ name: 'Globex Inc', initials: 'GI' }]

export function SpaceSwitcher({
  current,
  spaces = DEFAULT_SPACES,
  onSwitch,
  initialOpen = false,
}: SpaceSwitcherProps) {
  const [showSpaceMenu, setShowSpaceMenu] = useState(initialOpen)
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

  return (
    <div className="relative h-full flex items-center" ref={spaceMenuRef}>
      <button
        className="flex items-center gap-4 cursor-pointer h-full px-2 -ml-2 hover:bg-[#F4F4F4] transition-colors"
        onClick={() => setShowSpaceMenu(v => !v)}
      >
        <div className="w-6 h-6 bg-[#0A0A0A] text-white flex items-center justify-center text-[10px] font-medium tracking-widest">
          {current.initials}
        </div>
        <span className="font-medium text-[14px] tracking-tight text-[#0A0A0A]">{current.name}</span>
        <svg className="w-3.5 h-3.5 text-[#888888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

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
              <span className="text-[13px] font-medium text-[#0A0A0A]">{current.name}</span>
            </button>
            {spaces.map(space => (
              <button
                key={space.name}
                className="w-full text-left px-5 py-3 flex items-center hover:bg-[#F9F9F9] border-l-2 border-transparent transition-colors"
                onClick={() => {
                  onSwitch?.(space)
                  setShowSpaceMenu(false)
                }}
              >
                <span className="text-[13px] text-[#666666]">{space.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
