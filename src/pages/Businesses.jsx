import useDocumentMeta from '../lib/useDocumentMeta.js'
import PageHeader from '../components/PageHeader.jsx'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import GroupStructure from '../components/GroupStructure.jsx'
import BusinessesSection from '../sections/BusinessesSection.jsx'
import ContactCtaSection from '../sections/ContactCtaSection.jsx'

export default function Businesses() {
  useDocumentMeta({
    title: 'Our Businesses',
    description:
      'KVI operates three businesses: KVI Infra (farm development and infrastructure), Kaimur Farms (agriculture and natural products) and KVI Tech (technology and digital products).',
    path: '/businesses',
  })

  return (
    <>
      <PageHeader
        eyebrow="KVI Group"
        title="Our Businesses"
        lede="KVI is a diversified business group. It builds and operates three businesses across infrastructure, agriculture and technology — each independent, each accountable for its own results."
      />

      <BusinessesSection
        eyebrow="The three businesses"
        heading="Build. Operate. Innovate."
        intro="Distinct businesses that cover the arc from land and construction, through production and products, to the software that helps run it all."
        featured
        tone="paper"
      />

      <Section tone="sunken" divide>
        <SectionHeading
          eyebrow="Structure"
          heading="How the group fits together."
          intro="One parent group. Three operating businesses. Technology products sit inside KVI Tech — not alongside it."
        />
        <Reveal className="mx-auto mt-14 max-w-3xl">
          <GroupStructure />
        </Reveal>
      </Section>

      <ContactCtaSection />
    </>
  )
}
