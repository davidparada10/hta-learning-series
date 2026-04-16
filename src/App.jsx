import { useState, useEffect } from 'react'
import { supabase, authConfigured } from './lib/supabase'
import Auth from './pages/Auth'
import Course from './pages/Course'
import Admin from './pages/Admin'

export default function App() {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // If Supabase is not configured, skip auth entirely
    if (!authConfigured) {
      setLoading(false)
      return
    }

    // Safety net: never stay stuck on loading screen beyond 6s
    const timeout = setTimeout(() => setLoading(false), 6000)

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) loadProfile(session.user.id)
      else { clearTimeout(timeout); setLoading(false) }
    }).catch(() => { clearTimeout(timeout); setLoading(false) })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) loadProfile(session.user.id)
      else { setProfile(null); clearTimeout(timeout); setLoading(false) }
    })

    return () => { subscription.unsubscribe(); clearTimeout(timeout) }
  }, [])

  const loadProfile = async (userId) => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      setProfile(data)
    } catch {
      // Profile fetch failed — continue without profile (non-fatal)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F0F3F7' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🏗️</p>
          <p style={{ color: '#7F8C8D', fontSize: '0.9rem' }}>Loading…</p>
        </div>
      </div>
    )
  }

  // No Supabase config → go straight to course as guest
  if (!authConfigured) {
    return <Course user={null} profile={null} />
  }

  if (!session) {
    return <Auth />
  }

  const isAdminRoute = window.location.pathname === '/admin'
  if (isAdminRoute && profile?.role === 'admin') {
    return <Admin user={session.user} profile={profile} />
  }

  return <Course user={session.user} profile={profile} />
}
