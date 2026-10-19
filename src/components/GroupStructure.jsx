import { Link } from 'react-router-dom'
import { businesses, TINT } from '../data/businesses.js'
import { products, productPath } from '../data/products.js'
import BusinessGlyph from './BusinessGlyph.jsx'

/**
 * The KVI structure as a diagram:
 *   Kaimur Valley Innovations Pvt. Ltd. -> three divisions -> KVI Tech products
 * KVI Greens is filled in forest green — agriculture is the centre of the
 * company. Built from borders and grid rather than an SVG flowchart so it stays
 * crisp and legible at every breakpoint.
 */
export default function GroupStructure() {
  return (
    <div className="w-full">
      <div className="border border-line-strong bg-paper-raised px-5 py-4 text-center">
        <p className="eyebrow">Parent company</p>
        <p className="mt-2 font-display text-lg font-semibold">Kaimur Valley Innovations Pvt. Ltd.</p>
      </div>

      <div className="flex justify-center" aria-hidden="true">
        <span className="h-8 w-px bg-line-strong" />
      </div>

      <ul className="grid gap-4 sm:grid-cols-3">
        {businesses.map((b) => {
          const lead = b.id === 'kvi-greens'
          return (
            <li
              key={b.id}
              className={`relative flex flex-col border p-5 ${
                lead ? 'border-forest bg-forest-deep text-paper' : 'border-line-strong bg-paper-raised'
              }`}
            >
              <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-[3px] ${TINT[b.id]?.bar}`} />
              <div className="flex items-center justify-between">
                <span className={`eyebrow ${lead ? 'text-grain' : ''}`}>{lead ? 'Lead division' : 'Division'}</span>
                <span className={lead ? 'text-grain' : TINT[b.id]?.text}>
                  <BusinessGlyph id={b.id} size={22} />
                </span>
              </div>
              <Link to={b.to} className="mt-3 font-display text-base font-semibold link-underline">
                {b.name}
              </Link>
              <p className={`mt-2 text-sm ${lead ? 'text-paper/70' : 'text-ink-muted'}`}>{b.discipline}</p>
            </li>
          )
        })}
      </ul>

      {/* Products belong to KVI Tech only */}
      <div className="mt-2 grid sm:grid-cols-3">
        <div className="hidden sm:block" />
        <div className="hidden sm:block" />
        <div>
          <div className="flex justify-center sm:justify-start sm:pl-5" aria-hidden="true">
            <span className="h-8 w-px bg-line-strong" />
          </div>
          <div className="border border-line-strong bg-paper-raised p-5">
            <span className="eyebrow">KVI Tech products</span>
            <ul className="mt-3 space-y-1">
              {products.map((p) => (
                <li key={p.id}>
                  <Link to={productPath(p)} className="font-display text-sm font-semibold link-underline">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
