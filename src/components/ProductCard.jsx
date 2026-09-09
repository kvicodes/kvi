import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import ProductPreview from './ProductPreview.jsx'

/**
 * KVI Tech product card. Always carries the "KVI Tech product" attribution so
 * products are never mistaken for separate KVI businesses.
 *
 *   url  -> external product site, opens in a new tab ("Visit product ↗")
 *   to   -> internal link/anchor, used while a product has no public site yet
 *   (neither) -> static card
 *
 * `product.accent === 'teal'` gives the card FamGrid's restrained dark/teal
 * treatment — a hairline, a dark preview panel and a teal status dot — while
 * keeping the same card geometry as the rest of the portfolio.
 */
export default function ProductCard({ product }) {
  const { id, name, category, description, url, to, attribution, status, cta, accent } = product
  const isTeal = accent === 'teal'
  const inDev = status === 'development'

  let Tag = 'div'
  let linkProps = {}
  if (url) {
    Tag = 'a'
    linkProps = { href: url, target: '_blank', rel: 'noreferrer noopener' }
  } else if (to) {
    Tag = Link
    linkProps = { to }
  }
  const interactive = Tag !== 'div'

  return (
    <Tag
      {...linkProps}
      className={`group relative flex h-full flex-col border bg-paper-raised p-6 transition duration-300 ease-editorial ${
        isTeal ? 'border-famgrid/30' : 'border-line'
      } ${
        interactive
          ? `hover:-translate-y-1 hover:shadow-card ${isTeal ? 'hover:border-famgrid' : 'hover:border-ink'}`
          : ''
      }`}
    >
      {isTeal && (
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-famgrid" />
      )}

      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-deep">
          {attribution}
        </span>
        {status === 'live' && (
          <span className="flex shrink-0 items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-ink-muted">
            <span
              aria-hidden="true"
              className={`h-1.5 w-1.5 rounded-full ${isTeal ? 'bg-famgrid' : 'bg-accent'}`}
            />
            Live
          </span>
        )}
        {inDev && (
          <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-line-strong px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-soft">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-accent/25 ring-1 ring-accent"
            />
            In development
          </span>
        )}
      </div>

      <div
        className={`mt-5 overflow-hidden border ${
          isTeal ? 'border-famgrid/25 bg-famgrid-ink' : 'border-line bg-lattice'
        }`}
      >
        <div className="transition-transform duration-500 ease-editorial group-hover:-translate-y-1">
          <ProductPreview id={id} />
        </div>
      </div>

      <h3 className="mt-6 font-display text-xl font-semibold">{name}</h3>
      <p className="mt-1.5 text-sm font-medium text-ink-muted">{category}</p>
      <p className="mt-4 flex-1 text-sm text-ink-muted">{description}</p>

      <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink">
        {interactive ? cta || 'Visit product' : 'Details coming soon'}
        {interactive && (
          <Icon
            name={url ? 'arrow-up-right' : 'arrow-right'}
            size={15}
            className={`transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 ${
              url ? 'group-hover:-translate-y-0.5' : ''
            }`}
          />
        )}
      </span>
    </Tag>
  )
}
