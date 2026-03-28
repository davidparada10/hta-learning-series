import { C } from '../data/courseData'

const fmtMoney = n =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
const fmtNum = n => (typeof n === 'number' && Number.isFinite(n) ? n.toLocaleString('en-US', { maximumFractionDigits: 2 }) : '—')

const th = {
  fontSize: '0.65rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  color: '#444',
  padding: '0.45rem 0.35rem',
  borderBottom: `2px solid ${C.border}`,
  textAlign: 'left',
}
const td = {
  fontSize: '0.78rem',
  padding: '0.38rem 0.35rem',
  borderBottom: `1px solid ${C.border}`,
  verticalAlign: 'middle',
}
const tdR = { ...td, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }
const tdBlueR = { ...tdR, color: C.blue, fontWeight: 600 }

const inpMoney = {
  border: `1px solid ${C.border}`,
  borderRadius: '4px',
  padding: '0.22rem 0.35rem',
  fontSize: '0.78rem',
  width: '100%',
  maxWidth: '96px',
  textAlign: 'right',
  fontVariantNumeric: 'tabular-nums',
  color: C.blue,
  fontWeight: 600,
  background: 'white',
}

function pctOf(n, d) {
  if (!d || d <= 0) return null
  return (n / d) * 100
}

function divSafe(n, d) {
  if (!d || d <= 0) return null
  return n / d
}

function EditableRow({
  num, name, pct, psf, punit, budget, actual, delta, alt,
  onBudget, onActual,
}) {
  return (
    <tr style={{ background: alt ? '#fafbfc' : 'white' }}>
      <td style={{ ...td, width: '28px', color: C.muted, fontSize: '0.72rem' }}>{num}</td>
      <td style={{ ...td, color: '#333' }}>{name}</td>
      <td style={tdR}>{pct != null ? `${fmtNum(pct)}%` : '—'}</td>
      <td style={tdR}>{psf != null ? fmtNum(psf) : '—'}</td>
      <td style={tdR}>{punit != null ? fmtNum(punit) : '—'}</td>
      <td style={tdBlueR}>
        <input type="number" min={0} step={100} value={budget ?? ''} onChange={e => onBudget(e.target.value)} style={inpMoney} />
      </td>
      <td style={tdBlueR}>
        <input type="number" min={0} step={100} value={actual ?? ''} onChange={e => onActual(e.target.value)} style={inpMoney} />
      </td>
      <td style={{ ...tdR, color: delta > 0 ? C.green : delta < 0 ? C.red : C.muted, fontWeight: 600 }}>{delta != null ? fmtMoney(delta) : '—'}</td>
    </tr>
  )
}

function SubRow({ label, pct, psf, punit, budget, actual, delta, strong }) {
  return (
    <tr style={{ background: '#eef2f7', fontWeight: strong ? 800 : 700 }}>
      <td style={{ ...td, borderBottom: `2px solid ${C.border}` }} colSpan={2}>{label}</td>
      <td style={{ ...tdR, borderBottom: `2px solid ${C.border}` }}>{pct != null ? `${fmtNum(pct)}%` : '—'}</td>
      <td style={{ ...tdR, borderBottom: `2px solid ${C.border}` }}>{psf != null ? fmtNum(psf) : '—'}</td>
      <td style={{ ...tdR, borderBottom: `2px solid ${C.border}` }}>{punit != null ? fmtNum(punit) : '—'}</td>
      <td style={{ ...tdBlueR, borderBottom: `2px solid ${C.border}` }}>{fmtMoney(budget)}</td>
      <td style={{ ...tdBlueR, borderBottom: `2px solid ${C.border}` }}>{fmtMoney(actual)}</td>
      <td style={{ ...tdR, borderBottom: `2px solid ${C.border}`, color: delta > 0 ? C.green : delta < 0 ? C.red : C.muted }}>{fmtMoney(delta)}</td>
    </tr>
  )
}

