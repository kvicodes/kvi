import { Link } from 'react-router-dom'
import useDocumentMeta from '../lib/useDocumentMeta.js'
import PageHeader from '../components/PageHeader.jsx'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import BusinessGlyph from '../components/BusinessGlyph.jsx'
import ActivityGrid from '../components/ActivityGrid.jsx'
import GreensEcosystemSection from '../sections/GreensEcosystemSection.jsx'
import AgriProductsSection from '../sections/AgriProductsSection.jsx'
import ContactCtaSection from '../sections/ContactCtaSection.jsx'
import { byId } from '../data/businesses.js'
import { partnershipModels } from '../data/greens.js'
import { contactPath } from '../data/contact.js'

const SUPPORT = [
  {
    to: '/infra',
    label: 'KV Infra',
    title: 'Infrastructure for farm development',
    body: 'Land preparation, irrigation, farm buildings and storage — executed by KVI’s infrastructure division where a farm needs it.',
  },
  {
    to: '/products/farmgrid',
    label: 'FarmGrid · KVI Tech',
    title: 'Software for farm operations',
    body: 'Units, activities, inventory, labour, finance and production records in one system — built for diversified farms.',
  },
]

export default function Greens() {
  const b = byId('kvi-greens')
  useDocumentMeta({
    title: 'KVI Greens — Agriculture, food processing & natural products',
    description:
      'KVI Greens partners with farmers and farm owners to develop farms, source and process agricultural produce, and build natural-product brands such as Mokari Premium Gobindbhog rice.',
    path: '/greens',
  })

  return (
    <>
      <PageHeader
        tone="forest"
        eyebrow={`KVI Greens · ${b.discipline}`}
        title="Building an agricultural ecosystem — with farmers, not around them."
        lede={b.summary}
        figure={
          <span className="text-paper">
            <BusinessGlyph id={b.id} size={340} />
          </span>
        }
        actions={
          <>
            <Button to={contactPath('farm-partnership')} variant="inverse" withArrow>
              Partner as a farmer
            </Button>
            <Button href="#ecosystem" variant="outline-light">
              See the ecosystem
            </Button>
          </>
        }
      />

      <Section tone="paper">
        <SectionHeading
          eyebrow="An ecosystem builder"
          heading="More than a food brand — the whole chain behind it."
          intro="KVI Greens works across the stages that decide what a farm earns: how it is developed and run, what happens to its produce after harvest, and how that produce reaches customers."
        />
        <ActivityGrid division={b.id} items={b.activities} label="KVI Greens activities" />
      </Section>

      <GreensEcosystemSection
        heading="Five stages, from the farmer to the market."
        tone="sunken"
        showLinks={false}
      />

      <Section tone="paper" divide id="farmers">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Working with farmers"
              heading="Partnership models we offer and explore."
              intro="Every farm is different. These are the ways KVI Greens can work with farmers and farm owners; the right arrangement depends on the land, the crop and what the owner wants."
            />
            <Reveal className="mt-10">
              <Button to={contactPath('farm-partnership')} withArrow>
                Discuss your farm
              </Button>
            </Reveal>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {partnershipModels.map((m, i) => (
              <Reveal as="li" key={m.title} delay={i * 70} className="border border-line bg-paper-raised bg-furrow p-7">
                <span className="font-display text-xs tabular-nums text-greens">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 text-xl">{m.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{m.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <AgriProductsSection tone="sunken" />

      <Section tone="paper" divide>
        <SectionHeading
          eyebrow="Connected support"
          heading="Infrastructure and technology from inside KVI."
          intro="Farms that partner with KVI Greens can draw on KVI’s other two divisions — on normal commercial terms."
        />
        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {SUPPORT.map((s, i) => (
            <Reveal as="li" key={s.to} delay={i * 80}>
              <Link
                to={s.to}
                className="group flex h-full flex-col border border-line bg-paper-raised p-8 transition duration-300 ease-editorial hover:-translate-y-1 hover:border-ink/40 hover:shadow-card"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">{s.label}</span>
                <span className="mt-3 font-serif text-2xl font-medium">{s.title}</span>
                <span className="mt-3 flex-1 text-sm text-ink-muted">{s.body}</span>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
                  Learn more
                  <Icon name="arrow-right" size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      <ContactCtaSection
        heading="Farmers and farm owners — let’s talk about your land."
        body="Tell us about your farm, what it grows today and what you would like it to become. KVI Greens will get back to you."
        to={contactPath('farm-partnership')}
        cta="Start a conversation"
      />
    </>
  )
}
