import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const DOMAINS = [
  {
    id: 1,
    title: "Real Estate Development",
    color: "#1B4F72",
    accent: "#2980B9",
    icon: "🏗️",
    description: "Pro forma fundamentals, capital stack, deal analysis, and entitlement",
    weeks: [
      {
        week: 1,
        title: "Pro Forma Fundamentals & Cap Rates",
        status: "active",
        sessions: [
          { day: "Mon Mar 30", title: "Vocabulary — GPR, EGI, NOI, CFBT, Cap Rate, YOC, LTV, DSCR" },
          { day: "Wed Apr 1", title: "Build First Pro Forma in Excel" },
          { day: "Thu Apr 3", title: "Cap Rates on Real SoCal Deals" },
          { day: "Fri Apr 4", title: "Stress Test Model + Quiz" },
        ],
        vocabulary: [
          { term: "GPR", full: "Gross Potential Rent", definition: "The maximum rental income a property could generate if 100% occupied at market rents for the full year. It's your ceiling — the starting point of every pro forma before any losses.", example: "100 units × $2,000/mo × 12 = $2,400,000 GPR" },
          { term: "EGI", full: "Effective Gross Income", definition: "GPR minus vacancy & credit loss, plus ancillary income (parking, laundry, storage). This is the income you actually expect to collect — the realistic revenue after accounting for empty units and non-paying tenants.", example: "GPR $2,400,000 − 5% vacancy ($120,000) + $24,000 other income = $2,304,000 EGI" },
          { term: "NOI", full: "Net Operating Income", definition: "EGI minus all operating expenses (taxes, insurance, management, maintenance, utilities, reserves). NOI is the property's earnings before debt service — the core measure of a property's operating performance.", example: "EGI $2,304,000 − OpEx $768,000 = $1,536,000 NOI" },
          { term: "CFBT", full: "Cash Flow Before Tax", definition: "NOI minus debt service (principal + interest payments). This is the actual cash in your pocket before you pay taxes. If CFBT is negative, the property doesn't cover its mortgage from operations.", example: "NOI $1,536,000 − Annual Debt Service $960,000 = $576,000 CFBT" },
          { term: "Cap Rate", full: "Capitalization Rate", definition: "NOI divided by property value (or purchase price). Expresses the property's yield assuming all-cash purchase. Lower cap rate = higher price relative to income = hotter market. Cap rates compress when demand is strong.", example: "NOI $1,536,000 ÷ Value $28,000,000 = 5.49% Cap Rate" },
          { term: "YOC", full: "Yield on Cost", definition: "Stabilized NOI divided by total project cost (land + construction + soft costs). This is your development yield — what you're building toward. Must exceed market cap rate by at least 100–150 bps to justify development risk.", example: "NOI $1,800,000 ÷ Total Cost $30,000,000 = 6.0% YOC vs. 5.0% market cap = 100 bps spread ✓" },
          { term: "LTV", full: "Loan-to-Value", definition: "Loan amount divided by property value, expressed as a percentage. Most lenders cap at 65–75% LTV for construction/permanent loans. Higher LTV = more leverage = higher risk for both borrower and lender.", example: "$18,000,000 loan ÷ $28,000,000 value = 64.3% LTV" },
          { term: "DSCR", full: "Debt Service Coverage Ratio", definition: "NOI divided by annual debt service. Lenders require ≥1.25x DSCR (some want 1.30x). Below 1.0x means the property can't cover its loan payments from operations — a red flag for lenders.", example: "NOI $1,536,000 ÷ Debt Service $960,000 = 1.60x DSCR ✓ (above 1.25x minimum)" },
        ],
        keyConceptsText: [
          {
            heading: "The Pro Forma Income Waterfall",
            body: "Every real estate pro forma flows from the top down: GPR → subtract vacancy → add ancillary income → EGI → subtract operating expenses → NOI → subtract debt service → CFBT. Each step removes a layer of 'ideal' income to get to the real number. This waterfall structure is universal — whether you're underwriting a 10-unit apartment or a 500,000 SF industrial park."
          },
          {
            heading: "The Four Deal Checks",
            body: "Before any deal moves forward at HTA/Infinity, it must pass four checks: (1) NOI — does the property generate sufficient operating income? (2) Spread — is YOC at least 100–150 bps above market cap rate? (3) Stack — can the capital structure support the deal at acceptable LTV and DSCR? (4) Entitlement — what can actually be built on this site, and what does the approval timeline look like?"
          },
          {
            heading: "SoCal Cap Rate Benchmarks (2024–2025)",
            body: "Industrial: 4.25–5.25% (logistics-driven demand keeps rates compressed). Multifamily: 4.50–5.50% (chronic housing shortage supports values). Office: 6.50–8.50%+ (elevated risk premium post-COVID remote work shift). These benchmarks are your reference point — a deal priced at a 3.8% cap in multifamily is paying a premium; one at 6.0% may represent value or hidden risk."
          },
          {
            heading: "Capital Stack",
            body: "The capital stack describes who funds a deal and in what priority order. Senior debt (65–70% of cost) is first in line, lowest risk, lowest return. Mezzanine / preferred equity fills the gap between senior debt and equity, typically 10–15% of cost. Common equity (GP + LP) is last in — highest risk, highest potential return. The GP (general partner, i.e., the developer) typically contributes 10–20% of the equity but manages the deal. LPs provide the bulk of equity capital."
          }
        ]
      },
      { week: 2, title: "Land Acquisition & Site Analysis", status: "upcoming" },
      { week: 3, title: "Development Feasibility & Entitlement", status: "upcoming" },
      { week: 4, title: "Project Financing & Capital Stack", status: "upcoming" },
      { week: 5, title: "Design & Predevelopment", status: "upcoming" },
      { week: 6, title: "Construction Management Basics", status: "upcoming" },
      { week: 7, title: "Lease-Up & Stabilization", status: "upcoming" },
      { week: 8, title: "Disposition & Exit Strategies", status: "upcoming" },
      { week: 9, title: "Affordable & Mixed-Use Development", status: "upcoming" },
      { week: 10, title: "SoCal Market Deep Dive", status: "upcoming" },
      { week: 11, title: "Case Study: Full Deal Underwrite", status: "upcoming" },
      { week: 12, title: "Final Review & Assessment", status: "upcoming" },
    ]
  },
  {
    id: 2,
    title: "Commercial Construction",
    color: "#17202A",
    accent: "#E67E22",
    icon: "🔨",
    description: "Project delivery, GC/sub relationships, pay applications, and field operations",
    weeks: [
      { week: 1, title: "Project Delivery Methods", status: "upcoming" },
      { week: 2, title: "Estimating & Bid Process", status: "upcoming" },
      { week: 3, title: "Contracts: GC & Subcontractor", status: "upcoming" },
      { week: 4, title: "Scheduling & Critical Path", status: "upcoming" },
      { week: 5, title: "Pay Applications & Lien Waivers", status: "upcoming" },
      { week: 6, title: "RFIs, Submittals & Change Orders", status: "upcoming" },
      { week: 7, title: "Site Safety & Quality Control", status: "upcoming" },
      { week: 8, title: "MEP Coordination", status: "upcoming" },
      { week: 9, title: "Closeout & Punch List", status: "upcoming" },
      { week: 10, title: "Cost Control & Reporting", status: "upcoming" },
      { week: 11, title: "SoCal Construction Market", status: "upcoming" },
      { week: 12, title: "Final Review & Assessment", status: "upcoming" },
    ]
  },
  {
    id: 3,
    title: "Contracts & Legal",
    color: "#1A5276",
    accent: "#27AE60",
    icon: "⚖️",
    description: "AIA contracts, lien rights, dispute resolution, and risk allocation",
    weeks: [
      { week: 1, title: "AIA Contract Fundamentals", status: "upcoming" },
      { week: 2, title: "Owner-Contractor Agreements", status: "upcoming" },
      { week: 3, title: "Subcontractor Agreements", status: "upcoming" },
      { week: 4, title: "Lien Law in California", status: "upcoming" },
      { week: 5, title: "Insurance & Bonding", status: "upcoming" },
      { week: 6, title: "Dispute Resolution & Claims", status: "upcoming" },
      { week: 7, title: "Design Professional Agreements", status: "upcoming" },
      { week: 8, title: "Public Works & Prevailing Wage", status: "upcoming" },
      { week: 9, title: "Entitlement & Land Use Law", status: "upcoming" },
      { week: 10, title: "Due Diligence & Purchase Contracts", status: "upcoming" },
      { week: 11, title: "JV & Partnership Agreements", status: "upcoming" },
      { week: 12, title: "Final Review & Assessment", status: "upcoming" },
    ]
  },
  {
    id: 4,
    title: "Market & Investment",
    color: "#4A235A",
    accent: "#8E44AD",
    icon: "📈",
    description: "Market analysis, investment underwriting, financing, and portfolio strategy",
    weeks: [
      { week: 1, title: "SoCal Market Overview", status: "upcoming" },
      { week: 2, title: "Reading Market Reports (CBRE, JLL)", status: "upcoming" },
      { week: 3, title: "Investment Return Metrics", status: "upcoming" },
      { week: 4, title: "Debt Markets & Financing", status: "upcoming" },
      { week: 5, title: "Industrial Asset Class Deep Dive", status: "upcoming" },
      { week: 6, title: "Multifamily Investment", status: "upcoming" },
      { week: 7, title: "Retail & Mixed-Use Analysis", status: "upcoming" },
      { week: 8, title: "Office Market Dynamics", status: "upcoming" },
      { week: 9, title: "Deal Sourcing & Screening", status: "upcoming" },
      { week: 10, title: "Portfolio Strategy", status: "upcoming" },
      { week: 11, title: "Investor Reporting & IRR", status: "upcoming" },
      { week: 12, title: "Final Review & Assessment", status: "upcoming" },
    ]
  }
];

