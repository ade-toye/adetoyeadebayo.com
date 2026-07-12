import { useEffect, useRef, useState } from 'react'
import { site } from '../data/site'
import { useAudio } from '../hooks/useAudio'

const RESUME_ITEMS = [
  { label: 'Resume (SWE)', href: site.resumeDrive.swe },
  { label: 'Resume (PM)', href: site.resumeDrive.pm },
] as const

/** Wide "[,] View Resume" button revealing the two resume links (new tab). */
export default function ResumeDropdown() {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const { playClick } = useAudio()

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) setOpen(false)
    }
    // Capture phase + stopPropagation: Escape closes the dropdown without also
    // triggering PagePanel's Escape-to-home.
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        setOpen(false)
      }
    }
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('keydown', onKeyDown, true)
    return () => {
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('keydown', onKeyDown, true)
    }
  }, [open])

  return (
    <div ref={wrapRef} className="relative">
      {open && (
        <div
          role="menu"
          aria-label="Resume downloads"
          className="absolute bottom-full mb-2 w-full border-2 border-[#0c0c0e] bg-[#2b2b30]"
        >
          {RESUME_ITEMS.map((item) => (
            <a
              key={item.label}
              role="menuitem"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                playClick()
                setOpen(false)
              }}
              className="block px-4 py-3 font-pixel text-sm tracking-[0.05em] text-white hover:bg-[#3a3a41]"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => {
          playClick()
          setOpen((v) => !v)
        }}
        className="mc-button block w-full px-6 py-2.5 font-pixel text-base tracking-[0.08em] text-white [text-shadow:0.09em_0.09em_0_rgba(0,0,0,0.5)]"
      >
        [,] View Resume
      </button>
    </div>
  )
}
