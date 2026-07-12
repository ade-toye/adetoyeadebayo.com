import { useEffect, useState } from 'react'
import { site } from '../data/site'

const FACT_CYCLE_MS = 3500

export default function Hero() {
  // Start at a random fact, then cycle through the whole list while on screen.
  const [factIndex, setFactIndex] = useState(() =>
    Math.floor(Math.random() * site.funFacts.length),
  )

  useEffect(() => {
    const timer = setInterval(
      () => setFactIndex((i) => (i + 1) % site.funFacts.length),
      FACT_CYCLE_MS,
    )
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="flex flex-col items-center text-center">
      <div className="relative">
        {/* Pre-rendered logo image (transparent PNG); alt carries the name for a11y/SEO.
            Width matches the reference title: ~68vw on desktop, near-full on phones. */}
        <h1 className="m-0">
          <img
            src={site.logoUrl}
            alt={site.name}
            width={832}
            height={79}
            className="w-[clamp(320px,68vw,1200px)] [image-rendering:pixelated]"
          />
        </h1>
        <p className="absolute -bottom-9 right-0 -rotate-6 font-hand text-2xl font-semibold text-yellow-300 [text-shadow:0.06em_0.09em_0_rgba(0,0,0,0.65)] md:-right-8 md:text-3xl">
          {site.funFacts[factIndex]}
        </p>
      </div>
    </header>
  )
}
