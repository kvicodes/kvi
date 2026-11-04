import { media, video } from '../data/media.js'
import { useEffect, useRef, useState } from 'react'
import useReducedMotion from '../lib/useReducedMotion.js'

// Files that exist at build time. A slot with none falls back to its plate.
const files = import.meta.glob('../assets/photos/*.webp', { eager: true, query: '?url', import: 'default' })
const clips = import.meta.glob('../assets/video/*.mp4', { eager: true, query: '?url', import: 'default' })

const fileFor = (slot, w) => files[`../assets/photos/${slot}-${w}.webp`]

const PLATE_BG = {
  parcels: '#2c4030',
  rows: '#58623C',
  ponds: '#2f4a4e',
  orchard: '#3a4a33',
  sheds: '#e6e4db',
  ribs: '#a8b096',
  contours: '#14211b',
  grains: '#cfc9b4',
}

// Abstract, deliberately non-photographic: a plate never pretends to be a
// picture of a real place.
function Plate({ variant, alt }) {
  const ink = variant === 'sheds' || variant === 'grains' ? '#8F4E23' : variant === 'ribs' ? '#14211B' : '#C8CDB8'
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="h-full w-full" role="img" aria-label={alt}>
      <rect width="800" height="600" fill={PLATE_BG[variant]} />
      <g stroke={ink} fill="none" strokeWidth="1.2" opacity="0.7">
        {variant === 'rows' && Array.from({ length: 34 }, (_, i) => <path key={i} d={`M${-200 + i * 34} 640L${i * 34 + 60} -40`} />)}
        {variant === 'contours' && Array.from({ length: 14 }, (_, i) => (
          <path key={i} d={`M-20 ${40 + i * 44}C200 ${i * 44 - 40} 420 ${140 + i * 44} 820 ${i * 44 + 10}`} />
        ))}
        {variant === 'parcels' && (
          <>
            <path d="M0 210L380 180L800 240M0 430L420 400L800 470M240 0L270 600M520 0L560 600" strokeWidth="2.4" />
            <path d="M0 110L252 96M380 88L800 150M0 320L262 300M540 290L800 340M408 180L420 400M660 212L690 460" />
          </>
        )}
        {variant === 'ribs' && Array.from({ length: 30 }, (_, i) => <path key={i} d={`M${i * 28} 0V600`} />)}
        {variant === 'sheds' && [90, 190, 290, 390, 490].map((y) => <rect key={y} x="80" y={y} width="640" height="52" />)}
      </g>
      {variant === 'ponds' && (
        <g fill="#C8CDB8" opacity="0.18">
          <rect x="60" y="60" width="320" height="220" rx="40" />
          <rect x="420" y="60" width="320" height="220" rx="40" />
          <rect x="60" y="320" width="320" height="220" rx="40" />
          <rect x="420" y="320" width="320" height="220" rx="40" />
        </g>
      )}
      {variant === 'orchard' && (
        <g fill="#C8CDB8" opacity="0.5">
          {Array.from({ length: 11 }, (_, x) => Array.from({ length: 8 }, (_, y) => <circle key={`${x}-${y}`} cx={40 + x * 72} cy={40 + y * 74} r="17" />))}
        </g>
      )}
      {variant === 'grains' && (
        <g fill="#14211B" opacity="0.28">
          {Array.from({ length: 150 }, (_, i) => {
            const x = (i * 137) % 800
            const y = (i * 89) % 600
            return <ellipse key={i} cx={x} cy={y} rx="12" ry="4.5" transform={`rotate(${(i * 47) % 180} ${x} ${y})`} />
          })}
        </g>
      )}
    </svg>
  )
}

/** A slot from data/media.js: the photograph if present, otherwise its plate. */
export default function Photo({ slot, sizes = '100vw', className = '', eager = false }) {
  const item = media.find((m) => m.slot === slot)
  const small = fileFor(slot, 960)
  const large = fileFor(slot, 1920)

  return (
    <div className={`overflow-hidden bg-stone ${className}`}>
      {small ? (
        <img
          src={small}
          srcSet={`${small} 960w${large ? `, ${large} 1920w` : ''}`}
          sizes={sizes}
          alt={item.alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="photo h-full w-full object-cover"
        />
      ) : (
        <Plate variant={item.plate} alt={item.alt} />
      )}
    </div>
  )
}

/** One short muted clip, loaded on demand, with a visible pause control. */
export function FieldFilm({ className = '' }) {
  const url = clips[`../assets/video/${video.file}`]
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.play().catch(() => {})
      else el.pause()
    }, { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [reduced, url])

  const poster = fileFor(video.poster, 1920)
  if (!url || reduced) return <Photo slot={video.poster} className={className} />

  const toggle = () => {
    const el = ref.current
    if (el.paused) el.play().catch(() => {})
    else el.pause()
  }

  return (
    <div className={`relative overflow-hidden bg-field ${className}`}>
      <video
        ref={ref}
        src={url}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={video.alt}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="photo h-full w-full object-cover"
      />
      <button type="button" onClick={toggle} className="btn btn-solid-light absolute bottom-4 right-4 min-h-[2.5rem] px-4 text-sm">
        {playing ? 'Pause film' : 'Play film'}
      </button>
    </div>
  )
}
