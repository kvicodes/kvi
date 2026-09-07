import useDocumentMeta from '../lib/useDocumentMeta.js'
import PageHeader from '../components/PageHeader.jsx'
import Section from '../components/Section.jsx'
import { company } from '../data/company.js'

const CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    path: '/privacy',
    body: [
      'This website is an informational site for Kaimur Valley Innovations. It does not use advertising or third-party analytics trackers.',
      'If you contact us through the enquiry form or by email, we use the details you provide only to respond to your enquiry. We do not sell or share them.',
      'A full privacy policy is being prepared. For any question about your information in the meantime, write to us at the address below.',
    ],
  },
  terms: {
    title: 'Terms',
    path: '/terms',
    body: [
      'The content on this website is provided for general information about Kaimur Valley Innovations and its businesses. It may be updated or changed at any time.',
      'Nothing on this site is an offer, a commitment, or professional advice.',
      'Full terms of use are being prepared. For any question in the meantime, write to us at the address below.',
    ],
  },
}

export default function Legal({ kind }) {
  const doc = CONTENT[kind] || CONTENT.privacy
  useDocumentMeta({ title: doc.title, description: `${doc.title} — Kaimur Valley Innovations.`, path: doc.path })

  return (
    <>
      <PageHeader eyebrow="Legal" title={doc.title} />
      <Section tone="paper" divide>
        <div className="max-w-prose">
          {doc.body.map((p) => (
            <p key={p} className="mt-5 text-lg text-ink-muted first:mt-0">
              {p}
            </p>
          ))}
          <p className="mt-8 text-lg text-ink">
            <a href={`mailto:${company.email}`} className="link-underline font-medium">
              {company.email}
            </a>
          </p>
        </div>
      </Section>
    </>
  )
}
