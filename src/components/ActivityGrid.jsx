import Reveal from './Reveal.jsx'
import { TINT } from '../data/businesses.js'

/** Numbered grid of a division's activities / capability areas. */
export default function ActivityGrid({ division, items, label }) {
  const tint = TINT[division] || {}
  return (
    <ul
      aria-label={label}
      className="mt-12 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3"
    >
      {items.map((item, i) => (
        <Reveal as="li" key={item} delay={i * 50} className={`${tint.texture || ''} border-b border-r border-line bg-paper-raised p-6`}>
          <span className={`font-display text-xs tabular-nums ${tint.text || 'text-ink-muted'}`}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <p className="mt-3 font-display text-lg font-medium text-ink">{item}</p>
        </Reveal>
      ))}
    </ul>
  )
}
