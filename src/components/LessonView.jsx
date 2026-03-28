import { useState } from 'react'
import { DOMAINS, C } from '../data/courseData'

export default function LessonView({ week, domainColor, domainId = 1 }) {
  const [openTerm, setOpenTerm] = useState(null)

  if (!week.vocabulary) {
    if (domainId !== 1) {
      if (week.week === 12) {
        return (
          <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
            <p style={{ fontWeight: 700, color: domainColor, fontSize: '1.05rem', marginBottom: '0.5rem' }}>Week 12: {week.title}</p>
            <p style={{ fontSize: '0.85rem', color: C.muted, maxWidth: '420px', margin: '0 auto', lineHeight: 1.65 }}>
              Final review and assessment content will be added here. When you are ready to move on, use the section below to mark Domain {domainId} complete
              {domainId < DOMAINS.length ? ` and unlock Domain ${domainId + 1}` : ''}.
            </p>
          </div>
        )
      }
      return (
        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <p style={{ fontWeight: 700, color: '#444', fontSize: '1rem', marginBottom: '0.5rem' }}>Week {week.week}: {week.title}</p>
          <p style={{ fontSize: '0.85rem', color: C.muted, maxWidth: '400px', margin: '0 auto', lineHeight: 1.6 }}>
            Lesson materials for this week will be published here. Use the week list in the sidebar to track the full 12-week plan for Domain {domainId}.
          </p>
        </div>
      )
    }
    if (week.week === 12) {
      return (
        <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
          <p style={{ fontWeight: 700, color: domainColor, fontSize: '1.05rem', marginBottom: '0.5rem' }}>Week 12: {week.title}</p>
          <p style={{ fontSize: '0.85rem', color: C.muted, maxWidth: '420px', margin: '0 auto', lineHeight: 1.65 }}>
            Final review and assessment content will be added here. When you are ready to move on, use the section below to mark Domain 1 complete and unlock Domain 2.
          </p>
        </div>
      )
    }
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔒</div>
        <p style={{ fontWeight: 700, color: '#444', fontSize: '1rem', marginBottom: '0.4rem' }}>Week {week.week}: {week.title}</p>
        <p style={{ fontSize: '0.85rem', color: C.muted, maxWidth: '340px', margin: '0 auto' }}>
          This week's content will unlock as you progress through the program. Complete Week {week.week - 1} first.
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Sessions */}
      <section style={{ marginBottom: '1.75rem' }}>
        <p style={{ fontSize: '0.72rem', fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.65rem' }}>Study Sessions — Week 1</p>
        {week.sessions.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.85rem', padding: '0.55rem 0.85rem', background: C.gray, borderRadius: '7px', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.74rem', color: domainColor, fontWeight: 700, width: '82px', flexShrink: 0, paddingTop: '0.1rem' }}>{s.day}</span>
            <span style={{ fontSize: '0.82rem', color: '#444' }}>{s.title}</span>
          </div>
        ))}
      </section>

      {/* Vocabulary */}
      <section style={{ marginBottom: '1.75rem' }}>
        <p style={{ fontSize: '0.72rem', fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.65rem' }}>8 Key Terms — Click to Expand</p>
        {week.vocabulary.map((v, i) => (
          <div key={i} style={{ border: `1px solid ${C.border}`, borderRadius: '9px', marginBottom: '0.45rem', overflow: 'hidden' }}>
            <button
              onClick={() => setOpenTerm(openTerm === i ? null : i)}
              style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: openTerm === i ? C.blueL : 'white', border: 'none', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontWeight: 800, fontSize: '0.92rem', color: domainColor, background: `${domainColor}18`, padding: '0.15rem 0.55rem', borderRadius: '5px', letterSpacing: '0.02em' }}>{v.term}</span>
                <span style={{ fontSize: '0.82rem', color: '#555' }}>{v.full}</span>
              </div>
              <span style={{ color: C.muted, fontSize: '0.75rem', flexShrink: 0 }}>{openTerm === i ? '▲' : '▼'}</span>
            </button>
            {openTerm === i && (
              <div style={{ padding: '0.8rem 1rem 0.9rem', background: '#FAFCFF', borderTop: `1px solid ${C.blueL}` }}>
                <p style={{ fontSize: '0.84rem', color: '#333', lineHeight: 1.65, margin: '0 0 0.55rem' }}>{v.definition}</p>
                <div style={{ background: C.blueL, borderLeft: `3px solid ${C.blue}`, padding: '0.4rem 0.75rem', borderRadius: '0 5px 5px 0' }}>
                  <p style={{ fontSize: '0.79rem', color: '#1A5276', margin: 0, fontFamily: 'monospace' }}>📌 {v.example}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Concepts */}
      <section>
        <p style={{ fontSize: '0.72rem', fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.65rem' }}>Core Concepts</p>
        {week.concepts.map((c, i) => (
          <div key={i} style={{ borderLeft: `4px solid ${domainColor}`, background: C.gray, borderRadius: '0 9px 9px 0', padding: '0.8rem 1rem', marginBottom: '0.6rem' }}>
            <p style={{ fontWeight: 700, color: domainColor, margin: '0 0 0.4rem', fontSize: '0.9rem' }}>{c.heading}</p>
            <p style={{ fontSize: '0.83rem', color: '#444', margin: 0, lineHeight: 1.7 }}>{c.body}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