const metaInp = {
  border: `1px solid ${C.border}`,
  borderRadius: '4px',
  padding: '0.2rem 0.35rem',
  fontSize: '0.78rem',
  width: '88px',
  textAlign: 'right',
  fontVariantNumeric: 'tabular-nums',
}

const projectTextInp = {
  border: `1px solid ${C.border}`,
  borderRadius: '6px',
  padding: '0.35rem 0.5rem',
  fontSize: '0.85rem',
  width: '100%',
  maxWidth: '280px',
  color: C.navy,
  fontWeight: 700,
  background: 'white',
  boxSizing: 'border-box',
}

const projectTypeInp = {
  ...projectTextInp,
  fontWeight: 600,
  color: '#333',
}

export default function SoftCostBudget({
  projectMeta,
  setProjectMeta,
  proformaSf,
  proformaUnits,
  proformaStories,
  proformaParking,
  constructionSoftCost,
  actualMeta,
  setActualMeta,
  softRows,
  setSoftRows,
  feeRows,
  setFeeRows,
}) {
  const grandDen = softRows.reduce((s, r) => s + (r.budget || 0), 0) + feeRows.reduce((s, r) => s + (r.budget || 0), 0)

  const rowDerived = (budget) => ({
    pct: pctOf(budget, grandDen),
    psf: divSafe(budget, proformaSf),
    punit: divSafe(budget, proformaUnits),
  })

  const sumBudget = rows => rows.reduce((s, r) => s + (r.budget || 0), 0)
  const sumActual = rows => rows.reduce((s, r) => s + (r.actual || 0), 0)

  const subSoftB = sumBudget(softRows)
  const subSoftA = sumActual(softRows)
  const subFeeB = sumBudget(feeRows)
  const subFeeA = sumActual(feeRows)
  const grandB = subSoftB + subFeeB
  const grandA = subSoftA + subFeeA

  const setActual = (k, v) => {
    const n = parseFloat(v)
    setActualMeta(m => ({ ...m, [k]: Number.isFinite(n) ? n : 0 }))
  }

  const updateSoft = (i, field, raw) => {
    const n = parseFloat(raw)
    const v = Number.isFinite(n) ? n : 0
    setSoftRows(rows => {
      const next = [...rows]
      next[i] = { ...next[i], [field]: v }
      return next
    })
  }

  const updateFee = (i, field, raw) => {
    const n = parseFloat(raw)
    const v = Number.isFinite(n) ? n : 0
    setFeeRows(rows => {
      const next = [...rows]
      next[i] = { ...next[i], [field]: v }
      return next
    })
  }

  const subSoftDerived = rowDerived(subSoftB)
  const subFeeDerived = rowDerived(subFeeB)
  const grandDerived = rowDerived(grandB)

  const pctOfCs = constructionSoftCost > 0 ? (grandB / constructionSoftCost) * 100 : null

  return (
    <div style={{ marginTop: '2rem', paddingTop: '1.75rem', borderTop: `1px solid ${C.border}` }}>
      <div style={{ background: '#152a45', color: 'white', padding: '0.55rem 1rem', borderRadius: '8px 8px 0 0', fontFamily: 'Georgia, "Times New Roman", serif', fontSize: '1.05rem', fontWeight: 700, letterSpacing: '0.02em' }}>
        Soft Cost Budget
      </div>

      <div style={{ border: `1px solid ${C.border}`, borderTop: 'none', borderRadius: '0 0 10px 10px', overflow: 'hidden', background: 'white' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', justifyContent: 'space-between', padding: '1rem 1rem 0.75rem', background: '#f8f9fb', borderBottom: `1px solid ${C.border}` }}>
          <div>
            <p style={{ margin: '0 0 0.25rem', fontSize: '0.72rem', color: C.muted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Project</p>
            <input
              type="text"
              value={projectMeta.name}
              onChange={e => setProjectMeta(m => ({ ...m, name: e.target.value }))}
              style={projectTextInp}
              aria-label="Project name"
            />
            <p style={{ margin: '0.35rem 0 0', fontSize: '0.72rem', color: C.muted }}>Project type</p>
            <input
              type="text"
              value={projectMeta.type}
              onChange={e => setProjectMeta(m => ({ ...m, type: e.target.value }))}
              style={projectTypeInp}
              aria-label="Project type"
            />
          </div>
          <table style={{ borderCollapse: 'collapse', fontSize: '0.75rem', minWidth: '300px' }}>
            <thead>
              <tr>
                <th style={{ padding: '0.25rem 0.75rem', textAlign: 'left', color: C.muted, fontWeight: 600 }} />
                <th style={{ padding: '0.25rem 0.5rem', textAlign: 'right', color: C.navy, fontWeight: 700 }}>Proforma</th>
                <th style={{ padding: '0.25rem 0.5rem', textAlign: 'right', color: C.blue, fontWeight: 700 }}>Actual</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '0.2rem 0.75rem 0.2rem 0', color: '#555' }}>Sq. Ft.</td>
                <td style={{ padding: '0.2rem 0.5rem', textAlign: 'right', fontWeight: 600 }}>{typeof proformaSf === 'number' ? proformaSf.toLocaleString() : '—'}</td>
                <td style={{ padding: '0.2rem 0.5rem', textAlign: 'right' }}>
                  <input type="number" min={0} step={1} value={actualMeta.sqft || ''} onChange={e => setActual('sqft', e.target.value)} style={{ ...metaInp, color: C.blue, fontWeight: 600 }} />
                </td>
              </tr>
              <tr>
                <td style={{ padding: '0.2rem 0.75rem 0.2rem 0', color: '#555' }}># of Units</td>
                <td style={{ padding: '0.2rem 0.5rem', textAlign: 'right', fontWeight: 600 }}>{typeof proformaUnits === 'number' ? proformaUnits.toLocaleString() : '—'}</td>
                <td style={{ padding: '0.2rem 0.5rem', textAlign: 'right' }}>
                  <input type="number" min={0} step={1} value={actualMeta.units || ''} onChange={e => setActual('units', e.target.value)} style={{ ...metaInp, color: C.blue, fontWeight: 600 }} />
                </td>
              </tr>
              <tr>
                <td style={{ padding: '0.2rem 0.75rem 0.2rem 0', color: '#555' }}># of Stories</td>
                <td style={{ padding: '0.2rem 0.5rem', textAlign: 'right', fontWeight: 600 }}>{proformaStories}</td>
                <td style={{ padding: '0.2rem 0.5rem', textAlign: 'right' }}>
                  <input type="number" min={0} step={1} value={actualMeta.stories || ''} onChange={e => setActual('stories', e.target.value)} style={{ ...metaInp, color: C.blue, fontWeight: 600 }} />
                </td>
              </tr>
              <tr>
                <td style={{ padding: '0.2rem 0.75rem 0.2rem 0', color: '#555' }}>Parking</td>
                <td style={{ padding: '0.2rem 0.5rem', textAlign: 'right', fontWeight: 600 }}>{proformaParking}</td>
                <td style={{ padding: '0.2rem 0.5rem', textAlign: 'right' }}>
                  <input type="number" min={0} step={1} value={actualMeta.parking || ''} onChange={e => setActual('parking', e.target.value)} style={{ ...metaInp, color: C.blue, fontWeight: 600 }} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ margin: 0, padding: '0.65rem 1rem 0.35rem', fontSize: '0.72rem', fontWeight: 800, color: C.navy, textTransform: 'uppercase', letterSpacing: '0.06em' }}>List of consultants</p>
        <p style={{ margin: '0 1rem 0.5rem', fontSize: '0.72rem', color: C.muted, lineHeight: 1.45 }}>
          Pro forma column uses <strong style={{ color: '#555' }}>building GSF</strong> and <strong style={{ color: '#555' }}>unit count</strong> from the calculator above. Edit budget and actual; % of total, $/SF, and $/unit update automatically.
        </p>

        {constructionSoftCost > 0 && (
          <p style={{ margin: '0 1rem 0.65rem', fontSize: '0.75rem', padding: '0.55rem 0.75rem', background: '#f0f7ff', border: `1px solid ${C.border}`, borderRadius: '8px', color: '#333' }}>
            <strong style={{ color: C.navy }}>vs. pro forma C&amp;S line:</strong>{' '}
            Soft + fees (budget total) {fmtMoney(grandB)} is{' '}
            {pctOfCs != null ? (
              <><strong>{fmtNum(pctOfCs)}%</strong> of Construction &amp; soft costs (excl. land) {fmtMoney(constructionSoftCost)}.</>
            ) : (
              '—'
            )}
            {' '}Remainder covers hard construction and contingency.
          </p>
        )}

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '720px' }}>
            <thead>
              <tr>
                <th style={{ ...th, width: '28px' }}>#</th>
                <th style={th}>Item</th>
                <th style={{ ...th, textAlign: 'right' }}>% total</th>
                <th style={{ ...th, textAlign: 'right' }}>$/SF</th>
                <th style={{ ...th, textAlign: 'right' }}>$/unit</th>
                <th style={{ ...th, textAlign: 'right', color: C.blue }}>Budget (8/6)</th>
                <th style={{ ...th, textAlign: 'right', color: C.blue }}>Actual</th>
                <th style={{ ...th, textAlign: 'right' }}>Delta</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={8} style={{ ...td, fontSize: '0.68rem', fontWeight: 800, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.08em', paddingTop: '0.65rem', background: '#f0f3f8' }}>
                  Soft costs
                </td>
              </tr>
              {softRows.map((row, i) => {
                const d = rowDerived(row.budget)
                return (
                  <EditableRow
                    key={i}
                    num={i + 1}
                    name={row.name}
                    pct={d.pct}
                    psf={d.psf}
                    punit={d.punit}
                    budget={row.budget}
                    actual={row.actual}
                    delta={row.budget - row.actual}
                    alt={i % 2 === 1}
                    onBudget={v => updateSoft(i, 'budget', v)}
                    onActual={v => updateSoft(i, 'actual', v)}
                  />
                )
              })}
              <SubRow
                label="Sub-total soft costs"
                pct={subSoftDerived.pct}
                psf={divSafe(subSoftB, proformaSf)}
                punit={divSafe(subSoftB, proformaUnits)}
                budget={subSoftB}
                actual={subSoftA}
                delta={subSoftB - subSoftA}
                strong
              />

              <tr>
                <td colSpan={8} style={{ ...td, fontSize: '0.68rem', fontWeight: 800, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.08em', paddingTop: '0.65rem', background: '#f0f3f8' }}>
                  Fee costs
                </td>
              </tr>
              {feeRows.map((row, i) => {
                const d = rowDerived(row.budget)
                return (
                  <EditableRow
                    key={i}
                    num={i + 1}
                    name={row.name}
                    pct={d.pct}
                    psf={d.psf}
                    punit={d.punit}
                    budget={row.budget}
                    actual={row.actual}
                    delta={row.budget - row.actual}
                    alt={i % 2 === 1}
                    onBudget={v => updateFee(i, 'budget', v)}
                    onActual={v => updateFee(i, 'actual', v)}
                  />
                )
              })}
              <SubRow
                label="Sub-total fee costs"
                pct={subFeeDerived.pct}
                psf={divSafe(subFeeB, proformaSf)}
                punit={divSafe(subFeeB, proformaUnits)}
                budget={subFeeB}
                actual={subFeeA}
                delta={subFeeB - subFeeA}
                strong={false}
              />

              <SubRow
                label="Total"
                pct={grandDerived.pct}
                psf={divSafe(grandB, proformaSf)}
                punit={divSafe(grandB, proformaUnits)}
                budget={grandB}
                actual={grandA}
                delta={grandB - grandA}
                strong
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
