import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import DivisionCard from '../components/DivisionCard.jsx'
import { businesses } from '../data/businesses.js'

/**
 * The three divisions. KVI Greens spans the full width on top; KV Infra and
 * KVI Tech sit side by side beneath it. Used on the homepage and /businesses.
 */
export default function BusinessesSection({
  eyebrow = 'Our businesses',
  heading = 'Three divisions. One agricultural purpose.',
  intro = 'KVI Greens leads the agricultural work. KV Infra and KVI Tech are businesses in their own right — and the infrastructure and technology that agricultural enterprise needs.',
  tone = 'sunken',
  id = 'businesses',
}) {
  const [lead, ...rest] = businesses
  return (
    <Section tone={tone} divide id={id}>
      <SectionHeading eyebrow={eyebrow} heading={heading} intro={intro} />
      <div className="mt-14 grid gap-4 lg:grid-cols-2">
        <Reveal className="lg:col-span-2">
          <DivisionCard business={lead} featured />
        </Reveal>
        {rest.map((b, i) => (
          <Reveal key={b.id} delay={(i + 1) * 90}>
            <DivisionCard business={b} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
