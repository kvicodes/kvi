import useDocumentMeta from '../lib/useDocumentMeta.js'
import PageHeader from '../components/PageHeader.jsx'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import GroupStructure from '../components/GroupStructure.jsx'
import PhilosophySection from '../sections/PhilosophySection.jsx'
import VisionSection from '../sections/VisionSection.jsx'
import RootedSection from '../sections/RootedSection.jsx'
import ContactCtaSection from '../sections/ContactCtaSection.jsx'
import { about } from '../data/about.js'
import { company } from '../data/company.js'
import { businesses } from '../data/businesses.js'

export default function About() {
  useDocumentMeta({
    title: 'About KVI',
    description:
      'Kaimur Valley Innovations Pvt. Ltd. is an AgroTech-led company from Kaimur, Bihar, building businesses around agriculture, food processing, rural infrastructure and enterprise software.',
    path: '/about',
  })

  const facts = [
    { term: 'Company', value: company.legalName },
    { term: 'Origin', value: `${company.origin}, ${company.region}` },
    { term: 'Focus', value: 'Agriculture, food processing, infrastructure and technology' },
    { term: 'Divisions', value: businesses.map((b) => b.name).join(' · ') },
  ]

  return (
    <>
      <PageHeader
        eyebrow="About KVI"
        title="An AgroTech-led company, built from the ground up."
        lede={about.lede}
      />

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="font-serif text-2xl font-medium leading-snug sm:text-3xl">{company.supporting}</p>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-4 lg:col-start-9">
            <dl className="divide-y divide-line border-y border-line">
              {facts.map((f) => (
                <div key={f.term} className="py-4">
                  <dt className="eyebrow">{f.term}</dt>
                  <dd className="mt-1.5 text-base text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
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

      <Section tone="paper" divide id="structure">
        <SectionHeading
          eyebrow="Company structure"
          heading="One company. Three divisions. Agriculture at the centre."
          intro="KVI Greens leads the agricultural work. KV Infra and KVI Tech provide infrastructure and technology — for KVI’s own ventures and for their own clients. Software products sit inside KVI Tech."
        />
        <Reveal className="mx-auto mt-14 max-w-3xl">
          <GroupStructure />
        </Reveal>
      </Section>

      <PhilosophySection tone="sunken" />
      <VisionSection showLink={false} />
      <RootedSection />
      <ContactCtaSection />
    </>
  )
}
