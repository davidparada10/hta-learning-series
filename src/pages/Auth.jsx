import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { C } from '../data/courseData'
import { partnershipLineLight, builderAcademyTitleLight } from '../lib/brandStyles'

export default function Auth() {
  const [mode, setMode]       = useState('login')   // 'login' | 'signup'
  const [email, setEmail]     = useState('')
  const [password, setPass]   = useState('')
  const [name, setName]       = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [notice, setNotice]   = useState('')

  const submit = async e => {
    e.preventDefault()
    setError(''); setNotice(''); setLoading(true)

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      })
      if (error) setError(error.message)
      else setNotice('Account created! Check your email to confirm, then sign in.')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F0F3F7', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>

      {/* Brand */}
      <div style={{
        textAlign: 'center',
        marginBottom: '2rem',
        maxWidth: '460px',
        padding: '1.25rem 1rem 1.5rem',
        borderRadius: '16px',
        background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(236,242,250,0.88) 100%)',
        boxShadow: '0 8px 32px rgba(27, 42, 74, 0.12), 0 1px 0 rgba(255,255,255,0.9) inset',
        border: '1px solid rgba(255,255,255,0.8)',
      }}>
        <p style={partnershipLineLight}>
          Parada Capital LLC x HTA Construction & Development Inc
        </p>
        <h1 style={builderAcademyTitleLight}>Builder Academy</h1>
      </div>

      {/* Card */}
      <div style={{ background: 'white', borderRadius: '14px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: '2rem', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ margin: '0 0 1.5rem', fontSize: '1.15rem', fontWeight: 700, color: C.navy }}>
          {mode === 'login' ? 'Sign in to your account' : 'Create an account'}
        </h2>

        {error && (
          <div style={{ background: C.redL, border: `1px solid ${C.red}`, borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1rem' }}>
            <p style={{ margin: 0, color: '#C0392B', fontSize: '0.85rem' }}>{error}</p>
          </div>
        )}

        {notice && (
          <div style={{ background: C.greenL, border: `1px solid ${C.green}`, borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1rem' }}>
            <p style={{ margin: 0, color: '#1E8449', fontSize: '0.85rem' }}>{notice}</p>
          </div>
        )}

        <form onSubmit={submit}>
          {mode === 'signup' && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Full Name</label>
              <input
                type="text" required value={name} onChange={e => setName(e.target.value)}
                placeholder="Your name"
                style={inputStyle}
              />
            </div>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Email</label>
            <input
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@email.com"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Password</label>
            <input
              type="password" required value={password} onChange={e => setPass(e.target.value)}
              placeholder={mode === 'signup' ? 'At least 6 characters' : '••••••••'}
              style={inputStyle}
            />
          </div>

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '0.75rem', background: loading ? '#aaa' : C.navy,
            color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700,
            fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s',
          }}>
            {loading ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.85rem', color: C.muted }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); setNotice('') }}
            style={{ background: 'none', border: 'none', color: C.blue, fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem', padding: 0 }}
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  )
}

const labelStyle = {
  display: 'block', fontSize: '0.82rem', fontWeight: 600,
  color: '#444', marginBottom: '0.35rem',
}

const inputStyle = {
  width: '100%', padding: '0.6rem 0.85rem',
  border: '1.5px solid #DDE3EC', borderRadius: '8px',
  fontSize: '0.9rem', outline: 'none', color: '#222',
  boxSizing: 'border-box', background: '#F8F9FA',
  transition: 'border-color 0.15s',
}