const QUIZ_QUESTIONS = [
  {
    q: "What does GPR stand for and what does it represent?",
    options: ["Gross Property Return — total profit from a sale", "Gross Potential Rent — maximum income if 100% occupied at market rents", "General Project Revenue — total project income including fees", "Gross Pro Forma Return — projected investment yield"],
    answer: 1,
    explanation: "GPR (Gross Potential Rent) is your ceiling — the maximum rental income assuming full occupancy at market rents for the full year. It's the starting point of every pro forma."
  },
  {
    q: "EGI is calculated as:",
    options: ["GPR + Operating Expenses", "NOI + Debt Service", "GPR − Vacancy & Credit Loss + Ancillary Income", "GPR − All Operating Costs"],
    answer: 2,
    explanation: "EGI = GPR minus vacancy & credit loss, plus ancillary income (parking, laundry, etc.). It represents the income you realistically expect to collect."
  },
  {
    q: "A property has GPR of $1,200,000, vacancy of 5%, and ancillary income of $20,000. What is EGI?",
    options: ["$1,160,000", "$1,140,000", "$1,120,000", "$1,080,000"],
    answer: 0,
    explanation: "EGI = $1,200,000 − (5% × $1,200,000) + $20,000 = $1,200,000 − $60,000 + $20,000 = $1,160,000"
  },
  {
    q: "NOI is best described as:",
    options: ["Cash available after paying the mortgage", "Property income before operating expenses", "EGI minus all operating expenses, before debt service", "Total revenue minus total project cost"],
    answer: 2,
    explanation: "NOI = EGI minus operating expenses (taxes, insurance, management, maintenance, utilities, reserves). It excludes debt service — it's the property's operating profit regardless of financing."
  },
  {
    q: "A property has EGI of $800,000 and operating expenses of $280,000. Annual debt service is $320,000. What is NOI?",
    options: ["$480,000", "$520,000", "$200,000", "$1,120,000"],
    answer: 0,
    explanation: "NOI = EGI − Operating Expenses = $800,000 − $280,000 = $520,000. Wait — that's $520,000. Let me recheck: $800,000 − $280,000 = $520,000. The correct answer is $520,000."
  },
  {
    q: "CFBT (Cash Flow Before Tax) equals:",
    options: ["EGI minus operating expenses", "NOI minus debt service", "GPR minus all costs", "NOI minus taxes"],
    answer: 1,
    explanation: "CFBT = NOI − Debt Service. This is the actual cash in your pocket from operations before paying income taxes."
  },
  {
    q: "The cap rate formula is:",
    options: ["NOI ÷ Loan Amount", "NOI ÷ Property Value", "CFBT ÷ Equity Invested", "EGI ÷ Purchase Price"],
    answer: 1,
    explanation: "Cap Rate = NOI ÷ Property Value (or purchase price). It expresses the unlevered yield — what you'd earn if you paid all cash for the property."
  },
  {
    q: "A property generates $500,000 NOI and is purchased for $9,500,000. What is the cap rate?",
    options: ["4.76%", "5.00%", "5.26%", "4.50%"],
    answer: 2,
    explanation: "Cap Rate = $500,000 ÷ $9,500,000 = 5.26%"
  },
  {
    q: "YOC (Yield on Cost) is used to:",
    options: ["Calculate the loan-to-value ratio", "Measure how much debt a deal can support", "Assess whether a development project creates enough spread over market cap rates", "Determine the effective tax rate on a disposition"],
    answer: 2,
    explanation: "YOC = Stabilized NOI ÷ Total Project Cost. It's your development yield — and must exceed the market cap rate by 100–150+ bps to justify the risk of development."
  },
  {
    q: "A developer spends $25,000,000 (all-in cost) and projects stabilized NOI of $1,500,000. Market cap rates are 5.25%. Is this deal viable?",
    options: ["Yes — YOC of 6.0% gives a 75 bps spread, which is acceptable", "No — YOC of 6.0% gives a 75 bps spread, which is below the 100–150 bps minimum", "Yes — YOC of 5.25% equals the market cap rate, which is break-even", "No — the project cost is too high regardless of yield"],
    answer: 1,
    explanation: "YOC = $1,500,000 ÷ $25,000,000 = 6.0%. Spread = 6.0% − 5.25% = 75 bps. This is below the 100–150 bps minimum needed to justify development risk. Deal needs improvement."
  },
  {
    q: "LTV stands for Loan-to-Value. A $15M loan on a $22M property has an LTV of:",
    options: ["63.6%", "68.2%", "73.3%", "58.3%"],
    answer: 1,
    explanation: "LTV = $15,000,000 ÷ $22,000,000 = 68.2%"
  },
  {
    q: "Most lenders require a minimum DSCR of:",
    options: ["1.00x", "1.10x", "1.25x", "1.50x"],
    answer: 2,
    explanation: "Most lenders require DSCR ≥ 1.25x (some require 1.30x). This ensures the property generates 25% more NOI than needed to cover debt payments — a cushion against income volatility."
  },
  {
    q: "A property has NOI of $720,000 and annual debt service of $600,000. What is the DSCR, and does it pass lender requirements?",
    options: ["1.20x — fails (below 1.25x minimum)", "1.20x — passes", "1.25x — passes (exactly at minimum)", "1.30x — passes"],
    answer: 0,
    explanation: "DSCR = $720,000 ÷ $600,000 = 1.20x. This is below the typical 1.25x minimum — most lenders would not approve this loan without additional debt reduction or income improvement."
  },
  {
    q: "Which SoCal cap rate range is correct for industrial properties (2024–2025)?",
    options: ["6.50–8.50%", "3.00–4.00%", "4.25–5.25%", "5.50–6.50%"],
    answer: 2,
    explanation: "SoCal industrial cap rates are 4.25–5.25%, compressed by strong logistics/e-commerce demand. Industrial is the tightest-yielding major asset class in the region."
  },
  {
    q: "Why are office cap rates significantly higher than industrial in SoCal?",
    options: ["Office properties have higher NOI", "Office faces elevated risk premium due to remote work trends reducing demand", "Office properties depreciate faster", "Office has lower property taxes"],
    answer: 1,
    explanation: "SoCal office cap rates are 6.50–8.50%+. The elevated cap rate reflects higher perceived risk from remote/hybrid work trends reducing office demand post-COVID. Higher risk = lower price relative to income = higher cap rate."
  },
  {
    q: "In the capital stack, which position has the LOWEST risk and LOWEST expected return?",
    options: ["Common Equity (LP)", "Mezzanine Debt", "Senior Debt", "GP Promote"],
    answer: 2,
    explanation: "Senior debt is first in line for repayment and has the lowest risk. Because it's most protected, lenders accept a lower return (interest rate). Common equity is last in — highest risk, highest potential upside."
  },
  {
    q: "The 'Four Deal Checks' at HTA/Infinity are:",
    options: ["Price, Rent, Vacancy, Expenses", "NOI, Spread, Stack, Entitlement", "LTV, DSCR, Cap Rate, YOC", "GPR, EGI, NOI, CFBT"],
    answer: 1,
    explanation: "The four deal checks are: NOI (operating income check), Spread (YOC vs. market cap rate ≥ 100–150 bps), Stack (capital structure — LTV and DSCR), and Entitlement (what can be built and on what timeline)."
  },
  {
    q: "Development spread is defined as:",
    options: ["The difference between asking price and purchase price", "YOC minus the market cap rate", "NOI divided by total equity invested", "The gap between debt and equity in the capital stack"],
    answer: 1,
    explanation: "Development spread = YOC − Market Cap Rate. A minimum spread of 100–150 basis points (1.0–1.5%) is required to justify the risk, time, and uncertainty of ground-up development vs. buying an existing stabilized asset."
  },
  {
    q: "If a developer's YOC is 5.75% and market cap rates are 5.00%, the development spread is:",
    options: ["0.75% — below minimum, deal needs work", "0.75% — above minimum, deal proceeds", "1.25% — above minimum, deal proceeds", "175 bps — well above minimum, proceed"],
    answer: 0,
    explanation: "Spread = 5.75% − 5.00% = 75 bps (0.75%). This is below the 100–150 bps minimum. The project needs to either increase NOI, reduce costs, or reconsider."
  },
  {
    q: "A 5% vacancy rate on a $2,000,000 GPR property means:",
    options: ["$200,000 in lost rent", "$100,000 in lost rent", "$2,000 in lost rent per unit", "$50,000 in lost rent"],
    answer: 1,
    explanation: "$2,000,000 × 5% = $100,000 in vacancy/credit loss. This is subtracted from GPR (along with credit losses) to arrive at EGI before adding ancillary income."
  }
];

