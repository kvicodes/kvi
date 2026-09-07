import useDocumentMeta from '../lib/useDocumentMeta.js'
import Hero from '../sections/Hero.jsx'
import Intro from '../sections/Intro.jsx'
import BusinessesSection from '../sections/BusinessesSection.jsx'
import EcosystemSection from '../sections/EcosystemSection.jsx'
import TechProductsSection from '../sections/TechProductsSection.jsx'
import FarmsSection from '../sections/FarmsSection.jsx'
import PhilosophySection from '../sections/PhilosophySection.jsx'
import RootedSection from '../sections/RootedSection.jsx'
import UpdatesSection from '../sections/UpdatesSection.jsx'
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
        heading="A closer look at each business."
        intro="Same group, same standards — but each business has its own discipline, its own environment and its own way of working."
        featured
      />
      <EcosystemSection />
      <FarmsSection />
      <TechProductsSection tone="sunken" />
      <PhilosophySection />
      <RootedSection />
      <UpdatesSection />
      <ContactCtaSection />
    </>
  )
}
