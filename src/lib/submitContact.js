// ---------------------------------------------------------------------------
// Contact form submission seam.
//
// There is no backend. This is the single place to wire the form to an email
// service or API (Formspree, a serverless function, etc.) via the build-time
// VITE_CONTACT_ENDPOINT. Without it, the form never claims a message was sent:
// it returns a pre-filled mailto: draft for the visitor to send themselves.
// ---------------------------------------------------------------------------

import { company } from '../data/company.js'

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || null

// Lets the form tell visitors up front how their enquiry will be delivered.
export const deliversDirectly = Boolean(ENDPOINT)

export function buildMailto({ name, email, phone, organisation, type, message }) {
  const subject = `[${type || 'General enquiry'}] Website enquiry from ${name || 'a visitor'}`
  const body = [
    `Name: ${name || ''}`,
    `Email: ${email || ''}`,
    phone ? `Phone: ${phone}` : null,
    organisation ? `Organisation / farm: ${organisation}` : null,
    `Enquiry type: ${type || ''}`,
    '',
    message || '',
  ]
    .filter((line) => line !== null)
    .join('\n')
  return `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export async function submitContact(payload) {
  if (ENDPOINT) {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error('Submission failed')
    return { delivered: true }
  }

  // No endpoint configured — hand back a mailto draft.
  return { delivered: false, mailto: buildMailto(payload) }
}
