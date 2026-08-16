bash

cat /home/claude/telegram-hub/public-site/app/login/page.js
Output

'use client'

import { useState } from 'react'
import { createClient } from '../../lib/supabase-browser'

export default function LoginPage() {
  const supabase = createClient()
  const [mode, setMode] = useState('email') // 'email' | 'phone'
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [status, setStatus] = useState('')

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/auth/callback` },
    })
  }

  async function sendEmailLink(e) {
    e.preventDefault()
    setStatus('Sending link...')
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    })
    setStatus(error ? error.message : 'Check your email for a login link.')
  }

  async function sendPhoneOtp(e) {
    e.preventDefault()
    setStatus('Sending code...')
    const { error } = await supabase.auth.signInWithOtp({ phone })
    if (error) {
      setStatus(error.message)
    } else {
      setOtpSent(true)
      setStatus('Code sent via SMS.')
    }
  }

  async function verifyPhoneOtp(e) {
    e.preventDefault()
    setStatus('Verifying...')
    const { error } = await supabase.auth.verifyOtp({ phone, token: otp, type: 'sms' })
    if (error) {
      setStatus(error.message)
    } else {
      window.location.href = '/'
    }
  }

  return (
    <main style={{ maxWidth: 380, margin: '80px auto', padding: '0 16px', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: 22, marginBottom: 24, textAlign: 'center' }}>Sign in</h1>

      <button
        onClick={signInWithGoogle}
        style={{
          width: '100%', padding: 12, borderRadius: 8, border: '1px solid #444',
          background: '#fff', color: '#111', fontWeight: 600, marginBottom: 20, cursor: 'pointer',
        }}
      >
        Continue with Google
      </button>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={() => setMode('email')} style={tabStyle(mode === 'email')}>Email</button>
        <button onClick={() => setMode('phone')} style={tabStyle(mode === 'phone')}>Phone</button>
      </div>

      {mode === 'email' && (
        <form onSubmit={sendEmailLink} style={{ display: 'grid', gap: 10 }}>
          <input
            type="email" required placeholder="you@example.com" value={email}
            onChange={(e) => setEmail(e.target.value)} style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>Send login link</button>
        </form>
      )}

      {mode === 'phone' && !otpSent && (
        <form onSubmit={sendPhoneOtp} style={{ display: 'grid', gap: 10 }}>
          <input
            type="tel" required placeholder="+15551234567" value={phone}
            onChange={(e) => setPhone(e.target.value)} style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>Send code</button>
        </form>
      )}

      {mode === 'phone' && otpSent && (
        <form onSubmit={verifyPhoneOtp} style={{ display: 'grid', gap: 10 }}>
          <input
            required placeholder="6-digit code" value={otp}
            onChange={(e) => setOtp(e.target.value)} style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>Verify & sign in</button>
        </form>
      )}

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
Done
That's fine — the code block I gave you above is the correct, complete replacement. In your GitHub repo, open app/login/page.js, tap edit, select all and delete, then paste in the code block from my previous message (the one starting with 'use client' and const AUTH_EMAIL_DOMAIN = ...). Commit it.

4. Update app/page.js so it shows the username instead of an email — replace it with this:


Ran a command
Ran a command
jsx
import { createClient } from '../lib/supabase-server'
import LinkList from './LinkList'

export default async function HomePage() {
  const supabase = createClient()

  const { data: links } = await supabase
    .from('telegram_links')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '32px 16px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: 24 }}>📡 Telegram Hub</h1>
        {user ? (
          <span style={{ fontSize: 14, opacity: 0.8 }}>
            Signed in as {user.user_metadata?.username || 'user'}
          </span>
        ) : (
          <a href="/login" style={{ color: '#5aa9ff', textDecoration: 'none', fontSize: 14 }}>
            Sign in
          </a>
        )}
      </header>

      <LinkList initialLinks={links || []} />
    </main>
  )
}
Order to do this in: (1) turn off email confirmation in Supabase, (2) run the SQL, (3) replace app/login/page.js, (4) replace app/page.js, then let Vercel redeploy. Try signing up with a username and password on the live site and tell me what happens.


        
