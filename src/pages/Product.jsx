import { Link, useParams } from 'react-router-dom'
import useDocumentMeta from '../lib/useDocumentMeta.js'
import PageHeader from '../components/PageHeader.jsx'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import ProductMark from '../components/ProductMark.jsx'
import ProductPreview from '../components/ProductPreview.jsx'
import ContactCtaSection from '../sections/ContactCtaSection.jsx'
import NotFound from './NotFound.jsx'
import { products, productBySlug, productPath } from '../data/products.js'
import { contactPath } from '../data/contact.js'

export default function Product() {
  const { slug } = useParams()
  const product = productBySlug(slug)
  if (!product) return <NotFound />
  return <ProductPage key={product.id} product={product} />
}

function ProductPage({ product: p }) {
  useDocumentMeta({
    title: `${p.name} — ${p.category}`,
    description: `${p.name} by KVI Tech: ${p.summary}`,
    path: productPath(p),
  })

  const others = products.filter((o) => o.id !== p.id)
  const enquire = contactPath('technology', { product: p.id })

  return (
    <>
      <PageHeader
        eyebrow={`KVI Tech product · ${p.sector}`}
        title={p.name}
        lede={p.summary}
        meta={<p className="mt-4 text-sm font-medium text-tech">{p.category}</p>}
        actions={
          <>
            <Button href={p.url} external withArrow>
              Open {p.name}
            </Button>
            <Button to={enquire} variant="secondary">
              Enquire about {p.name}
            </Button>
          </>
        }
      />

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <div className="flex items-center gap-3">
              <ProductMark id={p.id} className="text-tech" />
              <p className="eyebrow text-accent">Who it’s for</p>
            </div>
            <p className="mt-5 font-serif text-2xl font-medium leading-snug sm:text-3xl">{p.audience}</p>
            <p className="mt-6 max-w-prose text-lg text-ink-muted">{p.intro}</p>
            {p.connection && <p className="mt-5 max-w-prose text-base text-ink-muted">{p.connection}</p>}
          </Reveal>
          <Reveal delay={90} className="lg:col-span-5 lg:col-start-8">
            <div className="border border-line bg-lattice p-4">
              <ProductPreview id={p.id} />
            </div>
            <p className="mt-3 text-xs text-ink-muted">Illustrative layout — not a product screenshot.</p>
          </Reveal>
        </div>
      </Section>

      {p.workflow && (
        <Section tone="sunken" divide>
          <SectionHeading eyebrow="The workflow" heading={`What ${p.name} follows, end to end.`} />
          <Reveal as="ol" className="mt-10 flex flex-wrap gap-2" aria-label={`${p.name} workflow`}>
            {p.workflow.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                <span className="border border-line-strong bg-paper-raised px-3.5 py-2 font-display text-sm font-semibold">
                  {step}
                </span>
                {i < p.workflow.length - 1 && (
                  <Icon name="arrow-right" size={14} className="text-ink-muted" />
                )}
              </li>
            ))}
          </Reveal>
        </Section>
      )}

      <Section tone={p.workflow ? 'paper' : 'sunken'} divide>
        <SectionHeading eyebrow="What it covers" heading="Core modules." />
        <ul className="mt-10 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {p.modules.map((m, i) => (
            <Reveal as="li" key={m} delay={i * 50} className="border-b border-r border-line bg-paper-raised p-6">
              <span className="font-display text-xs tabular-nums text-tech">{String(i + 1).padStart(2, '0')}</span>
              <p className="mt-3 font-display text-base font-medium text-ink">{m}</p>
            </Reveal>
          ))}
        </ul>
        {p.scope && (
          <Reveal className="mt-6 flex max-w-3xl gap-3 text-sm text-ink-muted">
            <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full border border-ink-muted" />
            <p>
              <span className="font-semibold text-ink-soft">Current scope: </span>
              {p.scope}
            </p>
          </Reveal>
        )}
      </Section>

      <Section tone="sunken" divide size="sm">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-3">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent">More from KVI Tech</h2>
          <Link to="/products" className="text-sm font-semibold link-underline">
            All products
          </Link>
        </div>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((o) => (
            <li key={o.id}>
              <Link
                to={productPath(o)}
                className="group flex h-full items-center gap-3 border border-line bg-paper-raised p-4 transition-colors hover:border-ink/40"
              >
                <ProductMark id={o.id} className="!h-9 !w-9 shrink-0 text-tech" />
                <span className="flex flex-col">
                  <span className="font-display text-base font-semibold">{o.name}</span>
                  <span className="text-xs text-ink-muted">{o.category}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <ContactCtaSection
        heading={`Interested in ${p.name}?`}
        body={`Ask KVI Tech about ${p.name} for your organisation, or open the live product to see it for yourself.`}
        to={enquire}
        cta={`Enquire about ${p.name}`}
      />
    </>
  )
}
