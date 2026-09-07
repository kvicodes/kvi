import Section from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import ArrowLink from '../components/ArrowLink.jsx'

const CHAIN = ['Land', 'Cultivation', 'Harvest', 'Processing', 'Product']

const FOCUS = [
  'Farm management',
  'Agricultural production',
  'Natural products',
  'Food products',
  'Consumer businesses',
]

export default function FarmsSection() {
  return (
    <Section tone="paper" divide>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow">Kaimur Farms</p>
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl">From land to product.</h2>
            <p className="mt-6 max-w-prose text-lg text-ink-muted">
              Kaimur Farms manages and operates farmland, and builds businesses
              around what it produces — from the field through processing and
              packaging to finished food and natural products.
            </p>
          </Reveal>

          <Reveal delay={80} className="mt-10">
            <ol className="flex flex-wrap items-center gap-x-3 gap-y-3">
              {CHAIN.map((step, i) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-ink">
                    <span className="mr-2 font-display text-xs text-ink-muted">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {step}
                  </span>
                  {i < CHAIN.length - 1 && (
                    <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
                  )}
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={120} className="mt-10">
            <ArrowLink to="/farms">Explore Kaimur Farms</ArrowLink>
          </Reveal>
        </div>

        <Reveal delay={100} className="lg:col-span-5 lg:col-start-8">
          <div className="border border-line bg-accent-wash p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-deep">
              Focus areas
            </p>
            <ul className="mt-5 divide-y divide-line">
              {FOCUS.map((f) => (
                <li key={f} className="py-3 font-display text-lg font-medium text-ink">
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-ink-muted">
              Mokari Gobindbhog rice is an early initiative. Product details and
              availability are published as they are confirmed.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
