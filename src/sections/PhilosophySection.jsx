import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import { philosophy } from '../data/company.js'

export default function PhilosophySection({ tone = 'sunken' }) {
  return (
    <Section tone={tone} divide>
      <SectionHeading
        eyebrow="How we work"
        heading={philosophy.heading}
        intro={philosophy.intro}
      />
      <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {philosophy.steps.map((step, i) => (
          <Reveal key={step.no} delay={i * 80} className="flex flex-col bg-paper-raised p-7">
            <span className="font-display text-sm text-ink-muted">{step.no}</span>
            <h3 className="mt-6 font-display text-xl font-semibold uppercase tracking-tight">
              {step.title}
            </h3>
            <p className="mt-3 text-sm text-ink-muted">{step.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
