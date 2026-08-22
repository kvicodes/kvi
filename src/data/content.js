// ---------------------------------------------------------------------------
// Central content store for the KVI website.
//
// Every page pulls its copy from here instead of hardcoding text in JSX.
// To update wording, contact details, or business verticals, edit this file
// only — no component changes should be required.
//
// Icons are referenced by name (matching a key in src/components/icons.js)
// rather than as imported components, so this file stays plain data.
// ---------------------------------------------------------------------------

export const company = {
  name: 'Kaimur Valley Innovations Pvt. Ltd.',
  shortName: 'KVI',
  tagline: 'Rooted in the land. Built for what comes next.',
  metaDescription:
    'Kaimur Valley Innovations Pvt. Ltd. (KVI) builds practical, technology-driven solutions across agriculture, farm infrastructure, agri-tech, construction, and digital business platforms.',
}

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
]

// ---------------------------------------------------------------------------
// Home page
// ---------------------------------------------------------------------------

export const home = {
  hero: {
    eyebrow: 'Kaimur Valley Innovations Pvt. Ltd.',
    heading: 'Rooted in the land. Built for what comes next.',
    subheading:
      'KVI is a diversified innovation and technology company building practical solutions across agriculture, rural infrastructure, and digital business — helping traditional industries grow with modern tools.',
    ctaLabel: 'Talk to Us',
    ctaTo: '/contact',
    secondaryCtaLabel: 'Explore Our Work',
    secondaryCtaTo: '/services',
  },
  intro: {
    heading: 'Five sectors. One integrated approach.',
    body: 'We work across agricultural production, on-farm infrastructure, precision agri-technology, civil construction, and business software — treating them not as separate ventures, but as parts of a single value chain that starts in the field and ends with sustainable, technology-enabled growth.',
  },
  whyKvi: {
    heading: 'Why KVI',
    subheading: 'What sets our approach apart',
    points: [
      {
        icon: 'Layers',
        title: 'Integrated, not siloed',
        description:
          'From seed to software, our verticals are designed to reinforce one another — production, infrastructure, and technology working as one connected system.',
      },
      {
        icon: 'Sprout',
        title: 'Rooted in local context',
        description:
          'Solutions are built for the realities of rural and emerging markets, not adapted from templates designed elsewhere.',
      },
      {
        icon: 'Cpu',
        title: 'Technology with a purpose',
        description:
          'We deploy precision farming tools and business software only where they measurably improve productivity, transparency, or income.',
      },
      {
        icon: 'Recycle',
        title: 'Built to last',
        description:
          'Every business we develop is evaluated for long-term sustainability — environmental, economic, and operational — not just short-term output.',
      },
    ],
  },
  missionTeaser: {
    heading: 'Our Mission',
    body: 'To develop scalable businesses and solutions that bridge rural, agricultural, and infrastructure sectors with modern technology — improving productivity and creating sustainable local value.',
    ctaLabel: 'Read More About Us',
    ctaTo: '/about',
  },
  ctaBanner: {
    heading: "Let's build something that lasts.",
    body: 'Whether you are exploring a partnership, an investment, or a project on the ground, we would like to hear from you.',
    ctaLabel: 'Get in Touch',
    ctaTo: '/contact',
  },
}

// ---------------------------------------------------------------------------
// About page
// ---------------------------------------------------------------------------

