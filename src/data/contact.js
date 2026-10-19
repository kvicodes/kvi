// Enquiry types. `value` is used in URLs (/contact?enquiry=<value>) so that
// every CTA on the site can open the form with the right type preselected.

export const enquiryTypes = [
  { value: 'general', label: 'General enquiry' },
  { value: 'farm-partnership', label: 'Farmer or farm-owner partnership' },
  { value: 'producer-partnership', label: 'Producer or food-processing partnership' },
  { value: 'distribution', label: 'Distribution, retail or institutional purchase' },
  { value: 'infrastructure', label: 'KV Infra — infrastructure or project execution' },
  { value: 'technology', label: 'KVI Tech — products or software services' },
  { value: 'careers', label: 'Careers' },
]

export const enquiryLabel = (value) =>
  (enquiryTypes.find((t) => t.value === value) || enquiryTypes[0]).label

export const contactPath = (enquiry, extra = {}) => {
  const params = new URLSearchParams({ enquiry, ...extra })
  return `/contact?${params.toString()}#enquiry`
}
