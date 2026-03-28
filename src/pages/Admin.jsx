import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { C } from '../data/courseData'

export default function Admin({ user, profile }) {
  const [users, setUsers]       = useState([])
  const [scores, setScores]     = useState([])
  const [loading, setLoading]   = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    const [profilesRes, scoresRes] = await Promise.all([
      supabase.from('profiles').select('*').order('created_at', { ascending: false }),
      supabase.from('quiz_scores').select('*').order('created_at', { ascending: false }),
    ])
    if (profilesRes.data) setUsers(profilesRes.data)
    if (scoresRes.data)   setScores(scoresRes.data)
    setLoading(false)
  }

  const handleSignOut = async () => { await supabase.auth.signOut() }

  const getUserScores = (userId) => scores.filter(s => s.user_id === userId)
  const avgScore      = (userId) => {
    const s = getUserScores(userId)
    if (!s.length) return null
    return Math.round(s.reduce((sum, x) => sum + x.score, 0) / s.length)
  }

  const totalUsers    = users.filter(u => u.role !== 'admin').length
  const totalAttempts = scores.length
  const passRate      = scores.length ? Math.round((scores.filter(s => s.passed).length / scores.length) * 100) : 0
  const avgGlobal     = scores.length ? Math.round(scores.reduce((sum, s) => sum + s.score, 0) / scores.length) : 0

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F0F3F7' }}>
        <p style={{ color: C.muted }}>Loading dashboard…</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F0F3F7', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <header style={{ background: C.navy, color: 'white', padding: '0.85rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ margin: 0, fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.65 }}>Parada Capital</p>
          <p style={{ margin: '0.2rem 0 0', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.55 }}>HTA Construction</p>
          <h1 style={{ margin: '0.35rem 0 0', fontSize: '1.15rem', fontWeight: 900 }}>Learning Series — Admin</h1>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a href="/" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.12)', padding: '0.3rem 0.75rem', borderRadius: '6px', textDecoration: 'none' }}>
            ← Back to Course
          </a>
          <button onClick={handleSignOut} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.75)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.3rem 0.75rem', borderRadius: '6px', cursor: 'pointer' }}>
            Sign out
          </button>
        </div>
      </header>

      <div style={{ padding: '1.5rem', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>

        {/* KPI cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Total Students', val: totalUsers, icon: '👤', color: C.blue },
            { label: 'Quiz Attempts', val: totalAttempts, icon: '📝', color: C.navy },
            { label: 'Pass Rate', val: `${passRate}%`, icon: '✅', color: C.green },
            { label: 'Avg Score', val: avgGlobal ? `${avgGlobal}%` : '—', icon: '📊', color: C.orange },
          ].map(k => (
            <div key={k.label} style={{ background: 'white', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
              <p style={{ margin: '0 0 0.4rem', fontSize: '1.5rem' }}>{k.icon}</p>
              <p style={{ margin: '0 0 0.15rem', fontSize: '1.8rem', fontWeight: 900, color: k.color }}>{k.val}</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: C.muted }}>{k.label}</p>
            </div>
          ))}
        </div>

        {/* Tab nav */}
        <div style={{ display: 'flex', gap: '0.25rem', background: '#e9ecef', borderRadius: '9px', padding: '0.25rem', marginBottom: '1.25rem', width: 'fit-content' }}>
          {[{ id: 'overview', label: '👥 Students' }, { id: 'scores', label: '📊 Quiz Scores' }].map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              padding: '0.45rem 1.25rem', border: 'none', borderRadius: '7px',
              background: activeTab === t.id ? 'white' : 'transparent',
              color: activeTab === t.id ? C.navy : C.muted,
              fontWeight: activeTab === t.id ? 700 : 400,
              fontSize: '0.85rem', cursor: 'pointer',
              boxShadow: activeTab === t.id ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            }}>{t.label}</button>
          ))}
        </div>

        {/* Students table */}
        {activeTab === 'overview' && (
          <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.25rem', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: C.navy }}>All Students</h3>
              <button onClick={loadData} style={{ fontSize: '0.78rem', color: C.blue, background: 'none', border: `1px solid ${C.border}`, padding: '0.3rem 0.75rem', borderRadius: '6px', cursor: 'pointer' }}>↻ Refresh</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: C.gray }}>
                  {['Name', 'Email', 'Role', 'Quiz Attempts', 'Best Score', 'Avg Score', 'Passed'].map(h => (
                    <th key={h} style={{ padding: '0.65rem 1rem', textAlign: 'left', fontSize: '0.72rem', fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.length === 0 && (
                  <tr><td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: C.muted, fontSize: '0.85rem' }}>No students yet.</td></tr>
                )}
                {users.map((u, i) => {
                  const s   = getUserScores(u.id)
                  const avg = avgScore(u.id)
                  const best = s.length ? Math.max(...s.map(x => x.score)) : null
                  const passed = s.filter(x => x.passed).length
                  return (
                    <tr key={u.id} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? 'white' : '#FAFAFA' }}>
                      <td style={td}><span style={{ fontWeight: 600, color: C.navy }}>{u.full_name || '—'}</span></td>
                      <td style={td}>{u.email}</td>
                      <td style={td}>
                        <span style={{ background: u.role === 'admin' ? C.purpleL : C.blueL, color: u.role === 'admin' ? C.purple : C.blue, padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                          {u.role || 'student'}
                        </span>
                      </td>
                      <td style={td}>{s.length || 0}</td>
                      <td style={td}>{best !== null ? <span style={{ fontWeight: 700, color: best >= 85 ? C.green : best >= 65 ? C.amber : C.red }}>{best}%</span> : '—'}</td>
                      <td style={td}>{avg !== null ? `${avg}%` : '—'}</td>
                      <td style={td}>{s.length ? `${passed} / ${s.length}` : '—'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Quiz scores table */}
        {activeTab === 'scores' && (
          <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.25rem', borderBottom: `1px solid ${C.border}` }}>
              <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: C.navy }}>All Quiz Attempts</h3>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: C.gray }}>
                  {['Student', 'Domain', 'Week', 'Score', 'Passed', 'Date'].map(h => (
                    <th key={h} style={{ padding: '0.65rem 1rem', textAlign: 'left', fontSize: '0.72rem', fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scores.length === 0 && (
                  <tr><td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: C.muted, fontSize: '0.85rem' }}>No quiz attempts yet.</td></tr>
                )}
                {scores.map((s, i) => {
                  const u = users.find(x => x.id === s.user_id)
                  return (
                    <tr key={s.id} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? 'white' : '#FAFAFA' }}>
                      <td style={td}>{u?.full_name || u?.email || s.user_id.slice(0, 8) + '…'}</td>
                      <td style={td}>Domain {s.domain_id}</td>
                      <td style={td}>Week {s.week_num}</td>
                      <td style={td}><span style={{ fontWeight: 700, fontSize: '1rem', color: s.score >= 85 ? C.green : s.score >= 65 ? C.amber : C.red }}>{s.score}%</span></td>
                      <td style={td}>
                        <span style={{ background: s.passed ? C.greenL : C.redL, color: s.passed ? '#1E8449' : '#C0392B', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                          {s.passed ? '✓ Passed' : '✗ Not yet'}
                        </span>
                      </td>
                      <td style={td}>{new Date(s.created_at).toLocaleDateString()}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

const td = {
  padding: '0.7rem 1rem',
  fontSize: '0.83rem',
  color: '#444',
  verticalAlign: 'middle',
}
