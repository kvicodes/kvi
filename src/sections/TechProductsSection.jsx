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
        heading="Technology built for real-world problems."
        intro="KVI Tech builds software platforms and digital products around practical problems across business, education, agriculture and everyday life."
      />

      <Reveal className="mt-14 flex items-baseline justify-between border-b border-line pb-3">
        <p className="eyebrow">Product portfolio</p>
        <p className="text-sm text-ink-muted">Four products</p>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p, i) => (
          <Reveal key={p.id} delay={i * 90} className="h-full">
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
