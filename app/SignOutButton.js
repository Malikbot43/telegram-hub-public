'use client'

import { createClient } from '../lib/supabase-browser'

export default function SignOutButton() {
  const supabase = createClient()

  async function handleSignOut() {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <button
      onClick={handleSignOut}
      className="text-sm text-gray-500 hover:text-red-600 font-medium transition"
    >
      Sign out
    </button>
  )
}
