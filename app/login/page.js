'use client'

import { createClient } from '../../lib/supabase-browser'

export default function LoginPage() {
  const supabase = createClient()

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/auth/callback` },
    })
  }

  return (
    <main style={{ maxWidth: 360, margin: '80px auto', padding: '0 16px', fontFamily: 'system-ui, sans-serif', textAlign: 'center' }}>
      <h1 style={{ fontSize: 22, marginBottom: 24 }}>Sign in</h1>

      <button
        onClick={signInWithGoogle}
        style={{
          width: '100%', padding: 12, borderRadius: 8, border: '1px solid #444',
          background: '#fff', color: '#111', fontWeight: 600, cursor: 'pointer',
        }}
      >
        Continue with Google
      </button>
    </main>
  )
}
