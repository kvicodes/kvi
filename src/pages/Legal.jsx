import useDocumentMeta from '../lib/useDocumentMeta.js'
import { company } from '../data/company.js'
import { seo } from '../data/seo.js'
import { deliversDirectly } from '../lib/submitContact.js'

const CONTENT = {
  privacy: {
    meta: seo.privacy,
    title: 'Privacy Policy',
    // Interim notice. Keep every sentence literally true of the deployed site.
    body: [
      `This website is an informational site for ${company.legalName} It does not set cookies and does not use advertising or analytics trackers.`,
      'Fonts, photographs and video are served from our own server. Our web server keeps standard access logs (IP address, page requested, browser) for security and operations.',
      deliversDirectly
        ? 'When you submit the enquiry form, your details are delivered to us by a form-processing service.'
        : 'The enquiry form does not send anything to our servers: it prepares an email in your own email app, and you decide whether to send it.',
      'When you contact us by email, phone, WhatsApp or the enquiry form, we use the details you provide only to respond to your enquiry. We do not sell them.',
      'A full privacy policy is being prepared. For any question about your information in the meantime, write to us at the address below.',
    ],
  },
  terms: {
    meta: seo.terms,
    title: 'Terms',
    body: [
      `The content on this website is provided for general information about ${company.legalName} and its businesses. It may be updated or changed at any time.`,
      'Nothing on this site is an offer, a commitment, or professional advice.',
      'Full terms of use are being prepared. For any question in the meantime, write to us at the address below.',
    ],
  },
}

export default function Legal({ kind }) {
  const doc = CONTENT[kind] || CONTENT.privacy
  useDocumentMeta(doc.meta)
  return (
    <section className="band pt-32 lg:pt-40">
      <div className="shell">
        <h1 className="display display-l">{doc.title}</h1>
        <div className="mt-10 max-w-prose space-y-5">
          {doc.body.map((p) => <p key={p}>{p}</p>)}
          <p><a href={`mailto:${company.email}`} className="tlink">{company.email}</a></p>
        </div>
      </div>
    </section>
  )
}
