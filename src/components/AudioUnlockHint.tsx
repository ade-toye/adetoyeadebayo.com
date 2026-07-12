import { useEffect } from 'react'
import { useAudio } from '../hooks/useAudio'

type AudioUnlockHintProps = {
  /** True once the loading screen has dismissed. */
  ready: boolean
}

/**
 * Bridges the browser's autoplay rule and "sound should just be on": after a
 * reload no site may play audio before the session's first gesture, so when
 * Nature is ON but still locked, tell the visitor that any click unlocks it.
 * Disappears by itself the moment playback starts.
 */
export default function AudioUnlockHint({ ready }: AudioUnlockHintProps) {
  const { audioLocked, nature, retryNature } = useAudio()

  // The moment the page becomes visible, try once more without a gesture —
  // Chrome allows this for origins with enough media engagement.
  useEffect(() => {
    if (ready) retryNature()
  }, [ready, retryNature])

  if (!ready || !audioLocked || !nature) return null
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-12 z-30 flex justify-center">
      <p className="border border-mc-border bg-black/70 px-3 py-1.5 font-pixel text-[11px] tracking-[0.08em] text-mc-muted">
        Click anywhere to enable sound
      </p>
    </div>
  )
}
