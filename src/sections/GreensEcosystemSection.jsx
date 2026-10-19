import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import ArrowLink from '../components/ArrowLink.jsx'
import ProcessJourney from '../components/ProcessJourney.jsx'
import { ecosystemNote } from '../data/greens.js'
import { contactPath } from '../data/contact.js'

/**
 * The KVI Greens agricultural ecosystem: Farmer Partnerships -> Farm
 * Development -> Agricultural Production -> Processing & Packaging -> Branding
 * & Market Access. Always shown with the "being built progressively" note.
 */
export default function GreensEcosystemSection({
  heading = 'From farmer partnership to market — one connected chain.',
  intro = 'KVI Greens aims to collaborate with existing farmers and to raise the commercial potential of their farms and of the produce that leaves them.',
  showLinks = true,
  tone = 'paper',
}) {
  return (
    <Section tone={tone} divide id="ecosystem">
      <SectionHeading eyebrow="The KVI Greens ecosystem" heading={heading} intro={intro} />

      <ProcessJourney />

      <Reveal className="mt-14 grid gap-8 border-t border-line pt-8 lg:grid-cols-12 lg:items-start">
        <p className="flex gap-3 text-sm text-ink-muted lg:col-span-7">
          <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full border border-greens" />
          {ecosystemNote}
        </p>
        {showLinks && (
          <div className="flex flex-wrap gap-x-8 gap-y-3 lg:col-span-5 lg:justify-end">
            <ArrowLink to="/greens">Explore KVI Greens</ArrowLink>
            <ArrowLink to={contactPath('farm-partnership')}>Partner as a farmer</ArrowLink>
          </div>
        )}
      </Reveal>
    </Section>
  )
}
