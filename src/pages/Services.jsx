import PageHero from '../components/PageHero.jsx'
import VerticalCard from '../components/VerticalCard.jsx'
import CTABanner from '../components/CTABanner.jsx'
import Reveal from '../components/Reveal.jsx'
import { servicesOverview, verticals, home } from '../data/content.js'

export default function Services() {
  return (
    <>
      <PageHero {...servicesOverview.hero} />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {verticals.map((vertical, i) => (
            <Reveal key={vertical.slug} delay={i * 80}>
              <VerticalCard vertical={vertical} />
            </Reveal>
          ))}
        </div>
      </section>

      <CTABanner {...home.ctaBanner} />
    </>
  )
}
