import PageHero from '../components/PageHero.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ValueCard from '../components/ValueCard.jsx'
import CTABanner from '../components/CTABanner.jsx'
import Reveal from '../components/Reveal.jsx'
import { about, home } from '../data/content.js'

export default function About() {
  return (
    <>
      <PageHero {...about.hero} />

      {/* Overview */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <Reveal>
          <SectionHeading heading={about.overview.heading} />
          <div className="mt-6 space-y-5">
            {about.overview.paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-forest-800/85">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 sm:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-forest-100 bg-forest-50 p-8 sm:p-10">
              <h3 className="font-heading text-2xl font-bold text-forest-950">{about.mission.heading}</h3>
              <p className="mt-4 text-base leading-relaxed text-forest-800/85">{about.mission.body}</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="h-full rounded-2xl border border-teal-100 bg-teal-50 p-8 sm:p-10">
              <h3 className="font-heading text-2xl font-bold text-teal-900">{about.vision.heading}</h3>
              <p className="mt-4 text-base leading-relaxed text-teal-900/80">{about.vision.body}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Core values */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Our Values"
              heading={about.values.heading}
              subheading={about.values.subheading}
              align="center"
              className="mx-auto"
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <ValueCard icon={item.icon} title={item.title} description={item.description} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-forest-950 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="How We Work"
              heading={about.approach.heading}
              subheading={about.approach.subheading}
              light
            />
            <div className="mt-8 space-y-5">
              {about.approach.paragraphs.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-sand-100/80">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CTABanner {...home.ctaBanner} />
    </>
  )
}
