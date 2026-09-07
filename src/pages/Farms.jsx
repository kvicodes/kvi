import BusinessPage from '../components/BusinessPage.jsx'
import Section from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import { byId } from '../data/businesses.js'

const CHAIN = [
  { step: 'Land', body: 'Farmland managed and operated directly.' },
  { step: 'Production', body: 'Agricultural output grown to a consistent standard.' },
  { step: 'Processing', body: 'Cleaning, processing and packaging close to source.' },
  { step: 'Product', body: 'Food and natural products, and consumer brands where they can stand alone.' },
]

export default function Farms() {
  return (
    <BusinessPage
      business={byId('kaimur-farms')}
      metaDescription="Kaimur Farms manages and operates farmland and builds businesses around agricultural, food and natural products — from land to finished product."
    >
      <Section tone="accent" divide>
        <Reveal>
          <p className="eyebrow text-paper/55">The chain</p>
          <h2 className="mt-5 text-3xl sm:text-4xl">From land to product.</h2>
        </Reveal>
        <ol className="mt-12 grid gap-px overflow-hidden border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {CHAIN.map((c, i) => (
            <Reveal key={c.step} delay={i * 80} className="bg-accent-deep p-7">
              <span className="font-display text-sm text-paper/50">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-paper">{c.step}</h3>
              <p className="mt-3 text-sm text-paper/65">{c.body}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal delay={120}>
          <p className="mt-8 max-w-prose text-sm text-paper/60">
            Mokari Gobindbhog rice is an early initiative. KVI does not claim
            organic, chemical-free or certified status for any product unless it
            has been independently verified.
          </p>
        </Reveal>
      </Section>
    </BusinessPage>
  )
}
