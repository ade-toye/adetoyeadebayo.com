import { useState } from 'react'

type ExperienceEntry = {
  org: string
  role: string
  dates: string
  location: string
  description: string
  tags: readonly string[]
  accent: string
}

/**
 * Experience Log card with the reference's 3D flip: hover (or keyboard focus)
 * rotates the card 180° around the Y axis (~300ms ease-in-out, measured from
 * the flip_motion.mov reference frames). Both faces carry the accent bar on
 * their own left edge, so it reads left on the front and right after the flip,
 * matching the reference. prefers-reduced-motion swaps faces instantly.
 */
export default function ExperienceCard({ entry }: { entry: ExperienceEntry }) {
  // Touch devices have no hover: a tap toggles the flip instead. Guarded by
  // pointerType so mouse users keep pure hover behavior (no click-locking).
  const [tapFlipped, setTapFlipped] = useState(false)

  return (
    <article
      tabIndex={0}
      onPointerUp={(event) => {
        if (event.pointerType === 'touch') setTapFlipped((v) => !v)
      }}
      className="group h-[530px] outline-none [perspective:1100px] md:h-auto md:min-h-[290px]"
    >
      <div
        className={`relative h-full w-full transition-transform duration-300 ease-in-out [transform-style:preserve-3d] group-focus-visible:[transform:rotateY(180deg)] group-hover:[transform:rotateY(180deg)] motion-reduce:transition-none ${
          tapFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* front face */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 border-2 border-[#3f3f46] bg-[#17171b] p-8 text-center [backface-visibility:hidden]">
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-1"
            style={{ backgroundColor: entry.accent }}
          />
          <p className="font-pixel text-2xl text-white">{entry.org}</p>
          <p className="font-pixel text-sm tracking-[0.05em]" style={{ color: entry.accent }}>
            {entry.role}
          </p>
          <p className="font-pixel text-sm text-mc-text">{entry.dates}</p>
          <p className="font-pixel text-xs text-mc-muted">{entry.location}</p>
          <p className="mt-2 font-pixel text-xs text-mc-muted/80">
          <span className="md:hidden">[ click to see more ]</span>
          <span className="hidden md:inline">[ hover to see more ]</span>
        </p>
        </div>
        {/* back face; its pre-rotation cancels the parent's flip, so the bar
            must be right-anchored to appear on the right like the reference */}
        <div className="absolute inset-0 flex flex-col items-start gap-4 border-2 border-[#3f3f46] bg-[#17171b] p-7 text-left [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span
            aria-hidden="true"
            className="absolute inset-y-0 right-0 w-1"
            style={{ backgroundColor: entry.accent }}
          />
          <p className="font-pixel text-base tracking-[0.05em]" style={{ color: entry.accent }}>
            {entry.role}
          </p>
          <p className="font-pixel text-sm leading-[1.8] text-white">{entry.description}</p>
          {entry.tags.length > 0 && (
            <ul className="mt-auto flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <li
                  key={tag}
                  className="border-2 border-[#55555c] bg-[#2b2b30] px-2.5 py-1 font-pixel text-[11px] text-mc-text shadow-[inset_1px_1px_0_rgba(255,255,255,0.08),inset_-1px_-1px_0_rgba(0,0,0,0.4)]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  )
}
