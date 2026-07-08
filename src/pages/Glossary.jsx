import { useState, useMemo } from 'react'
import { C } from '../data/courseData'
import { getDomainsWithEdits } from '../lib/courseContent'
import { partnershipLineDark, builderAcademyTitleDark } from '../lib/brandStyles'

export default function Glossary({ onBack }) {
  const domains = getDomainsWithEdits()
  const [query, setQuery]     = useState('')
  const [filterDomain, setFilter] = useState(0)

  // Flatten all vocab across every domain + week
  const allTerms = useMemo(() => {
    const terms = []
    for (const domain of domains) {
      for (const week of domain.weeks) {
        for (const v of (week.vocabulary || [])) {
          terms.push({ ...v, domainId: domain.id, domainTitle: domain.title, domainColor: domain.color, domainIcon: domain.icon, weekNum: week.week })
        }
      }
    }
    return terms.sort((a, b) => a.term.localeCompare(b.term))
  }, [domains])

  const results = useMemo(() => {
    const q = query.toLowerCase().trim()
    return allTerms.filter(t => {
      if (filterDomain && t.domainId !== filterDomain) return false
      if (!q) return true
      return (
        t.term.toLowerCase().includes(q) ||
        (t.full || '').toLowerCase().includes(q) ||
        (t.definition || '').toLowerCase().includes(q)
      )
    })
  }, [allTerms, query, filterDomain])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#F0F3F7' }}>

      {/* Header */}
      <header style={{
        background: 'linear-gradient(165deg, #1a3555 0%, #152a45 42%, #0c1829 100%)',
        color: 'white', padding: '0.95rem 1.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0,
        boxShadow: '0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.07)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <button type="button" onClick={onBack} style={{
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
            color: 'white', padding: '0.3rem 0.75rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.82rem',
          }}>
            ← Back
          </button>
          <div style={{ borderLeft: '4px solid rgba(100,155,220,0.55)', paddingLeft: '0.95rem' }}>
            <p style={partnershipLineDark}>Parada Capital LLC x HTA Construction & Development Inc</p>
            <h1 style={builderAcademyTitleDark}>Builder Academy — Master Glossary</h1>
          </div>
        </div>
        <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)' }}>
          {allTerms.length} terms across 4 domains
        </div>
      </header>

      {/* Search + Filter bar */}
      <div style={{ background: 'white', borderBottom: `1px solid ${C.border}`, padding: '0.85rem 1.5rem', display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
          <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: C.muted, fontSize: '0.95rem' }}>🔍</span>
          <input
            type="text"
            placeholder="Search terms, acronyms, definitions…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              width: '100%', padding: '0.55rem 0.75rem 0.55rem 2.2rem',
              border: `1px solid ${C.border}`, borderRadius: '8px',
              fontSize: '0.9rem', background: '#F8F9FA', outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[{ id: 0, label: 'All domains', color: C.navy }, ...domains.map(d => ({ id: d.id, label: `${d.icon} D${d.id}`, color: d.color }))].map(({ id, label, color }) => (
            <button key={id} type="button" onClick={() => setFilter(id)} style={{
              padding: '0.4rem 0.85rem', borderRadius: '6px', border: `1.5px solid ${filterDomain === id ? color : C.border}`,
              background: filterDomain === id ? color : 'white',
              color: filterDomain === id ? 'white' : C.muted,
              cursor: 'pointer', fontSize: '0.8rem', fontWeight: filterDomain === id ? 700 : 400, transition: 'all 0.15s',
            }}>
              {label}
            </button>
          ))}
        </div>
        <span style={{ fontSize: '0.78rem', color: C.muted, whiteSpace: 'nowrap' }}>
          {results.length} result{results.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Term grid */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>
        {results.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: C.muted }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔍</div>
            <h3 style={{ color: C.navy, marginBottom: '0.5rem' }}>No terms found</h3>
            <p style={{ fontSize: '0.9rem' }}>Try a different search or clear the filter.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '0.85rem' }}>
            {results.map((t, i) => (
              <div key={i} style={{
                background: 'white', borderRadius: '12px',
                border: `1px solid ${C.border}`, borderTop: `3px solid ${t.domainColor}`,
                padding: '1rem 1.1rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <div>
                    <span style={{ fontSize: '1.25rem', fontWeight: 900, color: C.navy }}>{t.term}</span>
                    {t.full && (
                      <span style={{ fontSize: '0.78rem', color: t.domainColor, fontWeight: 600, marginLeft: '0.5rem' }}>{t.full}</span>
                    )}
                  </div>
                  <span style={{
                    fontSize: '0.65rem', fontWeight: 700, padding: '2px 7px', borderRadius: '4px', whiteSpace: 'nowrap',
                    background: `${t.domainColor}18`, color: t.domainColor, border: `1px solid ${t.domainColor}40`,
                  }}>
                    {t.domainIcon} D{t.domainId} W{t.weekNum}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#333', lineHeight: 1.6, margin: '0 0 0.5rem' }}>{t.definition}</p>
                {t.example && (
                  <p style={{ fontSize: '0.78rem', color: C.muted, fontStyle: 'italic', margin: 0, borderTop: `1px solid ${C.border}`, paddingTop: '0.5rem', lineHeight: 1.5 }}>
                    "{t.example}"
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
