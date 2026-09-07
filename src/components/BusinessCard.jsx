import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import BusinessGlyph from './BusinessGlyph.jsx'
import { TINT } from '../data/businesses.js'

/**
 * Large editorial card for one of the three operating businesses.
 * Shared by the homepage "Our Businesses" section and the Businesses page.
 * All three stay in the same card system; differentiation is one accent
 * hairline, the identity glyph and (on the featured variant) the character line.
 */
export default function BusinessCard({ business, featured = false }) {
  const { id, index, verb, name, discipline, tagline, focus, to, cta } = business
  const tint = TINT[id] || {}

  return (
    <Link
      to={to}
      className="group relative flex h-full flex-col justify-between overflow-hidden border border-line bg-paper-raised p-7 transition duration-300 ease-editorial hover:-translate-y-1 hover:border-ink hover:shadow-card sm:p-9"
    >
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-px origin-left scale-x-0 ${tint.bar || 'bg-accent'} transition-transform duration-500 ease-editorial group-hover:scale-x-100`}
      />
      <div>
        <div className="flex items-start justify-between">
          <span className={`${tint.text || 'text-accent-deep'}`}>
            <BusinessGlyph id={id} size={44} />
          </span>
          <span className="flex flex-col items-end gap-1">
            <span className="font-display text-sm text-ink-muted">{index}</span>
            <span className="eyebrow">{verb}</span>
          </span>
        </div>

        <h3 className="mt-7 font-display text-2xl font-semibold sm:text-3xl">{name}</h3>
        <p className={`mt-2 text-sm font-medium ${tint.text || 'text-accent-deep'}`}>{discipline}</p>
        <p className="mt-5 max-w-md text-base text-ink-muted">{tagline}</p>

        {featured && (
          <>
            <p className="mt-6 text-[11px] uppercase tracking-[0.16em] text-ink-muted">
              {tint.character}
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
              {focus.slice(0, 6).map((f) => (
                <li key={f} className="text-xs uppercase tracking-[0.1em] text-ink-muted">
                  {f}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <span className="mt-9 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink">
        {cta}
        <Icon
          name="arrow-right"
          size={16}
          className="transition-transform duration-300 ease-editorial group-hover:translate-x-1"
        />
      </span>
    </Link>
  )
}
