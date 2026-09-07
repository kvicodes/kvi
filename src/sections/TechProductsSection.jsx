import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import ProductCard from '../components/ProductCard.jsx'
import ArrowLink from '../components/ArrowLink.jsx'
import { products, productsNote } from '../data/products.js'

export default function TechProductsSection({ id = 'products', tone = 'paper' }) {
  return (
    <Section tone={tone} divide id={id}>
      <SectionHeading
        eyebrow="KVI Tech"
        heading="Technology built for real-world businesses."
        intro="Software platforms developed by KVI Tech. Each is a product line — not a separate KVI business."
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => (
          <Reveal key={p.id} delay={i * 90}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-ink-muted">{productsNote}</p>
        <ArrowLink to="/tech">Visit KVI Tech</ArrowLink>
      </Reveal>
    </Section>
  )
}