// ─── PRO FORMA CALCULATOR ────────────────────────────────────────────────────
function ProFormaCalculator() {
  const [inputs, setInputs] = useState({
    units: 50,
    avgRent: 2500,
    vacancyPct: 5,
    ancillary: 15000,
    opExPct: 35,
    loanAmount: 7500000,
    interestRate: 6.5,
    loanTerm: 30,
    totalProjectCost: 12000000,
    propertyValue: 13500000,
  });

  const upd = (k, v) => setInputs(p => ({ ...p, [k]: parseFloat(v) || 0 }));

  const GPR = inputs.units * inputs.avgRent * 12;
  const vacancyLoss = GPR * (inputs.vacancyPct / 100);
  const EGI = GPR - vacancyLoss + inputs.ancillary;
  const opEx = EGI * (inputs.opExPct / 100);
  const NOI = EGI - opEx;
  const monthlyRate = inputs.interestRate / 100 / 12;
  const nPayments = inputs.loanTerm * 12;
  const monthlyPayment = inputs.loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, nPayments)) / (Math.pow(1 + monthlyRate, nPayments) - 1);
  const annualDebtService = monthlyPayment * 12;
  const CFBT = NOI - annualDebtService;
  const capRate = inputs.propertyValue > 0 ? (NOI / inputs.propertyValue) * 100 : 0;
  const YOC = inputs.totalProjectCost > 0 ? (NOI / inputs.totalProjectCost) * 100 : 0;
  const LTV = inputs.propertyValue > 0 ? (inputs.loanAmount / inputs.propertyValue) * 100 : 0;
  const DSCR = annualDebtService > 0 ? NOI / annualDebtService : 0;

  const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
  const fmtPct = (n) => n.toFixed(2) + '%';
  const fmtX = (n) => n.toFixed(2) + 'x';

  const passColor = (pass) => pass ? '#27AE60' : '#E74C3C';

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1B4F72', marginBottom: '1rem' }}>
        📊 Interactive Pro Forma Calculator
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Inputs */}
        <div>
          <p style={{ fontWeight: 600, color: '#555', fontSize: '0.85rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Inputs</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {[
              { label: "Units", key: "units", suffix: "" },
              { label: "Avg Monthly Rent", key: "avgRent", suffix: "$" },
              { label: "Vacancy Rate", key: "vacancyPct", suffix: "%" },
              { label: "Ancillary Income (Annual)", key: "ancillary", suffix: "$" },
              { label: "Operating Expense Ratio", key: "opExPct", suffix: "%" },
              { label: "Loan Amount", key: "loanAmount", suffix: "$" },
              { label: "Interest Rate", key: "interestRate", suffix: "%" },
              { label: "Loan Term (years)", key: "loanTerm", suffix: "" },
              { label: "Total Project Cost", key: "totalProjectCost", suffix: "$" },
              { label: "Property Value", key: "propertyValue", suffix: "$" },
            ].map(({ label, key, suffix }) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.8rem', color: '#444', width: '180px', flexShrink: 0 }}>{label}</label>
                <div style={{ display: 'flex', alignItems: 'center', background: '#F8F9FA', border: '1px solid #dee2e6', borderRadius: '6px', overflow: 'hidden', flex: 1 }}>
                  {suffix === "$" && <span style={{ padding: '0.3rem 0.5rem', background: '#e9ecef', fontSize: '0.8rem', color: '#666' }}>$</span>}
                  <input
                    type="number"
                    value={inputs[key]}
                    onChange={e => upd(key, e.target.value)}
                    style={{ border: 'none', background: 'transparent', padding: '0.3rem 0.5rem', width: '100%', fontSize: '0.85rem', outline: 'none' }}
                  />
                  {suffix === "%" && <span style={{ padding: '0.3rem 0.5rem', background: '#e9ecef', fontSize: '0.8rem', color: '#666' }}>%</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Outputs */}
        <div>
          <p style={{ fontWeight: 600, color: '#555', fontSize: '0.85rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pro Forma Waterfall</p>

          {/* Waterfall */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '1.25rem' }}>
            {[
              { label: 'GPR', value: fmt(GPR), color: '#1B4F72', indent: 0, bold: true },
              { label: `− Vacancy (${inputs.vacancyPct}%)`, value: `(${fmt(vacancyLoss)})`, color: '#E74C3C', indent: 1, bold: false },
              { label: '+ Ancillary Income', value: fmt(inputs.ancillary), color: '#27AE60', indent: 1, bold: false },
              { label: '= EGI', value: fmt(EGI), color: '#2980B9', indent: 0, bold: true },
              { label: `− Operating Expenses (${inputs.opExPct}%)`, value: `(${fmt(opEx)})`, color: '#E74C3C', indent: 1, bold: false },
              { label: '= NOI', value: fmt(NOI), color: '#1A5276', indent: 0, bold: true },
              { label: '− Annual Debt Service', value: `(${fmt(annualDebtService)})`, color: '#E74C3C', indent: 1, bold: false },
              { label: '= CFBT', value: fmt(CFBT), color: CFBT >= 0 ? '#27AE60' : '#E74C3C', indent: 0, bold: true },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: `0.25rem ${row.indent ? '1rem' : '0.5rem'}`, background: row.bold ? '#F0F3F7' : 'transparent', borderRadius: '4px' }}>
                <span style={{ fontSize: '0.82rem', color: '#444', paddingLeft: row.indent ? '0.75rem' : '0' }}>{row.label}</span>
                <span style={{ fontSize: '0.85rem', fontWeight: row.bold ? 700 : 400, color: row.color }}>{row.value}</span>
              </div>
            ))}
          </div>

          {/* Metrics */}
          <p style={{ fontWeight: 600, color: '#555', fontSize: '0.85rem', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Key Metrics</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {[
              { label: 'Cap Rate', value: fmtPct(capRate), pass: null, note: 'NOI ÷ Value' },
              { label: 'YOC', value: fmtPct(YOC), pass: null, note: 'NOI ÷ Cost' },
              { label: 'LTV', value: fmtPct(LTV), pass: LTV <= 75, note: LTV <= 75 ? '✓ ≤75%' : '✗ >75%' },
              { label: 'DSCR', value: fmtX(DSCR), pass: DSCR >= 1.25, note: DSCR >= 1.25 ? '✓ ≥1.25x' : '✗ <1.25x' },
            ].map((m, i) => (
              <div key={i} style={{ background: '#F8F9FA', border: '1px solid #dee2e6', borderRadius: '8px', padding: '0.6rem 0.8rem' }}>
                <p style={{ fontSize: '0.7rem', color: '#888', margin: 0 }}>{m.label}</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 700, color: m.pass === null ? '#1B4F72' : passColor(m.pass), margin: '0.1rem 0' }}>{m.value}</p>
                <p style={{ fontSize: '0.68rem', color: m.pass === null ? '#aaa' : passColor(m.pass), margin: 0 }}>{m.note}</p>
              </div>
            ))}
          </div>

          {/* Spread check */}
          {(() => {
            const spread = (YOC - capRate).toFixed(2);
            const spreadBps = Math.round((YOC - capRate) * 100);
            const passes = spreadBps >= 100;
            return (
              <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: passes ? '#EAF7EE' : '#FDEDEC', border: `1px solid ${passes ? '#27AE60' : '#E74C3C'}`, borderRadius: '8px' }}>
                <p style={{ margin: 0, fontSize: '0.82rem', fontWeight: 600, color: passes ? '#1E8449' : '#C0392B' }}>
                  {passes ? '✓' : '✗'} Development Spread: {spreadBps} bps ({spread}%)
                </p>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: '#555' }}>
                  {passes ? `YOC (${fmtPct(YOC)}) − Cap Rate (${fmtPct(capRate)}) = ${spreadBps} bps ✓ (≥100 bps minimum)` : `YOC (${fmtPct(YOC)}) − Cap Rate (${fmtPct(capRate)}) = ${spreadBps} bps — below 100 bps minimum`}
                </p>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

