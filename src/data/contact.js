// Enquiry types. `value` is used in URLs (/contact?enquiry=<value>) so that
// every CTA on the site can open the form with the right type preselected.

export const enquiryTypes = [
  { value: 'general', label: 'General enquiries' },
  { value: 'agri-partnership', label: 'Agricultural partnerships' },
  { value: 'farm-development', label: 'Farm development' },
  { value: 'technology', label: 'Technology solutions' },
  { value: 'infrastructure', label: 'Infrastructure projects' },
  { value: 'product-partnership', label: 'Product partnerships' },
  { value: 'careers', label: 'Careers' },
]

// Values used by the previous site, so that old links keep preselecting sensibly.
const LEGACY = {
  'farm-partnership': 'agri-partnership',
  'producer-partnership': 'product-partnership',
  distribution: 'product-partnership',
}

export const normaliseEnquiry = (value) => {
  const v = LEGACY[value] || value
  return enquiryTypes.some((t) => t.value === v) ? v : 'general'
}

export const enquiryLabel = (value) =>
  (enquiryTypes.find((t) => t.value === value) || enquiryTypes[0]).label

export const contactPath = (enquiry, extra = {}) => {
  const params = new URLSearchParams({ enquiry, ...extra })
  return `/contact?${params.toString()}#enquiry`
}

export const partnerAudiences = [
  { title: 'Farm owners', enquiry: 'farm-development' },
  { title: 'Agricultural entrepreneurs', enquiry: 'agri-partnership' },
  { title: 'Partner farmers', enquiry: 'agri-partnership' },
  { title: 'Technology partners', enquiry: 'technology' },
  { title: 'Infrastructure partners', enquiry: 'infrastructure' },
  { title: 'Agricultural product distributors', enquiry: 'product-partnership' },
  { title: 'Carbon project stakeholders', enquiry: 'agri-partnership' },
]
