'use client'

import { useState } from 'react'
import { createClient } from '../../lib/supabase-browser'

const AUTH_EMAIL_DOMAIN = 'users.telegramhub.local'

function usernameToEmail(u) {
  return `${u.trim().toLowerCase()}@${AUTH_EMAIL_DOMAIN}`
}

export default function LoginPage() {
  const supabase = createClient()
  const [mode, setMode] = useState('signin')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')

  async function handleSignUp(e) {
    e.preventDefault()
    setStatus('Creating account...')
    const { error } = await supabase.auth.signUp({
      email: usernameToEmail(username),
      password,
      options: { data: { username: username.trim() } },
    })
    if (error) {
      setStatus(error.message)
      return
    }
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: usernameToEmail(username),
      password,
    })
    if (signInError) {
      setStatus(signInError.message)
    } else {
      window.location.href = '/'
    }
  }

  async function handleSignIn(e) {
    e.preventDefault()
    setStatus('Signing in...')
    const { error } = await supabase.auth.signInWithPassword({
      email: usernameToEmail(username),
      password,
    })
    if (error) {
      setStatus(error.message)
    } else {
      window.location.href = '/'
    }
  }

  return (
    <main style={{ maxWidth: 360, margin: '80px auto', padding: '0 16px', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: 22, marginBottom: 24, textAlign: 'center' }}>
        {mode === 'signin' ? 'Sign in' : 'Create account'}
      </h1>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={() => setMode('signin')} style={tabStyle(mode === 'signin')}>Sign in</button>
        <button onClick={() => setMode('signup')} style={tabStyle(mode === 'signup')}>Sign up</button>
      </div>

      <form onSubmit={mode === 'signin' ? handleSignIn : handleSignUp} style={{ display: 'grid', gap: 10 }}>
        <input
          required placeholder="Username" value={username}
          onChange={(e) => setUsername(e.target.value)} style={inputStyle}
        />
        <input
          type="password" required placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          {mode === 'signin' ? 'Sign in' : 'Create account'}
        </button>
      </form>

      {status && <p style={{ marginTop: 16, fontSize: 13, opacity: 0.8, textAlign: 'center' }}>{status}</p>}
    </main>
  )
}

const inputStyle = {
  padding: '10px 12px', borderRadius: 8, border: '1px solid #444',
  background: '#1a1a1d', color: '#fff',
}
const buttonStyle = {
  padding: 12, borderRadius: 8, border: 'none', background: '#5aa9ff',
  color: '#0e0e10', fontWeight: 600, cursor: 'pointer',
}
function tabStyle(active) {
  return {
    flex: 1, padding: 8, borderRadius: 8, cursor: 'pointer',
    border: active ? '1px solid #5aa9ff' : '1px solid #333',
    background: active ? '#132133' : 'transparent',
    color: '#fff',
  }
}
