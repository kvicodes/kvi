import { Link } from 'react-router-dom'
import { businesses } from '../data/businesses.js'
import { products } from '../data/products.js'

/**
 * The KVI group hierarchy as a structured diagram:
 *   KVI (parent) -> KVI Infra / Kaimur Farms / KVI Tech -> KVI Tech products
 * Built from borders and grid rather than an SVG flowchart so it stays crisp
 * and legible at every breakpoint. `tone` = 'light' | 'dark'.
 */
export default function GroupStructure({ tone = 'light' }) {
  const dark = tone === 'dark'
  const border = dark ? 'border-white/15' : 'border-line-strong'
  const muted = dark ? 'text-paper/60' : 'text-ink-muted'
  const rule = dark ? 'bg-white/15' : 'bg-line-strong'

  return (
    <div className="w-full">
      {/* Parent */}
      <div className={`border ${border} bg-transparent px-5 py-4 text-center`}>
        <p className="eyebrow">{dark ? 'Parent group' : 'Parent group'}</p>
        <p className="mt-2 font-display text-lg font-semibold">Kaimur Valley Innovations</p>
      </div>

      {/* Connector */}
      <div className="flex justify-center">
        <span aria-hidden="true" className={`h-8 w-px ${rule}`} />
      </div>

      {/* Three businesses */}
      <div className="grid gap-4 sm:grid-cols-3">
        {businesses.map((b) => (
          <div key={b.id} className={`flex flex-col border ${border} p-5`}>
            <span className="eyebrow">{b.verb}</span>
            <Link to={b.to} className="mt-2 font-display text-base font-semibold link-underline">
              {b.name}
            </Link>
            <p className={`mt-2 text-sm ${muted}`}>{b.discipline}</p>
          </div>
        ))}
      </div>

      {/* Products belong to KVI Tech only */}
      <div className="mt-2 grid sm:grid-cols-3">
        <div className="hidden sm:block" />
        <div className="hidden sm:block" />
        <div>
          <div className="flex justify-center sm:justify-start sm:pl-5">
            <span aria-hidden="true" className={`h-8 w-px ${rule}`} />
          </div>
          <div className={`border ${border} p-5`}>
            <span className="eyebrow">KVI Tech products</span>
            <ul className="mt-3 space-y-1">
              {products.map((p) => (
                <li key={p.id} className="font-display text-sm font-semibold">
                  {p.name}
                </li>
              ))}
              <li className={`text-sm ${muted}`}>More in development</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
