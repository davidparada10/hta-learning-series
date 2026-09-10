import { useState, useEffect, useRef, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { C } from '../data/courseData'

export default function WeekNotes({ user, domainId, weekNum, domainColor }) {
  const [content, setContent] = useState('')
  const [status, setStatus]   = useState('idle') // idle | saving | saved | error
  const [open, setOpen]       = useState(false)
  const saveTimer = useRef(null)
  const lastSaved = useRef('')

  // Load note when week/domain changes
  useEffect(() => {
    if (!user) return
    setContent('')
    setStatus('idle')
    lastSaved.current = ''

    supabase
      .from('week_notes')
      .select('content')
      .eq('user_id', user.id)
      .eq('domain_id', domainId)
      .eq('week_num', weekNum)
      .maybeSingle()
      .then(({ data }) => {
        const text = data?.content ?? ''
        setContent(text)
        lastSaved.current = text
      })
  }, [user, domainId, weekNum])

  const save = useCallback(async (text) => {
    if (!user || text === lastSaved.current) return
    setStatus('saving')
    const { error } = await supabase
      .from('week_notes')
      .upsert(
        { user_id: user.id, domain_id: domainId, week_num: weekNum, content: text, updated_at: new Date().toISOString() },
        { onConflict: 'user_id,domain_id,week_num' }
      )
    if (error) {
      setStatus('error')
    } else {
      lastSaved.current = text
      setStatus('saved')
      setTimeout(() => setStatus('idle'), 2000)
    }
  }, [user, domainId, weekNum])

  const handleChange = (e) => {
    const text = e.target.value
    setContent(text)
    setStatus('idle')
    clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => save(text), 1200)
  }

  // Flush on unmount
  useEffect(() => () => {
    clearTimeout(saveTimer.current)
  }, [])

  if (!user) return null

  const statusLabel = status === 'saving' ? 'Saving…'
    : status === 'saved'  ? '✓ Saved'
    : status === 'error'  ? '⚠ Save failed'
    : ''

  const statusColor = status === 'error' ? '#e74c3c'
    : status === 'saved' ? '#27ae60'
    : C.muted

  return (
    <div style={{ marginTop: '1rem' }}>
      {/* Collapsible header */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          width: '100%', background: 'none', border: 'none',
          padding: '0.4rem 0', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <span style={{
          fontSize: '0.78rem', fontWeight: 700, color: domainColor,
          display: 'flex', alignItems: 'center', gap: '0.35rem',
        }}>
          <span style={{ fontSize: '0.95rem' }}>{open ? '▾' : '▸'}</span>
          📝 My Notes
        </span>
        {!open && content && (
          <span style={{ fontSize: '0.72rem', color: C.muted, fontStyle: 'italic', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px' }}>
            {content.slice(0, 60)}{content.length > 60 ? '…' : ''}
          </span>
        )}
        {statusLabel && (
          <span style={{ fontSize: '0.7rem', color: statusColor, marginLeft: 'auto' }}>{statusLabel}</span>
        )}
      </button>

      {open && (
        <div style={{ marginTop: '0.5rem' }}>
          <textarea
            value={content}
            onChange={handleChange}
            placeholder="Jot observations, questions, or key takeaways for this week…"
            rows={5}
            style={{
              width: '100%', boxSizing: 'border-box',
              padding: '0.75rem',
              border: `1.5px solid ${content ? domainColor + '60' : C.border}`,
              borderRadius: '8px',
              fontSize: '0.875rem', lineHeight: 1.6, color: '#333',
              background: '#fafafa',
              resize: 'vertical', outline: 'none',
              fontFamily: 'inherit',
              transition: 'border-color 0.15s',
            }}
            onFocus={e => { e.target.style.borderColor = domainColor }}
            onBlur={e => {
              e.target.style.borderColor = content ? domainColor + '60' : C.border
              save(content)
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.3rem' }}>
            <span style={{ fontSize: '0.7rem', color: C.muted }}>
              {content.length > 0 ? `${content.length} chars` : 'Auto-saved as you type'}
            </span>
            {statusLabel && (
              <span style={{ fontSize: '0.7rem', color: statusColor }}>{statusLabel}</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
