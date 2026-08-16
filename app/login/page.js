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
