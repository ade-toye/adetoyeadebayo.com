import { createContext, useContext } from 'react'

export type AudioControls = {
  soundFx: boolean
  nature: boolean
  /** True while Nature is wanted but the browser is still waiting for the
      session's first user gesture before allowing sound. */
  audioLocked: boolean
  toggleSoundFx: () => void
  toggleNature: () => void
  /** Play the UI click. `force` bypasses the Sound FX gate — used as feedback
      when the Sound FX toggle itself is being switched on. */
  playClick: (opts?: { force?: boolean }) => void
  /** Gesture-free replay attempt, e.g. right after the loading screen dismisses. */
  retryNature: () => void
}

export const AudioSettingsContext = createContext<AudioControls | null>(null)

export function useAudio(): AudioControls {
  const ctx = useContext(AudioSettingsContext)
  if (!ctx) throw new Error('useAudio must be used within <AudioProvider>')
  return ctx
}
