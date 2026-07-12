import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAudio } from '../hooks/useAudio'

type PagePanelProps = {
  /** Rendered as "[ TITLE ]" in the header bar. */
  title: string
  children: ReactNode
}

/**
 * Full-viewport modal-style frame for section pages: header bar with a
 * bracketed title and a Close control (returns home; Escape also closes).
 * The body is the page's own scroll region — the page itself never scrolls.
 */
export default function PagePanel({ title, children }: PagePanelProps) {
  const navigate = useNavigate()
  const { playClick } = useAudio()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') navigate('/')
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [navigate])

  return (
    <div className="fixed inset-0 z-[35] p-2 sm:p-3">
      <div className="flex h-full w-full flex-col border-2 border-[#0c0c0e] bg-[#101013]">
        <header className="flex items-center justify-between border-b-2 border-[#0c0c0e] bg-[#2e2e33] px-6 py-3">
          <h1 className="text-lg tracking-[0.1em] text-white sm:text-xl">[ {title} ]</h1>
          <button
            type="button"
            onClick={() => {
              playClick()
              navigate('/')
            }}
            className="mc-close flex items-center gap-2 font-pixel text-sm tracking-[0.08em]"
          >
            <span aria-hidden="true">×</span> Close
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}
