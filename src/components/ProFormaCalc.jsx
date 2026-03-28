import { useState } from 'react'
import { C, fmtUSD, fmtPct, fmtX } from '../data/courseData'

const UNIT_TYPES = [
  { label: 'Studio', countKey: 'uStudio', rentKey: 'rStudio' },
  { label: '1 bedroom', countKey: 'u1', rentKey: 'r1' },
  { label: '2 bedroom', countKey: 'u2', rentKey: 'r2' },
  { label: '3 bedroom', countKey: 'u3', rentKey: 'r3' },
]

export const DEFAULT_PROFORMA_INP = {
  uStudio: 8, rStudio: 1900,
  u1: 15, r1: 2300,
  u2: 22, r2: 2600,
  u3: 5, r3: 3200,
  vacPct: 5, ancillary: 15000,
  opExPct: 35, loan: 7500000, rate: 6.5, term: 30,
  landCost: 2500000,
  cost: 9500000,
  value: 13500000,
  buildingGsf: 32397,
  stories: 4,
  parking: 30,
}

export default function ProFormaCalc({ inp: inpProp, setInp: setInpProp }) {
  const [localInp, setLocalInp] = useState(DEFAULT_PROFORMA_INP)
  const controlled = inpProp !== undefined && setInpProp !== undefined
  const inp = controlled ? inpProp : localInp
  const setInp = controlled ? setInpProp : setLocalInp

  const set = (k, v) => setInp(p => ({ ...p, [k]: parseFloat(v) || 0 }))

  const monthlyRentRoll =
    inp.uStudio * inp.rStudio +
    inp.u1 * inp.r1 +
    inp.u2 * inp.r2 +
    inp.u3 * inp.r3

  const totalUnits = inp.uStudio + inp.u1 + inp.u2 + inp.u3
  const blendedAvgRent = totalUnits > 0 ? monthlyRentRoll / totalUnits : 0

  const GPR = monthlyRentRoll * 12
  const vacL = GPR * (inp.vacPct / 100)
  const EGI = GPR - vacL + inp.ancillary
  const opEx = EGI * (inp.opExPct / 100)
  const NOI = EGI - opEx
  const mr = inp.rate / 100 / 12
  const np = inp.term * 12
  const mp = inp.loan * (mr * Math.pow(1 + mr, np)) / (Math.pow(1 + mr, np) - 1)
  const DS = mp * 12
  const CFBT = NOI - DS
  const capR = inp.value > 0 ? (NOI / inp.value) * 100 : 0
  const totalProjectCost = inp.landCost + inp.cost
  const YOC = totalProjectCost > 0 ? (NOI / totalProjectCost) * 100 : 0
  const LTV = inp.value > 0 ? (inp.loan / inp.value) * 100 : 0
  const DSCR = DS > 0 ? NOI / DS : 0
  const spreadBps = Math.round((YOC - capR) * 100)

  const fields = [
    { label: 'Vacancy Rate', key: 'vacPct', prefix: '', suffix: '%' },
    { label: 'Ancillary Income (Annual)', key: 'ancillary', prefix: '$', suffix: '' },
    { label: 'Operating Expense Ratio', key: 'opExPct', prefix: '', suffix: '%' },
    { label: 'Loan Amount', key: 'loan', prefix: '$', suffix: '' },
    { label: 'Interest Rate', key: 'rate', prefix: '', suffix: '%' },
    { label: 'Loan Term (years)', key: 'term', prefix: '', suffix: '' },
    { label: 'Land acquisition cost', key: 'landCost', prefix: '$', suffix: '' },
    { label: 'Construction & soft costs (excl. land)', key: 'cost', prefix: '$', suffix: '' },
    { label: 'Property Value', key: 'value', prefix: '$', suffix: '' },
  ]

  const waterfall = [
    { label: 'Gross Potential Rent (GPR)', val: fmtUSD(GPR), color: C.navy, bold: true, indent: false },
    { label: `− Vacancy & Credit Loss (${inp.vacPct}%)`, val: `(${fmtUSD(vacL)})`, color: C.red, bold: false, indent: true },
    { label: '+ Ancillary Income', val: fmtUSD(inp.ancillary), color: C.green, bold: false, indent: true },
    { label: 'Effective Gross Income (EGI)', val: fmtUSD(EGI), color: C.blue, bold: true, indent: false },
    { label: `− Operating Expenses (${inp.opExPct}% of EGI)`, val: `(${fmtUSD(opEx)})`, color: C.red, bold: false, indent: true },
    { label: 'Net Operating Income (NOI)', val: fmtUSD(NOI), color: C.navy, bold: true, indent: false },
    { label: '− Annual Debt Service', val: `(${fmtUSD(DS)})`, color: C.red, bold: false, indent: true },
    { label: 'Cash Flow Before Tax (CFBT)', val: fmtUSD(CFBT), color: CFBT >= 0 ? C.green : C.red, bold: true, indent: false },
  ]

  const metrics = [
    { label: 'Cap Rate', val: fmtPct(capR), pass: null, note: 'NOI ÷ Value' },
    { label: 'YOC', val: fmtPct(YOC), pass: null, note: 'NOI ÷ Total project cost' },
    { label: 'LTV', val: fmtPct(LTV), pass: LTV <= 75, note: LTV <= 75 ? '✓ ≤ 75%' : '✗ > 75%' },
    { label: 'DSCR', val: fmtX(DSCR), pass: DSCR >= 1.25, note: DSCR >= 1.25 ? '✓ ≥ 1.25x' : '✗ < 1.25x' },
  ]

  const inputRow = (label, key, prefix, suffix) => (
    <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.55rem' }}>
      <label style={{ fontSize: '0.78rem', color: '#444', width: '185px', flexShrink: 0 }}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center', background: C.gray, border: `1px solid ${C.border}`, borderRadius: '6px', overflow: 'hidden', flex: 1 }}>
        {prefix && <span style={{ padding: '0.3rem 0.5rem', background: '#e9ecef', fontSize: '0.8rem', color: '#666' }}>{prefix}</span>}
        <input
          type="number"
          value={inp[key]}
          onChange={e => set(key, e.target.value)}
          style={{ border: 'none', background: 'transparent', padding: '0.3rem 0.5rem', width: '100%', fontSize: '0.85rem', outline: 'none', color: C.text }}
        />
        {suffix && <span style={{ padding: '0.3rem 0.5rem', background: '#e9ecef', fontSize: '0.8rem', color: '#666' }}>{suffix}</span>}
      </div>
    </div>
  )

  return (
    <div>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: C.navy, marginBottom: '1.25rem' }}>📊 Interactive Pro Forma Calculator</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>

        <div>
          <p style={{ fontSize: '0.72rem', fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.5rem' }}>Unit mix</p>
          <div style={{ marginBottom: '0.65rem', padding: '0.65rem 0.75rem', background: C.gray, border: `1px solid ${C.border}`, borderRadius: '8px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 72px 1fr', gap: '0.35rem 0.5rem', alignItems: 'center', marginBottom: '0.45rem' }}>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: C.muted }}>Type</span>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: C.muted, textAlign: 'center' }}>Units</span>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: C.muted }}>Avg $/mo</span>
            </div>
            {UNIT_TYPES.map(({ label, countKey, rentKey }) => (
              <div key={countKey} style={{ display: 'grid', gridTemplateColumns: '1fr 72px 1fr', gap: '0.35rem 0.5rem', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.78rem', color: '#444' }}>{label}</span>
                <input
                  type="number"
                  min={0}
                  value={inp[countKey]}
                  onChange={e => set(countKey, e.target.value)}
                  style={{ border: `1px solid ${C.border}`, borderRadius: '6px', padding: '0.28rem 0.35rem', fontSize: '0.82rem', textAlign: 'center', width: '100%' }}
                />
                <div style={{ display: 'flex', alignItems: 'center', background: 'white', border: `1px solid ${C.border}`, borderRadius: '6px', overflow: 'hidden' }}>
                  <span style={{ padding: '0.28rem 0.4rem', background: '#e9ecef', fontSize: '0.75rem', color: '#666' }}>$</span>
                  <input
                    type="number"
                    min={0}
                    value={inp[rentKey]}
                    onChange={e => set(rentKey, e.target.value)}
                    style={{ border: 'none', background: 'transparent', padding: '0.28rem 0.35rem', width: '100%', fontSize: '0.82rem', outline: 'none', color: C.text }}
                  />
                </div>
              </div>
            ))}
            <p style={{ margin: '0.5rem 0 0', fontSize: '0.72rem', color: C.muted, lineHeight: 1.45 }}>
              <strong style={{ color: '#555' }}>{totalUnits}</strong> units total · blended avg rent <strong style={{ color: C.navy }}>{fmtUSD(blendedAvgRent)}</strong>/mo
            </p>
          </div>

          <p style={{ fontSize: '0.72rem', fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.5rem' }}>Building (soft cost $/SF & $/unit)</p>
          <p style={{ fontSize: '0.72rem', color: C.muted, margin: '0 0 0.5rem', lineHeight: 1.45 }}>
            These feed the <strong style={{ color: '#555' }}>Soft Cost Budget</strong> below: pro forma GSF, stories, and parking.
          </p>
          <div style={{ marginBottom: '0.75rem' }}>
            {[
              { label: 'Building GSF (pro forma)', key: 'buildingGsf', prefix: '', suffix: 'sf' },
              { label: 'Stories', key: 'stories', prefix: '', suffix: '' },
              { label: 'Parking spaces', key: 'parking', prefix: '', suffix: '' },
            ].map(({ label, key, prefix, suffix }) => inputRow(label, key, prefix, suffix))}
          </div>

          <p style={{ fontSize: '0.72rem', fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.75rem' }}>Other inputs</p>
          {fields.map(({ label, key, prefix, suffix }) => inputRow(label, key, prefix, suffix))}
          <p style={{ margin: '0.35rem 0 0', fontSize: '0.72rem', color: C.muted, paddingLeft: '0.15rem' }}>
            Total project cost (land + construction and soft): <strong style={{ color: C.navy }}>{fmtUSD(totalProjectCost)}</strong>
          </p>
        </div>

        <div>
          <p style={{ fontSize: '0.72rem', fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.75rem' }}>Pro Forma Waterfall</p>
          <div style={{ marginBottom: '1.25rem' }}>
            {waterfall.map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: `0.28rem ${row.indent ? '1.2rem' : '0.6rem'}`, background: row.bold ? '#F0F4F8' : 'transparent', borderRadius: '4px' }}>
                <span style={{ fontSize: '0.79rem', color: '#555' }}>{row.label}</span>
                <span style={{ fontSize: '0.84rem', fontWeight: row.bold ? 700 : 400, color: row.color }}>{row.val}</span>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '0.72rem', fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.6rem' }}>Key Metrics</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
            {metrics.map((m, i) => (
              <div key={i} style={{ background: C.gray, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '0.6rem 0.8rem' }}>
                <p style={{ fontSize: '0.69rem', color: C.muted, margin: 0 }}>{m.label}</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 800, color: m.pass === null ? C.navy : (m.pass ? C.green : C.red), margin: '0.1rem 0' }}>{m.val}</p>
                <p style={{ fontSize: '0.68rem', color: m.pass === null ? '#bbb' : (m.pass ? C.green : C.red), margin: 0 }}>{m.note}</p>
              </div>
            ))}
          </div>

          <div style={{ padding: '0.75rem 1rem', background: spreadBps >= 100 ? C.greenL : C.redL, border: `1px solid ${spreadBps >= 100 ? C.green : C.red}`, borderRadius: '8px' }}>
            <p style={{ margin: 0, fontWeight: 700, fontSize: '0.84rem', color: spreadBps >= 100 ? '#1E8449' : '#C0392B' }}>
              {spreadBps >= 100 ? '✓' : '✗'} Development Spread: {spreadBps} bps
            </p>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.75rem', color: '#555' }}>
              YOC {fmtPct(YOC)} − Cap Rate {fmtPct(capR)} = {spreadBps} bps
              {spreadBps >= 100 ? ' — meets 100 bps minimum ✓' : ' — below 100 bps minimum, reconsider'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
