import { partnershipLineDark, builderAcademyTitleDark } from '../lib/brandStyles'
import { C } from '../data/courseData'

export default function Certificate({ user, profile, domains, completedDomainIds, onBack }) {
  const allComplete = domains.every(d => completedDomainIds.includes(d.id))
  const studentName = profile?.full_name || user?.email || 'Student'
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const certNum = user?.id
    ? `HTA-${new Date().getFullYear()}-${user.id.slice(-6).toUpperCase()}`
    : `HTA-${new Date().getFullYear()}-DEMO`

  const handlePrint = () => window.print()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#F0F3F7' }}>

      {/* Print styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; margin: 0; }
          .cert-page { min-height: 100vh; background: white !important; padding: 0 !important; }
          .cert-shell { box-shadow: none !important; margin: 0 !important; max-width: 100% !important; }
        }
      `}</style>

      {/* Header — hidden on print */}
      <header className="no-print" style={{
        background: 'linear-gradient(165deg, #1a3555 0%, #152a45 42%, #0c1829 100%)',
        color: 'white', padding: '0.95rem 1.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
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
            <h1 style={builderAcademyTitleDark}>Builder Academy — Certificate</h1>
          </div>
        </div>
        {allComplete && (
          <button type="button" onClick={handlePrint} style={{
            background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)',
            color: 'white', padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer',
            fontSize: '0.82rem', fontWeight: 700,
          }}>
            🖨️ Print Certificate
          </button>
        )}
      </header>

      <div className="cert-page" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>

        {!allComplete ? (
          /* ── Locked state ── */
          <div style={{ background: 'white', borderRadius: '16px', padding: '3rem 2.5rem', maxWidth: '520px', width: '100%', textAlign: 'center', border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🎓</div>
            <h2 style={{ color: C.navy, fontSize: '1.3rem', marginBottom: '0.5rem' }}>Certificate locked</h2>
            <p style={{ color: C.muted, fontSize: '0.9rem', marginBottom: '2rem', lineHeight: 1.6 }}>
              Complete all 4 domains to earn your certificate. Mark each domain complete from the Week 12 lesson.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {domains.map(d => {
                const done = completedDomainIds.includes(d.id)
                return (
                  <div key={d.id} style={{
                    padding: '0.85rem 1rem', borderRadius: '10px',
                    background: done ? '#eafaf1' : '#f8f9fa',
                    border: `1.5px solid ${done ? '#2ecc71' : C.border}`,
                    display: 'flex', alignItems: 'center', gap: '0.6rem',
                  }}>
                    <span style={{ fontSize: '1.1rem' }}>{done ? '✓' : '○'}</span>
                    <div style={{ textAlign: 'left' }}>
                      <p style={{ margin: 0, fontSize: '0.72rem', fontWeight: 700, color: done ? '#1E8449' : C.muted }}>Domain {d.id}</p>
                      <p style={{ margin: 0, fontSize: '0.7rem', color: done ? '#27AE60' : C.muted }}>{d.title}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <p style={{ marginTop: '1.5rem', fontSize: '0.78rem', color: C.muted }}>
              {completedDomainIds.length} of {domains.length} domains complete
            </p>
          </div>
        ) : (
          /* ── Certificate ── */
          <div className="cert-shell" style={{
            background: 'white',
            borderRadius: '4px',
            maxWidth: '760px',
            width: '100%',
            boxShadow: '0 8px 48px rgba(0,0,0,0.18)',
            border: '12px solid #1a3555',
            position: 'relative',
          }}>
            {/* Inner decorative border */}
            <div style={{
              position: 'absolute', inset: '8px',
              border: '2px solid rgba(46, 109, 164, 0.35)',
              pointerEvents: 'none',
            }} />

            {/* Navy header band */}
            <div style={{
              background: 'linear-gradient(135deg, #1a3555, #0c1829)',
              padding: '1.75rem 2.5rem 1.5rem',
              textAlign: 'center',
            }}>
              <p style={{ margin: 0, fontSize: '0.72rem', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Parada Capital LLC · HTA Construction & Development Inc
              </p>
              <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 900, color: 'white', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Builder Academy
              </h1>
              <p style={{ margin: '0.35rem 0 0', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Real Estate Development & Construction Professional Program
              </p>
            </div>

            {/* Certificate body */}
            <div style={{ padding: '2.5rem 3rem 2rem', textAlign: 'center' }}>

              {/* Title */}
              <p style={{ margin: '0 0 0.5rem', fontSize: '0.7rem', letterSpacing: '0.25em', color: C.muted, textTransform: 'uppercase' }}>
                Certificate of Completion
              </p>
              <div style={{ width: '60px', height: '2px', background: '#2E6DA4', margin: '0 auto 1.5rem' }} />

              <p style={{ margin: '0 0 0.5rem', fontSize: '0.9rem', color: '#555', fontStyle: 'italic' }}>
                This certifies that
              </p>

              {/* Student name */}
              <h2 style={{
                margin: '0.25rem 0 0.4rem',
                fontSize: '2.4rem',
                fontWeight: 900,
                color: '#1a3555',
                letterSpacing: '0.02em',
                lineHeight: 1.15,
              }}>
                {studentName}
              </h2>

              <p style={{ margin: '0 0 1.75rem', fontSize: '0.9rem', color: '#555', fontStyle: 'italic' }}>
                has successfully completed the
              </p>

              <p style={{ margin: '0 0 0.35rem', fontSize: '1.05rem', fontWeight: 700, color: '#1a3555', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Builder Academy Professional Program
              </p>
              <p style={{ margin: '0 0 2rem', fontSize: '0.8rem', color: C.muted }}>
                4 Domains · 48 Weeks · 192 Study Sessions
              </p>

              {/* Domain badges */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem', marginBottom: '2.25rem', maxWidth: '480px', margin: '0 auto 2.25rem' }}>
                {domains.map(d => (
                  <div key={d.id} style={{
                    display: 'flex', alignItems: 'center', gap: '0.6rem',
                    background: `${d.color}0d`, border: `1px solid ${d.color}40`,
                    borderRadius: '8px', padding: '0.55rem 0.85rem', textAlign: 'left',
                  }}>
                    <span style={{ fontSize: '1.1rem' }}>{d.icon}</span>
                    <div>
                      <p style={{ margin: 0, fontSize: '0.65rem', fontWeight: 800, color: d.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Domain {d.id}</p>
                      <p style={{ margin: 0, fontSize: '0.72rem', color: '#333', fontWeight: 600 }}>{d.title}</p>
                    </div>
                    <span style={{ marginLeft: 'auto', color: '#27AE60', fontWeight: 900, fontSize: '0.9rem' }}>✓</span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div style={{ borderTop: `1px solid ${C.border}`, margin: '0 2rem 1.75rem' }} />

              {/* Signature area */}
              <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '1.75rem' }}>
                {[
                  { name: 'David Parada', title: 'Program Director' },
                  { name: 'HTA Construction', title: 'Lead Instructor' },
                ].map(({ name, title }) => (
                  <div key={title} style={{ textAlign: 'center', minWidth: '140px' }}>
                    <div style={{ borderTop: '1.5px solid #1a3555', paddingTop: '0.5rem', marginTop: '2rem' }}>
                      <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 700, color: '#1a3555' }}>{name}</p>
                      <p style={{ margin: 0, fontSize: '0.7rem', color: C.muted }}>{title}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer meta */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: `1px solid ${C.border}` }}>
                <p style={{ margin: 0, fontSize: '0.68rem', color: C.muted }}>Issued: {today}</p>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#1a3555', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>🏗️</div>
                <p style={{ margin: 0, fontSize: '0.68rem', color: C.muted }}>Certificate No: {certNum}</p>
              </div>
            </div>
          </div>
        )}

        {/* Print button below cert on screen */}
        {allComplete && (
          <button type="button" onClick={handlePrint} className="no-print" style={{
            marginTop: '1.5rem', padding: '0.65rem 2rem', background: '#1a3555', color: 'white',
            border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 700,
          }}>
            🖨️ Print Certificate
          </button>
        )}
      </div>
    </div>
  )
}
