// ─── COLOR CONSTANTS ─────────────────────────────────────────────────────────
export const C = {
  navy:   '#1B2A4A',
  blue:   '#2E6DA4',
  orange: '#E67E22',
  green:  '#27AE60',
  red:    '#E74C3C',
  purple: '#8E44AD',
  amber:  '#D4AC0D',
  muted:  '#7F8C8D',
  text:   '#222',
  border: '#DDE3EC',
  gray:   '#F8F9FA',
  blueL:  '#EAF2FB',
  greenL: '#EAFAF1',
  redL:   '#FDEDEC',
  amberL: '#FEF9E7',
  purpleL:'#F5EEF8',
}

// ─── DOMAINS ─────────────────────────────────────────────────────────────────
export const DOMAINS = [
  {
    id: 1,
    title: 'Real Estate Development',
    color: C.navy,
    accent: C.blue,
    icon: '🏗️',
    description: 'Pro forma fundamentals, capital stack, deal analysis, and entitlement',
    weeks: [
      {
        week: 1,
        title: 'Pro Forma Fundamentals & Cap Rates',
        status: 'active',
        sessions: [
          { day: 'Mon Mar 30', title: 'Session 1 — Vocabulary: GPR, EGI, NOI, CFBT, Cap Rate, YOC, LTV, DSCR' },
          { day: 'Wed Apr 1',  title: 'Session 2 — Build First Pro Forma in Excel' },
          { day: 'Thu Apr 3',  title: 'Session 3 — Cap Rates on Real SoCal Deals (LoopNet, CBRE)' },
          { day: 'Fri Apr 4',  title: 'Session 4 — Stress Test Model + 20-Question Quiz' },
        ],
        vocabulary: [
          {
            term: 'GPR', full: 'Gross Potential Rent',
            definition: 'The maximum rental income a property could generate if 100% occupied at market rents for the full year. It\'s your ceiling — the starting point of every pro forma before any losses.',
            example: '100 units × $2,000/mo × 12 = $2,400,000 GPR',
          },
          {
            term: 'EGI', full: 'Effective Gross Income',
            definition: 'GPR minus vacancy & credit loss, plus ancillary income (parking, laundry, storage). This is the income you actually expect to collect — realistic revenue after accounting for empty units and non-paying tenants.',
            example: 'GPR $2,400,000 − 5% vacancy ($120,000) + $24,000 other income = $2,304,000 EGI',
          },
          {
            term: 'NOI', full: 'Net Operating Income',
            definition: 'EGI minus all operating expenses (taxes, insurance, management, maintenance, utilities, reserves). NOI is the property\'s earnings before debt service — the core measure of operating performance.',
            example: 'EGI $2,304,000 − OpEx $768,000 = $1,536,000 NOI',
          },
          {
            term: 'CFBT', full: 'Cash Flow Before Tax',
            definition: 'NOI minus debt service (principal + interest). This is the actual cash in your pocket before taxes. If CFBT is negative, the property doesn\'t cover its mortgage from operations.',
            example: 'NOI $1,536,000 − Annual Debt Service $960,000 = $576,000 CFBT',
          },
          {
            term: 'Cap Rate', full: 'Capitalization Rate',
            definition: 'NOI divided by property value (or purchase price). Expresses the property\'s unlevered yield — what you\'d earn in an all-cash purchase. Lower cap rate = higher price relative to income = hotter market.',
            example: 'NOI $1,536,000 ÷ Value $28,000,000 = 5.49% Cap Rate',
          },
          {
            term: 'YOC', full: 'Yield on Cost',
            definition: 'Stabilized NOI divided by total project cost (land + construction + soft costs). Your development yield — what you\'re building toward. Must exceed market cap rate by at least 100–150 bps to justify development risk.',
            example: 'NOI $1,800,000 ÷ Total Cost $30,000,000 = 6.0% YOC vs. 5.0% market cap = 100 bps spread ✓',
          },
          {
            term: 'LTV', full: 'Loan-to-Value',
            definition: 'Loan amount divided by property value. Most lenders cap at 65–75% LTV for construction/permanent loans. Higher LTV = more leverage = higher risk for borrower and lender.',
            example: '$18,000,000 loan ÷ $28,000,000 value = 64.3% LTV',
          },
          {
            term: 'DSCR', full: 'Debt Service Coverage Ratio',
            definition: 'NOI divided by annual debt service. Lenders require ≥1.25x DSCR (some want 1.30x). Below 1.0x means the property can\'t cover loan payments from operations — a red flag for lenders.',
            example: 'NOI $1,536,000 ÷ Debt Service $960,000 = 1.60x DSCR ✓ (above 1.25x minimum)',
          },
        ],
        concepts: [
          {
            heading: 'The Pro Forma Income Waterfall',
            body: 'Every real estate pro forma flows top to bottom: GPR → subtract vacancy → add ancillary income → EGI → subtract operating expenses → NOI → subtract debt service → CFBT. Each step removes a layer of "ideal" income to get to the real number. This waterfall structure is universal — whether you\'re underwriting a 10-unit apartment or a 500,000 SF industrial park.',
          },
          {
            heading: 'The Four Deal Checks',
            body: 'Before any deal moves forward at Parada Capital, it must pass four checks: (1) NOI — does the property generate sufficient operating income? (2) Spread — is YOC at least 100–150 bps above market cap rate? (3) Stack — can the capital structure support the deal at acceptable LTV and DSCR? (4) Entitlement — what can actually be built on this site, and what does the approval timeline look like?',
          },
          {
            heading: 'SoCal Cap Rate Benchmarks (2024–2025)',
            body: 'Industrial: 4.25–5.25% — logistics-driven demand keeps rates compressed. Multifamily: 4.50–5.50% — chronic housing shortage supports values. Office: 6.50–8.50%+ — elevated risk premium post-COVID remote work shift. These benchmarks are your reference point when evaluating any SoCal deal.',
          },
          {
            heading: 'Capital Stack',
            body: 'The capital stack describes who funds a deal and in what priority order. Senior debt (65–70% of cost) is first in line — lowest risk, lowest return. Mezzanine / preferred equity fills the gap, typically 10–15% of cost. Common equity (GP + LP) is last in — highest risk, highest potential return. The GP (the developer) typically contributes 10–20% of equity but manages the deal.',
          },
        ],
      },
      { week: 2,  title: 'Land Acquisition & Site Analysis',          status: 'upcoming' },
      { week: 3,  title: 'Development Feasibility & Entitlement',      status: 'upcoming' },
      { week: 4,  title: 'Project Financing & Capital Stack',           status: 'upcoming' },
      { week: 5,  title: 'Design & Predevelopment',                     status: 'upcoming' },
      { week: 6,  title: 'Construction Management Basics',              status: 'upcoming' },
      { week: 7,  title: 'Lease-Up & Stabilization',                    status: 'upcoming' },
      { week: 8,  title: 'Disposition & Exit Strategies',               status: 'upcoming' },
      { week: 9,  title: 'Affordable & Mixed-Use Development',          status: 'upcoming' },
      { week: 10, title: 'SoCal Market Deep Dive',                      status: 'upcoming' },
      { week: 11, title: 'Case Study: Full Deal Underwrite',            status: 'upcoming' },
      { week: 12, title: 'Final Review & Assessment',                   status: 'upcoming' },
    ],
  },
  {
    id: 2,
    title: 'Commercial Construction',
    color: '#17202A',
    accent: C.orange,
    icon: '🔨',
    description: 'Project delivery, GC/sub relationships, pay applications, and field operations',
    weeks: [
      { week: 1,  title: 'Project Delivery Methods',              status: 'upcoming' },
      { week: 2,  title: 'Estimating & Bid Process',              status: 'upcoming' },
      { week: 3,  title: 'Contracts: GC & Subcontractor',         status: 'upcoming' },
      { week: 4,  title: 'Scheduling & Critical Path',            status: 'upcoming' },
      { week: 5,  title: 'Pay Applications & Lien Waivers',       status: 'upcoming' },
      { week: 6,  title: 'RFIs, Submittals & Change Orders',      status: 'upcoming' },
      { week: 7,  title: 'Site Safety & Quality Control',         status: 'upcoming' },
      { week: 8,  title: 'MEP Coordination',                      status: 'upcoming' },
      { week: 9,  title: 'Closeout & Punch List',                 status: 'upcoming' },
      { week: 10, title: 'Cost Control & Reporting',              status: 'upcoming' },
      { week: 11, title: 'SoCal Construction Market',             status: 'upcoming' },
      { week: 12, title: 'Final Review & Assessment',             status: 'upcoming' },
    ],
  },
  {
    id: 3,
    title: 'Contracts & Legal',
    color: '#1A5276',
    accent: C.green,
    icon: '⚖️',
    description: 'AIA contracts, lien rights, dispute resolution, and risk allocation',
    weeks: [
      { week: 1,  title: 'AIA Contract Fundamentals',             status: 'upcoming' },
      { week: 2,  title: 'Owner-Contractor Agreements',           status: 'upcoming' },
      { week: 3,  title: 'Subcontractor Agreements',              status: 'upcoming' },
      { week: 4,  title: 'Lien Law in California',               status: 'upcoming' },
      { week: 5,  title: 'Insurance & Bonding',                   status: 'upcoming' },
      { week: 6,  title: 'Dispute Resolution & Claims',           status: 'upcoming' },
      { week: 7,  title: 'Design Professional Agreements',        status: 'upcoming' },
      { week: 8,  title: 'Public Works & Prevailing Wage',        status: 'upcoming' },
      { week: 9,  title: 'Entitlement & Land Use Law',           status: 'upcoming' },
      { week: 10, title: 'Due Diligence & Purchase Contracts',   status: 'upcoming' },
      { week: 11, title: 'JV & Partnership Agreements',          status: 'upcoming' },
      { week: 12, title: 'Final Review & Assessment',             status: 'upcoming' },
    ],
  },
  {
    id: 4,
    title: 'Market & Investment',
    color: '#4A235A',
    accent: C.purple,
    icon: '📈',
    description: 'Market analysis, investment underwriting, financing, and portfolio strategy',
    weeks: [
      { week: 1,  title: 'SoCal Market Overview',                status: 'upcoming' },
      { week: 2,  title: 'Reading Market Reports (CBRE, JLL)',   status: 'upcoming' },
      { week: 3,  title: 'Investment Return Metrics',            status: 'upcoming' },
      { week: 4,  title: 'Debt Markets & Financing',             status: 'upcoming' },
      { week: 5,  title: 'Industrial Asset Class Deep Dive',     status: 'upcoming' },
      { week: 6,  title: 'Multifamily Investment',               status: 'upcoming' },
      { week: 7,  title: 'Retail & Mixed-Use Analysis',          status: 'upcoming' },
      { week: 8,  title: 'Office Market Dynamics',               status: 'upcoming' },
      { week: 9,  title: 'Deal Sourcing & Screening',            status: 'upcoming' },
      { week: 10, title: 'Portfolio Strategy',                   status: 'upcoming' },
      { week: 11, title: 'Investor Reporting & IRR',             status: 'upcoming' },
      { week: 12, title: 'Final Review & Assessment',            status: 'upcoming' },
    ],
  },
]

