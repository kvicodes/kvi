import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

/**
 * Large editorial card for one of the three operating businesses.
 * Shared by the homepage "Our Businesses" section and the Businesses page.
 * Visual differentiation is subtle: the index number + a single accent hairline
 * on hover. All three stay in the same card system.
 */
export default function BusinessCard({ business, featured = false }) {
  const { index, verb, name, discipline, tagline, focus, to, cta } = business
  return (
    <Link
      to={to}
      className="group relative flex h-full flex-col justify-between overflow-hidden border border-line bg-paper-raised p-7 transition-colors duration-300 ease-editorial hover:border-ink sm:p-9"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-editorial group-hover:scale-x-100"
      />
      <div>
        <div className="flex items-baseline justify-between">
          <span className="font-display text-sm text-ink-muted">{index}</span>
          <span className="eyebrow">{verb}</span>
        </div>

        <h3 className="mt-6 font-display text-2xl font-semibold sm:text-3xl">{name}</h3>
        <p className="mt-2 text-sm font-medium text-accent-deep">{discipline}</p>
        <p className="mt-5 max-w-md text-base text-ink-muted">{tagline}</p>

        {featured && (
          <ul className="mt-7 flex flex-wrap gap-x-4 gap-y-1.5">
            {focus.slice(0, 6).map((f) => (
              <li key={f} className="text-xs uppercase tracking-[0.1em] text-ink-muted">
                {f}
              </li>
            ))}
          </ul>
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
