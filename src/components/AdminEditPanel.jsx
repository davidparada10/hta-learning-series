import { useState } from 'react'
import { C } from '../data/courseData'
import { saveDomainEdit, saveWeekEdit, resetAllEdits, exportEditsAsJSON } from '../lib/courseContent'

export default function AdminEditPanel({ domain, week, onSave, onClose }) {
  const [tab, setTab] = useState('week')

  // Domain-level
  const [dTitle, setDTitle]       = useState(domain.title)
  const [dDesc, setDDesc]         = useState(domain.description)

  // Week-level
  const [wTitle, setWTitle]       = useState(week.title)
  const [sessions, setSessions]   = useState(week.sessions   ? week.sessions.map(s => ({ ...s }))   : [])
  const [vocab, setVocab]         = useState(week.vocabulary ? week.vocabulary.map(v => ({ ...v })) : [])
  const [concepts, setConcepts]   = useState(week.concepts   ? week.concepts.map(c => ({ ...c }))   : [])

  const [saved, setSaved]         = useState(false)
  const [copied, setCopied]       = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)

  const handleSave = () => {
    saveDomainEdit(domain.id, { title: dTitle, description: dDesc })
    const weekPatch = { title: wTitle }
    if (sessions.length) weekPatch.sessions = sessions
    if (vocab.length)    weekPatch.vocabulary = vocab
    if (concepts.length) weekPatch.concepts = concepts
    saveWeekEdit(domain.id, week.week, weekPatch)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    onSave()
  }

  const handleExport = () => {
    const json = exportEditsAsJSON()
    navigator.clipboard.writeText(json).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  const handleReset = () => {
    if (!confirmReset) { setConfirmReset(true); return }
    resetAllEdits()
    setConfirmReset(false)
    onSave()
  }

  // Sessions
  const addSession    = ()        => setSessions(s => [...s, { day: '', title: '' }])
  const removeSession = i         => setSessions(s => s.filter((_, j) => j !== i))
  const updSession    = (i, k, v) => setSessions(s => s.map((x, j) => j === i ? { ...x, [k]: v } : x))

  // Vocabulary
  const addVocab    = ()        => setVocab(v => [...v, { term: '', full: '', definition: '', example: '' }])
  const removeVocab = i         => setVocab(v => v.filter((_, j) => j !== i))
  const updVocab    = (i, k, v) => setVocab(arr => arr.map((x, j) => j === i ? { ...x, [k]: v } : x))

  // Concepts
  const addConcept    = ()        => setConcepts(c => [...c, { heading: '', body: '' }])
  const removeConcept = i         => setConcepts(c => c.filter((_, j) => j !== i))
  const updConcept    = (i, k, v) => setConcepts(c => c.map((x, j) => j === i ? { ...x, [k]: v } : x))

  return (
    <div style={{
      position: 'fixed', top: 0, right: 0, width: '440px', height: '100vh',
      background: 'white', boxShadow: '-4px 0 32px rgba(0,0,0,0.18)',
      zIndex: 1000, display: 'flex', flexDirection: 'column',
      borderLeft: `4px solid ${domain.color}`,
    }}>
      {/* Header */}
      <div style={{ padding: '1rem 1.25rem', borderBottom: `1px solid ${C.border}`, background: `${domain.color}08`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div>
          <p style={{ margin: 0, fontSize: '0.68rem', color: C.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>✏️ Admin Edit</p>
          <p style={{ margin: 0, fontSize: '0.92rem', fontWeight: 700, color: domain.color }}>
            {domain.icon} Domain {domain.id} · Week {week.week}
          </p>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem', color: C.muted, lineHeight: 1 }}>✕</button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
        {[['domain', `${domain.icon} Domain`], ['week', `📅 Week ${week.week}`]].map(([id, label]) => (
          <button key={id} type="button" onClick={() => setTab(id)} style={{
            flex: 1, padding: '0.6rem', border: 'none',
            borderBottom: tab === id ? `2px solid ${domain.color}` : '2px solid transparent',
            background: 'transparent', color: tab === id ? domain.color : C.muted,
            fontWeight: tab === id ? 700 : 400, cursor: 'pointer', fontSize: '0.82rem',
          }}>{label}</button>
        ))}
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.25rem' }}>

        {tab === 'domain' && (
          <div>
            <Field label="Domain Title">
              <input value={dTitle} onChange={e => setDTitle(e.target.value)} style={iS} />
            </Field>
            <Field label="Description">
              <textarea value={dDesc} onChange={e => setDDesc(e.target.value)} rows={3} style={{ ...iS, resize: 'vertical' }} />
            </Field>
          </div>
        )}

        {tab === 'week' && (
          <div>
            <Field label="Week Title">
              <input value={wTitle} onChange={e => setWTitle(e.target.value)} style={iS} />
            </Field>

            <Section label="Sessions" color={domain.color} onAdd={addSession}>
              {sessions.map((s, i) => (
                <ItemCard key={i} onRemove={() => removeSession(i)}>
                  <input placeholder="Day (e.g. Mon Mar 30)" value={s.day} onChange={e => updSession(i, 'day', e.target.value)} style={{ ...iS, marginBottom: '0.35rem' }} />
                  <input placeholder="Session title" value={s.title} onChange={e => updSession(i, 'title', e.target.value)} style={iS} />
                </ItemCard>
              ))}
              {sessions.length === 0 && <EmptyHint>No sessions yet — click + Add</EmptyHint>}
            </Section>

            <Section label="Vocabulary" color={domain.color} onAdd={addVocab}>
              {vocab.map((v, i) => (
                <ItemCard key={i} onRemove={() => removeVocab(i)}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem', marginBottom: '0.35rem' }}>
                    <input placeholder="Term (e.g. GPR)" value={v.term} onChange={e => updVocab(i, 'term', e.target.value)} style={iS} />
                    <input placeholder="Full name" value={v.full} onChange={e => updVocab(i, 'full', e.target.value)} style={iS} />
                  </div>
                  <textarea placeholder="Definition" value={v.definition} onChange={e => updVocab(i, 'definition', e.target.value)} rows={2} style={{ ...iS, marginBottom: '0.35rem', resize: 'vertical' }} />
                  <input placeholder="📌 Example" value={v.example} onChange={e => updVocab(i, 'example', e.target.value)} style={iS} />
                </ItemCard>
              ))}
              {vocab.length === 0 && <EmptyHint>No vocabulary yet — click + Add</EmptyHint>}
            </Section>

            <Section label="Core Concepts" color={domain.color} onAdd={addConcept}>
              {concepts.map((c, i) => (
                <ItemCard key={i} onRemove={() => removeConcept(i)}>
                  <input placeholder="Heading" value={c.heading} onChange={e => updConcept(i, 'heading', e.target.value)} style={{ ...iS, marginBottom: '0.35rem' }} />
                  <textarea placeholder="Body text" value={c.body} onChange={e => updConcept(i, 'body', e.target.value)} rows={3} style={{ ...iS, resize: 'vertical' }} />
                </ItemCard>
              ))}
              {concepts.length === 0 && <EmptyHint>No concepts yet — click + Add</EmptyHint>}
            </Section>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: '0.85rem 1.25rem', borderTop: `1px solid ${C.border}`, flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <button type="button" onClick={handleSave} style={{ flex: 1, padding: '0.6rem', background: saved ? C.green : domain.color, color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '0.88rem', transition: 'background 0.2s' }}>
            {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
          <button type="button" onClick={onClose} style={{ padding: '0.6rem 1rem', background: '#f0f0f0', color: '#444', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.88rem' }}>
            Close
          </button>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="button" onClick={handleExport} style={{ flex: 1, padding: '0.45rem', background: 'none', border: `1px solid ${C.border}`, borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', color: C.muted }}>
            {copied ? '✓ Copied!' : '📋 Copy JSON'}
          </button>
          <button type="button" onClick={handleReset} style={{ flex: 1, padding: '0.45rem', background: 'none', border: `1px solid ${confirmReset ? C.red : C.border}`, borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', color: confirmReset ? C.red : C.muted }}>
            {confirmReset ? '⚠️ Confirm reset?' : '↺ Reset all edits'}
          </button>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: '0.85rem' }}>
      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.35rem' }}>{label}</label>
      {children}
    </div>
  )
}

function Section({ label, color, onAdd, children }) {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <p style={{ margin: 0, fontSize: '0.72rem', fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{label}</p>
        <button type="button" onClick={onAdd} style={{ fontSize: '0.76rem', color, background: `${color}15`, border: `1px solid ${color}50`, padding: '0.2rem 0.65rem', borderRadius: '5px', cursor: 'pointer', fontWeight: 700 }}>+ Add</button>
      </div>
      {children}
    </div>
  )
}

function ItemCard({ children, onRemove }) {
  return (
    <div style={{ background: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '8px', padding: '0.75rem', marginBottom: '0.5rem', position: 'relative' }}>
      <button type="button" onClick={onRemove} style={{ position: 'absolute', top: '0.4rem', right: '0.4rem', background: '#fee2e2', border: 'none', borderRadius: '4px', cursor: 'pointer', color: '#dc2626', fontSize: '0.7rem', padding: '0.15rem 0.4rem', fontWeight: 700 }}>✕</button>
      <div style={{ paddingRight: '1.75rem' }}>{children}</div>
    </div>
  )
}

function EmptyHint({ children }) {
  return <p style={{ fontSize: '0.78rem', color: '#bbb', fontStyle: 'italic', margin: '0.25rem 0 0.75rem' }}>{children}</p>
}

const iS = {
  width: '100%', padding: '0.4rem 0.65rem',
  border: '1px solid #dee2e6', borderRadius: '6px',
  fontSize: '0.82rem', outline: 'none', color: '#222',
  boxSizing: 'border-box', background: 'white', fontFamily: 'inherit',
}
