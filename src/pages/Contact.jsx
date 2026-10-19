import { Link, useSearchParams } from 'react-router-dom'
import useDocumentMeta from '../lib/useDocumentMeta.js'
import PageHeader from '../components/PageHeader.jsx'
import Section from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import ContactForm from '../components/ContactForm.jsx'
import { company, whatsappUrl } from '../data/company.js'
import { partnerAudiences } from '../data/partners.js'
import { contactPath } from '../data/contact.js'

export default function Contact() {
  const [params] = useSearchParams()
  const current = params.get('enquiry')

  useDocumentMeta({
    title: 'Contact',
    description:
      'Contact Kaimur Valley Innovations about farm partnerships, food-processing and distribution, infrastructure projects and KVI Tech products.',
    path: '/contact',
  })

  const details = [
    { term: 'Email', href: `mailto:${company.email}`, value: company.email, icon: 'mail' },
    { term: 'Phone', href: `tel:${company.phoneE164}`, value: company.phone, icon: 'phone' },
    { term: 'WhatsApp', href: whatsappUrl, value: 'Message on WhatsApp', icon: 'chat', external: true },
  ]

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to KVI."
        lede="For farm partnerships, food processing and distribution, infrastructure projects or technology, choose the route that fits — or write to us directly."
      />

      <Section tone="sunken" size="sm">
        <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent">Enquiry routes</h2>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {partnerAudiences.map((a) => {
            const on = current === a.enquiry
            return (
              <li key={a.key}>
                <Link
                  to={contactPath(a.enquiry)}
                  replace
                  aria-current={on ? 'true' : undefined}
                  className={`flex h-full flex-col border p-4 transition-colors ${
                    on ? 'border-forest bg-forest text-paper' : 'border-line bg-paper-raised hover:border-ink/40'
                  }`}
                >
                  <span className="font-display text-sm font-semibold">{a.title}</span>
                  <span className={`mt-1 text-xs ${on ? 'text-paper/75' : 'text-ink-muted'}`}>{a.cta}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </Section>

      <Section tone="paper" divide id="enquiry">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <h2 className="text-2xl sm:text-3xl">Send an enquiry</h2>
            <p className="mt-5 max-w-prose text-lg text-ink-muted">
              Choose an enquiry type so your message reaches the right team. We reply by email or
              phone.
            </p>

            <dl className="mt-10 space-y-6">
              {details.map((d) => (
                <div key={d.term}>
                  <dt className="eyebrow">{d.term}</dt>
                  <dd className="mt-2">
                    <a
                      href={d.href}
                      {...(d.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                      className="inline-flex items-center gap-2 font-display text-lg font-medium text-ink link-underline"
                    >
                      <Icon name={d.icon} size={18} className="text-accent" />
                      {d.value}
                    </a>
                  </dd>
                </div>
              ))}
              <div>
                <dt className="eyebrow">Based in</dt>
                <dd className="mt-2 text-base text-ink-muted">
                  {company.origin}, {company.region}
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </Section>
    </>
  )
}
