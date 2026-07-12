import { useState } from 'react'
import { useAudio } from '../hooks/useAudio'

type Slide = {
  src: string
  caption: string
}

type PhotoCarouselProps = {
  slides: readonly Slide[]
  /** Used to build each image's alt text. */
  altBase: string
}

/**
 * Photo carousel: overlaid chevron nav, caption strip on the photo, dot
 * pagination and an "X / N" counter below — all derived from slides.length.
 */
export default function PhotoCarousel({ slides, altBase }: PhotoCarouselProps) {
  const [index, setIndex] = useState(0)
  const { playClick } = useAudio()
  const count = slides.length
  const slide = slides[index]

  const goTo = (next: number) => {
    playClick()
    setIndex(((next % count) + count) % count)
  }

  if (!slide) return null
  return (
    <figure className="mx-auto flex w-full max-w-[min(100%,60vh)] flex-col items-center lg:mx-0">
      <div className="relative w-full border-2 border-[#3f3f46]">
        <img
          src={slide.src}
          alt={`${altBase}, photo ${index + 1} of ${count}`}
          draggable={false}
          className="aspect-[7/9] w-full object-cover"
        />
        <button
          type="button"
          aria-label="Previous photo"
          onClick={() => goTo(index - 1)}
          className="mc-button absolute top-1/2 left-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center font-pixel text-base text-white"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Next photo"
          onClick={() => goTo(index + 1)}
          className="mc-button absolute top-1/2 right-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center font-pixel text-base text-white"
        >
          ›
        </button>
        <figcaption className="absolute inset-x-0 bottom-0 bg-black/65 px-3 py-2 font-pixel text-xs tracking-[0.06em] text-white">
          {slide.caption}
        </figcaption>
      </div>
      <div className="mt-3 flex gap-2">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            aria-label={`Go to photo ${i + 1}`}
            aria-current={i === index}
            onClick={() => goTo(i)}
            className={`h-2.5 w-2.5 cursor-pointer ${i === index ? 'bg-mc-accent' : 'bg-[#4b4b52] hover:bg-[#5d5d66]'}`}
          />
        ))}
      </div>
      <p className="mt-2 font-pixel text-[11px] tracking-[0.06em] text-mc-muted">
        {index + 1} / {count} - use ‹ › to browse
      </p>
    </figure>
  )
}
