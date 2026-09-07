import useDocumentMeta from '../lib/useDocumentMeta.js'
import PageHeader from '../components/PageHeader.jsx'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import GroupStructure from '../components/GroupStructure.jsx'
import PhilosophySection from '../sections/PhilosophySection.jsx'
import ContactCtaSection from '../sections/ContactCtaSection.jsx'
import { about } from '../data/about.js'
import { company } from '../data/company.js'

export default function About() {
  useDocumentMeta({
    title: 'About',
    description:
      'Kaimur Valley Innovations is a modern Indian business group building and operating businesses across infrastructure, agriculture, natural products and technology.',
    path: '/about',
  })

  return (
    <>
      <PageHeader eyebrow="About KVI" title="A business group, built to last." lede={about.lede} />

      <Section tone="paper" divide>
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal className="border border-line bg-paper-raised p-8">
            <p className="eyebrow">Positioning</p>
            <p className="mt-5 font-display text-2xl font-semibold sm:text-3xl">
              {company.positioning}
            </p>
          </Reveal>
          <Reveal delay={80} className="border border-line bg-paper-raised p-8">
            <p className="eyebrow">In practice</p>
            <p className="mt-5 font-display text-2xl font-semibold sm:text-3xl">
              {company.supporting}
            </p>
          </Reveal>
        </div>
      </Section>

      {about.sections.map((s, i) => (
        <Section key={s.key} id={s.key} tone={i % 2 === 0 ? 'sunken' : 'paper'} divide>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-4">
              <h2 className="text-2xl sm:text-3xl">{s.heading}</h2>
            </Reveal>
            <Reveal delay={80} className="lg:col-span-7 lg:col-start-6">
              {s.body.map((p) => (
                <p key={p} className="mt-5 max-w-prose text-lg text-ink-muted first:mt-0">
                  {p}
                </p>
              ))}
            </Reveal>
          </div>
        </Section>
      ))}

      <Section tone="sunken" divide id="structure">
        <SectionHeading
          eyebrow="KVI business structure"
          heading="One group. Three businesses. Products inside KVI Tech."
          intro="FarmGrid, ContractorOS and CampusGrid are KVI Tech products — not separate KVI businesses."
        />
        <Reveal className="mx-auto mt-14 max-w-3xl">
          <GroupStructure />
        </Reveal>
      </Section>

      <PhilosophySection tone="paper" />

      <ContactCtaSection />
    </>
  )
}
