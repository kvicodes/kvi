import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'

const stages = [
  {
    no: '01',
    title: 'Experience',
    body: 'We operate businesses and encounter real problems.',
  },
  {
    no: '02',
    title: 'Solve',
    body: 'We build infrastructure, systems, software and processes to solve them.',
  },
  {
    no: '03',
    title: 'Share',
    body: 'Solutions that prove useful can become products or services for other businesses.',
  },
]

export default function OperationsToBusinessSection() {
  return (
    <Section tone="sunken" divide>
      <SectionHeading
        eyebrow="Our commercial model"
        heading="From our operations to your business."
        intro="KVI's external products and services begin with work we have encountered and understood in practice."
      />
      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        {stages.map((stage, index) => (
          <Reveal key={stage.no} delay={index * 90} className="border border-line bg-paper-raised p-7">
            <span className="font-display text-sm text-accent">{stage.no}</span>
            <h3 className="mt-6 text-2xl">{stage.title}</h3>
            <p className="mt-3 text-ink-muted">{stage.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
