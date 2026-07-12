import { useCallback, useRef, useState } from 'react'
import OptionsModal from './OptionsModal'
import { useAudio } from '../hooks/useAudio'

function GearIcon() {
  return (
    <svg
      viewBox="0 0 12 12"
      width="22"
      height="22"
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {/* teeth */}
      <rect x="5" y="1" width="2" height="2" />
      <rect x="5" y="9" width="2" height="2" />
      <rect x="1" y="5" width="2" height="2" />
      <rect x="9" y="5" width="2" height="2" />
      {/* corner nubs */}
      <rect x="2" y="2" width="2" height="2" />
      <rect x="8" y="2" width="2" height="2" />
      <rect x="2" y="8" width="2" height="2" />
      <rect x="8" y="8" width="2" height="2" />
      {/* ring with a square hole */}
      <path fillRule="evenodd" d="M3 3h6v6H3zM5 5h2v2H5z" />
    </svg>
  )
}

/** Gear button (fixed top-right) plus the OPTIONS modal it opens. */
export default function Settings() {
  const [open, setOpen] = useState(false)
  const gearRef = useRef<HTMLButtonElement>(null)
  const { playClick } = useAudio()

  const close = useCallback(() => {
    setOpen(false)
    gearRef.current?.focus()
  }, [])

  return (
    <>
      <button
        ref={gearRef}
        type="button"
        aria-label="Options"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          playClick()
          setOpen(true)
        }}
        className="mc-button mc-button-nohover fixed top-4 right-4 z-30 flex h-11 w-11 items-center justify-center"
      >
        <GearIcon />
      </button>
      <OptionsModal open={open} onClose={close} />
    </>
  )
}