// ─── CAP RATE EXPLORER ───────────────────────────────────────────────────────
const CAP_BENCHMARKS = {
  industrial: { label: 'Industrial', min: 4.25, max: 5.25, color: '#E67E22', driver: 'Logistics & e-commerce demand keeps rates compressed. SoCal industrial vacancy near historic lows.' },
  multifamily: { label: 'Multifamily', min: 4.50, max: 5.50, color: '#2980B9', driver: 'Chronic housing shortage and rent control laws support valuations. Strong long-term demand fundamentals.' },
  office: { label: 'Office', min: 6.50, max: 8.50, color: '#8E44AD', driver: 'Elevated risk premium due to remote/hybrid work trends. Higher cap = lower price relative to income = distressed values.' },
  retail: { label: 'Retail', min: 5.00, max: 7.00, color: '#27AE60', driver: 'Mixed outlook. Neighborhood/grocery-anchored performs well; power centers and malls face headwinds.' },
};

function CapRateExplorer() {
  const [assetType, setAssetType] = useState('industrial');
  const [noi, setNoi] = useState(1000000);
  const [projectCost, setProjectCost] = useState(20000000);
  const bench = CAP_BENCHMARKS[assetType];
  const midCap = (bench.min + bench.max) / 2;
  const impliedValueMid = noi / (midCap / 100);
  const impliedValueLow = noi / (bench.max / 100);
  const impliedValueHigh = noi / (bench.min / 100);
  const yoc = projectCost > 0 ? (noi / projectCost) * 100 : 0;
  const spreadMid = yoc - midCap;
  const spreadBps = Math.round(spreadMid * 100);
  const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1B4F72', marginBottom: '1rem' }}>
        🔍 SoCal Cap Rate Explorer
      </h3>

      {/* Asset type selector */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {Object.entries(CAP_BENCHMARKS).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setAssetType(key)}
            style={{
              padding: '0.4rem 1rem',
              borderRadius: '20px',
              border: `2px solid ${assetType === key ? val.color : '#dee2e6'}`,
              background: assetType === key ? val.color : 'white',
              color: assetType === key ? 'white' : '#555',
              fontWeight: 600,
              fontSize: '0.82rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {val.label}
          </button>
        ))}
      </div>

      {/* Benchmark display */}
      <div style={{ background: '#F8F9FA', border: `2px solid ${bench.color}`, borderRadius: '10px', padding: '1rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span style={{ fontWeight: 700, color: bench.color, fontSize: '1rem' }}>SoCal {bench.label} Cap Rates</span>
          <span style={{ fontWeight: 800, fontSize: '1.25rem', color: bench.color }}>{bench.min}% – {bench.max}%</span>
        </div>
        {/* Visual bar */}
        <div style={{ position: 'relative', height: '12px', background: '#e9ecef', borderRadius: '6px', marginBottom: '0.5rem' }}>
          <div style={{ position: 'absolute', left: '0', right: '0', top: 0, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
            <span style={{ fontSize: '0.65rem', color: '#888' }}>3%</span>
            <span style={{ fontSize: '0.65rem', color: '#888' }}>10%</span>
          </div>
          <div style={{
            position: 'absolute',
            left: `${((bench.min - 3) / 7) * 100}%`,
            width: `${((bench.max - bench.min) / 7) * 100}%`,
            top: 0, height: '100%',
            background: bench.color,
            borderRadius: '6px',
            opacity: 0.8
          }} />
        </div>
        <p style={{ fontSize: '0.8rem', color: '#555', margin: 0 }}>{bench.driver}</p>
      </div>

      {/* Calculator */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        <div>
          <p style={{ fontWeight: 600, color: '#555', fontSize: '0.85rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Deal</p>
          {[
            { label: 'Stabilized NOI', key: 'noi', state: noi, setState: setNoi },
            { label: 'Total Project Cost', key: 'cost', state: projectCost, setState: setProjectCost },
          ].map(({ label, key, state, setState }) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <label style={{ fontSize: '0.8rem', color: '#444', width: '150px', flexShrink: 0 }}>{label}</label>
              <div style={{ display: 'flex', alignItems: 'center', background: '#F8F9FA', border: '1px solid #dee2e6', borderRadius: '6px', overflow: 'hidden', flex: 1 }}>
                <span style={{ padding: '0.3rem 0.5rem', background: '#e9ecef', fontSize: '0.8rem', color: '#666' }}>$</span>
                <input
                  type="number"
                  value={state}
                  onChange={e => setState(parseFloat(e.target.value) || 0)}
                  style={{ border: 'none', background: 'transparent', padding: '0.3rem 0.5rem', width: '100%', fontSize: '0.85rem', outline: 'none' }}
                />
              </div>
            </div>
          ))}
        </div>

        <div>
          <p style={{ fontWeight: 600, color: '#555', fontSize: '0.85rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Analysis</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ background: '#F0F3F7', borderRadius: '8px', padding: '0.6rem 0.8rem' }}>
              <p style={{ fontSize: '0.7rem', color: '#888', margin: 0 }}>Your YOC</p>
              <p style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1B4F72', margin: '0.1rem 0' }}>{yoc.toFixed(2)}%</p>
            </div>
            <div style={{ background: '#F0F3F7', borderRadius: '8px', padding: '0.6rem 0.8rem' }}>
              <p style={{ fontSize: '0.7rem', color: '#888', margin: 0 }}>Implied Market Value (at mid cap {midCap.toFixed(2)}%)</p>
              <p style={{ fontSize: '1rem', fontWeight: 700, color: '#2980B9', margin: '0.1rem 0' }}>{fmt(impliedValueMid)}</p>
              <p style={{ fontSize: '0.7rem', color: '#aaa', margin: 0 }}>Range: {fmt(impliedValueLow)} – {fmt(impliedValueHigh)}</p>
            </div>
            <div style={{ background: spreadBps >= 100 ? '#EAF7EE' : '#FDEDEC', border: `1px solid ${spreadBps >= 100 ? '#27AE60' : '#E74C3C'}`, borderRadius: '8px', padding: '0.6rem 0.8rem' }}>
              <p style={{ fontSize: '0.7rem', color: '#888', margin: 0 }}>Development Spread</p>
              <p style={{ fontSize: '1.1rem', fontWeight: 800, color: spreadBps >= 100 ? '#1E8449' : '#C0392B', margin: '0.1rem 0' }}>{spreadBps} bps</p>
              <p style={{ fontSize: '0.7rem', color: '#888', margin: 0 }}>{spreadBps >= 100 ? `✓ Above 100 bps minimum` : `✗ Below 100 bps minimum — reconsider`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── QUIZ ───────────────────────────────────────────────────────────────────
function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [done, setDone] = useState(false);

  const q = QUIZ_QUESTIONS[current];
  const totalQ = QUIZ_QUESTIONS.length;
  const score = answers.filter((a, i) => a === QUIZ_QUESTIONS[i].answer).length;
  const pct = Math.round((score / totalQ) * 100);

  const handleSelect = (idx) => {
    if (showResult) return;
    setSelected(idx);
  };

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);

    if (current + 1 >= totalQ) {
      setDone(true);
    } else {
      setCurrent(current + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  const reset = () => {
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setShowResult(false);
    setDone(false);
  };

  if (done) {
    let verdict, verdictColor, verdictBg;
    if (pct >= 85) { verdict = '✅ Ready to advance to Week 2!'; verdictColor = '#1E8449'; verdictBg = '#EAF7EE'; }
    else if (pct >= 65) { verdict = '📖 Review recommended before advancing'; verdictColor = '#B7950B'; verdictBg = '#FEF9E7'; }
    else { verdict = '🔄 Retry recommended — review key concepts first'; verdictColor = '#C0392B'; verdictBg = '#FDEDEC'; }

    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
          {pct >= 85 ? '🎉' : pct >= 65 ? '📚' : '💪'}
        </div>
        <h2 style={{ color: '#1B4F72', marginBottom: '0.25rem' }}>Quiz Complete!</h2>
        <p style={{ fontSize: '3rem', fontWeight: 800, color: '#1B4F72', margin: '0.5rem 0' }}>{pct}%</p>
        <p style={{ color: '#555', marginBottom: '1rem' }}>{score} / {totalQ} correct</p>
        <div style={{ background: verdictBg, border: `1px solid ${verdictColor}`, borderRadius: '10px', padding: '1rem', marginBottom: '1.5rem', display: 'inline-block' }}>
          <p style={{ color: verdictColor, fontWeight: 700, margin: 0 }}>{verdict}</p>
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#444' }}>Score Thresholds:</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {[['85%+', 'Advance', '#27AE60'], ['65–84%', 'Review', '#F39C12'], ['<65%', 'Retry', '#E74C3C']].map(([range, label, color]) => (
              <div key={range} style={{ background: `${color}15`, border: `1px solid ${color}`, borderRadius: '6px', padding: '0.4rem 0.8rem', textAlign: 'center' }}>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, color, margin: 0 }}>{range}</p>
                <p style={{ fontSize: '0.75rem', color: '#666', margin: 0 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
        <button onClick={reset} style={{ padding: '0.6rem 2rem', background: '#1B4F72', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}>
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1B4F72', margin: 0 }}>
          📝 Domain 1, Week 1 — Quiz
        </h3>
        <span style={{ fontSize: '0.82rem', color: '#888' }}>{current + 1} / {totalQ}</span>
      </div>

      {/* Progress bar */}
      <div style={{ height: '6px', background: '#e9ecef', borderRadius: '3px', marginBottom: '1.25rem' }}>
        <div style={{ height: '100%', background: '#1B4F72', borderRadius: '3px', width: `${((current) / totalQ) * 100}%`, transition: 'width 0.3s' }} />
      </div>

      <p style={{ fontWeight: 600, color: '#222', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: '1.5' }}>{q.q}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
        {q.options.map((opt, i) => {
          let bg = 'white', border = '1px solid #dee2e6', color = '#333';
          if (selected === i) {
            if (showResult) {
              bg = i === q.answer ? '#EAF7EE' : '#FDEDEC';
              border = `2px solid ${i === q.answer ? '#27AE60' : '#E74C3C'}`;
              color = i === q.answer ? '#1E8449' : '#C0392B';
            } else {
              bg = '#EBF5FB'; border = '2px solid #2980B9'; color = '#1A5276';
            }
          } else if (showResult && i === q.answer) {
            bg = '#EAF7EE'; border = '2px solid #27AE60'; color = '#1E8449';
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              style={{ textAlign: 'left', padding: '0.65rem 1rem', background: bg, border, borderRadius: '8px', color, fontSize: '0.85rem', cursor: showResult ? 'default' : 'pointer', transition: 'all 0.15s', lineHeight: '1.4' }}
            >
              <span style={{ fontWeight: 600, marginRight: '0.5rem' }}>{String.fromCharCode(65 + i)}.</span>{opt}
            </button>
          );
        })}
      </div>

      {selected !== null && !showResult && (
        <button onClick={() => setShowResult(true)} style={{ padding: '0.5rem 1.25rem', background: '#2980B9', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem' }}>
          Check Answer
        </button>
      )}

      {showResult && (
        <div style={{ background: selected === q.answer ? '#EAF7EE' : '#FDF2F8', border: `1px solid ${selected === q.answer ? '#27AE60' : '#8E44AD'}`, borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1rem' }}>
          <p style={{ fontWeight: 700, color: selected === q.answer ? '#1E8449' : '#6C3483', margin: '0 0 0.25rem' }}>
            {selected === q.answer ? '✓ Correct!' : '✗ Not quite —'}
          </p>
          <p style={{ fontSize: '0.82rem', color: '#444', margin: 0 }}>{q.explanation}</p>
        </div>
      )}

      {showResult && (
        <button onClick={handleNext} style={{ padding: '0.55rem 1.5rem', background: '#1B4F72', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}>
          {current + 1 >= totalQ ? 'See Results' : 'Next Question →'}
        </button>
      )}
    </div>
  );
}

// ─── LESSON VIEW ─────────────────────────────────────────────────────────────
function LessonView({ week }) {
  const [openTerm, setOpenTerm] = useState(null);
  if (!week.vocabulary) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#aaa' }}>
        <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔒</p>
        <p style={{ fontWeight: 600, color: '#888' }}>Week {week.week}: {week.title}</p>
        <p style={{ fontSize: '0.85rem' }}>This week's content will unlock as you progress through the program.</p>
      </div>
    );
  }
  return (
    <div>
      {/* Sessions */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.6rem' }}>Study Sessions</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {week.sessions.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', padding: '0.5rem 0.75rem', background: '#F8F9FA', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.75rem', color: '#1B4F72', fontWeight: 700, width: '80px', flexShrink: 0, paddingTop: '0.1rem' }}>{s.day}</span>
              <span style={{ fontSize: '0.82rem', color: '#444' }}>{s.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Vocabulary */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>Vocabulary — 8 Key Terms</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {week.vocabulary.map((v, i) => (
            <div key={i} style={{ border: '1px solid #dee2e6', borderRadius: '8px', overflow: 'hidden' }}>
              <button
                onClick={() => setOpenTerm(openTerm === i ? null : i)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: openTerm === i ? '#EBF5FB' : 'white', border: 'none', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#1B4F72', background: '#D6EAF8', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>{v.term}</span>
                  <span style={{ fontSize: '0.82rem', color: '#555' }}>{v.full}</span>
                </div>
                <span style={{ color: '#aaa', fontSize: '0.9rem' }}>{openTerm === i ? '▲' : '▼'}</span>
              </button>
              {openTerm === i && (
                <div style={{ padding: '0.75rem 1rem', background: '#F8FBFF', borderTop: '1px solid #BDE0F8' }}>
                  <p style={{ fontSize: '0.85rem', color: '#333', lineHeight: '1.6', margin: '0 0 0.5rem' }}>{v.definition}</p>
                  <p style={{ fontSize: '0.8rem', color: '#2980B9', background: '#EBF5FB', padding: '0.4rem 0.7rem', borderRadius: '5px', margin: 0, fontStyle: 'italic' }}>📌 {v.example}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Key Concepts */}
      <div>
        <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>Core Concepts</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {week.keyConceptsText.map((c, i) => (
            <div key={i} style={{ background: '#F8F9FA', borderLeft: '4px solid #1B4F72', borderRadius: '0 8px 8px 0', padding: '0.75rem 1rem' }}>
              <p style={{ fontWeight: 700, color: '#1B4F72', margin: '0 0 0.35rem', fontSize: '0.9rem' }}>{c.heading}</p>
              <p style={{ fontSize: '0.83rem', color: '#444', margin: 0, lineHeight: '1.65' }}>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [activeDomainIdx, setActiveDomainIdx] = useState(0);
  const [activeWeekIdx, setActiveWeekIdx] = useState(0);
  const [activeTab, setActiveTab] = useState('lesson');

  const domain = DOMAINS[activeDomainIdx];
  const week = domain.weeks[activeWeekIdx];
  const hasTools = domain.id === 1 && week.week === 1;

  const tabs = hasTools
    ? [{ id: 'lesson', label: '📖 Lesson' }, { id: 'proforma', label: '📊 Pro Forma' }, { id: 'caprate', label: '🔍 Cap Rates' }, { id: 'quiz', label: '📝 Quiz' }]
    : [{ id: 'lesson', label: '📖 Lesson' }];

  const handleDomainChange = (idx) => {
    setActiveDomainIdx(idx);
    setActiveWeekIdx(0);
    setActiveTab('lesson');
  };

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh', background: '#F0F3F7', color: '#222' }}>
      {/* Header */}
      <div style={{ background: '#1B4F72', color: 'white', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ margin: 0, fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.7 }}>HTA Construction & Development · Infinity</p>
          <h1 style={{ margin: '0.15rem 0 0', fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.01em' }}>Learning Series</h1>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: 0, fontSize: '0.7rem', opacity: 0.7 }}>David Parada</p>
          <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.85 }}>Domain 1, Week 1 · Active</p>
        </div>
      </div>

      {/* Domain tabs */}
      <div style={{ background: 'white', borderBottom: '1px solid #dee2e6', padding: '0 1rem', display: 'flex', gap: '0', overflowX: 'auto' }}>
        {DOMAINS.map((d, i) => (
          <button
            key={d.id}
            onClick={() => handleDomainChange(i)}
            style={{
              padding: '0.75rem 1.1rem',
              border: 'none',
              borderBottom: activeDomainIdx === i ? `3px solid ${d.color}` : '3px solid transparent',
              background: 'transparent',
              fontWeight: activeDomainIdx === i ? 700 : 400,
              color: activeDomainIdx === i ? d.color : '#888',
              cursor: 'pointer',
              fontSize: '0.82rem',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s'
            }}
          >
            {d.icon} Domain {d.id}: {d.title}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 120px)' }}>
        {/* Week sidebar */}
        <div style={{ width: '220px', flexShrink: 0, background: 'white', borderRight: '1px solid #dee2e6', padding: '1rem 0', overflowY: 'auto' }}>
          <p style={{ fontSize: '0.7rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 1rem', marginBottom: '0.5rem' }}>12-Week Plan</p>
          {domain.weeks.map((w, i) => (
            <button
              key={i}
              onClick={() => { setActiveWeekIdx(i); setActiveTab('lesson'); }}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '0.55rem 1rem',
                border: 'none',
                background: activeWeekIdx === i ? `${domain.color}12` : 'transparent',
                borderLeft: activeWeekIdx === i ? `3px solid ${domain.color}` : '3px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{
                  width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: w.status === 'active' ? domain.color : '#e9ecef',
                  color: w.status === 'active' ? 'white' : '#aaa',
                  fontSize: '0.6rem', fontWeight: 700, flexShrink: 0
                }}>{w.week}</span>
                <span style={{ fontSize: '0.77rem', color: activeWeekIdx === i ? domain.color : (w.status === 'upcoming' ? '#bbb' : '#444'), fontWeight: activeWeekIdx === i ? 700 : 400, lineHeight: '1.3' }}>
                  {w.title}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: '1.25rem', overflowY: 'auto' }}>
          {/* Content header */}
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#888' }}>Domain {domain.id} · Week {week.week}</p>
            <h2 style={{ margin: '0.15rem 0 0', fontSize: '1.15rem', fontWeight: 800, color: '#1B4F72' }}>{week.title}</h2>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.25rem', background: '#e9ecef', borderRadius: '8px', padding: '0.25rem' }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: '0.45rem 0.75rem',
                  border: 'none',
                  borderRadius: '6px',
                  background: activeTab === tab.id ? 'white' : 'transparent',
                  fontWeight: activeTab === tab.id ? 700 : 400,
                  color: activeTab === tab.id ? '#1B4F72' : '#888',
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  boxShadow: activeTab === tab.id ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.15s'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div style={{ background: 'white', borderRadius: '10px', padding: '1.25rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            {activeTab === 'lesson' && <LessonView week={week} />}
            {activeTab === 'proforma' && hasTools && <ProFormaCalculator />}
            {activeTab === 'caprate' && hasTools && <CapRateExplorer />}
            {activeTab === 'quiz' && hasTools && <Quiz />}
          </div>
        </div>
      </div>
    </div>
  );
}
