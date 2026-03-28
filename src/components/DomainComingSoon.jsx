import { C } from '../data/courseData'

export default function DomainComingSoon({ domain }) {
  return (
    <div style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
      <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>{domain.icon}</div>
      <h2 style={{ color: domain.color, fontWeight: 800, marginBottom: '0.5rem' }}>Domain {domain.id}: {domain.title}</h2>
      <p style={{ color: C.muted, fontSize: '0.9rem', maxWidth: '380px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>{domain.description}</p>
      <div style={{ display: 'inline-block', background: `${domain.color}12`, border: `1px dashed ${domain.color}`, borderRadius: '10px', padding: '0.75rem 2rem' }}>
        <p style={{ color: domain.accent, fontWeight: 600, margin: 0, fontSize: '0.85rem' }}>
          🔒 Complete Domain 1 to unlock this module
        </p>
      </div>
    </div>
  )
}
