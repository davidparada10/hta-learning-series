import { DOMAINS, C } from '../data/courseData'

export default function About({ session }) {
  const signedIn = Boolean(session)

  return (
    <div style={{ minHeight: '100vh', background: '#F0F3F7', display: 'flex', flexDirection: 'column' }}>
      <header style={{ background: C.navy, color: 'white', padding: '0.85rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <p style={{ margin: 0, fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.65, lineHeight: 1.4 }}>Parada Capital<br />HTA Construction</p>
          <h1 style={{ margin: '0.35rem 0 0', fontSize: '1.1rem', fontWeight: 900, letterSpacing: '-0.01em' }}>About the Learning Series</h1>
        </div>
        <a
          href="/"
          style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.9)', background: 'rgba(255,255,255,0.12)', padding: '0.45rem 0.9rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, border: '1px solid rgba(255,255,255,0.2)' }}
        >
          {signedIn ? '← Course' : '← Sign in'}
        </a>
      </header>

      <main style={{ flex: 1, maxWidth: '720px', margin: '0 auto', padding: '1.75rem 1.5rem 3rem', width: '100%' }}>
        <div style={{ background: 'white', borderRadius: '12px', border: `1px solid ${C.border}`, padding: '1.5rem 1.35rem', marginBottom: '1.25rem', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
          <p style={{ margin: '0 0 0.75rem', fontSize: '0.95rem', color: C.text, lineHeight: 1.65 }}>
            The <strong>Parada Capital &amp; HTA Construction Learning Series</strong> is a structured program for real estate development and construction
            professionals. Work through four domains—each with a twelve-week plan—covering pro forma and deal analysis, commercial construction delivery,
            contracts and legal, and market &amp; investment topics.
          </p>
          <p style={{ margin: 0, fontSize: '0.9rem', color: C.muted, lineHeight: 1.6 }}>
            Week 1 of Domain 1 includes interactive tools (pro forma calculator, cap rate explorer, and a quiz). Additional weeks unlock as the curriculum is published.
          </p>
        </div>

        <h2 style={{ fontSize: '0.72rem', fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 0.65rem' }}>Domains</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {DOMAINS.map(d => (
            <li
              key={d.id}
              style={{
                display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
                padding: '0.85rem 1rem', marginBottom: '0.5rem',
                background: 'white', borderRadius: '10px', border: `1px solid ${C.border}`,
              }}
            >
              <span style={{ fontSize: '1.35rem', lineHeight: 1 }} aria-hidden>{d.icon}</span>
              <div>
                <p style={{ margin: 0, fontWeight: 700, color: d.color, fontSize: '0.92rem' }}>Domain {d.id}: {d.title}</p>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.82rem', color: C.muted, lineHeight: 1.5 }}>{d.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
