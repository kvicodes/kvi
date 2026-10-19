import { Link } from 'react-router-dom'
import Section from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import BusinessGlyph from '../components/BusinessGlyph.jsx'
import { byId, TINT } from '../data/businesses.js'

const ROLES = [
  { id: 'kv-infra', role: 'Builds the physical foundation' },
  { id: 'kvi-greens', role: 'Leads the agricultural work', lead: true },
  { id: 'kvi-tech', role: 'Brings software and discipline' },
]

/** Why KVI exists, and how the three divisions connect around agriculture. */
export default function Intro() {
  return (
    <Section tone="paper" aria-labelledby="intro-heading">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-6">
          <p className="eyebrow accent-tick text-accent">Why KVI exists</p>
          <h2 id="intro-heading" className="text-3xl sm:text-4xl lg:text-5xl">
            Agriculture at the centre. Enterprise built around it.
          </h2>
        </Reveal>
        <Reveal delay={80} className="space-y-5 text-lg text-ink-muted lg:col-span-5 lg:col-start-8 lg:pt-12">
          <p>
            Much of agriculture’s value is lost between the field and the customer — in
            under-developed farms, limited processing and weak routes to market. KVI exists to
            build businesses that close those gaps.
          </p>
          <p>
            KVI Greens leads that work with farmers on the ground. KV Infra builds the physical
            foundation it depends on. KVI Tech brings the software that helps farms, enterprises
            and other organisations run with discipline.
          </p>
        </Reveal>
      </div>

      <ol className="mt-16 grid items-stretch gap-px overflow-hidden border border-line bg-line lg:grid-cols-[1fr_1.35fr_1fr]">
        {ROLES.map(({ id, role, lead }, i) => {
          const b = byId(id)
          return (
            <Reveal
              key={id}
              as="li"
              delay={i * 90}
              className={`relative flex flex-col p-7 sm:p-9 ${
                lead ? 'order-first bg-forest-deep text-paper lg:order-none' : 'bg-paper-raised'
              }`}
            >
              <span className={lead ? 'text-grain' : TINT[id].text}>
                <BusinessGlyph id={id} size={lead ? 48 : 36} />
              </span>
              <p
                className={`mt-6 text-xs font-semibold uppercase tracking-[0.16em] ${
                  lead ? 'text-grain' : 'text-ink-muted'
                }`}
              >
                {role}
              </p>
              <Link
                to={b.to}
                className={`mt-2 font-serif font-medium link-underline self-start ${lead ? 'text-4xl' : 'text-2xl'}`}
              >
                {b.name}
              </Link>
              <p className={`mt-3 text-sm ${lead ? 'text-paper/70' : 'text-ink-muted'}`}>{b.discipline}</p>
            </Reveal>
          )
        })}
      </ol>
    </Section>
  )
}
