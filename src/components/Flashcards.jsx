import { useState } from 'react'
import { C } from '../data/courseData'

export default function Flashcards({ week, domainColor }) {
  const vocab = week.vocabulary || []
  const [idx, setIdx]       = useState(0)
  const [flipped, setFlip]  = useState(false)
  const [mastered, setMast] = useState([])
  const [done, setDone]     = useState(false)

  if (!vocab.length) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 1rem', color: C.muted }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🃏</div>
        <h3 style={{ color: C.navy, marginBottom: '0.5rem' }}>No flashcards yet</h3>
        <p style={{ fontSize: '0.9rem' }}>Vocabulary for this week is being prepared.</p>
      </div>
    )
  }

  const card     = vocab[idx]
  const total    = vocab.length
  const progress = Math.round((mastered.length / total) * 100)

  const markMastered = () => {
    const next = [...mastered, idx]
    setMast(next)
    advance(next)
  }

  const markReview = () => advance(mastered)

  const advance = (currentMastered) => {
    setFlip(false)
    setTimeout(() => {
      if (idx + 1 >= total) setDone(true)
      else setIdx(i => i + 1)
    }, 180)
  }

  const reset = () => { setIdx(0); setFlip(false); setMast([]); setDone(false) }

  if (done) {
    const masteredCount = mastered.length
    const reviewCount   = total - masteredCount
    return (
      <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎓</div>
        <h2 style={{ color: C.navy, marginBottom: '0.25rem' }}>Deck complete!</h2>
        <p style={{ color: C.muted, marginBottom: '1.5rem' }}>{total} terms reviewed</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: '#eafaf1', border: '1px solid #2ecc71', borderRadius: '10px', padding: '0.75rem 1.5rem', minWidth: '100px' }}>
            <p style={{ fontSize: '1.6rem', fontWeight: 900, color: '#1E8449', margin: 0 }}>{masteredCount}</p>
            <p style={{ fontSize: '0.78rem', color: '#1E8449', margin: 0 }}>Mastered</p>
          </div>
          <div style={{ background: '#fef9e7', border: '1px solid #f39c12', borderRadius: '10px', padding: '0.75rem 1.5rem', minWidth: '100px' }}>
            <p style={{ fontSize: '1.6rem', fontWeight: 900, color: '#7D6608', margin: 0 }}>{reviewCount}</p>
            <p style={{ fontSize: '0.78rem', color: '#7D6608', margin: 0 }}>Review again</p>
          </div>
        </div>
        <button onClick={reset} style={{ padding: '0.65rem 2.5rem', background: C.navy, color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}>
          Restart Deck
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Progress bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '0.82rem', color: C.muted, fontWeight: 600 }}>🃏 {idx + 1} / {total}</span>
        <span style={{ fontSize: '0.78rem', color: '#1E8449', fontWeight: 600 }}>{mastered.length} mastered</span>
      </div>
      <div style={{ height: '5px', background: '#e9ecef', borderRadius: '3px', marginBottom: '1.5rem' }}>
        <div style={{ height: '100%', background: domainColor, borderRadius: '3px', width: `${((idx) / total) * 100}%`, transition: 'width 0.3s' }} />
      </div>

      {/* Card */}
      <div
        onClick={() => setFlip(f => !f)}
        style={{
          cursor: 'pointer',
          minHeight: '220px',
          borderRadius: '16px',
          border: `2px solid ${flipped ? domainColor : C.border}`,
          background: flipped ? `${domainColor}08` : 'white',
          padding: '2rem 1.75rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          transition: 'all 0.2s',
          marginBottom: '1.25rem',
          userSelect: 'none',
        }}
      >
        {!flipped ? (
          <>
            <p style={{ fontSize: '0.72rem', color: C.muted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Term</p>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: C.navy, margin: '0 0 0.4rem' }}>{card.term}</h2>
            <p style={{ fontSize: '0.9rem', color: domainColor, fontWeight: 600, margin: 0 }}>{card.full}</p>
            <p style={{ fontSize: '0.75rem', color: C.muted, marginTop: '1.25rem' }}>Tap to reveal definition →</p>
          </>
        ) : (
          <>
            <p style={{ fontSize: '0.72rem', color: C.muted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Definition</p>
            <p style={{ fontSize: '0.92rem', color: '#1a1a1a', lineHeight: 1.65, margin: '0 0 0.75rem' }}>{card.definition}</p>
            {card.example && (
              <p style={{ fontSize: '0.8rem', color: '#555', fontStyle: 'italic', lineHeight: 1.55, borderTop: `1px solid ${C.border}`, paddingTop: '0.75rem', marginTop: '0.25rem' }}>
                "{card.example}"
              </p>
            )}
          </>
        )}
      </div>

      {/* Actions */}
      {flipped && (
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={markReview} style={{
            flex: 1, padding: '0.65rem', background: '#fef9e7', border: '1.5px solid #f39c12',
            borderRadius: '10px', color: '#7D6608', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem',
          }}>
            🔁 Review again
          </button>
          <button onClick={markMastered} style={{
            flex: 1, padding: '0.65rem', background: '#eafaf1', border: '1.5px solid #2ecc71',
            borderRadius: '10px', color: '#1E8449', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem',
          }}>
            ✓ Got it
          </button>
        </div>
      )}

      {!flipped && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
          {vocab.map((_, i) => (
            <div key={i} style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: i < idx ? domainColor : i === idx ? domainColor : '#e9ecef',
              opacity: i < idx ? 0.4 : 1,
            }} />
          ))}
        </div>
      )}
    </div>
  )
}