export const about = {
  hero: {
    eyebrow: 'About KVI',
    heading: 'A company built where tradition meets technology',
    subheading:
      'Kaimur Valley Innovations Pvt. Ltd. connects the industries that rural and emerging economies depend on with the tools that make them stronger.',
  },
  overview: {
    heading: 'Who We Are',
    paragraphs: [
      'Kaimur Valley Innovations Pvt. Ltd. (KVI) is a diversified innovation and technology-driven company focused on building practical solutions across agriculture, rural development, infrastructure, technology, and digital business.',
      'We work at the intersection of five sectors that are usually treated as unrelated: agricultural production and distribution, farm machinery and infrastructure, precision agri-technology, civil and community construction, and business management software. In most markets, these operate in isolation. At KVI, we treat them as one connected value chain.',
      'That integration is deliberate. A farmer with better irrigation infrastructure needs data tools to use it well. A rural enterprise with a strong supply chain needs software to manage it as it scales. A construction project in a growing community needs to be planned with the same rigor as a technology rollout. KVI exists to build all of these pieces together, so that progress in one area compounds progress in the others.',
      'Our goal is to create sustainable businesses and improve productivity in the rural and emerging markets we serve — not through one-off projects, but through infrastructure, technology, and processes designed to keep working long after we build them.',
    ],
  },
  mission: {
    heading: 'Our Mission',
    body: 'To develop scalable businesses and solutions that bridge rural, agricultural, and infrastructure sectors with modern technology, improving productivity and creating sustainable local value.',
  },
  vision: {
    heading: 'Our Vision',
    body: 'To be a leading force in transforming how traditional industries in rural and emerging markets operate — proving that agriculture, infrastructure, and technology grow faster and more sustainably when built together rather than apart.',
  },
  values: {
    heading: 'What Guides Us',
    subheading: 'Four principles shape every business decision we make',
    items: [
      {
        icon: 'Lightbulb',
        title: 'Innovation',
        description:
          'We look for practical, working solutions to real operational problems — not innovation for its own sake.',
      },
      {
        icon: 'Leaf',
        title: 'Sustainability',
        description:
          'Every venture is built to be environmentally sound and economically durable over the long term, not just profitable in the short run.',
      },
      {
        icon: 'MapPin',
        title: 'Local Value Creation',
        description:
          'We invest in the communities and markets we operate in, building capacity and income on the ground rather than extracting it.',
      },
      {
        icon: 'Rocket',
        title: 'Technology-Enabled Growth',
        description:
          'We apply technology deliberately — as a lever for productivity and transparency, matched to the scale of the problem it solves.',
      },
    ],
  },
  approach: {
    heading: 'Our Approach',
    subheading: 'How KVI connects traditional industries with modern technology',
    paragraphs: [
      'We start with the industries that rural and emerging economies already depend on — agriculture, construction, and physical infrastructure — and ask where modern tools can remove friction, reduce waste, or unlock capacity that already exists.',
      'That might mean pairing a farm infrastructure project with sensor-based irrigation data, or building a business management platform for an enterprise that has outgrown paper records. In every case, the technology is chosen to fit the operation, not the other way around.',
      'This approach lets us move at the pace of the sectors we serve while still delivering the productivity gains that technology makes possible — creating businesses that are both grounded and forward-looking.',
    ],
  },
}

// ---------------------------------------------------------------------------
// Services — overview + one entry per vertical
// Each vertical's `slug` maps to the route /services/:slug
// ---------------------------------------------------------------------------

export const servicesOverview = {
  hero: {
    eyebrow: 'What We Do',
    heading: 'Five verticals, working as one system',
    subheading:
      'KVI operates across the full value chain that rural and agricultural economies run on — from what grows in the ground to the software that runs the business around it.',
  },
}

