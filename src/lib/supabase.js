import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const hasConfig = supabaseUrl && supabaseKey

// Real client if configured, otherwise a no-op mock so the app loads without .env
export const supabase = hasConfig
  ? createClient(supabaseUrl, supabaseKey)
  : {
      auth: {
        getSession:        () => Promise.resolve({ data: { session: null } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword:() => Promise.resolve({ error: { message: 'Auth not configured' } }),
        signUp:            () => Promise.resolve({ error: { message: 'Auth not configured' } }),
        signOut:           () => Promise.resolve({}),
      },
      from: () => ({
        select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null }) }), order: () => Promise.resolve({ data: [] }) }),
        insert: () => Promise.resolve({ error: null }),
      }),
    }

export const authConfigured = hasConfig
