import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import BusinessCard from '../components/BusinessCard.jsx'
import { businesses } from '../data/businesses.js'

/**
 * "Our Businesses" — the three-card block. Used on the homepage and the
 * Businesses page. `featured` shows focus-area lists inside each card.
 */
export default function BusinessesSection({
  eyebrow = 'Our businesses',
  heading = 'Three businesses, one group.',
  intro = 'KVI Infra develops. Kaimur Farms operates. KVI Tech innovates. Distinct businesses, built to work well together.',
  featured = false,
  tone = 'sunken',
  id,
}) {
  return (
    <Section tone={tone} divide id={id}>
      <SectionHeading eyebrow={eyebrow} heading={heading} intro={intro} />
      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        {businesses.map((b, i) => (
          <Reveal key={b.id} delay={i * 90}>
            <BusinessCard business={b} featured={featured} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
