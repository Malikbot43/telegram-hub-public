'use client'

import { createClient } from '../../lib/supabase-browser'

export default function SignOutButton() {
  const supabase = createClient()

  async function handleSignOut() {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <button
      onClick={handleSignOut}
      className="bg-rose-100 hover:bg-rose-200 text-rose-600 font-semibold text-sm py-2 px-4 rounded-xl transition"
    >
      Sign Out
    </button>
  )
}
