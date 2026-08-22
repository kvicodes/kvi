import { useState } from 'react'
import PageHero from '../components/PageHero.jsx'
import Icon from '../components/icons.jsx'
import Button from '../components/Button.jsx'
import { contact } from '../data/content.js'

const initialForm = { name: '', email: '', phone: '', subject: '', message: '' }

function validate(values) {
  const errors = {}

  if (!values.name.trim()) errors.name = 'Please enter your name.'

  if (!values.email.trim()) {
    errors.email = 'Please enter your email.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (values.phone.trim() && !/^[0-9+\-\s()]{7,20}$/.test(values.phone)) {
    errors.phone = 'Please enter a valid phone number.'
  }

  if (!values.subject.trim()) errors.subject = 'Please enter a subject.'

  if (!values.message.trim()) {
    errors.message = 'Please enter a message.'
  } else if (values.message.trim().length < 10) {
    errors.message = 'Message should be at least 10 characters.'
  }

  return errors
}

export default function Contact() {
  const [values, setValues] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
  }

  // Frontend-only form: validates and shows a confirmation state.
  // Wire this up to a backend or form service (e.g. Formspree) later.
  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true)
      setValues(initialForm)
    }
  }

  const inputClasses = (field) =>
    `w-full rounded-lg border bg-white px-4 py-3 text-sm text-forest-950 placeholder:text-forest-800/40 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
      errors[field] ? 'border-red-400' : 'border-forest-200'
    }`

  return (
    <>
      <PageHero {...contact.hero} />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Contact details + map */}
          <div className="lg:col-span-2">
            <h2 className="font-heading text-2xl font-bold text-forest-950">Reach Us Directly</h2>
            <ul className="mt-6 space-y-5">
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest-50 text-forest-700">
                  <Icon name="MapPin" className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-heading font-semibold text-forest-950">Address</p>
                  {/* PLACEHOLDER address — update in src/data/content.js */}
                  <p className="mt-0.5 text-sm text-forest-800/75">{contact.details.address}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest-50 text-forest-700">
                  <Icon name="Phone" className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-heading font-semibold text-forest-950">Phone</p>
                  {/* PLACEHOLDER phone — update in src/data/content.js */}
                  <p className="mt-0.5 text-sm text-forest-800/75">{contact.details.phone}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest-50 text-forest-700">
                  <Icon name="Mail" className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-heading font-semibold text-forest-950">Email</p>
                  {/* PLACEHOLDER email — update in src/data/content.js */}
                  <p className="mt-0.5 text-sm text-forest-800/75">{contact.details.email}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest-50 text-forest-700">
                  <Icon name="Clock" className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-heading font-semibold text-forest-950">Hours</p>
                  <p className="mt-0.5 text-sm text-forest-800/75">{contact.details.hours}</p>
                </div>
              </li>
            </ul>

            {/*
              Static map placeholder — no API key required.
              Replace with a live embed (Google Maps / Mapbox) once the
              registered office address and an API key are available.
            */}
            <div className="mt-8 flex h-56 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-forest-300 bg-forest-50 text-forest-700/60">
              <Icon name="MapPin" className="h-8 w-8" />
              <p className="text-sm font-medium">Map preview will appear here</p>
              <p className="text-xs">(embed once office location is confirmed)</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-forest-100 bg-white p-6 shadow-soft sm:p-8">
              <h2 className="font-heading text-2xl font-bold text-forest-950">{contact.form.heading}</h2>
              <p className="mt-2 text-sm text-forest-800/70">{contact.form.subheading}</p>

              {submitted && (
                <div className="mt-6 flex items-start gap-3 rounded-lg border border-forest-200 bg-forest-50 p-4">
                  <Icon name="CheckCircle2" className="mt-0.5 h-5 w-5 shrink-0 text-forest-700" />
                  <p className="text-sm text-forest-800">
                    Thank you — your message has been received. Our team will be in touch shortly.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-forest-950">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    className={inputClasses('name')}
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>}
                </div>

                <div className="sm:col-span-1">
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-forest-950">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    className={inputClasses('email')}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
                </div>

                <div className="sm:col-span-1">
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-forest-950">
                    Phone <span className="text-forest-800/40">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={values.phone}
                    onChange={handleChange}
                    className={inputClasses('phone')}
                    placeholder="+91 00000 00000"
                  />
                  {errors.phone && <p className="mt-1.5 text-xs text-red-600">{errors.phone}</p>}
                </div>

                <div className="sm:col-span-1">
                  <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-forest-950">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={values.subject}
                    onChange={handleChange}
                    className={inputClasses('subject')}
                    placeholder="What is this regarding?"
                  />
                  {errors.subject && <p className="mt-1.5 text-xs text-red-600">{errors.subject}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-forest-950">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={values.message}
                    onChange={handleChange}
                    className={inputClasses('message')}
                    placeholder="Tell us a bit about what you're looking for..."
                  />
                  {errors.message && <p className="mt-1.5 text-xs text-red-600">{errors.message}</p>}
                </div>

                <div className="sm:col-span-2">
                  <Button type="submit" size="lg" showIcon={false}>
                    {contact.form.submitLabel}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
