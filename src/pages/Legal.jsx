import useDocumentMeta from '../lib/useDocumentMeta.js'
import PageHeader from '../components/PageHeader.jsx'
import Section from '../components/Section.jsx'
import { company } from '../data/company.js'
import { deliversDirectly } from '../lib/submitContact.js'

const CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    path: '/privacy',
    description:
      'How the Kaimur Valley Innovations website handles your information: no cookies or trackers, Google-hosted fonts, server logs and enquiries.',
    // Interim notice — keep every sentence literally true of the deployed site.
    body: [
      `This website is an informational site for ${company.legalName} It does not set cookies and does not use advertising or analytics trackers.`,
      'Fonts are loaded from Google Fonts (fonts.googleapis.com and fonts.gstatic.com), so Google receives your IP address and basic browser details when a page loads. Our web server also keeps standard access logs (IP address, page requested, browser) for security and operations.',
      deliversDirectly
        ? 'When you submit the enquiry form, your details are delivered to us by a form-processing service.'
        : 'The enquiry form does not send anything to our servers: it prepares an email in your own email app, and you decide whether to send it.',
      'When you contact us — by email, phone, WhatsApp or the enquiry form — we use the details you provide only to respond to your enquiry. We do not sell them.',
      'A full privacy policy is being prepared. For any question about your information in the meantime, write to us at the address below.',
    ],
  },
  terms: {
    title: 'Terms',
    path: '/terms',
    description:
      'Terms for using the Kaimur Valley Innovations Pvt. Ltd. website: general information only, not an offer, commitment or professional advice.',
    body: [
      `The content on this website is provided for general information about ${company.legalName} and its businesses. It may be updated or changed at any time.`,
      'Nothing on this site is an offer, a commitment, or professional advice.',
      'Full terms of use are being prepared. For any question in the meantime, write to us at the address below.',
    ],
  },
}

export default function Legal({ kind }) {
  const doc = CONTENT[kind] || CONTENT.privacy
  useDocumentMeta({ title: doc.title, description: doc.description, path: doc.path })

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
