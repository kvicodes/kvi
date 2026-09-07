import useDocumentMeta from '../lib/useDocumentMeta.js'
import Hero from '../sections/Hero.jsx'
import Intro from '../sections/Intro.jsx'
import BusinessesSection from '../sections/BusinessesSection.jsx'
import EcosystemSection from '../sections/EcosystemSection.jsx'
import TechProductsSection from '../sections/TechProductsSection.jsx'
import FarmsSection from '../sections/FarmsSection.jsx'
import PhilosophySection from '../sections/PhilosophySection.jsx'
import RootedSection from '../sections/RootedSection.jsx'
import InsightsSection from '../sections/InsightsSection.jsx'
import ContactCtaSection from '../sections/ContactCtaSection.jsx'

export default function Home() {
  useDocumentMeta({
    title: 'Building the Future from the Ground Up',
    description:
      'Kaimur Valley Innovations builds and operates businesses across infrastructure, agriculture, natural products and technology — through KVI Infra, Kaimur Farms and KVI Tech.',
    path: '/',
  })

  return (
    <>
      <Hero />
      <Intro />
      <BusinessesSection
        heading="KVI Infra. Kaimur Farms. KVI Tech."
        intro="This is the core of KVI: three businesses that develop, operate and innovate — distinct, and built to work well together."
      />
      <EcosystemSection />
      <TechProductsSection />
      <FarmsSection />
      <PhilosophySection />
      <RootedSection />
      <InsightsSection />
      <ContactCtaSection />
    </>
  )
}
