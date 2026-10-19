import { Link } from 'react-router-dom'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import BusinessGlyph from '../components/BusinessGlyph.jsx'
import { partnerAudiences } from '../data/partners.js'
import { byId } from '../data/businesses.js'
import { contactPath } from '../data/contact.js'

/** Partnership routes — every card opens the enquiry form, preselected. */
export default function PartnershipSection({ tone = 'forest', id = 'partner' }) {
  return (
    <Section tone={tone} divide id={id}>
      <SectionHeading
        eyebrow="Partner with KVI"
        heading="Work with us — on the farm, on site or in software."
        intro="KVI grows through partnerships. If you farm, produce, buy, build or run an organisation that could use our technology, there is a direct route to the right team."
        tone="dark"
      />

      <ul className="mt-14 grid gap-px overflow-hidden border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-3">
        {partnerAudiences.map((a, i) => (
          <Reveal
            as="li"
            key={a.key}
            delay={i * 70}
            className="group relative flex flex-col bg-forest-deep p-7 transition-colors duration-300 hover:bg-forest sm:p-8"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-grain">
                {byId(a.division).name}
              </span>
              <span className="text-paper/35">
                <BusinessGlyph id={a.division} size={24} />
              </span>
            </div>
            <h3 className="mt-6 font-serif text-2xl font-medium text-paper">
              {a.title}
            </h3>
            <p className="mt-3 flex-1 text-sm text-paper/70">{a.body}</p>
            <Link
              to={contactPath(a.enquiry)}
              className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-paper after:absolute after:inset-0 after:content-['']"
            >
              {a.cta}
              <Icon
                name="arrow-right"
                size={15}
                className="transition-transform duration-300 ease-editorial group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        ))}
        <Reveal as="li" delay={5 * 70} className="flex flex-col justify-center bg-forest-deep p-7 sm:p-8">
          <p className="text-sm text-paper/70">Something else in mind?</p>
          <Link
            to={contactPath('general')}
            className="mt-2 inline-flex items-center gap-2 font-display text-lg font-semibold text-paper link-underline self-start"
          >
            Send a general enquiry
          </Link>
        </Reveal>
      </ul>
    </Section>
  )
}
