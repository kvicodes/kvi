import useDocumentMeta from '../lib/useDocumentMeta.js'
import PageHeader from '../components/PageHeader.jsx'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import Button from '../components/Button.jsx'
import BusinessGlyph from '../components/BusinessGlyph.jsx'
import TechProductsSection from '../sections/TechProductsSection.jsx'
import OperationsToBusinessSection from '../sections/OperationsToBusinessSection.jsx'
import ContactCtaSection from '../sections/ContactCtaSection.jsx'
import { byId } from '../data/businesses.js'
import { contactPath } from '../data/contact.js'

const SERVICES = [
  {
    title: 'Software products',
    body: 'Live, multi-tenant SaaS products for specific industries — subscribed to and used as they are.',
  },
  {
    title: 'Custom software development',
    body: 'Software built around an organisation’s own operations where an off-the-shelf product does not fit.',
  },
  {
    title: 'Implementation support',
    body: 'Help setting up and adopting KVI products — configuration, data import and onboarding.',
  },
  {
    title: 'Integrations & IT services',
    body: 'Connecting systems, automating routine work and related IT services.',
  },
]

export default function Tech() {
  const b = byId('kvi-tech')
  useDocumentMeta({
    title: 'KVI Tech — Software products & technology services',
    description:
      'KVI Tech builds and operates FarmGrid, BillGrid, CampusGrid, BhattaGrid and ContractorOS, and provides software development and IT-related services.',
    path: '/tech',
  })

  return (
    <>
      <PageHeader
        tone="ink"
        eyebrow={`KVI Tech · ${b.discipline}`}
        title="Technology that helps real operations run better."
        lede={b.summary}
        figure={
          <span className="text-paper">
            <BusinessGlyph id={b.id} size={340} />
          </span>
        }
        actions={
          <>
            <Button href="#products" variant="inverse" withArrow>
              See the products
            </Button>
            <Button to={contactPath('technology')} variant="outline-light">
              Talk to KVI Tech
            </Button>
          </>
        }
      />

      <TechProductsSection
        tone="paper"
        eyebrow="Product portfolio"
        heading="Five live products, one portfolio."
        intro="Each product starts from a specific operational problem — on a farm, in a business, at a college, a kiln or a contractor’s site — and is built to be used every day."
      />

      <Section tone="sunken" divide id="services">
        <SectionHeading
          eyebrow="Technology services"
          heading="Beyond the products."
          intro="KVI Tech also provides software development and IT-related services to organisations."
        />
        <ul className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 70} className="bg-paper-raised bg-lattice p-7">
              <span className="font-display text-xs tabular-nums text-tech">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-4 text-xl">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{s.body}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <OperationsToBusinessSection />

      <ContactCtaSection
        heading="Evaluating software for your organisation?"
        body="Ask about a KVI Tech product, request a walkthrough, or discuss a software project."
        to={contactPath('technology')}
        cta="Contact KVI Tech"
      />
    </>
  )
}
