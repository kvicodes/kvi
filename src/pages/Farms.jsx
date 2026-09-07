import BusinessPage from '../components/BusinessPage.jsx'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import ProcessJourney from '../components/ProcessJourney.jsx'
import { byId } from '../data/businesses.js'

export default function Farms() {
  return (
    <BusinessPage
      business={byId('kaimur-farms')}
      metaDescription="Kaimur Farms manages and operates farmland and builds businesses around agricultural, food and natural products — from land to finished product."
    >
      <Section tone="paper" divide>
        <SectionHeading
          eyebrow="The chain"
          heading="From land to product."
          intro="Each stage is run to a consistent standard, with processing kept close to source."
        />
        <ProcessJourney />
        <Reveal>
          <p className="mt-14 max-w-prose border-t border-line pt-8 text-sm text-ink-muted">
            Mokari Gobindbhog rice is an early initiative. KVI does not claim
            organic, chemical-free or certified status for any product unless it
            has been independently verified.
          </p>
        </Reveal>
      </Section>
    </BusinessPage>
  )
}