export const verticals = [
  {
    slug: 'agri-products',
    icon: 'Wheat',
    title: 'Agricultural Products & Services',
    shortDescription:
      'Production, distribution, and support services across the agricultural value chain.',
    hero: {
      eyebrow: 'Vertical 01',
      heading: 'Agricultural Products & Services',
      subheading:
        'End-to-end support across the agricultural value chain — from production and quality through to distribution and after-sale service.',
    },
    overview:
      'This vertical is the foundation of KVI: production, distribution, and support services that move agricultural goods from farm to market reliably and profitably. Rather than treating growers as a source of raw supply, we build lasting relationships across the value chain — supporting production quality, streamlining distribution, and providing the on-the-ground service that keeps agricultural businesses running.',
    points: {
      heading: 'What this includes',
      items: [
        'Production support and quality coordination for key agricultural commodities',
        'Distribution and logistics planning to reduce post-harvest loss and delay',
        'Market linkage services connecting producers with buyers and processors',
        'After-sale and advisory support for farming partners across the value chain',
        'Quality assurance and consistency processes suited to local growing conditions',
      ],
    },
    benefits: {
      heading: 'Why it matters',
      items: [
        'Reduces the gap between farm-gate price and market price for producers',
        'Improves consistency and reliability for downstream buyers',
        'Creates a stable foundation on which infrastructure and technology investments pay off',
      ],
    },
  },
  {
    slug: 'farm-infrastructure',
    icon: 'Warehouse',
    title: 'Farm Infrastructure & Equipment',
    shortDescription:
      'Machinery, storage, irrigation, and on-farm infrastructure that raise productivity.',
    hero: {
      eyebrow: 'Vertical 02',
      heading: 'Farm Infrastructure & Equipment',
      subheading:
        'The physical backbone of productive agriculture — machinery, storage, and irrigation systems built for real operating conditions.',
    },
    overview:
      'Productivity gains in agriculture are limited by what the land and its infrastructure can support. This vertical focuses on the physical systems — machinery, storage facilities, and irrigation — that determine how much of a harvest is realized, preserved, and put to productive use, rather than lost to inefficiency.',
    points: {
      heading: 'What this includes',
      items: [
        'Farm machinery access, including equipment suited to small and mid-sized holdings',
        'Post-harvest storage infrastructure to reduce spoilage and extend market windows',
        'Irrigation system design and installation, matched to local water availability',
        'On-farm infrastructure planning — access roads, drainage, and utility works',
        'Maintenance and support services to keep equipment and systems operating reliably',
      ],
    },
    benefits: {
      heading: 'Why it matters',
      items: [
        'Cuts post-harvest losses that otherwise erase months of production effort',
        'Extends growing seasons and crop options through reliable irrigation',
        'Reduces the labor and time burden of manual, undermechanized farming',
      ],
    },
  },
  {
    slug: 'agri-technology',
    icon: 'Satellite',
    title: 'Agri-Technology',
    shortDescription:
      'Precision farming, farm data tools, and productivity technology.',
    hero: {
      eyebrow: 'Vertical 03',
      heading: 'Agri-Technology',
      subheading:
        'Precision farming and data tools that turn on-the-ground agricultural work into measurable, improvable performance.',
    },
    overview:
      'Modern agriculture runs on information as much as inputs. This vertical brings precision farming techniques and farm data tools to producers who have historically operated without them — giving growers visibility into soil, water, and yield performance, and giving KVI\'s other verticals the data needed to plan infrastructure and production more precisely.',
    points: {
      heading: 'What this includes',
      items: [
        'Precision farming tools for input planning — seed, water, and fertilizer optimization',
        'Farm data collection and monitoring, from soil conditions to yield tracking',
        'Productivity analytics that help producers benchmark and improve season over season',
        'Decision-support tools tailored to local crops and growing conditions',
        'Integration with farm infrastructure for automated or semi-automated operation',
      ],
    },
    benefits: {
      heading: 'Why it matters',
      items: [
        'Improves input efficiency, lowering cost per unit of output',
        'Gives producers and partners a data-backed basis for planning and investment',
        'Bridges traditional farming knowledge with tools that scale it further',
      ],
    },
  },
  {
    slug: 'construction-infrastructure',
    icon: 'HardHat',
    title: 'Construction & Infrastructure Solutions',
    shortDescription:
      'Rural and community infrastructure, civil works, and construction delivery.',
    hero: {
      eyebrow: 'Vertical 04',
      heading: 'Construction & Infrastructure Solutions',
      subheading:
        'Civil works and community infrastructure that support agricultural and rural growth beyond the farm gate.',
    },
    overview:
      'Rural growth depends on infrastructure that extends past individual farms — roads, storage facilities, water systems, and community buildings. This vertical delivers civil construction and infrastructure projects designed for the specific demands of rural and agricultural regions, executed with the same reliability standards as our other verticals.',
    points: {
      heading: 'What this includes',
      items: [
        'Rural road and access infrastructure supporting distribution and mobility',
        'Community and institutional construction — storage, market, and utility buildings',
        'Water infrastructure, including tanks, channels, and drainage works',
        'Civil works planning and project management from design through delivery',
        'Infrastructure built to support and integrate with agri-technology deployments',
      ],
    },
    benefits: {
      heading: 'Why it matters',
      items: [
        'Closes the gap between production capacity and the infrastructure needed to use it',
        'Improves market access and reduces transport losses for local producers',
        'Builds durable community assets, not just single-project outcomes',
      ],
    },
  },
  {
    slug: 'tech-platforms',
    icon: 'LayoutDashboard',
    title: 'Technology Platforms & Business Management Software',
    shortDescription:
      'Digital platforms and software for businesses and rural enterprises.',
    hero: {
      eyebrow: 'Vertical 05',
      heading: 'Technology Platforms & Business Management Software',
      subheading:
        'Digital tools that bring structure, visibility, and scale to businesses that have outgrown manual processes.',
    },
    overview:
      'As agricultural and rural enterprises grow, they need the same operational tools that larger businesses take for granted — inventory, records, transactions, and reporting. This vertical builds and deploys business management software and digital platforms designed for the operating realities of rural and emerging-market enterprises, connecting them to the rest of the value chain KVI operates in.',
    points: {
      heading: 'What this includes',
      items: [
        'Business management software for inventory, sales, and operational records',
        'Digital platforms connecting producers, distributors, and buyers',
        'Reporting and analytics tools built for enterprise and cooperative use',
        'Custom software development for rural and agri-business use cases',
        'Technology support and training to drive real adoption, not just deployment',
      ],
    },
    benefits: {
      heading: 'Why it matters',
      items: [
        'Replaces manual, error-prone record-keeping with reliable digital systems',
        'Gives business owners real-time visibility into operations and performance',
        'Prepares rural enterprises to scale, seek financing, and grow with confidence',
      ],
    },
  },
]

