import BusinessPage from '../components/BusinessPage.jsx'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import ProductCard from '../components/ProductCard.jsx'
import ArrowLink from '../components/ArrowLink.jsx'
import { byId } from '../data/businesses.js'
import { products, productsNote } from '../data/products.js'

export default function Tech() {
  const famgrid = products.find((p) => p.id === 'famgrid')
  const farmgrid = products.find((p) => p.id === 'farmgrid')

  return (
    <BusinessPage
      business={byId('kvi-tech')}
      metaDescription="KVI Tech develops software platforms and digital products designed around practical problems across business, education and everyday life. Products include FarmGrid, ContractorOS, CampusGrid and FamGrid."
      headerTone="ink"
    >
      <Section tone="paper" divide id="products">
        <SectionHeading
          eyebrow="Portfolio"
          heading="Products built by KVI Tech."
          intro="Software products designed to solve practical problems across business, education and everyday life. Each is a KVI Tech product line — developed to stand on its own commercially, not spun out as a separate KVI business."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={i * 90} className="h-full">
              <ProductCard product={p} />
            </Reveal>
          ))}
          <Reveal delay={products.length * 90} className="sm:col-span-2 lg:col-span-4">
            <div className="border border-dashed border-line-strong bg-paper-sunken p-7">
              <p className="font-display text-lg font-semibold text-ink">Future products</p>
              <p className="mt-2 text-sm text-ink-muted">{productsNote}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {farmgrid && (
        <Section tone="sunken" divide id="farmgrid">
          <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <span className="eyebrow accent-tick is-visible block">Agriculture × technology</span>
              <h2 className="mt-5 text-3xl sm:text-4xl">FarmGrid</h2>
              <p className="mt-3 text-sm font-medium text-accent-deep">{farmgrid.category}</p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="max-w-prose text-lg text-ink-muted">
                {farmgrid.description} It brings farms, units, activities, inventory and
                production into one system — built by KVI Tech on the group&rsquo;s own
                experience of running farmland through Kaimur Farms.
              </p>
              <p className="mt-5 max-w-prose text-sm text-ink-muted">
                FarmGrid is a farm operations platform — distinct from FamGrid, KVI Tech&rsquo;s
                family finance platform.
              </p>
              <div className="mt-8">
                <ArrowLink
                  href={farmgrid.url}
                  external
                  icon="arrow-up-right"
                >
                  Visit FarmGrid
                </ArrowLink>
              </div>
            </div>
          </Reveal>
        </Section>
      )}

      {famgrid && (
        <Section tone="ink" divide id="famgrid">
          <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <span className="eyebrow text-paper/55">Newest product</span>
              <span aria-hidden="true" className="mt-5 block h-px w-16 bg-famgrid" />
              <h2 className="mt-5 text-3xl sm:text-4xl">FamGrid</h2>
              <p className="mt-3 text-sm font-medium text-paper/60">{famgrid.category}</p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="font-display text-2xl font-semibold sm:text-3xl">
                &ldquo;{famgrid.tagline}&rdquo;
              </p>
              <p className="mt-5 max-w-prose text-lg text-paper/70">
                A simple platform for families to keep track of their finances together. Built by
                KVI Tech.
              </p>
              <div className="mt-8">
                <ArrowLink
                  href={famgrid.url}
                  external
                  icon="arrow-up-right"
                  className="!text-paper hover:!text-famgrid"
                >
                  Visit FamGrid
                </ArrowLink>
              </div>
            </div>
          </Reveal>
        </Section>
      )}
    </BusinessPage>
  )
}
