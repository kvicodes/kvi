import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { enquiryTypes, enquiryLabel, normaliseEnquiry } from '../data/contact.js'
import { productBySlug } from '../data/products.js'
import { featuredProduct } from '../data/verticals.js'
import { company, whatsappUrl } from '../data/company.js'
import { submitContact, deliversDirectly } from '../lib/submitContact.js'
import { Button } from './ui.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const label = 'text-sm text-muted'

/**
 * Enquiry form. The enquiry type is preselected from `?enquiry=<value>` (and a
 * product from `?product=<slug>`) so every CTA on the site can deep-link here.
 *
 * Delivery is honest: with VITE_CONTACT_ENDPOINT configured the form posts to
 * it; without one, the visitor is handed a pre-filled email draft instead of a
 * fake "sent" confirmation. See lib/submitContact.js.
 */
export default function ContactForm() {
  const [params] = useSearchParams()
  const paramType = normaliseEnquiry(params.get('enquiry'))
  const productParam = params.get('product') || ''
  const productName =
    productParam === 'mokari' ? featuredProduct.name : productBySlug(productParam)?.name

  const [values, setValues] = useState(() => ({
    name: '',
    email: '',
    phone: '',
    organisation: '',
    type: paramType,
    message: productName ? `I'd like to know more about ${productName}.` : '',
  }))
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | done | error
  const [result, setResult] = useState(null)

  // Follow the URL when another CTA on the page changes the enquiry type
  // (state adjusted during render, not in an effect).
  const [seenParam, setSeenParam] = useState(paramType)
  if (seenParam !== paramType) {
    setSeenParam(paramType)
    setValues((v) => ({ ...v, type: paramType }))
  }

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }))

  const validate = () => {
    const next = {}
    if (!values.name.trim()) next.name = 'Enter your name.'
    if (!values.email.trim()) next.email = 'Enter your email.'
    else if (!EMAIL_RE.test(values.email)) next.email = 'Enter a valid email address.'
    if (values.message.trim().length < 10) next.message = 'Add a little more detail (at least 10 characters).'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('submitting')
    try {
      const res = await submitContact({ ...values, type: enquiryLabel(values.type) })
      setResult(res)
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return result?.delivered ? (
      <div role="status">
        <p className="title">Your enquiry has been sent.</p>
        <p className="mt-3 text-muted">We will reply to {values.email}.</p>
      </div>
    ) : (
      <div role="status">
        <p className="title">One more step: send it from your email app.</p>
        <p className="mt-3 text-muted">
          Your message is ready as an email to {company.email}. Open it in your email app and press send. You can also reach us by phone or WhatsApp.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href={result?.mailto}>Open in email app</Button>
          <Button href={whatsappUrl} external variant="line-dark">WhatsApp instead</Button>
        </div>
      </div>
    )
  }

  const errorProps = (k) => ({
    'aria-invalid': Boolean(errors[k]),
    'aria-describedby': errors[k] ? `cf-${k}-err` : undefined,
  })
  const errorText = (k) =>
    errors[k] && <p id={`cf-${k}-err`} className="mt-1.5 text-base text-copper">{errors[k]}</p>

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-7" aria-label="Enquiry form">
      <div>
        <label htmlFor="cf-type" className={label}>Enquiry type</label>
        <select id="cf-type" value={values.type} onChange={set('type')} className="field-input">
          {enquiryTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>Name</label>
          <input id="cf-name" type="text" autoComplete="name" value={values.name} onChange={set('name')} className="field-input" {...errorProps('name')} />
          {errorText('name')}
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>Email</label>
          <input id="cf-email" type="email" autoComplete="email" value={values.email} onChange={set('email')} className="field-input" {...errorProps('email')} />
          {errorText('email')}
        </div>
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-phone" className={label}>Phone (optional)</label>
          <input id="cf-phone" type="tel" autoComplete="tel" value={values.phone} onChange={set('phone')} className="field-input" />
        </div>
        <div>
          <label htmlFor="cf-org" className={label}>Organisation or farm (optional)</label>
          <input id="cf-org" type="text" autoComplete="organization" value={values.organisation} onChange={set('organisation')} className="field-input" />
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className={label}>Message</label>
        <textarea id="cf-message" rows={4} value={values.message} onChange={set('message')} className="field-input resize-y" {...errorProps('message')} />
        {errorText('message')}
      </div>

      {status === 'error' && (
        <p className="text-copper" role="alert">
          The enquiry could not be sent. Try again, or email us at {company.email}.
        </p>
      )}

      <Button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send enquiry'}
      </Button>

      <p className="small text-muted">
        {deliversDirectly
          ? `Your enquiry is sent to the KVI team at ${company.email}. We reply by email or phone.`
          : `Sending prepares your enquiry as an email to ${company.email} in your email app. Press send there to deliver it. We reply by email or phone.`}
      </p>
    </form>
  )
}
