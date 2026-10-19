import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { products, productsNote } from '../data/products.js'

/** The KVI Tech product showcase — every listed product, one card system. */
export default function TechProductsSection({
  id = 'products',
  tone = 'sunken',
  eyebrow = 'KVI Tech products',
  heading = 'Software for the way real operations run.',
  intro = 'KVI Tech builds and operates software for farms, businesses, institutions, kilns and contractors — technology that supports the wider KVI story rather than standing apart from it.',
  showAllLink = true,
}) {
  return (
    <Section tone={tone} divide id={id}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow={eyebrow} heading={heading} intro={intro} />
        <Reveal className="hidden lg:block">
          <p className="text-sm text-ink-muted">{products.length} live products</p>
        </Reveal>
      </div>

      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => (
          <Reveal as="li" key={p.id} delay={i * 70} className="h-full">
            <ProductCard product={p} />
          </Reveal>
        ))}
        {showAllLink && (
          <Reveal as="li" delay={products.length * 70} className="h-full">
            <Link
              to="/products"
              className="group flex h-full min-h-[14rem] flex-col justify-between border border-forest bg-forest-deep p-7 text-paper transition-colors duration-300 hover:bg-forest"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-grain">Portfolio</span>
              <span>
                <span className="block font-serif text-3xl font-medium">All {products.length} products</span>
                <span className="mt-2 block text-sm text-paper/70">Grouped by sector, each with its own page.</span>
              </span>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
                View All Products
                <Icon name="arrow-right" size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        )}
      </ul>

      <Reveal className="mt-8">
        <p className="text-sm text-ink-muted">{productsNote}</p>
      </Reveal>
    </Section>
  )
}
