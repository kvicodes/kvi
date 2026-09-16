import Section from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import { company } from '../data/company.js'

export default function ContactCtaSection({
  heading = "Let's build something useful.",
  body = 'For partnerships, business enquiries, technology initiatives and other opportunities, get in touch with KVI.',
}) {
  return (
    <Section tone="accent" divide>
      <Reveal className="max-w-3xl">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl">{heading}</h2>
        <p className="mt-6 max-w-prose text-lg text-paper/75">{body}</p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button to="/contact" size="lg" variant="inverse" withArrow>
            Contact KVI
          </Button>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-paper/75">
            <a
              href={`tel:${company.phoneE164}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-paper"
            >
              <Icon name="phone" size={16} />
              {company.phone}
            </a>
            <a
              href={`https://wa.me/${company.phoneE164.replace('+', '')}`}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-paper"
            >
              <Icon name="chat" size={16} />
              WhatsApp
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
