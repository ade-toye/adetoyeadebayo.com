import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { AchievementsContext } from '../hooks/useAchievements'
import type { AchievementId } from '../hooks/useAchievements'
import { site } from '../data/site'

const TOAST_VISIBLE_MS = 7000
const TOAST_LEAVE_MS = 450

function TrophyIcon() {
  return (
    <svg viewBox="0 0 12 12" width="28" height="28" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="1" y="1" width="2" height="3" fill="#fbbf24" />
      <rect x="9" y="1" width="2" height="3" fill="#fbbf24" />
      <rect x="3" y="1" width="6" height="4" fill="#fcd34d" />
      <rect x="4" y="5" width="4" height="2" fill="#f59e0b" />
      <rect x="5" y="7" width="2" height="2" fill="#b45309" />
      <rect x="3" y="9" width="6" height="2" fill="#92400e" />
    </svg>
  )
}

type ActiveToast = {
  id: AchievementId
  leaving: boolean
  /** Route that earned it: navigating away from it dismisses the toast early. */
  pathname: string
}

/**
 * Minecraft-style achievement toasts. `unlock(id)` slides one in top-right,
 * holds ~4s, slides it out. Each achievement fires once per browser session
 * (sessionStorage), so revisiting a page doesn't re-toast.
 */
export default function AchievementsProvider({
  ready,
  children,
}: {
  /** False while the loading screen is up — unlocks queue until it clears,
      otherwise a deep-linked page's toast plays out invisibly behind it. */
  ready: boolean
  children: ReactNode
}) {
  const [toast, setToast] = useState<ActiveToast | null>(null)
  const pendingRef = useRef<{ id: AchievementId; pathname: string } | null>(null)
  const readyRef = useRef(ready)
  const location = useLocation()

  useEffect(() => {
    readyRef.current = ready
  }, [ready])

  // Fires on EVERY page open (Phase 14, Toye's spec) — no session dedupe.
  const unlock = useCallback((id: AchievementId) => {
    // window.location, not a router-state ref: the URL updates synchronously on
    // navigation, while a ref synced from a parent effect still holds the OLD
    // path when a page's unlock effect (child, runs first) fires.
    const pathname = window.location.pathname
    if (readyRef.current) setToast({ id, leaving: false, pathname })
    else pendingRef.current = { id, pathname }
  }, [])

  // Flush a queued unlock shortly after the loading screen dismisses; drop it
  // if the visitor already left the page that earned it.
  useEffect(() => {
    if (!ready || pendingRef.current === null) return
    const pending = pendingRef.current
    pendingRef.current = null
    if (pending.pathname !== window.location.pathname) return
    const timer = window.setTimeout(
      () => setToast({ id: pending.id, leaving: false, pathname: pending.pathname }),
      400,
    )
    return () => clearTimeout(timer)
  }, [ready])

  // Clicking out of the page dismisses its toast immediately; staying on it
  // lets the toast run the full display time.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setToast((t) =>
        t && !t.leaving && t.pathname !== location.pathname ? { ...t, leaving: true } : t,
      )
    }, 0)
    return () => clearTimeout(timer)
  }, [location.pathname])

  // Dismissal is scheduled from state, not inside unlock: StrictMode's
  // simulated remount would clear unlock-armed timers while the sessionStorage
  // dedupe blocks re-arming, stranding the toast on screen forever.
  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(
      () => setToast(toast.leaving ? null : { ...toast, leaving: true }),
      toast.leaving ? TOAST_LEAVE_MS : TOAST_VISIBLE_MS,
    )
    return () => clearTimeout(timer)
  }, [toast])

  const meta = toast ? site.achievements[toast.id] : null

  return (
    <AchievementsContext.Provider value={{ unlock }}>
      {children}
      {toast && meta && (
        <div
          role="status"
          className={`achievement-toast fixed top-16 right-4 z-[45] ${toast.leaving ? 'leaving' : ''}`}
        >
          <div className="flex items-center gap-3.5 border-2 border-[#0c0c0e] bg-[#26262b] py-3 pr-6 pl-4 shadow-[inset_2px_2px_0_rgba(255,255,255,0.08),inset_-2px_-2px_0_rgba(0,0,0,0.4),5px_5px_0_rgba(0,0,0,0.5)]">
            <TrophyIcon />
            <div>
              <p className="font-pixel text-sm tracking-[0.05em] text-yellow-400">{meta.title}</p>
              <p className="mt-1 font-pixel text-xs tracking-[0.05em] text-white">
                {meta.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </AchievementsContext.Provider>
  )
}
