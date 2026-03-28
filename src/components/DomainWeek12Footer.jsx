import { DOMAINS, C } from '../data/courseData'

export default function DomainWeek12Footer({ domain, completed, onComplete }) {
  const hasNext = domain.id < DOMAINS.length
  return (
    <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: `1px solid ${C.border}` }}>
      {completed ? (
        <p style={{ margin: 0, fontSize: '0.88rem', color: '#1E8449', fontWeight: 700 }}>
          {hasNext
            ? `✓ Domain ${domain.id} complete — Domain ${domain.id + 1} is now unlocked.`
            : `✓ Domain ${domain.id} complete — you've finished the full series.`}
        </p>
      ) : (
        <>
          <p style={{ margin: '0 0 0.75rem', fontSize: '0.83rem', color: C.muted, lineHeight: 1.55 }}>
            {hasNext
              ? `When you're done with Domain ${domain.id}, mark it complete to unlock Domain ${domain.id + 1}.`
              : 'Mark this final domain complete when you have finished the program.'}
          </p>
          <button
            type="button"
            onClick={onComplete}
            style={{
              padding: '0.6rem 1.25rem',
              background: domain.color,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.86rem',
              cursor: 'pointer',
            }}
          >
            {hasNext ? `Mark Domain ${domain.id} complete & unlock Domain ${domain.id + 1}` : `Mark Domain ${domain.id} complete`}
          </button>
        </>
      )}
    </div>
  )
}