// ─── QUIZ ─────────────────────────────────────────────────────────────────────
export const QUIZ = [
  {
    q: 'What does GPR stand for, and what does it represent?',
    opts: ['Gross Property Return — total profit from a sale', 'Gross Potential Rent — maximum income if 100% occupied at market rents', 'General Project Revenue — total project income including fees', 'Gross Pro Forma Return — projected investment yield'],
    a: 1,
    exp: 'GPR (Gross Potential Rent) is your ceiling — the maximum rental income assuming full occupancy at market rents for the entire year. It\'s the top line of every pro forma.',
  },
  {
    q: 'EGI is calculated as:',
    opts: ['GPR + Operating Expenses', 'NOI + Debt Service', 'GPR − Vacancy & Credit Loss + Ancillary Income', 'GPR − All Operating Costs'],
    a: 2,
    exp: 'EGI = GPR minus vacancy & credit loss, plus ancillary income (parking, laundry, etc.). It\'s the income you realistically expect to collect.',
  },
  {
    q: 'A property has GPR of $1,200,000, vacancy of 5%, and ancillary income of $20,000. What is EGI?',
    opts: ['$1,160,000', '$1,140,000', '$1,120,000', '$1,080,000'],
    a: 0,
    exp: 'EGI = $1,200,000 − (5% × $1,200,000) + $20,000 = $1,200,000 − $60,000 + $20,000 = $1,160,000',
  },
  {
    q: 'NOI is best described as:',
    opts: ['Cash available after paying the mortgage', 'Property income before operating expenses', 'EGI minus all operating expenses, before debt service', 'Total revenue minus total project cost'],
    a: 2,
    exp: 'NOI = EGI minus operating expenses (taxes, insurance, management, maintenance, utilities, reserves). It excludes debt service — it\'s the property\'s operating profit regardless of how it\'s financed.',
  },
  {
    q: 'A property has EGI of $800,000 and operating expenses of $280,000. Annual debt service is $320,000. What is NOI?',
    opts: ['$200,000', '$480,000', '$520,000', '$1,120,000'],
    a: 2,
    exp: 'NOI = EGI − Operating Expenses = $800,000 − $280,000 = $520,000. Debt service is not subtracted from NOI — that comes later when calculating CFBT.',
  },
  {
    q: 'CFBT (Cash Flow Before Tax) equals:',
    opts: ['EGI minus operating expenses', 'NOI minus debt service', 'GPR minus all costs', 'NOI minus taxes'],
    a: 1,
    exp: 'CFBT = NOI − Annual Debt Service. This is the actual cash you pocket from operations before paying income taxes.',
  },
  {
    q: 'The cap rate formula is:',
    opts: ['NOI ÷ Loan Amount', 'NOI ÷ Property Value', 'CFBT ÷ Equity Invested', 'EGI ÷ Purchase Price'],
    a: 1,
    exp: 'Cap Rate = NOI ÷ Property Value (or purchase price). It expresses the unlevered yield — what you\'d earn if you paid all cash for the property.',
  },
  {
    q: 'A property generates $500,000 NOI and is purchased for $9,500,000. What is the cap rate?',
    opts: ['4.76%', '5.00%', '5.26%', '4.50%'],
    a: 2,
    exp: 'Cap Rate = $500,000 ÷ $9,500,000 = 5.263%, rounded to 5.26%.',
  },
  {
    q: 'YOC (Yield on Cost) is used to:',
    opts: ['Calculate the loan-to-value ratio', 'Measure how much debt a deal can support', 'Assess whether a development project creates enough spread over market cap rates', 'Determine the effective tax rate on a disposition'],
    a: 2,
    exp: 'YOC = Stabilized NOI ÷ Total Project Cost. It\'s your development yield — it must exceed the market cap rate by 100–150+ bps to justify the risk, time, and complexity of ground-up development.',
  },
  {
    q: 'A developer spends $25,000,000 all-in and projects stabilized NOI of $1,500,000. Market cap rates are 5.25%. Is this deal viable?',
    opts: ['Yes — YOC of 6.0% gives a 75 bps spread, which is acceptable', 'No — YOC of 6.0% gives a 75 bps spread, which is below the 100–150 bps minimum', 'Yes — YOC equals the market cap rate, which is break-even', 'No — the project cost is too high regardless of yield'],
    a: 1,
    exp: 'YOC = $1,500,000 ÷ $25,000,000 = 6.0%. Spread = 6.0% − 5.25% = 75 bps. This is below the 100–150 bps minimum. The deal needs to either increase NOI or reduce costs.',
  },
  {
    q: 'LTV stands for Loan-to-Value. A $15M loan on a $22M property has an LTV of:',
    opts: ['63.6%', '68.2%', '73.3%', '58.3%'],
    a: 1,
    exp: 'LTV = $15,000,000 ÷ $22,000,000 = 68.18%, approximately 68.2%.',
  },
  {
    q: 'Most lenders require a minimum DSCR of:',
    opts: ['1.00x', '1.10x', '1.25x', '1.50x'],
    a: 2,
    exp: 'Most lenders require DSCR ≥ 1.25x (some require 1.30x). This ensures the property generates 25% more NOI than needed to cover debt payments — a cushion against income volatility.',
  },
  {
    q: 'A property has NOI of $720,000 and annual debt service of $600,000. What is the DSCR — and does it pass?',
    opts: ['1.20x — fails (below 1.25x minimum)', '1.20x — passes', '1.25x — passes (exactly at minimum)', '1.30x — passes'],
    a: 0,
    exp: 'DSCR = $720,000 ÷ $600,000 = 1.20x. This is below the typical 1.25x minimum — most lenders would require additional debt reduction or income improvement before approving.',
  },
  {
    q: 'Which SoCal cap rate range is correct for industrial properties (2024–2025)?',
    opts: ['6.50–8.50%', '3.00–4.00%', '4.25–5.25%', '5.50–6.50%'],
    a: 2,
    exp: 'SoCal industrial cap rates are 4.25–5.25%, compressed by strong logistics and e-commerce demand. Industrial is the tightest-yielding major asset class in the region.',
  },
  {
    q: 'Why are office cap rates significantly higher than industrial in SoCal?',
    opts: ['Office properties have higher NOI', 'Office faces elevated risk premium due to remote work trends reducing demand', 'Office properties depreciate faster', 'Office has lower property taxes'],
    a: 1,
    exp: 'SoCal office cap rates are 6.50–8.50%+. The elevated cap reflects higher perceived risk from remote/hybrid work trends reducing office demand post-COVID. Higher risk = lower price relative to income = higher cap rate.',
  },
  {
    q: 'In the capital stack, which position has the LOWEST risk and LOWEST expected return?',
    opts: ['Common Equity (LP)', 'Mezzanine Debt', 'Senior Debt', 'GP Promote'],
    a: 2,
    exp: 'Senior debt is first in line for repayment and has the lowest risk. Because it\'s most protected, lenders accept a lower return (interest rate). Common equity is last in — highest risk, highest potential upside.',
  },
  {
    q: 'The "Four Deal Checks" at Parada Capital are:',
    opts: ['Price, Rent, Vacancy, Expenses', 'NOI, Spread, Stack, Entitlement', 'LTV, DSCR, Cap Rate, YOC', 'GPR, EGI, NOI, CFBT'],
    a: 1,
    exp: 'The four deal checks: NOI (operating income check), Spread (YOC vs. market cap rate ≥ 100–150 bps), Stack (capital structure — LTV and DSCR), Entitlement (what can be built and on what timeline).',
  },
  {
    q: 'Development spread is defined as:',
    opts: ['The difference between asking price and purchase price', 'YOC minus the market cap rate', 'NOI divided by total equity invested', 'The gap between debt and equity in the capital stack'],
    a: 1,
    exp: 'Development spread = YOC − Market Cap Rate. A minimum spread of 100–150 bps (1.0–1.5%) is required to justify the risk, time, and uncertainty of development vs. buying an existing stabilized asset.',
  },
  {
    q: 'If a developer\'s YOC is 5.75% and market cap rates are 5.00%, the development spread is:',
    opts: ['75 bps — below the 100–150 bps minimum, deal needs work', '75 bps — above minimum, deal proceeds', '125 bps — above minimum, deal proceeds', '175 bps — well above minimum, proceed'],
    a: 0,
    exp: 'Spread = 5.75% − 5.00% = 75 bps. This is below the 100–150 bps minimum. The project needs to either increase NOI, reduce costs, or be reconsidered.',
  },
  {
    q: 'A 5% vacancy rate on a $2,000,000 GPR property reduces EGI by:',
    opts: ['$200,000', '$100,000', '$2,000 per unit', '$50,000'],
    a: 1,
    exp: '$2,000,000 × 5% = $100,000 in vacancy/credit loss. This is subtracted from GPR (along with credit losses) to arrive at EGI before adding ancillary income.',
  },
]

// ─── CAP RATE DATA ────────────────────────────────────────────────────────────
export const CAP_DATA = {
  industrial:  { label: 'Industrial',  min: 4.25, max: 5.25, color: C.orange,  driver: 'Logistics & e-commerce demand keeps rates compressed. SoCal industrial vacancy near historic lows.' },
  multifamily: { label: 'Multifamily', min: 4.50, max: 5.50, color: C.blue,    driver: 'Chronic housing shortage and rent control laws support valuations. Strong long-term demand fundamentals.' },
  office:      { label: 'Office',      min: 6.50, max: 8.50, color: C.purple,  driver: 'Elevated risk premium from remote/hybrid work trends. Higher cap = lower price relative to income.' },
  retail:      { label: 'Retail',      min: 5.00, max: 7.00, color: C.green,   driver: 'Mixed outlook. Grocery-anchored retail performs; power centers and malls face significant headwinds.' },
}

// ─── FORMATTERS ───────────────────────────────────────────────────────────────
export const fmtUSD = n => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
export const fmtPct = n => n.toFixed(2) + '%'
export const fmtX   = n => n.toFixed(2) + 'x'
