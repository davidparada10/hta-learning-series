import { useState } from 'react'
import { C, QUIZ } from '../data/courseData'
import { supabase } from '../lib/supabase'

export default function Quiz({ user, domainId = 1, weekNum = 1 }) {
  const [idx, setIdx]      = useState(0)
  const [sel, setSel]      = useState(null)
  const [revealed, setRev] = useState(false)
  const [answers, setAns]  = useState([])
  const [done, setDone]    = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved]  = useState(false)

  const q     = QUIZ[idx]
  const total = QUIZ.length
  const score = answers.filter((a, i) => a === QUIZ[i].a).length
  const pct   = Math.round((score / total) * 100)

  const choose = i => { if (!revealed) setSel(i) }
  const check  = () => setRev(true)

  const next = () => {
    const a = [...answers, sel]
    setAns(a)
    if (idx + 1 >= total) {
      finishQuiz(a)
      return
    }
    setIdx(idx + 1); setSel(null); setRev(false)
  }

  const finishQuiz = async (finalAnswers) => {
    setDone(true)
    if (!user) return
    const finalScore = finalAnswers.filter((a, i) => a === QUIZ[i].a).length
    const finalPct   = Math.round((finalScore / total) * 100)
    setSaving(true)
    const { error } = await supabase.from('quiz_scores').insert({
      user_id:   user.id,
      domain_id: domainId,
      week_num:  weekNum,
      score:     finalPct,
      passed:    finalPct >= 85,
      answers:   finalAnswers,
    })
    setSaving(false)
    if (!error) setSaved(true)
  }

  const reset = () => { setIdx(0); setSel(null); setRev(false); setAns([]); setDone(false); setSaved(false) }

  if (done) {
    const ok    = pct >= 85
    const warn  = pct >= 65 && pct < 85
    const bg    = ok ? C.greenL : warn ? C.amberL : C.redL
    const border= ok ? C.green  : warn ? C.amber  : C.red
    const text  = ok ? '#1E8449': warn ? '#7D6608': '#C0392B'
    const msg   = ok ? '✅ Ready to advance to Week 2!' : warn ? '📖 Review recommended before advancing' : '🔄 Retry recommended — review key concepts first'

    return (
      <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>{ok ? '🎉' : warn ? '📚' : '💪'}</div>
        <h2 style={{ color: C.navy, marginBottom: '0.5rem' }}>Quiz Complete!</h2>
        <p style={{ fontSize: '3.5rem', fontWeight: 900, color: C.navy, margin: '0.5rem 0', lineHeight: 1 }}>{pct}%</p>
        <p style={{ color: C.muted, marginBottom: '1.25rem' }}>{score} / {total} correct</p>
        <div style={{ display: 'inline-block', background: bg, border: `1px solid ${border}`, borderRadius: '10px', padding: '0.9rem 2rem', marginBottom: '1.75rem' }}>
          <p style={{ color: text, fontWeight: 700, margin: 0, fontSize: '1rem' }}>{msg}</p>
        </div>
        {user && (
          <p style={{ fontSize: '0.8rem', color: saving ? C.muted : (saved ? C.green : C.red), marginBottom: '1rem' }}>
            {saving ? '💾 Saving score…' : saved ? '✓ Score saved to your account' : ''}
          </p>
        )}
        <div style={{ marginBottom: '1.75rem' }}>
          <p style={{ fontWeight: 600, color: '#444', marginBottom: '0.6rem' }}>Score Thresholds</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {[['85%+', 'Advance', C.green], ['65–84%', 'Review', C.amber], ['< 65%', 'Retry', C.red]].map(([range, label, clr]) => (
              <div key={range} style={{ background: `${clr}15`, border: `1px solid ${clr}`, borderRadius: '8px', padding: '0.5rem 1rem', textAlign: 'center' }}>
                <p style={{ fontSize: '0.9rem', fontWeight: 700, color: clr, margin: 0 }}>{range}</p>
                <p style={{ fontSize: '0.75rem', color: '#666', margin: 0 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
        <button onClick={reset} style={{ padding: '0.65rem 2.5rem', background: C.navy, color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}>
          Retake Quiz
        </button>
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: C.navy, margin: 0 }}>📝 Domain 1, Week 1 Quiz</h3>
        <span style={{ fontSize: '0.82rem', color: C.muted, fontWeight: 600 }}>{idx + 1} / {total}</span>
      </div>

      <div style={{ height: '6px', background: '#e9ecef', borderRadius: '3px', marginBottom: '1.25rem' }}>
        <div style={{ height: '100%', background: C.navy, borderRadius: '3px', width: `${(idx / total) * 100}%`, transition: 'width 0.3s ease' }} />
      </div>

      <p style={{ fontWeight: 600, fontSize: '0.96rem', color: '#1a1a1a', lineHeight: 1.6, marginBottom: '1rem' }}>{q.q}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
        {q.opts.map((opt, i) => {
          let bg = 'white', border = `1px solid ${C.border}`, color = C.text
          if (revealed) {
            if (i === q.a)    { bg = C.greenL; border = `2px solid ${C.green}`; color = '#1E8449' }
            else if (i === sel) { bg = C.redL;   border = `2px solid ${C.red}`;   color = '#C0392B' }
          } else if (sel === i) {
            bg = C.blueL; border = `2px solid ${C.blue}`; color = '#1A5276'
          }
          return (
            <button key={i} onClick={() => choose(i)} style={{ textAlign: 'left', padding: '0.7rem 1rem', background: bg, border, borderRadius: '8px', color, fontSize: '0.85rem', cursor: revealed ? 'default' : 'pointer', transition: 'all 0.15s', lineHeight: 1.45 }}>
              <span style={{ fontWeight: 700, marginRight: '0.5rem' }}>{String.fromCharCode(65 + i)}.</span>{opt}
            </button>
          )
        })}
      </div>

      {sel !== null && !revealed && (
        <button onClick={check} style={{ padding: '0.5rem 1.4rem', background: C.blue, color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.86rem', marginBottom: '0.75rem' }}>
          Check Answer
        </button>
      )}

      {revealed && (
        <div style={{ padding: '0.8rem 1rem', background: sel === q.a ? C.greenL : C.purpleL, border: `1px solid ${sel === q.a ? C.green : C.purple}`, borderRadius: '8px', marginBottom: '1rem' }}>
          <p style={{ fontWeight: 700, color: sel === q.a ? '#1E8449' : '#6C3483', margin: '0 0 0.3rem' }}>
            {sel === q.a ? '✓ Correct!' : '✗ Not quite'}
          </p>
          <p style={{ fontSize: '0.82rem', color: '#444', margin: 0, lineHeight: 1.55 }}>{q.exp}</p>
        </div>
      )}

      {revealed && (
        <button onClick={next} style={{ padding: '0.55rem 1.75rem', background: C.navy, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem' }}>
          {idx + 1 >= total ? 'See Results →' : 'Next Question →'}
        </button>
      )}
    </div>
  )
}
