import { useState } from 'react'
import { C, CAP_DATA, fmtUSD, fmtPct } from '../data/courseData'

export default function CapRateExplorer() {
  const [type, setType] = useState('industrial')
  const [noi, setNoi]   = useState(1000000)
  const [cost, setCost] = useState(20000000)

  const bench = CAP_DATA[type]
  const mid   = (bench.min + bench.max) / 2
  const yoc   = cost > 0 ? (noi / cost) * 100 : 0
  const spreadBps = Math.round((yoc - mid) * 100)
  const impliedMid  = noi / (mid / 100)
  const impliedHigh = noi / (bench.min / 100)
  const impliedLow  = noi / (bench.max / 100)

  return (
    <div>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: C.navy, marginBottom: '1.25rem' }}>🔍 SoCal Cap Rate Explorer</h3>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {Object.entries(CAP_DATA).map(([key, d]) => (
          <button key={key} onClick={() => setType(key)} style={{
            padding: '0.35rem 1rem', borderRadius: '20px',
            border: `2px solid ${type === key ? d.color : C.border}`,
            background: type === key ? d.color : 'white',
            color: type === key ? 'white' : C.muted,
            fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.18s',
          }}>{d.label}</button>
        ))}
      </div>

      <div style={{ border: `2px solid ${bench.color}`, borderRadius: '10px', padding: '1rem 1.25rem', marginBottom: '1.25rem', background: `${bench.color}08` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
          <span style={{ fontWeight: 700, color: bench.color, fontSize: '1rem' }}>SoCal {bench.label}</span>
          <span style={{ fontWeight: 800, fontSize: '1.4rem', color: bench.color }}>{bench.min}% – {bench.max}%</span>
        </div>
        <div style={{ position: 'relative', height: '10px', background: '#e9ecef', borderRadius: '5px', marginBottom: '0.6rem' }}>
          <div style={{
            position: 'absolute',
            left: `${((bench.min - 3) / 7) * 100}%`,
            width: `${((bench.max - bench.min) / 7) * 100}%`,
            height: '100%', background: bench.color, borderRadius: '5px', opacity: 0.85,
          }} />
          <div style={{ position: 'absolute', left: `${((mid - 3) / 7) * 100}%`, top: '-3px', width: '3px', height: '16px', background: bench.color, borderRadius: '2px' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.65rem', color: C.muted }}>3.00% (tight)</span>
          <span style={{ fontSize: '0.65rem', color: bench.color, fontWeight: 600 }}>Mid: {mid.toFixed(2)}%</span>
          <span style={{ fontSize: '0.65rem', color: C.muted }}>10.00% (distressed)</span>
        </div>
        <p style={{ fontSize: '0.8rem', color: '#555', margin: 0, lineHeight: 1.5 }}>{bench.driver}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div>
          <p style={{ fontSize: '0.72rem', fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.75rem' }}>Your Deal</p>
          {[{ label: 'Stabilized NOI', val: noi, set: setNoi }, { label: 'Total Project Cost', val: cost, set: setCost }].map(({ label, val, set }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <label style={{ fontSize: '0.8rem', color: '#444', width: '150px', flexShrink: 0 }}>{label}</label>
              <div style={{ display: 'flex', alignItems: 'center', background: C.gray, border: `1px solid ${C.border}`, borderRadius: '6px', overflow: 'hidden', flex: 1 }}>
                <span style={{ padding: '0.3rem 0.5rem', background: '#e9ecef', fontSize: '0.8rem', color: '#666' }}>$</span>
                <input type="number" value={val} onChange={e => set(parseFloat(e.target.value) || 0)}
                  style={{ border: 'none', background: 'transparent', padding: '0.3rem 0.5rem', width: '100%', fontSize: '0.85rem', outline: 'none', color: C.text }} />
              </div>
            </div>
          ))}
        </div>

        <div>
          <p style={{ fontSize: '0.72rem', fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.75rem' }}>Analysis</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ background: C.gray, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '0.6rem 0.85rem' }}>
              <p style={{ fontSize: '0.69rem', color: C.muted, margin: 0 }}>Your YOC</p>
              <p style={{ fontSize: '1.3rem', fontWeight: 800, color: C.navy, margin: '0.1rem 0' }}>{yoc.toFixed(2)}%</p>
            </div>
            <div style={{ background: C.gray, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '0.6rem 0.85rem' }}>
              <p style={{ fontSize: '0.69rem', color: C.muted, margin: 0 }}>Implied Market Value (at mid cap {mid.toFixed(2)}%)</p>
              <p style={{ fontSize: '1.05rem', fontWeight: 700, color: C.blue, margin: '0.1rem 0' }}>{fmtUSD(impliedMid)}</p>
              <p style={{ fontSize: '0.7rem', color: '#bbb', margin: 0 }}>Range: {fmtUSD(impliedLow)} – {fmtUSD(impliedHigh)}</p>
            </div>
            <div style={{ background: spreadBps >= 100 ? C.greenL : C.redL, border: `1px solid ${spreadBps >= 100 ? C.green : C.red}`, borderRadius: '8px', padding: '0.6rem 0.85rem' }}>
              <p style={{ fontSize: '0.69rem', color: C.muted, margin: 0 }}>Development Spread (vs. mid cap)</p>
              <p style={{ fontSize: '1.2rem', fontWeight: 800, color: spreadBps >= 100 ? '#1E8449' : '#C0392B', margin: '0.1rem 0' }}>{spreadBps} bps</p>
              <p style={{ fontSize: '0.7rem', color: spreadBps >= 100 ? '#1E8449' : '#C0392B', margin: 0 }}>
                {spreadBps >= 100 ? '✓ Meets 100 bps minimum — proceed' : '✗ Below 100 bps minimum — reconsider'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
