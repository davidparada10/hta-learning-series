import { useState, useEffect } from 'react'
import { DOMAINS, C } from '../data/courseData'
import LessonView from '../components/LessonView'
import ProFormaTab from '../components/ProFormaTab'
import CapRateExplorer from '../components/CapRateExplorer'
import Quiz from '../components/Quiz'
import DomainLocked from '../components/DomainLocked'
import DomainWeek12Footer from '../components/DomainWeek12Footer'
import { readCompletedDomainIds, writeCompletedDomainIds, domainUnlocked } from '../lib/domainProgress'
import { supabase } from '../lib/supabase'
import { partnershipLineDark, builderAcademyTitleDark } from '../lib/brandStyles'

export default function Course({ user, profile }) {
  const [domIdx, setDomIdx] = useState(0)
  const [wkIdx, setWkIdx] = useState(0)
  const [tab, setTab] = useState('lesson')
  const [sideOpen, setSide] = useState(true)
  const [completedDomainIds, setCompletedDomainIds] = useState(readCompletedDomainIds)

  useEffect(() => {
    writeCompletedDomainIds(completedDomainIds)
  }, [completedDomainIds])

  const domain = DOMAINS[domIdx]
  const week = domain.weeks[wkIdx]
  const hasContent = domain.id === 1 && week.week === 1
  const unlocked = domainUnlocked(domain.id, completedDomainIds)
  const weekStatusLabel = week.status === 'active' ? 'Active' : week.status === 'upcoming' ? 'Upcoming' : week.status

  const tabs = hasContent
    ? [{ id: 'lesson', label: '📖 Lesson' }, { id: 'proforma', label: '📊 Pro Forma' }, { id: 'caprate', label: '🔍 Cap Rates' }, { id: 'quiz', label: '📝 Quiz' }]
    : [{ id: 'lesson', label: '📖 Lesson' }]

  const switchDomain = i => { setDomIdx(i); setWkIdx(0); setTab('lesson') }
  const switchWeek = i => { setWkIdx(i); setTab('lesson') }

  const markDomainComplete = id => {
    setCompletedDomainIds(prev => (prev.includes(id) ? prev : [...prev, id]))
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  const displayName = profile?.full_name || user?.email || 'Student'
  const isAdmin = profile?.role === 'admin'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#F0F3F7' }}>

      <header style={{
        background: 'linear-gradient(165deg, #1a3555 0%, #152a45 42%, #0c1829 100%)',
        color: 'white',
        padding: '0.95rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
        boxShadow: '0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.07)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <button onClick={() => setSide(s => !s)} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.12)', color: 'white', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
            ☰
          </button>
          <div style={{ borderLeft: '4px solid rgba(100, 155, 220, 0.55)', paddingLeft: '0.95rem', boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.12)' }}>
            <p style={partnershipLineDark}>
              Parada Capital LLC x HTA Construction & Development Inc
            </p>
            <h1 style={builderAcademyTitleDark}>Builder Academy</h1>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0, fontSize: '0.7rem', opacity: 0.65 }}>{displayName}</p>
            <p style={{ margin: 0, fontSize: '0.78rem', opacity: 0.85, fontWeight: 600 }}>Domain {domain.id}, Week {week.week} · {weekStatusLabel}</p>
          </div>
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

      <nav style={{ background: 'white', borderBottom: `1px solid ${C.border}`, display: 'flex', overflowX: 'auto', flexShrink: 0 }}>
        {DOMAINS.map((d, i) => {
          const dLocked = !domainUnlocked(d.id, completedDomainIds)
          return (
            <button key={d.id} type="button" onClick={() => switchDomain(i)} style={{
              padding: '0.7rem 1.1rem', border: 'none',
              borderBottom: domIdx === i ? `3px solid ${d.color}` : '3px solid transparent',
              background: 'transparent',
              color: domIdx === i ? d.color : C.muted,
              fontWeight: domIdx === i ? 700 : 400,
              cursor: 'pointer', fontSize: '0.82rem', whiteSpace: 'nowrap', transition: 'all 0.15s',
              opacity: dLocked ? 0.55 : 1,
            }}>
              {dLocked ? '🔒 ' : ''}{d.icon} Domain {d.id}: {d.title}
            </button>
          )
        })}
      </nav>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {sideOpen && (
          <aside style={{ width: '248px', flexShrink: 0, background: 'white', borderRight: `1px solid ${C.border}`, overflowY: 'auto', padding: '0.85rem 0' }}>
            <p style={{ fontSize: '0.67rem', color: C.muted, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 1rem', marginBottom: '0.5rem' }}>Curriculum</p>
            {DOMAINS.map((d, di) => {
              const dLocked = !domainUnlocked(d.id, completedDomainIds)
              return (
                <div key={d.id} style={{ marginBottom: '0.25rem', opacity: dLocked ? 0.55 : 1 }}>
                  <button type="button" onClick={() => switchDomain(di)} style={{
                    width: '100%', textAlign: 'left', padding: '0.45rem 1rem 0.3rem',
                    border: 'none', borderLeft: domIdx === di ? `3px solid ${d.color}` : '3px solid transparent',
                    background: 'transparent', cursor: 'pointer',
                  }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: domIdx === di ? d.color : C.muted, lineHeight: 1.35, display: 'block' }}>
                      {dLocked ? '🔒 ' : ''}{d.icon} Domain {d.id}: {d.title}
                    </span>
                  </button>
                  {d.weeks.map((w, wi) => {
                    const active = domIdx === di && wkIdx === wi
                    return (
                      <button key={wi} type="button" onClick={() => { setDomIdx(di); setWkIdx(wi); setTab('lesson') }} style={{
                        width: '100%', textAlign: 'left', padding: '0.45rem 0.85rem 0.45rem 1.35rem',
                        border: 'none',
                        borderLeft: active ? `3px solid ${d.color}` : '3px solid transparent',
                        background: active ? `${d.color}10` : 'transparent',
                        cursor: 'pointer', display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
                      }}>
                        <span style={{
                          width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: w.status === 'active' ? d.color : '#e9ecef',
                          color: w.status === 'active' ? 'white' : '#bbb',
                          fontSize: '0.62rem', fontWeight: 700, marginTop: '0.05rem',
                        }}>{w.week}</span>
                        <span style={{ fontSize: '0.77rem', color: active ? d.color : (w.status === 'upcoming' ? '#bbb' : '#444'), fontWeight: active ? 700 : 400, lineHeight: 1.35 }}>
                          {w.title}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )
            })}
          </aside>
        )}

        <main style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ margin: 0, fontSize: '0.74rem', color: C.muted }}>Domain {domain.id} · Week {week.week}</p>
            <h2 style={{ margin: '0.15rem 0 0', fontSize: '1.2rem', fontWeight: 800, color: domain.color }}>{week.title}</h2>
          </div>

          {domain.id === 1 && (
            <div style={{ display: 'flex', gap: '0.25rem', background: '#e9ecef', borderRadius: '9px', padding: '0.25rem', marginBottom: '1.25rem' }}>
              {tabs.map(t => (
                <button key={t.id} type="button" onClick={() => setTab(t.id)} style={{
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

          <div style={{ background: 'white', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
            {!unlocked ? (
              <DomainLocked domain={domain} />
            ) : (
              <>
                {domain.id === 1 ? (
                  tab === 'lesson' ? (
                    <LessonView week={week} domainColor={domain.color} domainId={1} />
                  ) : tab === 'proforma' && hasContent ? (
                    <ProFormaTab />
                  ) : tab === 'caprate' && hasContent ? (
                    <CapRateExplorer />
                  ) : tab === 'quiz' && hasContent ? (
                    <Quiz user={user} domainId={domain.id} weekNum={week.week} />
                  ) : (
                    <LessonView week={week} domainColor={domain.color} domainId={1} />
                  )
                ) : (
                  <LessonView week={week} domainColor={domain.color} domainId={domain.id} />
                )}
                {week.week === 12 && (
                  <DomainWeek12Footer
                    domain={domain}
                    completed={completedDomainIds.includes(domain.id)}
                    onComplete={() => markDomainComplete(domain.id)}
                  />
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
