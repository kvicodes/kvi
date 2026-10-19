import useDocumentMeta from '../lib/useDocumentMeta.js'
import Hero from '../sections/Hero.jsx'
import Intro from '../sections/Intro.jsx'
import BusinessesSection from '../sections/BusinessesSection.jsx'
import GreensEcosystemSection from '../sections/GreensEcosystemSection.jsx'
import TechProductsSection from '../sections/TechProductsSection.jsx'
import AgriProductsSection from '../sections/AgriProductsSection.jsx'
import PartnershipSection from '../sections/PartnershipSection.jsx'
import VisionSection from '../sections/VisionSection.jsx'
import ContactCtaSection from '../sections/ContactCtaSection.jsx'

export default function Home() {
  useDocumentMeta({
    title: null,
    description:
      'Kaimur Valley Innovations (KVI) is an AgroTech-led company building businesses around agriculture, food processing, rural infrastructure and software — through KVI Greens, KV Infra and KVI Tech.',
    path: '/',
  })

  return (
    <>
      <Hero />
      <Intro />
      <BusinessesSection />
      <GreensEcosystemSection />
      <TechProductsSection />
      <AgriProductsSection />
      <PartnershipSection />
      <VisionSection />
      <ContactCtaSection />
    </>
  )
}
