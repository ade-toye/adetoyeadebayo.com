import { useEffect, useRef } from 'react'
import { NameTagObject, SkinViewer, WalkingAnimation } from 'skinview3d'
import type { PlayerObject } from 'skinview3d'
import LinkedInButton from './LinkedInButton'
import { site } from '../data/site'

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

/**
 * WalkingAnimation with a cursor "glance" layered onto the head only.
 * super.animate() owns body, limbs, and head-bob every frame; the eased,
 * clamped offsets are added after it runs, so the two never fight.
 * The body never rotates from the cursor — that is governed solely by the walk.
 */
class GlancingWalkAnimation extends WalkingAnimation {
  targetYaw = 0
  targetPitch = 0
  private yaw = 0
  private pitch = 0

  protected override animate(player: PlayerObject): void {
    super.animate(player)
    // 0.35/frame ≈ 90% of the way to the pointer in ~6 frames (~100ms):
    // tracks every stroke with just enough smoothing not to jitter.
    this.yaw += (this.targetYaw - this.yaw) * 0.35
    this.pitch += (this.targetPitch - this.pitch) * 0.35
    player.skin.head.rotation.y += this.yaw
    player.skin.head.rotation.x += this.pitch
  }
}

type CharacterWidgetProps = {
  /** Called once the skin has loaded (or failed) and the scene is ready to show. */
  onReady?: () => void
}

export default function CharacterWidget({ onReady }: CharacterWidgetProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const onReadyRef = useRef(onReady)

  useEffect(() => {
    onReadyRef.current = onReady
  }, [onReady])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const walking = new GlancingWalkAnimation()
    walking.speed = 0.8

    const viewer = new SkinViewer({
      canvas,
      width: 200,
      // Extra headroom over the model so the nameplate can't clip at the top.
      height: 300,
      fov: 45,
      zoom: 0.85,
      animation: walking,
      // height (world units) shrinks the tag; the default 4.0 overflowed the canvas.
      nameTag: new NameTagObject(site.nameTag, { font: '48px Minecraft', height: 3 }),
    })
    // No continuous auto-rotation: body and legs move only via the WalkingAnimation.
    viewer.autoRotate = false

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) walking.paused = true

    // Head-only cursor tracking: a clamped glance toward the pointer, not a spin.
    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const headX = rect.left + rect.width / 2
      const headY = rect.top + rect.height * 0.3
      walking.targetYaw = clamp(((event.clientX - headX) / window.innerWidth) * 1.5, -0.4, 0.4)
      walking.targetPitch = clamp(((event.clientY - headY) / window.innerHeight) * 1.2, -0.3, 0.25)
    }
    if (!reducedMotion) window.addEventListener('pointermove', onPointerMove)

    if (import.meta.env.DEV) {
      // Dev-only hook so the review-loop browser harness can inspect the scene.
      ;(window as Window & { __skinviewer?: SkinViewer }).__skinviewer = viewer
    }

    let cancelled = false
    const markReady = () => {
      if (!cancelled) onReadyRef.current?.()
    }
    // Fail open: a broken skin file must not leave the loading screen up forever.
    viewer.loadSkin(site.skinUrl).then(markReady, markReady)

    return () => {
      cancelled = true
      window.removeEventListener('pointermove', onPointerMove)
      viewer.dispose()
    }
  }, [])

  return (
    <div className="fixed bottom-8 left-4 z-10 hidden md:flex md:flex-col md:items-center md:gap-2">
      <canvas ref={canvasRef} className="pointer-events-none" aria-hidden="true" />
      <LinkedInButton className="w-full" />
    </div>
  )
}
