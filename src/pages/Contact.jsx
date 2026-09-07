import useDocumentMeta from '../lib/useDocumentMeta.js'
import PageHeader from '../components/PageHeader.jsx'
import Section from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import ContactForm from '../components/ContactForm.jsx'
import { company } from '../data/company.js'
import { businesses } from '../data/businesses.js'

export default function Contact() {
  useDocumentMeta({
    title: 'Contact',
    description:
      'Contact Kaimur Valley Innovations for partnerships, business enquiries, technology initiatives and other opportunities.',
    path: '/contact',
  })

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's build something useful."
        lede="For partnerships, business enquiries, technology initiatives and other opportunities, get in touch with KVI."
      />

      <Section tone="paper" divide>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <h2 className="text-2xl sm:text-3xl">Get in touch</h2>
            <p className="mt-5 max-w-prose text-lg text-ink-muted">
              Send a message and we'll get back to you. For a specific business,
              choose it in the enquiry type so it reaches the right people.
            </p>

            <dl className="mt-10 space-y-6">
              <div>
                <dt className="eyebrow">Email</dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${company.email}`}
                    className="font-display text-lg font-medium text-ink link-underline"
                  >
                    {company.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Origin</dt>
                <dd className="mt-2 text-base text-ink-muted">
                  {company.origin}, {company.region}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Businesses</dt>
                <dd className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-base text-ink-muted">
                  {businesses.map((b) => (
                    <span key={b.id}>{b.name}</span>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-6 lg:col-start-7">
            <ContactForm />
          </Reveal>
        </div>
      </Section>
    </>
  )
}
