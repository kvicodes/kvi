import BusinessPage from '../components/BusinessPage.jsx'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { byId } from '../data/businesses.js'
import { products, productsNote } from '../data/products.js'

export default function Tech() {
  return (
    <BusinessPage
      business={byId('kvi-tech')}
      metaDescription="KVI Tech builds software platforms, digital products and automation for real-world businesses. Products include FarmGrid, ContractorOS and CampusGrid."
      headerTone="ink"
    >
      <Section tone="paper" divide id="products">
        <SectionHeading
          eyebrow="Portfolio"
          heading="Products built by KVI Tech."
          intro="Each product is a KVI Tech product line — developed to stand on its own commercially, not spun out as a separate KVI business."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={i * 90}>
              <ProductCard product={p} />
            </Reveal>
          ))}
          <Reveal delay={products.length * 90} className="sm:col-span-2 lg:col-span-3">
            <div className="border border-dashed border-line-strong bg-paper-sunken p-7">
              <p className="font-display text-lg font-semibold text-ink">Future products</p>
              <p className="mt-2 text-sm text-ink-muted">{productsNote}</p>
            </div>
          </Reveal>
        </div>
      </Section>
    </BusinessPage>
  )
}
