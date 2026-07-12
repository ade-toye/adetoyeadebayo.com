import { useEffect, useRef } from 'react'
import { site } from '../data/site'

/**
 * Full-viewport looping ambience behind the homepage. `object-fit: cover` keeps
 * it filling the screen at every aspect ratio — narrower screens crop in tighter
 * (effectively more zoomed) but never letterbox. Muted + playsInline satisfies
 * mobile autoplay policies; under prefers-reduced-motion it stays on frame one.
 */
export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.pause()
      return
    }
    // autoPlay usually handles this; the explicit call covers Safari's
    // occasional pre-paint rejection. Muted video may still be blocked in
    // rare configurations — the static first frame is an acceptable fallback.
    el.play().catch(() => {})
  }, [])

  return (
    <>
      <video
        ref={videoRef}
        className="fixed inset-0 -z-20 h-full w-full object-cover"
        src={site.backgroundVideoUrl}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      />
      {/* Soft dark scrim so the logo/buttons keep contrast over bright frames. */}
      <div className="fixed inset-0 -z-10 bg-black/30" aria-hidden="true" />
    </>
  )
}
