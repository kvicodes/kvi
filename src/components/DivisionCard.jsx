import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import DivisionArt from './DivisionArt.jsx'
import { TINT } from '../data/businesses.js'

const PANEL = {
  'kvi-greens': 'bg-forest-deep',
  'kv-infra': 'bg-infra-wash bg-blueprint',
  'kvi-tech': 'bg-tech-wash bg-lattice',
}

/**
 * Card for one of the three divisions. `featured` (KVI Greens) lays the card
 * out horizontally across the full width with a larger illustration, so
 * agriculture visibly leads the portfolio. Every card shows its proposition,
 * core activities and a CTA to the division page.
 */
export default function DivisionCard({ business, featured = false, headingLevel = 'h3' }) {
  const { id, index, name, discipline, tagline, activities, to, cta } = business
  const tint = TINT[id] || {}
  const Heading = headingLevel
  const shown = featured ? activities : activities.slice(0, 5)

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden border border-line bg-paper-raised transition duration-300 ease-editorial hover:-translate-y-1 hover:border-ink/40 hover:shadow-card ${
        featured ? 'lg:grid lg:grid-cols-12' : ''
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 z-10 h-[3px] origin-left scale-x-0 ${tint.bar} transition-transform duration-500 ease-editorial group-hover:scale-x-100`}
      />
      <div
        className={`relative overflow-hidden ${PANEL[id]} ${
          featured ? 'aspect-[16/9] lg:col-span-6 lg:aspect-auto lg:min-h-[26rem]' : 'aspect-[16/9]'
        }`}
      >
        <div className="absolute inset-0 transition-transform duration-700 ease-editorial group-hover:scale-[1.03]">
          <DivisionArt id={id} />
        </div>
        <span
          className={`absolute left-5 top-5 font-display text-xs font-semibold tracking-[0.18em] ${
            id === 'kvi-greens' ? 'text-grain' : 'text-ink-muted'
          }`}
        >
          {index}
        </span>
      </div>

      <div className={`flex flex-1 flex-col p-7 sm:p-9 ${featured ? 'lg:col-span-6 lg:p-12' : ''}`}>
        <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${tint.text}`}>{discipline}</p>
        <Heading
          className={`mt-3 font-serif font-medium ${featured ? 'text-4xl sm:text-5xl' : 'text-3xl'}`}
        >
          {name}
        </Heading>
        <p className={`mt-4 text-ink-muted ${featured ? 'max-w-lg text-lg' : 'text-base'}`}>{tagline}</p>

        <ul
          className={`mt-7 grid gap-x-6 border-t border-line pt-5 ${featured ? 'sm:grid-cols-2' : ''}`}
          aria-label={`${name} core activities`}
        >
          {shown.map((a) => (
            <li key={a} className="flex gap-2.5 border-b border-line py-2.5 text-sm text-ink-soft">
              <span aria-hidden="true" className={`mt-[0.55em] h-1 w-1 shrink-0 rounded-full ${tint.bar}`} />
              {a}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          <Link
            to={to}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink after:absolute after:inset-0 after:content-['']"
          >
            {cta}
            <Icon
              name="arrow-right"
              size={16}
              className="transition-transform duration-300 ease-editorial group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </article>
  )
}
