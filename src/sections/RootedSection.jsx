import Section from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import { rooted } from '../data/company.js'

export default function RootedSection() {
  return (
    <Section tone="paper" divide>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">Origin</p>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl">{rooted.heading}</h2>
        </Reveal>
        <Reveal delay={80} className="lg:col-span-6 lg:col-start-7">
          {rooted.paragraphs.map((p) => (
            <p key={p} className="mt-5 text-lg text-ink-muted first:mt-0">
              {p}
            </p>
          ))}
        </Reveal>
      </div>
    </Section>
  )
}
