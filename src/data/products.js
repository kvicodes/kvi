// ---------------------------------------------------------------------------
// KVI Tech product portfolio.
//
// These are PRODUCTS built by KVI Tech — not separate KVI businesses. Every
// surface that shows them carries the "KVI Tech product" attribution.
//
// Source of truth for product facts: each product's own repository README on
// the KVI host. Describe only what the product actually does today; scope
// notes call out what is explicitly NOT included yet.
//
// `url` — the product's live public site. Only set when the domain is routed
//         by kvi-proxy and responds. Never invent URLs.
// `listed: false` — kept in data but hidden everywhere. BuildGrid and FamGrid
//         are KVI Tech products whose public sites are offline (containers
//         stopped since 2026-09-28; HTTP 502 as of 2026-10-19); set
//         `listed: true` once they are back up.
// Order here is the order shown everywhere.
// ---------------------------------------------------------------------------

export const allProducts = [
  {
    id: 'farmgrid',
    name: 'FarmGrid',
    category: 'Farm operations & management',
    sector: 'Agriculture',
    summary:
      'One configurable system for running diversified farms — units, activities, inventory, labour, finance and production records.',
    audience:
      'Farm owners and farm businesses running crops, orchards, dairy, poultry, aquaculture, mushroom or other operations.',
    intro:
      'FarmGrid models a farm as configurable units — a field, an orchard block, a shed, a pond — so one platform can run very different kinds of farming. Each unit carries its own activities, inputs, labour, costs and production records, and rolls up into farm-level reporting.',
    modules: [
      'Configurable unit types and custom fields',
      'Assets and batches',
      'Field activities',
      'Inventory and materials',
      'Labour',
      'Finance',
      'Production records — milk yield, egg count, weight, feed, mortality and more',
      'Reporting with farm, unit and batch P&L',
    ],
    connection:
      'FarmGrid is the product closest to KVI’s agricultural focus: software for the kind of farm operations KVI Greens works to develop.',
    url: 'https://farmgrid.kvinnovations.in/',
    status: 'live',
    listed: true,
  },
  {
    id: 'billgrid',
    name: 'BillGrid',
    category: 'Billing, inventory & accounting',
    sector: 'Business & finance',
    summary:
      'Cloud billing, inventory and accounting for Indian small and medium businesses.',
    audience:
      'Small and medium businesses that need GST-ready invoicing, stock control and proper books in one place.',
    intro:
      'BillGrid covers the daily commercial cycle — customers, suppliers, products, invoices, purchase bills, receipts and payments — on top of a real stock ledger, with double-entry accounting generated automatically from every finalised document.',
    modules: [
      'GST-ready sales invoices and purchase bills',
      'Customers, suppliers and products with a stock ledger',
      'Receipts, supplier payments and expenses',
      'Sales and purchase returns, credit and debit notes',
      'Double-entry accounting — ledger, trial balance, P&L, balance sheet',
      'Reports with CSV export; invoice PDFs in A4 and 80 mm retail formats',
    ],
    scope:
      'GST return filing (GSTR-1/3B), e-invoicing and e-way bills are not part of the current release.',
    url: 'https://billgrid.kvinnovations.in/',
    status: 'live',
    listed: true,
  },
  {
    id: 'campusgrid',
    name: 'CampusGrid',
    category: 'Education & campus management',
    sector: 'Education',
    summary:
      'An operational ERP for colleges and higher-education institutions.',
    audience: 'Colleges and higher-education institutions.',
    intro:
      'CampusGrid runs the operational core of a college: students and staff, the academic structure, attendance, fees and a full accounting ledger — with reports and exports for administrators.',
    modules: [
      'Students, faculty, staff, users and roles',
      'Departments, programmes, semesters, subjects, sections and timetable',
      'Attendance with audited changes and low-attendance tracking',
      'Fee structures, scholarships, invoicing, receipts and dues',
      'Double-entry accounting with the full statement set',
      'Reports with CSV and PDF export, bulk CSV import, documents and photos',
    ],
    scope:
      'Payroll processing, examinations, hostel, library, transport and online admissions are outside the current release.',
    url: 'https://campusgrid.kvinnovations.in/',
    status: 'live',
    listed: true,
  },
  {
    id: 'bhattagrid',
    name: 'BhattaGrid',
    category: 'Brick-kiln operations management',
    sector: 'Infrastructure & construction',
    summary:
      'An ERP for brick-kiln businesses — from production stages through sale, dispatch and collection.',
    audience: 'Brick-kiln owners and operators.',
    intro:
      'BhattaGrid follows a kiln season the way it actually runs — moulding, loading, firing and unloading, then grading, stock, sale, dispatch and collection — with labour, fuel, khata and cash managed around it.',
    workflow: ['Pathai', 'Bharai', 'Jalai', 'Nikasi', 'Grading', 'Stock', 'Sale', 'Dispatch', 'Collection'],
    modules: [
      'Season, kiln and location set-up',
      'Production stages from Pathai to Nikasi',
      'Grading and stock',
      'Sales, dispatch and collections',
      'Labour and fuel',
      'Khata, cash, assets and compliance',
      'Notifications',
    ],
    url: 'https://bhattagrid.kvinnovations.in/',
    status: 'live',
    listed: true,
  },
  {
    id: 'contractoros',
    name: 'ContractorOS',
    category: 'Contractor & construction operations',
    sector: 'Infrastructure & construction',
    summary:
      'An operations platform for Indian government civil contractors — from tender to completion.',
    audience:
      'Civil contractors working with PWD, Irrigation, NHAI, Rural Works and similar departments.',
    intro:
      'ContractorOS covers the full lifecycle of government civil contracts in one role-aware system, with a mobile-first experience for site staff.',
    workflow: [
      'Tender',
      'Bid',
      'Award',
      'Execution',
      'Measurement',
      'RA billing',
      'Deductions & SD',
      'Expenses',
      'Payments',
      'Cash flow',
      'Compliance',
      'Completion',
    ],
    modules: [
      'Tenders, bids and awards',
      'Project execution and measurement',
      'RA billing, deductions and security deposits',
      'Expenses, payments and cash flow',
      'Compliance and documentation',
      'Role-based access for owners, project managers, site staff and accounts',
    ],
    url: 'https://contractoros.kvinnovations.in/',
    status: 'live',
    listed: true,
  },
  {
    id: 'buildgrid',
    name: 'BuildGrid',
    category: 'Interior design operations',
    sector: 'Business & finance',
    summary:
      'An operations and management platform for interior design businesses — projects, teams, resources and delivery workflows.',
    url: 'https://buildgrid.kvinnovations.in/',
    status: 'offline',
    listed: false,
  },
  {
    id: 'famgrid',
    name: 'FamGrid',
    category: 'Family finance tracking',
    sector: 'Business & finance',
    summary:
      'A platform for families to track and manage their finances, balances and household planning together.',
    url: 'https://famgrid.kvinnovations.in/',
    status: 'offline',
    listed: false,
  },
]

export const products = allProducts.filter((p) => p.listed)

export const productBySlug = (slug) => products.find((p) => p.id === slug)

export const productPath = (p) => `/products/${p.id}`

export const productsNote = 'More products are in active development.'
