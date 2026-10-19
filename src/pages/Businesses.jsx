import useDocumentMeta from '../lib/useDocumentMeta.js'
import PageHeader from '../components/PageHeader.jsx'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import GroupStructure from '../components/GroupStructure.jsx'
import BusinessesSection from '../sections/BusinessesSection.jsx'
import EcosystemSection from '../sections/EcosystemSection.jsx'
import PartnershipSection from '../sections/PartnershipSection.jsx'

export default function Businesses() {
  useDocumentMeta({
    title: 'Our Businesses',
    description:
      'KVI operates three divisions: KVI Greens (agriculture, food processing and natural products), KV Infra (infrastructure and project execution) and KVI Tech (software products and technology services).',
    path: '/businesses',
  })

  return (
    <>
      <PageHeader
        eyebrow="Our businesses"
        title="Three divisions. One agricultural purpose."
        lede="KVI is organised into three divisions. Each serves its own customers; together they let KVI take an agricultural opportunity from the ground to the market."
      />

      <BusinessesSection
        eyebrow="The divisions"
        heading="What each division does."
        intro="KVI Greens is the agricultural centre of the company. KV Infra executes infrastructure works. KVI Tech builds software products and provides IT services."
        tone="paper"
      />

      <EcosystemSection />

      <Section tone="sunken" divide>
        <SectionHeading
          eyebrow="Structure"
          heading="How the company fits together."
          intro="One parent company and three divisions. Technology products sit inside KVI Tech — not alongside it."
        />
        <Reveal className="mx-auto mt-14 max-w-3xl">
          <GroupStructure />
        </Reveal>
      </Section>

      <PartnershipSection />
    </>
  )
}
