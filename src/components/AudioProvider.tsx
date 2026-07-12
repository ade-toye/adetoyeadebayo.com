import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { AudioSettingsContext } from '../hooks/useAudio'
import { site } from '../data/site'

const CLICK_VOLUME = 0.6
const NATURE_VOLUME = 0.35

const FX_PREF_KEY = 'mc-sound-fx'
const NATURE_PREF_KEY = 'mc-nature'

/** localStorage can throw (private mode, disabled storage) — treat as no pref. */
function readPref(key: string, fallback: boolean): boolean {
  try {
    const value = localStorage.getItem(key)
    return value === null ? fallback : value === '1'
  } catch {
    return fallback
  }
}

function writePref(key: string, value: boolean) {
  try {
    localStorage.setItem(key, value ? '1' : '0')
  } catch {
    /* ignore */
  }
}

/** First sample louder than this counts as the click's real start; anything
    before it is encoder padding / recorded silence and gets skipped. */
const SILENCE_THRESHOLD = 0.01

function findAudioStart(buffer: AudioBuffer): number {
  const data = buffer.getChannelData(0)
  for (let i = 0; i < data.length; i++) {
    if (Math.abs(data[i]) > SILENCE_THRESHOLD) {
      return Math.max(0, i / buffer.sampleRate - 0.002)
    }
  }
  return 0
}

/**
 * Owns both audio channels. Lives at the App level so toggle state and playback
 * survive route navigation.
 *
 * Click channel uses Web Audio, not an <audio> element: the media-element
 * pipeline adds audible latency per play(), while a pre-decoded AudioBuffer
 * starts in microseconds. The buffer is fetched and decoded at mount with an
 * OfflineAudioContext (safe before a user gesture); the live AudioContext is
 * created inside the first click so Chrome never logs an autoplay warning.
 *
 * Nature stays an <audio> element (streaming loop) and always starts OFF:
 * browsers block autoplay with sound, so it only starts from the OPTIONS modal.
 */
