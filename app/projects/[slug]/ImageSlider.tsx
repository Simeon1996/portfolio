'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface SliderImage {
  src: string
  caption: string
}

function SliderMedia({ src, alt, fit }: { src: string; alt: string; fit: 'cover' | 'contain' }) {
  if (src.endsWith('.mp4')) {
    return (
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        style={{ width: '100%', height: '100%', display: 'block', objectFit: fit }}
      />
    )
  }
  return <img src={src} alt={alt} style={{ width: '100%', height: '100%', display: 'block', objectFit: fit }} />
}

export default function ImageSlider({ images, portrait, interval = 3500 }: { images: SliderImage[], portrait?: boolean, interval?: number }) {
  const [current, setCurrent] = useState(0)
  const [hovered, setHovered] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const total = images.length

  const prev = useCallback(() => {
    setCurrent(c => (c - 1 + total) % total)
  }, [total])

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % total)
  }, [total])

  useEffect(() => {
    if (hovered || total <= 1) return
    intervalRef.current = setInterval(next, interval)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [hovered, next, total])

  const getIndex = (offset: number) => (current + offset + total) % total

  if (total === 0) return null

  const leftIdx = getIndex(-1)
  const rightIdx = getIndex(1)
  const ratio = portrait ? '9/16' : '16/9'
  const fit: 'contain' | 'cover' = portrait ? 'contain' : 'cover'

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'flex', flexDirection: 'column', gap: 20, userSelect: 'none' }}
    >
      {/* Slider track */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, position: 'relative' }}>

        {/* Left arrow */}
        <button
          onClick={prev}
          aria-label="Previous image"
          style={{
            position: 'absolute',
            left: 0,
            zIndex: 10,
            background: 'rgba(var(--bg-rgb, 10,10,15),.85)',
            border: '1px solid rgba(var(--cyan-rgb),.25)',
            color: 'var(--cyan)',
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: 24,
            lineHeight: 1,
            transition: 'background .2s, border-color .2s',
            backdropFilter: 'blur(6px)',
          }}
          onMouseEnter={e => {
            ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(var(--cyan-rgb),.18)'
            ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(var(--cyan-rgb),.6)'
          }}
          onMouseLeave={e => {
            ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(var(--bg-rgb, 10,10,15),.85)'
            ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(var(--cyan-rgb),.25)'
          }}
        >
          ‹
        </button>

        {/* Three-image layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr 1fr', gap: 16, width: portrait ? '55%' : '100%', margin: '0 auto', padding: '0 56px' }}>

          {/* Left peek */}
          <div
            onClick={prev}
            style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 8, opacity: .45, transform: 'scale(.94)', transformOrigin: 'right center', transition: 'opacity .3s, transform .3s' }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLDivElement).style.opacity = '.7'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLDivElement).style.opacity = '.45'
            }}
          >
            <div style={{ border: '1px solid rgba(var(--cyan-rgb),.1)', overflow: 'hidden', background: 'var(--surface)', position: 'relative', aspectRatio: ratio }}>
              <SliderMedia src={images[leftIdx].src} alt={images[leftIdx].caption} fit={fit} />
            </div>
          </div>

          {/* Center main */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ border: '1px solid rgba(var(--cyan-rgb),.3)', overflow: 'hidden', background: 'var(--surface)', position: 'relative', boxShadow: '0 0 32px rgba(var(--cyan-rgb),.08)', aspectRatio: ratio }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(var(--cyan-rgb),.5),transparent)', zIndex: 1 }} />
              <SliderMedia src={images[current].src} alt={images[current].caption} fit={fit} />
            </div>
            {images[current].caption && (
              <p style={{ margin: 0, fontSize: 11, color: 'var(--muted)', letterSpacing: .5, fontWeight: 500, textAlign: 'center' }}>
                {images[current].caption}
              </p>
            )}
          </div>

          {/* Right peek */}
          <div
            onClick={next}
            style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 8, opacity: .45, transform: 'scale(.94)', transformOrigin: 'left center', transition: 'opacity .3s, transform .3s' }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLDivElement).style.opacity = '.7'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLDivElement).style.opacity = '.45'
            }}
          >
            <div style={{ border: '1px solid rgba(var(--cyan-rgb),.1)', overflow: 'hidden', background: 'var(--surface)', position: 'relative', aspectRatio: ratio }}>
              <SliderMedia src={images[rightIdx].src} alt={images[rightIdx].caption} fit={fit} />
            </div>
          </div>

        </div>

        {/* Right arrow */}
        <button
          onClick={next}
          aria-label="Next image"
          style={{
            position: 'absolute',
            right: 0,
            zIndex: 10,
            background: 'rgba(var(--bg-rgb, 10,10,15),.85)',
            border: '1px solid rgba(var(--cyan-rgb),.25)',
            color: 'var(--cyan)',
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: 24,
            lineHeight: 1,
            transition: 'background .2s, border-color .2s',
            backdropFilter: 'blur(6px)',
          }}
          onMouseEnter={e => {
            ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(var(--cyan-rgb),.18)'
            ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(var(--cyan-rgb),.6)'
          }}
          onMouseLeave={e => {
            ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(var(--bg-rgb, 10,10,15),.85)'
            ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(var(--cyan-rgb),.25)'
          }}
        >
          ›
        </button>

      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to image ${i + 1}`}
            style={{
              width: i === current ? 20 : 6,
              height: 6,
              padding: 0,
              border: 'none',
              background: i === current ? 'var(--cyan)' : 'rgba(var(--cyan-rgb),.25)',
              cursor: 'pointer',
              transition: 'width .3s, background .3s',
            }}
          />
        ))}
      </div>

      {/* Pause indicator */}
      {hovered && total > 1 && (
        <p style={{ margin: 0, fontSize: 10, color: 'var(--muted)', letterSpacing: 1.5, textAlign: 'center', textTransform: 'uppercase', opacity: .5 }}>
          slideshow paused
        </p>
      )}
    </div>
  )
}
