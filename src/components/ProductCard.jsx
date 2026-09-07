import Icon from './Icon.jsx'
import ProductPreview from './ProductPreview.jsx'

/**
 * KVI Tech product card. Always carries the "KVI Tech product" attribution so
 * products are never mistaken for separate KVI businesses. Links out only when
 * a real `url` is configured in src/data/products.js.
 */
export default function ProductCard({ product }) {
  const { id, name, category, description, url, attribution, status } = product
  const isLink = Boolean(url)
  const Tag = isLink ? 'a' : 'div'
  const linkProps = isLink ? { href: url, target: '_blank', rel: 'noreferrer noopener' } : {}

  return (
    <Tag
      {...linkProps}
      className={`group flex flex-col border border-line bg-paper-raised p-7 transition duration-300 ease-editorial ${
        isLink ? 'hover:-translate-y-1 hover:border-ink hover:shadow-card' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-deep">
          {attribution}
        </span>
        {status === 'live' && (
          <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-ink-muted">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            Live
          </span>
        )}
      </div>

      <div className="mt-5 overflow-hidden border border-line bg-lattice">
        <ProductPreview id={id} />
      </div>

      <h3 className="mt-6 font-display text-xl font-semibold">{name}</h3>
      <p className="mt-1.5 text-sm font-medium text-ink-muted">{category}</p>
      <p className="mt-4 flex-1 text-sm text-ink-muted">{description}</p>

      <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink">
        {isLink ? 'Visit product' : 'Details coming soon'}
        {isLink && (
          <Icon
            name="arrow-up-right"
            size={15}
            className="transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        )}
      </span>
    </Tag>
  )
}
