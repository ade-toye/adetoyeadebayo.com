import { useEffect, useRef } from 'react'
import { useAudio } from '../hooks/useAudio'

type ToggleRowProps = {
  label: string
  on: boolean
  onToggle: () => void
}

function ToggleRow({ label, on, onToggle }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between gap-6">
      <span className="font-pixel text-[11px] tracking-[0.08em]">{label}</span>
      <button
        type="button"
        aria-pressed={on}
        aria-label={label}
        onClick={onToggle}
        className={`mc-button w-20 px-2 py-1 font-pixel text-[11px] text-white [text-shadow:0.09em_0.09em_0_rgba(0,0,0,0.5)] ${
          on ? 'mc-button-on' : ''
        }`}
      >
        {on ? 'ON' : 'OFF'}
      </button>
    </div>
  )
}

type OptionsModalProps = {
  open: boolean
  onClose: () => void
}

/** Minecraft pause-menu style settings dialog: SOUND FX / NATURE toggles + DONE. */
export default function OptionsModal({ open, onClose }: OptionsModalProps) {
  const { soundFx, nature, toggleSoundFx, toggleNature, playClick } = useAudio()
  const panelRef = useRef<HTMLDivElement>(null)
  const firstControlRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    firstControlRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key === 'Tab') {
        // Minimal focus trap across the modal's three buttons.
        const buttons = panelRef.current?.querySelectorAll<HTMLButtonElement>('button')
        if (!buttons || buttons.length === 0) return
        const first = buttons[0]
        const last = buttons[buttons.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    // Transparent full-screen layer: catches outside clicks without dimming the
    // page — the reference keeps the site fully visible behind the panel.
    <div className="fixed inset-0 z-40" onClick={onClose}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="options-title"
        onClick={(event) => event.stopPropagation()}
        className="absolute top-3 right-3 w-52 border-2 border-[#0c0c0e] bg-[#3a3a41] px-4 py-3 shadow-[5px_5px_0_rgba(0,0,0,0.55),inset_2px_2px_0_rgba(255,255,255,0.1),inset_-2px_-2px_0_rgba(0,0,0,0.35)]"
      >
        <h2 id="options-title" className="text-xs tracking-[0.08em]">
          OPTIONS
        </h2>
        <div className="mt-3 flex flex-col gap-2.5">
          <ToggleRow
            label="SOUND FX"
            on={soundFx}
            onToggle={() => {
              // Confirmation click when switching ON (state hasn't committed yet).
              playClick({ force: !soundFx })
              toggleSoundFx()
            }}
          />
          <ToggleRow
            label="NATURE"
            on={nature}
            onToggle={() => {
              playClick()
              toggleNature()
            }}
          />
        </div>
        <button
          ref={firstControlRef}
          type="button"
          onClick={() => {
            playClick()
            onClose()
          }}
          className="mc-button mt-3.5 block w-full px-4 py-1 font-pixel text-[11px] tracking-[0.08em] text-white [text-shadow:0.09em_0.09em_0_rgba(0,0,0,0.5)]"
        >
          DONE
        </button>
      </div>
    </div>
  )
}
