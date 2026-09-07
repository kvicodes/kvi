import Section from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import { Link } from 'react-router-dom'
import BusinessGlyph from '../components/BusinessGlyph.jsx'
import { businesses, TINT } from '../data/businesses.js'

export default function Intro() {
  return (
    <Section tone="paper" divide>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">One group</p>
          <h2 className="mt-5 text-3xl sm:text-4xl">One group. Three businesses.</h2>
        </Reveal>
        <Reveal delay={80} className="lg:col-span-6 lg:col-start-7">
          <p className="text-lg text-ink-muted">
            KVI brings together independent businesses focused on infrastructure,
            agriculture and natural products, and technology.
          </p>
          <p className="mt-5 text-lg text-ink-muted">
            Each runs on its own terms. Together they cover the arc from land and
            construction, through production and products, to the software that
            helps run it all.
          </p>
        </Reveal>
      </div>

      {/* Signature triptych — Build · Operate · Innovate, mapped to the three
          businesses. The first thing a visitor should be able to remember. */}
      <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
        {businesses.map((b, i) => {
          const tint = TINT[b.id] || {}
          return (
            <Reveal
              key={b.id}
              delay={i * 90}
              as={Link}
              to={b.to}
              className="group flex flex-col bg-paper-raised p-7 transition-colors duration-300 ease-editorial hover:bg-paper sm:p-8"
            >
              <span className={`${tint.text}`}>
                <BusinessGlyph id={b.id} size={36} />
              </span>
              <span className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                {b.verb}
              </span>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                {b.name}
                <span
                  aria-hidden="true"
                  className={`h-px w-6 origin-left scale-x-100 ${tint.bar} transition-transform duration-300 ease-editorial group-hover:w-9`}
                />
              </span>
              <span className="mt-1 text-sm text-ink-muted">{b.discipline}</span>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
