import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { enquiryTypes, enquiryLabel } from '../data/contact.js'
import { productBySlug } from '../data/products.js'
import { featuredProduct } from '../data/greens.js'
import { company, whatsappUrl } from '../data/company.js'
import { submitContact, deliversDirectly } from '../lib/submitContact.js'
import Button from './Button.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const VALID = new Set(enquiryTypes.map((t) => t.value))

const field =
  'mt-2 w-full rounded-card border border-line-strong bg-paper-raised px-3.5 py-2.5 text-base text-ink outline-none transition-colors placeholder:text-ink-muted/70 focus:border-forest focus-visible:outline-2 focus-visible:outline-offset-2'
const label = 'text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted'

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
  const paramType = VALID.has(params.get('enquiry')) ? params.get('enquiry') : 'general'
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
    if (!values.name.trim()) next.name = 'Please enter your name.'
    if (!values.email.trim()) next.email = 'Please enter your email.'
    else if (!EMAIL_RE.test(values.email)) next.email = 'Please enter a valid email address.'
    if (values.message.trim().length < 10) next.message = 'Please add a little more detail (10+ characters).'
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
      <div className="border border-line bg-accent-wash p-8" role="status">
        <p className="font-display text-xl font-semibold text-ink">Thank you — your enquiry has been sent.</p>
        <p className="mt-3 text-sm text-ink-muted">We’ll reply to {values.email}.</p>
      </div>
    ) : (
      <div className="border border-line bg-accent-wash p-8" role="status">
        <p className="font-display text-xl font-semibold text-ink">One more step — send it from your email app.</p>
        <p className="mt-3 max-w-prose text-sm text-ink-muted">
          Your message has been prepared as an email to {company.email}. Open it in your email app
          and press send. You can also reach us by phone or WhatsApp.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Button href={result?.mailto}>Open in email app</Button>
          <Button href={whatsappUrl} external variant="secondary">
            WhatsApp instead
          </Button>
        </div>
      </div>
    )
  }

  const errorProps = (k) => ({
    'aria-invalid': Boolean(errors[k]),
    'aria-describedby': errors[k] ? `cf-${k}-err` : undefined,
  })
  const errorText = (k) =>
    errors[k] && (
      <p id={`cf-${k}-err`} className="mt-1.5 text-sm text-red-700">
        {errors[k]}
      </p>
    )

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6" aria-label="Enquiry form">
      <div>
        <label htmlFor="cf-type" className={label}>Enquiry type</label>
        <select id="cf-type" value={values.type} onChange={set('type')} className={field}>
          {enquiryTypes.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>Name</label>
          <input id="cf-name" type="text" autoComplete="name" value={values.name} onChange={set('name')} className={field} {...errorProps('name')} />
          {errorText('name')}
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>Email</label>
          <input id="cf-email" type="email" autoComplete="email" value={values.email} onChange={set('email')} className={field} {...errorProps('email')} />
          {errorText('email')}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-phone" className={label}>
            Phone <span className="normal-case tracking-normal text-ink-muted/80">(optional)</span>
          </label>
          <input id="cf-phone" type="tel" autoComplete="tel" value={values.phone} onChange={set('phone')} className={field} />
        </div>
        <div>
          <label htmlFor="cf-org" className={label}>
            Organisation / farm <span className="normal-case tracking-normal text-ink-muted/80">(optional)</span>
          </label>
          <input id="cf-org" type="text" autoComplete="organization" value={values.organisation} onChange={set('organisation')} className={field} />
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className={label}>Message</label>
        <textarea id="cf-message" rows={5} value={values.message} onChange={set('message')} className={`${field} resize-y`} {...errorProps('message')} />
        {errorText('message')}
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-700" role="alert">
          Something went wrong. Please try again, or email us directly at {company.email}.
        </p>
      )}

      <Button type="submit" size="lg" withArrow disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send enquiry'}
      </Button>

      <p className="text-sm text-ink-muted">
        {deliversDirectly
          ? `Your enquiry is sent to the KVI team at ${company.email}. We reply by email or phone.`
          : `Sending prepares your enquiry as an email to ${company.email} in your email app — press send there to deliver it. We reply by email or phone.`}
      </p>
    </form>
  )
}
