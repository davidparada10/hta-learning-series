import { useState } from 'react'
import { DOMAINS, C } from '../data/courseData'
import LessonView from '../components/LessonView'
import ProFormaCalc from '../components/ProFormaCalc'
import CapRateExplorer from '../components/CapRateExplorer'
import Quiz from '../components/Quiz'
import DomainComingSoon from '../components/DomainComingSoon'
import { supabase } from '../lib/supabase'

export default function Course({ user, profile }) {
  const [domIdx, setDomIdx] = useState(0)
  const [wkIdx, setWkIdx]   = useState(0)
  const [tab, setTab]       = useState('lesson')
  const [sideOpen, setSide] = useState(true)

  const domain     = DOMAINS[domIdx]
  const week       = domain.weeks[wkIdx]
  const hasContent = domain.id === 1 && week.week === 1
  const weekStatusLabel = week.status === 'active' ? 'Active' : week.status === 'upcoming' ? 'Upcoming' : week.status

  const tabs = hasContent
    ? [{ id: 'lesson', label: '📖 Lesson' }, { id: 'proforma', label: '📊 Pro Forma' }, { id: 'caprate', label: '🔍 Cap Rates' }, { id: 'quiz', label: '📝 Quiz' }]
    : [{ id: 'lesson', label: '📖 Lesson' }]

  const switchDomain = i => { setDomIdx(i); setWkIdx(0); setTab('lesson') }
  const switchWeek   = i => { setWkIdx(i); setTab('lesson') }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  const displayName = profile?.full_name || user?.email || 'Student'
  const isAdmin = profile?.role === 'admin'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#F0F3F7' }}>

      {/* ── Header ── */}
      <header style={{ background: C.navy, color: 'white', padding: '0.85rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <button onClick={() => setSide(s => !s)} style={{ background: 'rgba(255,255,255,0.12)', border: 'none', color: 'white', width: '32px', height: '32px', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            ☰
          </button>
          <div>
            <p style={{ margin: 0, fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.65 }}>Parada Capital</p>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.55 }}>HTA Construction</p>
            <h1 style={{ margin: '0.35rem 0 0', fontSize: '1.15rem', fontWeight: 900, letterSpacing: '-0.01em' }}>Learning Series</h1>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0, fontSize: '0.7rem', opacity: 0.65 }}>{displayName}</p>
            <p style={{ margin: 0, fontSize: '0.78rem', opacity: 0.85, fontWeight: 600 }}>Domain {domain.id}, Week {week.week} · {weekStatusLabel}</p>
          </div>
          <a href="/about" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.85)', background: 'rgba(255,255,255,0.1)', padding: '0.3rem 0.75rem', borderRadius: '6px', textDecoration: 'none', fontWeight: 600, border: '1px solid rgba(255,255,255,0.18)' }}>
            About
          </a>
          {isAdmin && (
            <a href="/admin" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.15)', padding: '0.3rem 0.75rem', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>
              Admin ↗
            </a>
          )}
          <button onClick={handleSignOut} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.75)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.3rem 0.75rem', borderRadius: '6px', cursor: 'pointer' }}>
            Sign out
          </button>
        </div>
      </header>

      {/* ── Domain nav (1 → 2 → 3 → 4) ── */}
      <nav style={{ background: 'white', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'stretch', flexShrink: 0 }}>
        <button
          type="button"
          aria-label="Previous domain"
          disabled={domIdx === 0}
          onClick={() => switchDomain(domIdx - 1)}
          style={{
            flexShrink: 0, padding: '0 0.65rem', border: 'none', borderRight: `1px solid ${C.border}`,
            background: domIdx === 0 ? '#f4f4f4' : 'white', color: domIdx === 0 ? '#ccc' : C.navy,
            cursor: domIdx === 0 ? 'not-allowed' : 'pointer', fontSize: '1rem', fontWeight: 700,
          }}
        >
          ←
        </button>
        <div style={{ display: 'flex', overflowX: 'auto', flex: 1, minWidth: 0 }}>
          {DOMAINS.map((d, i) => (
            <button key={d.id} onClick={() => switchDomain(i)} style={{
              padding: '0.7rem 1.1rem', border: 'none',
              borderBottom: domIdx === i ? `3px solid ${d.color}` : '3px solid transparent',
              background: 'transparent',
              color: domIdx === i ? d.color : C.muted,
              fontWeight: domIdx === i ? 700 : 400,
              cursor: 'pointer', fontSize: '0.82rem', whiteSpace: 'nowrap', transition: 'all 0.15s',
            }}>
              {d.icon} Domain {d.id}: {d.title}
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-label="Next domain"
          disabled={domIdx === DOMAINS.length - 1}
          onClick={() => switchDomain(domIdx + 1)}
          style={{
            flexShrink: 0, padding: '0 0.65rem', border: 'none', borderLeft: `1px solid ${C.border}`,
            background: domIdx === DOMAINS.length - 1 ? '#f4f4f4' : 'white', color: domIdx === DOMAINS.length - 1 ? '#ccc' : C.navy,
            cursor: domIdx === DOMAINS.length - 1 ? 'not-allowed' : 'pointer', fontSize: '1rem', fontWeight: 700,
          }}
        >
          →
        </button>
      </nav>

      {/* ── Body ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Sidebar */}
        {sideOpen && (
          <aside style={{ width: '220px', flexShrink: 0, background: 'white', borderRight: `1px solid ${C.border}`, overflowY: 'auto', padding: '0.85rem 0' }}>
            <p style={{ fontSize: '0.67rem', color: C.muted, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 1rem', marginBottom: '0.4rem' }}>12-Week Plan</p>
            {domain.weeks.map((w, i) => {
              const active = wkIdx === i
              return (
                <button key={i} onClick={() => switchWeek(i)} style={{
                  width: '100%', textAlign: 'left', padding: '0.5rem 0.85rem',
                  border: 'none',
                  borderLeft: active ? `3px solid ${domain.color}` : '3px solid transparent',
                  background: active ? `${domain.color}10` : 'transparent',
                  cursor: 'pointer', display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
                }}>
                  <span style={{
                    width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: w.status === 'active' ? domain.color : '#e9ecef',
                    color: w.status === 'active' ? 'white' : '#bbb',
                    fontSize: '0.62rem', fontWeight: 700, marginTop: '0.05rem',
                  }}>{w.week}</span>
                  <span style={{ fontSize: '0.77rem', color: active ? domain.color : (w.status === 'upcoming' ? '#bbb' : '#444'), fontWeight: active ? 700 : 400, lineHeight: 1.35 }}>
                    {w.title}
                  </span>
                </button>
              )
            })}
          </aside>
        )}

        {/* Main */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ margin: 0, fontSize: '0.74rem', color: C.muted }}>Domain {domain.id} · Week {week.week}</p>
            <h2 style={{ margin: '0.15rem 0 0', fontSize: '1.2rem', fontWeight: 800, color: domain.color }}>{week.title}</h2>
          </div>

          {/* Tab bar */}
          {domain.id === 1 && (
            <div style={{ display: 'flex', gap: '0.25rem', background: '#e9ecef', borderRadius: '9px', padding: '0.25rem', marginBottom: '1.25rem' }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{
                  flex: 1, padding: '0.45rem 0.5rem', border: 'none',
                  borderRadius: '7px',
                  background: tab === t.id ? 'white' : 'transparent',
                  color: tab === t.id ? domain.color : C.muted,
                  fontWeight: tab === t.id ? 700 : 400,
                  fontSize: '0.82rem', cursor: 'pointer',
                  boxShadow: tab === t.id ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.15s',
                }}>
                  {t.label}
                </button>
              ))}
            </div>
          )}

          {/* Content card */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
            {domain.id !== 1 ? (
              <DomainComingSoon domain={domain} />
            ) : tab === 'lesson' ? (
              <LessonView week={week} domainColor={domain.color} />
            ) : tab === 'proforma' && hasContent ? (
              <ProFormaCalc />
            ) : tab === 'caprate' && hasContent ? (
              <CapRateExplorer />
            ) : tab === 'quiz' && hasContent ? (
              <Quiz user={user} domainId={domain.id} weekNum={week.week} />
            ) : (
              <LessonView week={week} domainColor={domain.color} />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
