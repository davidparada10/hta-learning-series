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
            body: 'Before any deal moves forward at HTA Construction, it must pass four checks: (1) NOI — does the property generate sufficient operating income? (2) Spread — is YOC at least 100–150 bps above market cap rate? (3) Stack — can the capital structure support the deal at acceptable LTV and DSCR? (4) Entitlement — what can actually be built on this site, and what does the approval timeline look like?',
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
      {
        week: 2, title: 'Cap Rates & Valuation', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Study the income approach vs. the comp approach to valuation — understand when each method is appropriate. Map SoCal cap rates by asset class using current CBRE or Marcus & Millichap data. Practice: given a stabilized NOI, derive the asset value at market cap rates for industrial, multifamily, and office.' },
          { heading: 'Milestone', body: 'Can read a cap rate report, apply it to a real asset, and explain what drives cap rate compression or expansion in a given market.' },
        ],
      },
      {
        week: 3, title: 'Land Use & Zoning', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Read a real zoning ordinance — use the Long Beach municipal code. Identify FAR, setbacks, height limits, and permitted use types on a sample parcel. Map HTA project sites against their zoning designations and flag any non-conforming conditions.' },
          { heading: 'Milestone', body: 'Can open a zoning code, identify what is buildable on a given parcel, and flag any variances or entitlement risk before a site goes under contract.' },
        ],
      },
      {
        week: 4, title: 'Entitlement Process', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Map the CUP (Conditional Use Permit) and design review process step-by-step in Long Beach. Research a recent LA-area entitlement case study — timeline, costs, and outcome. If possible, do a 30-minute call with a local land use attorney to understand the pressure points.' },
          { heading: 'Milestone', body: 'Can describe the full entitlement path for a typical HTA project type, estimate timeline and risk, and identify which step is most likely to cause delay.' },
        ],
      },
      {
        week: 5, title: 'Development Budget', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Build a full development budget from scratch: hard costs, soft costs, carry costs, and contingency. Benchmark HTA project costs vs. RSMeans unit costs for your primary building types. Learn how contingency percentage shifts by project phase — predevelopment vs. construction vs. closeout.' },
          { heading: 'Milestone', body: 'Can structure a complete development budget with appropriate line items, contingency, and carry — and explain why each cost category exists.' },
        ],
      },
      {
        week: 6, title: 'Capital Stack', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Map the full capital stack: senior debt (65–70%), mezzanine or preferred equity (10–15%), and common equity (GP + LP). Read a real term sheet from the Infinity deal files. Calculate waterfall distributions on a simple JV model — pref return first, then promote splits.' },
          { heading: 'Milestone', body: 'Can structure a basic capital stack, explain the risk/return at each layer, and calculate a simple JV waterfall distribution.' },
        ],
      },
      {
        week: 7, title: 'CA Land Use Law', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Read the SB 684 summary (ADU and small lot subdivision by-right). Study AB 2097 — the parking near transit elimination law and how it affects project feasibility. Identify which state statutes apply to Infinity deal types and how they change your entitlement assumptions.' },
          { heading: 'Milestone', body: 'Can identify which CA land use laws apply to a given site and explain how each one affects project feasibility, timeline, or cost.' },
        ],
      },
      {
        week: 8, title: 'Affordable Housing Finance', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Learn LIHTC basics: the difference between 4% and 9% tax credits, CDLAC allocation, and how credits convert to equity. Read one HCD-funded project pro forma end-to-end. Identify specifically how the public subsidy changes the capital stack vs. a market-rate deal.' },
          { heading: 'Milestone', body: 'Can read an affordable housing pro forma, identify the subsidy sources, and explain how they change project economics vs. market-rate development.' },
        ],
      },
      {
        week: 9, title: 'Value Engineering', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Pull a change log from a real HTA project and categorize the changes: design errors, owner changes, field conditions, VE. Practice: review a set of drawings and identify 3 value engineering opportunities that preserve function but reduce cost. Meet with Randy or Roy to discuss real field cost decisions made on recent projects.' },
          { heading: 'Milestone', body: 'Can evaluate a development deal end-to-end — from pro forma to budget to capital stack — and identify where value engineering can close a gap.' },
        ],
      },
      {
        week: 10, title: 'Sensitivity & Stress Testing', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Build a sensitivity table in Excel: rows = NOI (±10–20%), columns = cap rate (±50–100 bps), cells = implied value. Model a full downside scenario: vacancy +10%, construction cost +15%, timeline +6 months. Identify the deal-killer thresholds — the exact input levels where the deal fails LTV, DSCR, or YOC tests.' },
          { heading: 'Milestone', body: 'Can stress-test any development deal, identify the most sensitive inputs, and clearly articulate the break-even assumptions to an investment committee.' },
        ],
      },
      {
        week: 11, title: 'Full Deal Underwriting', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Select a real or hypothetical SoCal development site. Build a complete pro forma with development budget, capital stack, and JV waterfall. Prepare a 1-page investment summary: site, program, return metrics, key risks, and go/no-go recommendation.' },
          { heading: 'Milestone', body: 'Can underwrite a complete development deal independently and present the key assumptions, return metrics, and risks in a concise investment summary.' },
        ],
      },
      {
        week: 12, title: 'Capstone — Deal Memo', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Write a 2-page development deal memo for an Infinity opportunity. Present to Peter or Tom: walk through your assumptions, sensitivity analysis, risks, and return expectations. Debrief: identify what you would do differently in round 2.' },
          { heading: 'Milestone', body: 'Can underwrite and present a real development deal to HTA investment committee with a clear recommendation and supporting analysis.' },
        ],
      },
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
      {
        week: 1, title: 'Project Delivery Methods', status: 'active',
        concepts: [
          { heading: 'Study Tasks', body: 'Compare the four primary delivery methods: GC lump sum, CM-at-risk, design-build, and GMAX. Map which HTA projects used which method and why — what drove that decision for each project type. Read the AGC Guide to Project Delivery for a concise industry overview.' },
          { heading: 'Milestone', body: 'Can explain the tradeoffs between delivery methods and recommend the right approach for a given project type, risk profile, and owner relationship.' },
        ],
      },
      {
        week: 2, title: 'Drawings & CSI Divisions', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Read a full drawing set from one HTA project: civil, architectural, structural, and MEP sets. Map CSI MasterFormat divisions 1–16 to real scope items on that project. Find 3 scope gaps between the drawings and the spec — places where the scope is ambiguous or undocumented.' },
          { heading: 'Milestone', body: 'Can read a full drawing set, organize scope by CSI division, and identify where drawings and specs are inconsistent.' },
        ],
      },
      {
        week: 3, title: 'Estimating Fundamentals', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Build a quantity takeoff for one CSI division — concrete, framing, or MEP rough-in. Look up unit costs in RSMeans for each item you took off. Calculate the total installed cost including material, labor, and labor burden.' },
          { heading: 'Milestone', body: 'Can perform a basic quantity takeoff and build a cost estimate from unit prices, including labor burden.' },
        ],
      },
      {
        week: 4, title: 'Bid Leveling', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Pull 3 subcontractor bids from a real HTA project for the same scope. Build a bid comparison matrix in Excel: scope, base bid, alternates, exclusions, unit prices. Identify every scope gap, exclusion, and alternate — these are where the real bid leveling happens.' },
          { heading: 'Milestone', body: 'Can level multiple sub bids, identify scope gaps and exclusions, and produce a recommendation with risk notes.' },
        ],
      },
      {
        week: 5, title: 'CPM Scheduling', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Read a full project schedule from a real HTA job — in P6, MS Project, or Excel. Identify the critical path and calculate float for at least 3 activities. Practice: if framing slips 2 weeks, walk through the cascade — what else moves, and what is the owner impact?' },
          { heading: 'Milestone', body: 'Can read a CPM schedule, identify the critical path, and explain the downstream impact of a specific delay to scope or trade.' },
        ],
      },
      {
        week: 6, title: 'RFIs & Submittals', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Track 10 open RFIs on a live HTA project: what\'s the question, who needs to answer, what\'s the delay risk? Map the submittal log — which trades are late, who is waiting on whom, and what is the schedule impact. Write one original RFI based on a real drawing conflict you find yourself.' },
          { heading: 'Milestone', body: 'Can manage the RFI and submittal logs, identify critical path items, and escalate issues before they cause delay.' },
        ],
      },
      {
        week: 7, title: 'Subcontract Management', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Review the HTA standard subcontract template clause by clause. Identify 3 clauses that carry the most risk for the subcontractor. Draft a scope exhibit for a concrete subcontract — what\'s in scope, what\'s excluded, what are the interfaces.' },
          { heading: 'Milestone', body: 'Can read a subcontract, identify the high-risk clauses, and draft a clear scope exhibit that reduces ambiguity.' },
        ],
      },
      {
        week: 8, title: 'Change Order Management', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Pull 5 change orders from a real HTA project. Classify each one: owner-driven change, design error, unforeseen field condition, or scope gap. For each CO, calculate the schedule impact in addition to the cost — what did it do to the critical path?' },
          { heading: 'Milestone', body: 'Can classify, price, and negotiate a change order — and explain the schedule impact alongside the cost.' },
        ],
      },
      {
        week: 9, title: 'Cost-to-Complete Forecasting', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Build a cost-to-complete (CTC) report for one HTA project using real budget and actual data. Compare budget vs. actual by CSI division. Flag any division trending over by more than 5% — develop a narrative explaining why and what the corrective action is.' },
          { heading: 'Milestone', body: 'Can build a cost-to-complete report, explain variances by division, and present a forecast with corrective action plan.' },
        ],
      },
      {
        week: 10, title: 'Field Operations', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Spend a day on-site with Joe or Geo on a live HTA project. Document 5 real coordination issues you observe — trade conflicts, sequencing problems, access issues, safety concerns. Propose a specific solution for each issue observed.' },
          { heading: 'Milestone', body: 'Can observe field operations, identify coordination issues, and communicate solutions clearly to the field team and subcontractors.' },
        ],
      },
      {
        week: 11, title: 'Owner/GC Reporting', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Draft a complete monthly owner report for one HTA project. Include all four sections: schedule status (critical path, percent complete, look-ahead), cost status (budget vs. actual, pending COs), open issues (RFIs, submittals, decisions needed), and risk log.' },
          { heading: 'Milestone', body: 'Can produce a clear, complete monthly owner report that proactively surfaces risks and gives the owner everything needed to make decisions.' },
        ],
      },
      {
        week: 12, title: 'Capstone — Bid Package', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Assemble a complete bid package for a hypothetical $5M commercial project. Include: drawing set (real or schematic), scope narrative by CSI division, bid leveling matrix, CPM schedule, and subcontract form. Present to HTA leadership as a mock GC proposal.' },
          { heading: 'Milestone', body: 'Can run a complete bid process and produce all the deliverables a GC needs to win and successfully execute a commercial construction project.' },
        ],
      },
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
      {
        week: 1, title: 'AIA Contract Family', status: 'active',
        concepts: [
          { heading: 'Study Tasks', body: 'Read AIA A201 General Conditions — skim the full document for structure, then deep-read the key articles: Article 3 (Contractor), Article 7 (Changes), Article 14 (Termination). Map which sections primarily protect the GC vs. the owner. Identify which AIA forms HTA currently uses and in what project contexts.' },
          { heading: 'Milestone', body: 'Can read a construction contract and immediately identify the clauses that carry the most risk — for HTA as GC and for the owner.' },
        ],
      },
      {
        week: 2, title: 'Indemnity & Insurance', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Find the indemnity clause in one HTA owner contract. Classify it: broad form (indemnify even for owner negligence), intermediate form, or limited form (each party responsible for own negligence only). Pull a certificate of insurance from that same project and verify that all coverages match the contract requirements.' },
          { heading: 'Milestone', body: 'Can read an indemnity clause, classify its scope, and verify that the insurance certificate actually satisfies the contractual requirements.' },
        ],
      },
      {
        week: 3, title: 'CA Lien Law', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Learn the California preliminary notice deadline: 20 days from first furnishing of labor or materials. Map the full mechanic\'s lien filing timeline in CA — preliminary notice, lien filing, enforcement deadlines. Verify that HTA\'s current preliminary notice process is compliant for both GC and sub work.' },
          { heading: 'Milestone', body: 'Can explain California\'s lien law timeline, confirm whether HTA\'s process is compliant, and explain what happens if a deadline is missed.' },
        ],
      },
      {
        week: 4, title: 'Subcontract Flow-Down', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Place one HTA owner contract and the HTA standard subcontract side by side. Identify which owner-imposed obligations flow down to the subcontractors. Flag any gaps where HTA is bound to the owner by a term that has not been passed down to the sub performing that scope.' },
          { heading: 'Milestone', body: 'Can identify flow-down gaps in HTA\'s subcontract structure — places where HTA holds risk from the owner that has not been allocated to the performing sub.' },
        ],
      },
      {
        week: 5, title: 'Scope & Change Clauses', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Read Article 7 of AIA A201 (Changes in the Work) in full. Find the notice requirements for claiming additional cost or time — what triggers them, what the deadlines are, and what happens if notice is late. Draft a sample written notice letter based on a real HTA change order situation.' },
          { heading: 'Milestone', body: 'Can identify when a notice obligation is triggered, draft a proper notice letter, and explain the consequences of failing to provide timely notice.' },
        ],
      },
      {
        week: 6, title: 'Delay & Disruption', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Learn the distinction between excusable delay (no damages, time extension only), compensable delay (time + money), and non-excusable delay (contractor\'s fault, liable). Find the force majeure clause in an HTA contract. Classify 3 real delays from HTA project history by type: which category does each fall into, and what was HTA\'s remedy?' },
          { heading: 'Milestone', body: 'Can classify any project delay by type, explain HTA\'s rights and obligations in each case, and advise on the appropriate contractual response.' },
        ],
      },
      {
        week: 7, title: 'Dispute Resolution', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Compare the three primary dispute resolution paths: mediation (non-binding, fast, cheap), AAA construction arbitration (binding, faster than litigation), and litigation (court, public record, expensive). Read the AAA Construction Arbitration rules summary. Identify which HTA contracts include mandatory arbitration clauses and which are silent.' },
          { heading: 'Milestone', body: 'Can advise on the right dispute resolution path for a given HTA claim — considering cost, speed, enforceability, and relationship impact.' },
        ],
      },
      {
        week: 8, title: 'Contract Redlining', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Take one HTA owner contract and redline it from the GC\'s perspective. Focus on the highest-impact clauses: indemnity (narrow it), intellectual property (retain construction documents rights), limitation of liability (add a cap), and consequential damages (mutual waiver). Get feedback from Peter or outside counsel on your redline.' },
          { heading: 'Milestone', body: 'Can redline a construction contract from the GC\'s perspective and justify each markup with a clear business or legal rationale.' },
        ],
      },
      {
        week: 9, title: 'ConsensusDocs vs AIA', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Read ConsensusDocs 200 — the GC/subcontractor-friendly alternative to AIA A101. Compare 5 key structural differences from AIA: risk allocation, change order procedures, dispute resolution, indemnity language, and owner\'s right to terminate. Identify when you would recommend ConsensusDocs to an owner over AIA — and when you would not.' },
          { heading: 'Milestone', body: 'Can explain the key differences between AIA and ConsensusDocs contract families and recommend the right form for a given owner relationship and project type.' },
        ],
      },
      {
        week: 10, title: 'Subcontractor Default', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Read the termination for default clause in AIA A401 (GC-Subcontractor Agreement). Learn the required steps: written notice, cure period (typically 7 days), completion at sub\'s cost, and performance bond trigger. Draft an internal HTA standard operating procedure for handling a subcontractor default event from first notice through completion.' },
          { heading: 'Milestone', body: 'Can manage a subcontractor default event step-by-step — providing proper notice, managing the cure period, and escalating to bond or completion contractor as required.' },
        ],
      },
      {
        week: 11, title: 'Owner Contract Strategy', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Identify HTA\'s top 3 contract risk exposures based on your review of real project contracts this quarter. Draft a contract negotiation checklist for new owner agreements — organized by clause type and priority: must-have, prefer, and acceptable-if-needed.' },
          { heading: 'Milestone', body: 'Can advise HTA on contract negotiation strategy for a new owner — knowing which clauses to push on hard, which to accept, and which are deal-breakers.' },
        ],
      },
      {
        week: 12, title: 'Capstone — Contract Playbook', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Build a 1-page HTA contract risk cheat sheet: top 10 clauses to negotiate, what to push for, and what to accept. Include: indemnity, insurance, liquidated damages, consequential damages waiver, change order notice, termination for convenience. Present to Randy or Peter as a field-ready reference document.' },
          { heading: 'Milestone', body: 'HTA has a contract playbook you built — a practical, field-ready reference that helps any HTA project manager navigate owner contract negotiations.' },
        ],
      },
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
      {
        week: 1, title: 'Cap Rates & NOI Review', status: 'active',
        concepts: [
          { heading: 'Study Tasks', body: 'Solidify cap rate mechanics — use the interactive lesson and pro forma calculator. Pull 3 recent SoCal commercial sales comps from CoStar or LoopNet. For each sale, find or estimate the NOI and calculate the implied cap rate. Compare your implied cap rates to the CBRE benchmark ranges.' },
          { heading: 'Milestone', body: 'Can look at any SoCal sale comp, derive the implied cap rate, and benchmark it against current market ranges by asset class.' },
        ],
      },
      {
        week: 2, title: 'Asset Classes', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Read the NAIOP primer on the four major commercial asset classes: industrial, multifamily, retail, and office. Map the primary demand drivers for each asset class in the LA Basin — what makes each one grow or contract? Rank the four asset classes by risk/return in the current SoCal environment and justify your ranking.' },
          { heading: 'Milestone', body: 'Can describe the demand drivers, risk factors, and investor base for each major CRE asset class and explain how they compare in today\'s SoCal market.' },
        ],
      },
      {
        week: 3, title: 'Comp Sales Analysis', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Find 5 sales comps for a hypothetical Long Beach industrial parcel — use CoStar, LoopNet, or public records. Adjust each comp for key differences: building size, age, clear height, dock doors, lease terms, and location. Arrive at a supportable value conclusion for your hypothetical parcel with a stated range and point estimate.' },
          { heading: 'Milestone', body: 'Can run a comp sales analysis for a commercial parcel, make appropriate adjustments, and arrive at a defensible value conclusion.' },
        ],
      },
      {
        week: 4, title: 'DCF Modeling', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Build a 10-year DCF model in Excel for a stabilized commercial asset. Include: annual rent growth, vacancy assumptions, operating expense escalation, capital expenditure reserves, and exit cap rate. Calculate IRR and equity multiple at a range of exit cap rates (+/- 50 bps) to understand exit cap sensitivity.' },
          { heading: 'Milestone', body: 'Can build a 10-year DCF model from scratch, calculate IRR and equity multiple, and explain how exit cap rate assumptions drive returns.' },
        ],
      },
      {
        week: 5, title: 'Debt Structuring', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Learn the three key lender metrics: LTV (loan-to-value), DSCR (debt service coverage ratio), and debt yield (NOI ÷ loan amount). Map how a lender underwrites a SoCal industrial acquisition — what inputs drive max loan size? Practice: calculate the maximum loan amount for a sample deal using all three constraints.' },
          { heading: 'Milestone', body: 'Can underwrite the debt capacity for a CRE acquisition from the lender\'s perspective — applying LTV, DSCR, and debt yield constraints simultaneously.' },
        ],
      },
      {
        week: 6, title: 'SoCal Market Dynamics', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Pull the most current SoCal market report from CoStar, CBRE Research, or JLL. Map the key metrics for Long Beach industrial: vacancy rate, asking rent, rent growth, net absorption, and new supply under construction. Identify the top 3 market risks and top 3 tailwinds for SoCal industrial over the next 12–24 months.' },
          { heading: 'Milestone', body: 'Can read a commercial real estate market report, extract the key metrics, and build a market narrative that supports an investment thesis.' },
        ],
      },
      {
        week: 7, title: 'Value-Add Underwriting', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Find a real value-add listing in SoCal on LoopNet or CoStar — below-market rents, deferred maintenance, or short lease term. Model the full business plan: acquisition price, renovation budget, lease-up timeline, stabilized NOI, and exit. Compare your going-in cap rate vs. the projected exit cap rate and calculate the spread.' },
          { heading: 'Milestone', body: 'Can underwrite a value-add acquisition — modeling the business plan from purchase through stabilization and exit with IRR and equity multiple.' },
        ],
      },
      {
        week: 8, title: 'JV Structure & Waterfall', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Learn the mechanics of a real estate JV: preferred return (typically 7–9%), promote or carried interest (GP upside above pref), and GP/LP economic split. Model a simple 2-tier waterfall in Excel: return of capital + pref, then split at promote. Read a real JV term sheet — identify where the GP and LP economics diverge.' },
          { heading: 'Milestone', body: 'Can structure a JV waterfall, model the LP and GP economics at various IRR outcomes, and explain the promote mechanics to a prospective LP.' },
        ],
      },
      {
        week: 9, title: 'Asset Management', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Build a lease expiration schedule for a hypothetical 5-property portfolio — when does each lease expire, what is the renewal risk, and what is the mark-to-market opportunity? Build a 3-year CapEx plan for the same portfolio: what needs to be spent and when? Identify 2 assets to sell vs. hold based on your analysis.' },
          { heading: 'Milestone', body: 'Can manage an asset through its hold period — tracking leasing, capital needs, and the hold vs. sell decision at each stage.' },
        ],
      },
      {
        week: 10, title: 'Disposition Strategy', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Learn 1031 exchange mechanics: identification period (45 days), exchange period (180 days), like-kind requirement, and qualified intermediary rules. Compare three exit strategies for the same asset: outright sale, partial recapitalization, and cash-out refinance. Model after-tax proceeds for each option.' },
          { heading: 'Milestone', body: 'Can evaluate multiple disposition strategies for a CRE asset, model the after-tax proceeds for each, and recommend the optimal exit given the investor\'s objectives.' },
        ],
      },
      {
        week: 11, title: 'Investment Memo', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Select a real SoCal deal or a well-defined hypothetical. Build a complete investment memo: market overview, asset description, investment thesis, underwriting summary (DCF, returns), capital stack, key risks and mitigants, and go/no-go recommendation. Format it for an investment committee audience.' },
          { heading: 'Milestone', body: 'Can write a complete investment memo that gives a decision-maker everything needed to approve or reject a CRE acquisition.' },
        ],
      },
      {
        week: 12, title: 'Capstone — Infinity Deal', status: 'upcoming',
        concepts: [
          { heading: 'Study Tasks', body: 'Apply the full Domain 4 framework to a live Infinity Capital opportunity. Build the complete model: 10-year DCF, capital stack, JV waterfall, sensitivity table. Present to Peter with a go/no-go recommendation — walk through your market thesis, underwriting assumptions, return expectations, and top 3 risks.' },
          { heading: 'Milestone', body: 'Can bring a fully underwritten real deal to the HTA/Infinity investment committee with a clear recommendation backed by rigorous analysis.' },
        ],
      },
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
    q: 'The "Four Deal Checks" at HTA Construction are:',
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
