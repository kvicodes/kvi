import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import ArrowLink from '../components/ArrowLink.jsx'
import ProcessJourney from '../components/ProcessJourney.jsx'

const FOCUS = [
  'Farm management',
  'Agricultural production',
  'Processing & packaging',
  'Food products',
  'Natural products',
  'Consumer businesses',
]

export default function FarmsSection() {
  return (
    <Section tone="paper" divide>
      <SectionHeading
        eyebrow="Kaimur Farms"
        heading="From land to product."
        intro="Kaimur Farms manages and operates farmland, and builds businesses around what it produces — from the field through processing and packaging to finished food and natural products."
      />

      <ProcessJourney />

      <Reveal className="mt-16 grid gap-8 border-t border-line pt-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-deep">
            Focus areas
          </p>
          <ArrowLink to="/farms" className="mt-4">
            Explore Kaimur Farms
          </ArrowLink>
        </div>
        <ul className="lg:col-span-5 lg:col-start-6">
          {FOCUS.map((f) => (
            <li key={f} className="border-b border-line py-3 font-display text-lg font-medium text-ink first:border-t">
              {f}
            </li>
          ))}
        </ul>
        <p className="text-sm text-ink-muted lg:col-span-3 lg:col-start-11">
          Mokari Gobindbhog rice is an early initiative. Product details and
          availability are published as they are confirmed.
        </p>
      </Reveal>
    </Section>
  )
}
