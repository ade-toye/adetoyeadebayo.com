import { useEffect, useState } from 'react'
import { site } from '../data/site'

const STATUS_CYCLE_MS = 1100

type LoadingScreenProps = {
  hidden: boolean
}

/**
 * First-load screen: logo block centered, status/progress/copyright pinned low.
 * The status line cycles through site.loading.statuses while visible.
 * App dismisses it after a 5s minimum / scene-ready, with a 10s failsafe.
 */
export default function LoadingScreen({ hidden }: LoadingScreenProps) {
  const [statusIndex, setStatusIndex] = useState(0)

  useEffect(() => {
    if (hidden) return
    const timer = setInterval(
      () => setStatusIndex((i) => (i + 1) % site.loading.statuses.length),
      STATUS_CYCLE_MS,
    )
    return () => clearInterval(timer)
  }, [hidden])

  if (hidden) return null
  return (
    <div role="status" className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="bg-mc-load px-16 py-5 text-center sm:px-24 sm:py-6">
        <p className="font-pixel text-4xl leading-none text-white sm:text-5xl">
          {site.loading.title}
        </p>
        <p className="-mr-[0.45em] mt-3 font-pixel text-base leading-none tracking-[0.45em] text-white/90 sm:text-lg">
          {site.loading.subtitle}
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-3 px-6">
        <p className="font-pixel text-xs text-mc-muted">{site.loading.statuses[statusIndex]}</p>
        <div className="h-2.5 w-full max-w-md border-2 border-mc-border bg-mc-panel" aria-hidden="true">
          <div className="loading-bar h-full bg-mc-load" />
        </div>
        <p className="text-[11px] text-mc-muted/80">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </div>
  )
}