export default function AudioProvider({ children }: { children: ReactNode }) {
  // Both channels default ON (Toye's call, Phase 7), and the visitor's last
  // choice persists across reloads (Phase 9). Sound FX needs no special
  // handling — clicks are user gestures. Nature will usually be blocked by the
  // autoplay policy on a fresh load; the retry below starts it on the first
  // gesture anywhere on the page, so the toggle stays ON and never lies for long.
  const [soundFx, setSoundFx] = useState(() => readPref(FX_PREF_KEY, true))
  const [nature, setNature] = useState(() => readPref(NATURE_PREF_KEY, true))
  // True while Nature wants to play but the browser still needs a first gesture.
  const [audioLocked, setAudioLocked] = useState(false)
  const natureRef = useRef<HTMLAudioElement>(null)
  const natureWantedRef = useRef(nature)
  const natureRetryCleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => writePref(FX_PREF_KEY, soundFx), [soundFx])
  useEffect(() => writePref(NATURE_PREF_KEY, nature), [nature])

  const audioCtxRef = useRef<AudioContext | null>(null)
  const clickBufferRef = useRef<AudioBuffer | null>(null)
  const clickStartRef = useRef(0)

  // Mirror for playClick: keeps the callback stable without a stale closure.
  const soundFxRef = useRef(soundFx)
  useEffect(() => {
    soundFxRef.current = soundFx
  }, [soundFx])

  // Fetch + decode the click up front so the very first click is already instant.
  useEffect(() => {
    let cancelled = false
    fetch(site.sounds.click)
      .then((res) => res.arrayBuffer())
      .then((bytes) => new OfflineAudioContext(1, 1, 44100).decodeAudioData(bytes))
      .then((buffer) => {
        if (cancelled) return
        clickBufferRef.current = buffer
        clickStartRef.current = findAudioStart(buffer)
      })
      .catch(() => {
        /* no click asset: UI stays silent but functional */
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    return () => {
      audioCtxRef.current?.close().catch(() => {})
    }
  }, [])

  // Start Nature on the first user gesture the browser accepts. Stays armed
  // (capture phase, several event types — browsers disagree on which events
  // grant user activation) until a play() actually SUCCEEDS: a rejected early
  // attempt must not consume the retry, or audio stays dead until the modal.
  const armNatureRetry = useCallback(() => {
    if (natureRetryCleanupRef.current) return
    const events = ['pointerdown', 'keydown', 'click'] as const
    const cleanup = () => {
      natureRetryCleanupRef.current = null
      for (const type of events) window.removeEventListener(type, tryStart, true)
    }
    const tryStart = () => {
      const el = natureRef.current
      if (!el || !natureWantedRef.current || !el.paused) {
        cleanup()
        setAudioLocked(false)
        return
      }
      el.volume = NATURE_VOLUME
      el.play()
        .then(() => {
          cleanup() // success: disarm
          setAudioLocked(false)
        })
        .catch(() => {
          // Still blocked: stay armed for the next gesture. Only a real media
          // failure (broken/missing file) gives up and reflects it in the UI.
          if (el.error) {
            cleanup()
            setAudioLocked(false)
            setNature(false)
          }
        })
    }
    natureRetryCleanupRef.current = cleanup
    for (const type of events) window.addEventListener(type, tryStart, true)
    setAudioLocked(true)
  }, [])

  // Direct re-attempt (no gesture) — used when the loading screen dismisses, in
  // case the browser's engagement heuristics permit autoplay for this origin.
  const retryNature = useCallback(() => {
    const el = natureRef.current
    if (!el || !natureWantedRef.current || !el.paused) return
    el.volume = NATURE_VOLUME
    el.play()
      .then(() => {
        natureRetryCleanupRef.current?.()
        setAudioLocked(false)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    return () => natureRetryCleanupRef.current?.()
  }, [])

  // Keep the Nature element in sync with its toggle. ANY rejection of the
  // initial play() arms the gesture retry — NotAllowedError (autoplay policy)
  // and AbortError (StrictMode's dev double-mount interrupts the first attempt)
  // are both recoverable. Only a real media error reverts the toggle, so the
  // UI never claims sound that genuinely can't play.
  useEffect(() => {
    const el = natureRef.current
    if (!el) return
    natureWantedRef.current = nature
    if (nature) {
      el.volume = NATURE_VOLUME
      el.play().catch(() => {
        if (el.error) setNature(false)
        else armNatureRetry()
      })
    } else {
      el.pause()
    }
  }, [nature, armNatureRetry])

  const playClick = useCallback(({ force = false }: { force?: boolean } = {}) => {
    if (!soundFxRef.current && !force) return
    const buffer = clickBufferRef.current
    if (!buffer) return
    try {
      const ctx = (audioCtxRef.current ??= new AudioContext())
      if (ctx.state === 'suspended') void ctx.resume()
      const source = ctx.createBufferSource()
      source.buffer = buffer
      const gain = ctx.createGain()
      gain.gain.value = CLICK_VOLUME
      source.connect(gain)
      gain.connect(ctx.destination)
      source.start(0, clickStartRef.current)
    } catch {
      /* Web Audio unavailable: skip the click, never break the UI */
    }
  }, [])

  const toggleSoundFx = useCallback(() => setSoundFx((v) => !v), [])
  const toggleNature = useCallback(() => {
    // Explicit user action: any pending "click to enable" state is obsolete —
    // turning ON plays immediately (we're in a gesture), OFF needs no unlock.
    setAudioLocked(false)
    setNature((v) => !v)
  }, [])

  return (
    <AudioSettingsContext.Provider
      value={{ soundFx, nature, audioLocked, toggleSoundFx, toggleNature, playClick, retryNature }}
    >
      {children}
      {/* ~5MB loop: preload="none" so it never downloads unless the user enables it. */}
      <audio ref={natureRef} src={site.sounds.nature} loop preload="none" />
    </AudioSettingsContext.Provider>
  )
}
