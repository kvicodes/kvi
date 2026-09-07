import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import ArrowLink from '../components/ArrowLink.jsx'
import { products } from '../data/products.js'

/**
 * Homepage "what we're building" block. Replaces an empty Insights preview —
 * every line here is a current, verifiable fact drawn from site data. No
 * fabricated articles or dates. Longer written pieces live at /insights when
 * they exist.
 */
const liveProducts = products.filter((p) => p.status === 'live').map((p) => p.name)

const UPDATES = [
  {
    business: 'KVI Tech',
    to: '/tech',
    body: `${liveProducts.join(', ')} are live — software platforms built for farm businesses, government contracting and education institutions.`,
  },
  {
    business: 'Kaimur Farms',
    to: '/farms',
    body: 'Developing food and natural products from its own farm operations. Mokari Gobindbhog rice is an early initiative.',
  },
  {
    business: 'KVI Infra',
    to: '/infra',
    body: 'Focused on farm land development and agricultural infrastructure — irrigation, farm buildings, storage and site works.',
  },
]

export default function UpdatesSection() {
  return (
    <Section tone="paper" divide>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="What we're building"
          heading="Where things stand today."
          intro="A plain view of what each KVI business is working on right now."
        />
        <Reveal>
          <ArrowLink to="/insights">KVI Insights</ArrowLink>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
        {UPDATES.map((u, i) => (
          <Reveal key={u.business} delay={i * 90} className="flex flex-col bg-paper-raised p-7">
            <p className="eyebrow">{u.business}</p>
            <p className="mt-4 flex-1 text-sm text-ink-muted">{u.body}</p>
            <ArrowLink to={u.to} className="mt-6">
              Details
            </ArrowLink>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
