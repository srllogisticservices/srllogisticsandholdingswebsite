import { useCallback, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function HeroCarousel({
  slides = [],
  overlay = 'from-slate-950/90 via-slate-900/75 to-slate-950/85',
  children,
  minHeight = 'hero-height-carousel',
}) {
  const [index, setIndex] = useState(0)
  const total = slides.length
  const hasMultiple = total > 1

  const goTo = useCallback(
    (step) => {
      if (!hasMultiple) return
      setIndex((i) => (i + step + total) % total)
    },
    [hasMultiple, total],
  )

  return (
    <section
      className={`relative overflow-hidden text-white ${minHeight} flex items-center`}
      aria-roledescription="carousel"
      aria-label="Home hero images"
    >
      {(slides.length ? slides : [{ src: '/images/hero-home.jpg', alt: 'SRL hero' }]).map((slide, i) => (
        <div
          key={`${slide.src}-${i}`}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${slide.src})` }}
          aria-hidden={i !== index}
        />
      ))}

      <div className={`absolute inset-0 bg-gradient-to-br ${overlay}`} aria-hidden="true" />

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={() => goTo(-1)}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/30 hover:bg-black/45 border border-white/20 text-white flex items-center justify-center"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => goTo(1)}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/30 hover:bg-black/45 border border-white/20 text-white flex items-center justify-center"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 max-lg:landscape:py-6">
        {children}

        {hasMultiple && (
          <div className="mt-6 flex items-center gap-2">
            {slides.map((slide, i) => (
              <button
                key={`dot-${i}`}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'}`}
                aria-label={`Image ${i + 1}${slide.caption ? `: ${slide.caption}` : ''}`}
                aria-current={i === index ? 'true' : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
