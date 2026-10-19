import useDocumentMeta from '../lib/useDocumentMeta.js'
import PageHeader from '../components/PageHeader.jsx'
import Section from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import ProductCard from '../components/ProductCard.jsx'
import ContactCtaSection from '../sections/ContactCtaSection.jsx'
import { products, productsNote } from '../data/products.js'
import { contactPath } from '../data/contact.js'

// Sectors in display order; only sectors with a listed product are shown.
const SECTORS = ['Agriculture', 'Business & finance', 'Education', 'Infrastructure & construction']

export default function Products() {
  useDocumentMeta({
    title: 'Products',
    description:
      'KVI Tech software products: FarmGrid (farm operations), BillGrid (billing and accounting), CampusGrid (education management), BhattaGrid (brick-kiln operations) and ContractorOS (contractor operations).',
    path: '/products',
  })

  const groups = SECTORS.map((sector) => ({
    sector,
    items: products.filter((p) => p.sector === sector),
  })).filter((g) => g.items.length > 0)

  return (
    <>
      <PageHeader
        eyebrow="KVI Tech · Products"
        title="Software products, built and run by KVI Tech."
        lede={`${products.length} live products for farms, businesses, institutions, brick kilns and contractors. Each has its own page here and its own live site.`}
      />

      {groups.map((g, gi) => (
        <Section key={g.sector} tone={gi % 2 === 0 ? 'paper' : 'sunken'} divide={gi > 0} size="sm">
          <Reveal className="flex items-baseline justify-between border-b border-line pb-3">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent">{g.sector}</h2>
            <p className="text-sm text-ink-muted">
              {g.items.length} {g.items.length === 1 ? 'product' : 'products'}
            </p>
          </Reveal>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {g.items.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 80} className="h-full">
                <ProductCard product={p} />
              </Reveal>
            ))}
          </ul>
        </Section>
      ))}

      <Section tone="paper" divide size="sm">
        <p className="text-sm text-ink-muted">{productsNote}</p>
      </Section>

      <ContactCtaSection
        heading="Not sure which product fits?"
        body="Tell us how your organisation works today and KVI Tech will point you to the right product — or discuss custom software."
        to={contactPath('technology')}
        cta="Talk to KVI Tech"
      />
    </>
  )
}
