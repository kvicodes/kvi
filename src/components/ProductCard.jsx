import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import ProductPreview from './ProductPreview.jsx'
import ProductMark from './ProductMark.jsx'
import { productPath } from '../data/products.js'

/**
 * KVI Tech product card. The whole card links to the product's page on this
 * site; a separate, smaller link opens the live product. Always carries the
 * "KVI Tech product" attribution so products are never mistaken for separate
 * KVI businesses.
 */
export default function ProductCard({ product, headingLevel = 'h3' }) {
  const { id, name, category, sector, summary, url, status } = product
  const Heading = headingLevel

  return (
    <article className="group relative flex h-full flex-col border border-line bg-paper-raised p-6 transition duration-300 ease-editorial hover:-translate-y-1 hover:border-ink/40 hover:shadow-card">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-tech">
          KVI Tech product
        </span>
        {status === 'live' && (
          <span className="flex shrink-0 items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-ink-muted">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            Live
          </span>
        )}
      </div>

      <div className="mt-5 overflow-hidden border border-line bg-lattice">
        <div className="transition-transform duration-500 ease-editorial group-hover:-translate-y-1">
          <ProductPreview id={id} />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <ProductMark id={id} className="text-tech" />
        <div>
          <Heading className="font-display text-xl font-semibold">
            <Link to={productPath(product)} className="after:absolute after:inset-0 after:content-['']">
              {name}
            </Link>
          </Heading>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">{sector}</p>
        </div>
      </div>
      <p className="mt-3 text-sm font-medium text-ink-soft">{category}</p>
      <p className="mt-2 flex-1 text-sm text-ink-muted">{summary}</p>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-4">
        <span className="inline-flex items-center gap-2 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.12em] text-ink">
          Learn more
          <Icon
            name="arrow-right"
            size={15}
            className="transition-transform duration-300 ease-editorial group-hover:translate-x-0.5"
          />
        </span>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noreferrer noopener"
            className="relative z-10 inline-flex items-center gap-1 whitespace-nowrap text-xs font-medium text-ink-muted transition-colors hover:text-accent"
            aria-label={`Open ${name} (opens in a new tab)`}
          >
            Open site
            <Icon name="arrow-up-right" size={13} />
          </a>
        )}
      </div>
    </article>
  )
}
