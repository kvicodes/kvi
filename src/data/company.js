// ---------------------------------------------------------------------------
// Company-level facts and positioning copy.
// Keep claims restrained and verifiable — no invented history, headcount,
// revenue, clients, projects, certifications or awards.
// ---------------------------------------------------------------------------

export const company = {
  name: 'Kaimur Valley Innovations',
  legalName: 'Kaimur Valley Innovations Pvt. Ltd.',
  shortName: 'KVI',
  positioning: 'Growing agriculture. Building enterprises. Enabling progress.',
  supporting:
    'KVI brings together agricultural development, food processing, infrastructure and technology to create practical, connected business opportunities.',
  summary:
    'An AgroTech-led company building businesses around agriculture, food processing, rural infrastructure and software.',
  // The primary business email (configured in the repo). Do not replace with an
  // invented address.
  email: 'kaimurvalleyinnovations@gmail.com',
  // Primary business number — also reachable on WhatsApp. Do not replace with
  // an invented number.
  phone: '+91 87559 48184',
  phoneE164: '+918755948184',
  origin: 'Kaimur',
  region: 'Bihar, India',
  domain: 'https://kvinnovations.in',
}

export const whatsappUrl = `https://wa.me/${company.phoneE164.replace('+', '')}`

export const philosophy = {
  heading: 'We solve problems we actually understand.',
  intro:
    'We do not build solutions from a distance. We encounter problems through real work on farms, sites and in businesses, build solutions to solve them, and test those solutions in practice.',
  steps: [
    { no: '01', title: 'Encounter', body: 'Real operations reveal problems worth solving.' },
    { no: '02', title: 'Build', body: 'Develop infrastructure, systems and practical solutions.' },
    { no: '03', title: 'Test', body: 'Use them in the conditions they were made for.' },
    { no: '04', title: 'Share', body: 'Turn useful solutions into products and services for others.' },
  ],
}

// How the three divisions relate — agriculture at the centre.
export const ecosystem = {
  heading: 'Agriculture leads. Infrastructure and technology make it work.',
  intro:
    'The three divisions are distinct businesses with their own customers. What connects them is a single focus: making agricultural and rural enterprise more productive and more commercially viable.',
  nodes: [
    {
      verb: 'Grow',
      division: 'kvi-greens',
      body: 'Partners with farmers, develops farms, adds value through processing and builds brands that reach customers.',
    },
    {
      verb: 'Build',
      division: 'kv-infra',
      body: 'Executes the infrastructure that farms, processing and rural enterprises depend on — and takes on infrastructure work for other clients.',
    },
    {
      verb: 'Enable',
      division: 'kvi-tech',
      body: 'Builds software that keeps operations disciplined — for farms, contractors, kilns, institutions and businesses of every kind.',
    },
  ],
  note:
    'Each division stands on its own commercially. Where one can help another — infrastructure for a farm, software for a site — it does so on normal terms.',
}

export const vision = {
  heading: 'Connecting agricultural production, rural enterprise, infrastructure and software.',
  paragraphs: [
    'Our long-term aim is an enterprise in which these parts strengthen each other: farms that are better developed and better run, produce that is processed and branded closer to where it is grown, infrastructure that holds up, and software that keeps operations disciplined.',
    'We are early in that journey. We would rather show work as it becomes real than describe it before it is.',
  ],
}

export const rooted = {
  heading: 'Rooted in Kaimur. Built for a wider world.',
  paragraphs: [
    'The name comes from the Kaimur region of Bihar, where KVI began. It reflects where the work started and the kind of ground-level, practical approach that shaped it.',
    'The businesses KVI builds — on farms, on sites and in software — are designed to work well beyond any single region.',
  ],
}
