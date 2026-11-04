import ContactForm from '../components/ContactForm.jsx'
import { company, whatsappUrl } from '../data/company.js'
import { seo } from '../data/seo.js'
import useDocumentMeta from '../lib/useDocumentMeta.js'

export default function Contact() {
  useDocumentMeta(seo.contact)
  return (
    <section className="band bg-stone pt-32 lg:pt-40">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h1 className="display display-l">Start a conversation.</h1>
          <p className="lede mt-6 max-w-[34ch]">Tell us about your farm, project or idea, and we will reply by email or phone.</p>
          <dl className="mt-10 space-y-5">
            <div>
              <dt className="text-sm text-muted">Email</dt>
              <dd><a href={`mailto:${company.email}`} className="tlink break-all">{company.email}</a></dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Phone and WhatsApp</dt>
              <dd>
                <a href={`tel:${company.phoneE164}`} className="tlink">{company.phone}</a>
                <a href={whatsappUrl} target="_blank" rel="noreferrer noopener" className="tlink ml-4">WhatsApp</a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Company</dt>
              <dd>{company.legalName}, {company.region}</dd>
            </div>
          </dl>
        </div>
        <div id="enquiry" className="scroll-mt-28 bg-paper p-5 sm:p-8 lg:col-span-6 lg:col-start-7 lg:p-12">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
