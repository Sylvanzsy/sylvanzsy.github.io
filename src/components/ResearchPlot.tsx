'use client'

import { useState, useEffect } from 'react'

interface ResearchPlotProps {
  src: string
  alt: string
  caption: React.ReactNode
  badge?: string
}

export default function ResearchPlot({ src, alt, caption, badge }: ResearchPlotProps) {
  const [open, setOpen] = useState(false)

  // Close on Escape key
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open])

  // Prevent body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <figure className="w-full max-w-[900px] mx-auto">
        <div className="relative group">
          {badge && (
            <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-sm text-xs font-medium text-white border border-white/15 pointer-events-none">
              {badge}
            </span>
          )}
          {/* Zoom hint */}
          <span className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-medium">
            Click to enlarge
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onClick={() => setOpen(true)}
            className="w-full rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.18)] border border-[var(--card-border)] cursor-zoom-in object-contain transition-shadow duration-300 group-hover:shadow-[0_8px_40px_rgba(0,0,0,0.28)]"
          />
        </div>
        <figcaption className="mt-3 text-xs text-[var(--muted)] italic text-center leading-relaxed px-2">
          {caption}
        </figcaption>
      </figure>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/92 p-4 sm:p-8"
          onClick={() => setOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            aria-label="Close image"
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors text-xl leading-none"
          >
            ×
          </button>

          {/* Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-[88vh] object-contain rounded-lg shadow-2xl"
          />

          {/* Caption in lightbox */}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] text-white/60 italic text-center max-w-2xl px-4 leading-relaxed">
            {caption}
          </p>
        </div>
      )}
    </>
  )
}
