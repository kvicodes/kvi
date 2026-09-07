// ---------------------------------------------------------------------------
// Contact form submission seam.
//
// There is no backend. This is the single place to wire the form to an email
// service or API later (Formspree, a serverless function, etc.). Until then it
// resolves after a short delay so the UI can show a success state, and returns
// a mailto: fallback the form uses to open the user's mail client.
// ---------------------------------------------------------------------------

import { company } from '../data/company.js'

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || null

export function buildMailto({ name, email, type, message }) {
  const subject = `[${type || 'General enquiry'}] Website enquiry from ${name || 'a visitor'}`
  const body = [
    `Name: ${name || ''}`,
    `Email: ${email || ''}`,
    `Enquiry type: ${type || ''}`,
    '',
    message || '',
  ].join('\n')
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

  // No endpoint configured yet — hand back a mailto fallback.
  await new Promise((r) => setTimeout(r, 600))
  return { delivered: false, mailto: buildMailto(payload) }
}
