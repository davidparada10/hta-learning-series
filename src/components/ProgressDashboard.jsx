import { useState, useEffect } from 'react'
import { C } from '../data/courseData'
import { supabase } from '../lib/supabase'

export default function ProgressDashboard({ user, domains, onClose }) {
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) { setLoading(false); return }
    supabase
      .from('quiz_scores')
      .select('domain_id, week_num, score, passed, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => { setScores(data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [user])

  // Best score per domain+week
  const bestScore = (domainId, weekNum) => {
    const attempts = scores.filter(s => s.domain_id === domainId && s.week_num === weekNum)
    if (!attempts.length) return null
    return Math.max(...attempts.map(s => s.score))
  }

  const totalWeeks   = domains.reduce((s, d) => s + d.weeks.length, 0)
  const passedWeeks  = domains.reduce((s, d) =>
    s + d.weeks.filter(w => (bestScore(d.id, w.week) || 0) >= 85).length, 0)
  const overallPct   = Math.round((passedWeeks / totalWeeks) * 100)

  const scoreColor = pct => pct >= 85 ? '#1E8449' : pct >= 65 ? '#7D6608' : '#C0392B'
  const scoreBg    = pct => pct >= 85 ? '#eafaf1' : pct >= 65 ? '#fef9e7' : '#fdf2f2'
  const scoreBdr   = pct => pct >= 85 ? '#2ecc71' : pct >= 65 ? '#f39c12' : '#e74c3c'

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      zIndex: 1000, padding: '1.5rem', overflowY: 'auto',
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: 'white', borderRadius: '16px', width: '100%', maxWidth: '680px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)', overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #1a3555, #0c1829)', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ color: 'white', margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>📊 My Progress</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', margin: '0.2rem 0 0', fontSize: '0.78rem' }}>Quiz scores across all 4 domains</p>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
        </div>

        <div style={{ padding: '1.25rem 1.5rem' }}>
          {!user && (
            <div style={{ background: '#fef9e7', border: '1px solid #f39c12', borderRadius: '10px', padding: '1rem', marginBottom: '1.25rem', textAlign: 'center' }}>
              <p style={{ color: '#7D6608', fontWeight: 600, margin: 0, fontSize: '0.88rem' }}>Sign in to track your progress across sessions</p>
            </div>
          )}

          {/* Summary row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {[
              { label: 'Overall progress', value: `${overallPct}%`, sub: `${passedWeeks} / ${totalWeeks} weeks passed` },
              { label: 'Quizzes taken', value: scores.length, sub: 'total attempts' },
              { label: 'Weeks passed', value: passedWeeks, sub: 'scored 85%+' },
            ].map(({ label, value, sub }) => (
              <div key={label} style={{ background: '#f8f9fa', borderRadius: '10px', padding: '0.9rem 1rem', textAlign: 'center' }}>
                <p style={{ fontSize: '0.7rem', color: C.muted, textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 0.25rem' }}>{label}</p>
                <p style={{ fontSize: '1.6rem', fontWeight: 900, color: C.navy, margin: '0 0 0.15rem' }}>{value}</p>
                <p style={{ fontSize: '0.72rem', color: C.muted, margin: 0 }}>{sub}</p>
              </div>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: C.muted }}>Loading scores…</div>
          ) : (
            domains.map(domain => {
              const domainPassed  = domain.weeks.filter(w => (bestScore(domain.id, w.week) || 0) >= 85).length
              const domainAttempted = domain.weeks.filter(w => bestScore(domain.id, w.week) !== null).length
              return (
                <div key={domain.id} style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                    <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: domain.color }}>
                      {domain.icon} Domain {domain.id}: {domain.title}
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: C.muted }}>{domainPassed}/{domain.weeks.length} passed</span>
                  </div>
                  {/* Progress bar */}
                  <div style={{ height: '4px', background: '#e9ecef', borderRadius: '2px', marginBottom: '0.75rem' }}>
                    <div style={{ height: '100%', background: domain.color, borderRadius: '2px', width: `${(domainPassed / domain.weeks.length) * 100}%`, transition: 'width 0.4s' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.4rem' }}>
                    {domain.weeks.map(w => {
                      const best = bestScore(domain.id, w.week)
                      const attempts = scores.filter(s => s.domain_id === domain.id && s.week_num === w.week).length
                      return (
                        <div key={w.week} style={{
                          borderRadius: '8px', padding: '0.5rem 0.25rem',
                          background: best !== null ? scoreBg(best) : '#f8f9fa',
                          border: `1px solid ${best !== null ? scoreBdr(best) : '#e9ecef'}`,
                          textAlign: 'center',
                        }}>
                          <p style={{ fontSize: '0.65rem', color: C.muted, margin: '0 0 2px', fontWeight: 600 }}>W{w.week}</p>
                          <p style={{ fontSize: '0.88rem', fontWeight: 900, color: best !== null ? scoreColor(best) : '#ccc', margin: 0 }}>
                            {best !== null ? `${best}%` : '—'}
                          </p>
                          {attempts > 1 && (
                            <p style={{ fontSize: '0.58rem', color: C.muted, margin: '2px 0 0' }}>{attempts}×</p>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })
          )}

          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem', paddingTop: '1rem', borderTop: `1px solid ${C.border}` }}>
            {[['85%+', 'Pass', '#2ecc71'], ['65–84%', 'Review', '#f39c12'], ['< 65%', 'Retry', '#e74c3c'], ['—', 'Not taken', '#e9ecef']].map(([range, label, clr]) => (
              <div key={range} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: clr }} />
                <span style={{ fontSize: '0.72rem', color: C.muted }}>{range} {label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
