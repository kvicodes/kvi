import Section from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import { company, whatsappUrl } from '../data/company.js'

export default function ContactCtaSection({
  heading = 'Let’s grow something useful together.',
  body = 'For partnerships, business enquiries, infrastructure projects and technology, get in touch with KVI.',
  to = '/contact',
  cta = 'Contact KVI',
}) {
  return (
    <Section tone="accent" divide>
      <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl">{heading}</h2>
          <p className="mt-6 max-w-prose text-lg text-paper/75">{body}</p>
        </div>
        <div className="flex flex-col gap-5 lg:col-span-4 lg:items-end">
          <Button to={to} size="lg" variant="inverse" withArrow>
            {cta}
          </Button>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-paper/80">
            <a href={`tel:${company.phoneE164}`} className="inline-flex items-center gap-1.5 transition-colors hover:text-paper">
              <Icon name="phone" size={16} />
              {company.phone}
            </a>
            <a
              href={whatsappUrl}
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