// ---------------------------------------------------------------------------
// Contact page
// NOTE: All contact details below are PLACEHOLDERS — update with the real
// registered office address, phone number, and email before launch.
// ---------------------------------------------------------------------------

export const contact = {
  hero: {
    eyebrow: 'Contact Us',
    heading: "Let's start a conversation",
    subheading:
      'For partnerships, project inquiries, or general questions, reach out and our team will get back to you.',
  },
  details: {
    // PLACEHOLDER — replace with the registered office address
    address: 'Kaimur Valley Innovations Pvt. Ltd., Kaimur District, Bihar, India — 821xxx',
    // PLACEHOLDER — replace with the primary business phone number
    phone: '+91 00000 00000',
    // PLACEHOLDER — replace with the primary business email
    email: 'kaimurvalleyinnovations@gmail.com',
    hours: 'Monday – Saturday, 9:30 AM – 6:00 PM IST',
  },
  form: {
    heading: 'Send Us a Message',
    subheading: "Fill out the form and we'll respond as soon as possible.",
    submitLabel: 'Send Message',
  },
}

export const footer = {
  tagline: 'Connecting agriculture, infrastructure, and technology to build sustainable local value.',
  quickLinksHeading: 'Quick Links',
  verticalsHeading: 'Business Verticals',
  contactHeading: 'Contact',
  // PLACEHOLDER — update with real social profile URLs once available
  social: [
    { label: 'LinkedIn', icon: 'Linkedin', href: '#' },
    { label: 'Twitter', icon: 'Twitter', href: '#' },
    { label: 'Facebook', icon: 'Facebook', href: '#' },
    { label: 'Instagram', icon: 'Instagram', href: '#' },
  ],
  copyright: `© ${new Date().getFullYear()} Kaimur Valley Innovations Pvt. Ltd. All rights reserved.`,
}
