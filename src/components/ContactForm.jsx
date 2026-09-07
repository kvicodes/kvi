import { useState } from 'react'
import { enquiryTypes } from '../data/contact.js'
import { submitContact } from '../lib/submitContact.js'
import Button from './Button.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const field =
  'mt-2 w-full rounded-card border border-line-strong bg-paper-raised px-3.5 py-2.5 text-base text-ink outline-none transition-colors placeholder:text-ink-muted/70 focus:border-ink'
const label = 'text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted'

export default function ContactForm() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    type: enquiryTypes[0],
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | done | error
  const [result, setResult] = useState(null)

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
      const res = await submitContact(values)
      setResult(res)
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="border border-line bg-accent-wash p-8" role="status">
        <p className="font-display text-xl font-semibold text-ink">Thanks — message ready to send.</p>
        {result?.delivered ? (
          <p className="mt-3 text-sm text-ink-muted">
            Your enquiry has been received. We'll reply to {values.email}.
          </p>
        ) : (
          <>
            <p className="mt-3 max-w-prose text-sm text-ink-muted">
              This site isn't wired to a mail service yet. Use the button below to
              send your message from your own email client, or write to us
              directly.
            </p>
            <div className="mt-5">
              <Button href={result?.mailto}>Open in email app</Button>
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div>
        <label htmlFor="cf-name" className={label}>Name</label>
        <input
          id="cf-name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={set('name')}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'cf-name-err' : undefined}
          className={field}
        />
        {errors.name && <p id="cf-name-err" className="mt-1.5 text-sm text-red-700">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="cf-email" className={label}>Email</label>
        <input
          id="cf-email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={set('email')}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'cf-email-err' : undefined}
          className={field}
        />
        {errors.email && <p id="cf-email-err" className="mt-1.5 text-sm text-red-700">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="cf-type" className={label}>Enquiry type</label>
        <select id="cf-type" value={values.type} onChange={set('type')} className={field}>
          {enquiryTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="cf-message" className={label}>Message</label>
        <textarea
          id="cf-message"
          rows={5}
          value={values.message}
          onChange={set('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'cf-message-err' : undefined}
          className={`${field} resize-y`}
        />
        {errors.message && (
          <p id="cf-message-err" className="mt-1.5 text-sm text-red-700">{errors.message}</p>
        )}
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-700" role="alert">
          Something went wrong. Please try again, or email us directly.
        </p>
      )}

      <Button type="submit" size="lg" withArrow disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  )
}
