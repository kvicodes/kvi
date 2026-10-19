import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import Button from '../components/Button.jsx'
import { featuredProduct, productDirections } from '../data/greens.js'
import { contactPath } from '../data/contact.js'

const GRAINS = Array.from({ length: 9 }, (_, i) => i)

/** Grain-stalk motif for the Mokari panel. Decorative — not packaging art. */
function GrainArt() {
  return (
    <svg viewBox="0 0 240 240" fill="none" aria-hidden="true" focusable="false" className="h-full w-full">
      <circle cx="120" cy="120" r="96" stroke="rgb(var(--c-grain) / 0.25)" />
      <circle cx="120" cy="120" r="70" stroke="rgb(var(--c-grain) / 0.12)" />
      <path d="M120 206 C 118 160 122 110 140 52" stroke="rgb(var(--c-forest-soft))" strokeWidth="1.6" strokeLinecap="round" />
      {GRAINS.map((i) => {
        const t = i / (GRAINS.length - 1)
        const x = 121 + t * 18
        const y = 150 - t * 92
        const side = i % 2 === 0 ? -1 : 1
        return (
          <ellipse
            key={i}
            cx={x + side * 9}
            cy={y}
            rx="4.4"
            ry="9"
            transform={`rotate(${side * 32} ${x + side * 9} ${y})`}
            fill="rgb(var(--c-grain) / 0.85)"
          />
        )
      })}
      <path d="M118 176c-16-4-28-16-30-34 16 4 28 16 30 34Z" stroke="rgb(var(--c-forest-soft))" strokeWidth="1.3" />
    </svg>
  )
}

/** KVI Greens product-branding direction: Mokari (early initiative) + planned lines. */
export default function AgriProductsSection({ tone = 'paper' }) {
  const p = featuredProduct
  return (
    <Section tone={tone} divide id="agri-products">
      <SectionHeading
        eyebrow="KVI Greens products"
        heading="Value addition, starting with one distinctive grain."
        intro="KVI Greens is building agricultural products that carry more of their value back towards the farm. The first initiative is a premium aromatic rice."
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-12">
        <Reveal className="grid overflow-hidden border border-line bg-paper-raised sm:grid-cols-5 lg:col-span-8">
          <div className="relative bg-forest-deep p-8 sm:col-span-2">
            <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 border border-grain/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-grain">
              {p.status}
            </span>
            <div className="mx-auto mt-6 aspect-square max-w-[15rem]">
              <GrainArt />
            </div>
          </div>
          <div className="flex flex-col p-8 sm:col-span-3 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-earth-deep">{p.brand}</p>
            <h3 className="mt-2 font-serif text-3xl font-medium sm:text-4xl">{p.name}</h3>
            <p className="mt-4 text-ink-muted">{p.body}</p>
            <p className="mt-3 text-sm text-ink-muted">{p.variety}</p>
            <p className="mt-6 border-l-2 border-grain pl-4 text-sm text-ink-soft">{p.availability}</p>
            <div className="mt-8">
              <Button to={contactPath('distribution', { product: 'mokari' })} withArrow>
                Register buyer interest
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={90} className="flex flex-col border border-line bg-paper-sunken p-8 lg:col-span-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="eyebrow whitespace-nowrap">Product directions</p>
            <span className="whitespace-nowrap border border-line-strong px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
              Not yet available
            </span>
          </div>
          <ul className="mt-6 flex-1 divide-y divide-line border-y border-line">
            {productDirections.map((d) => (
              <li key={d.title} className="py-4">
                <p className="font-display text-lg font-semibold">{d.title}</p>
                <p className="mt-1 text-sm text-ink-muted">{d.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-ink-muted">
            Producers and processors interested in developing these lines with KVI Greens are
            welcome to get in touch.
          </p>
        </Reveal>
      </div>
    </Section>
  )
}
