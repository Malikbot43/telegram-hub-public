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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white w-full max-w-sm p-8 rounded-xl shadow-sm border border-gray-100 text-center">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <i className="fa-solid fa-satellite-dish text-indigo-600 text-2xl"></i>
          <span className="text-xl font-bold tracking-wide">
            Telegram<span className="text-indigo-600">Hub</span>
          </span>
        </div>

        <h1 className="text-xl font-bold mb-6">Sign in</h1>

        <button
          onClick={signInWithGoogle}
          className="w-full flex items-center justify-center gap-2 border border-gray-200 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
        >
          <i className="fa-brands fa-google text-red-500"></i>
          Continue with Google
        </button>
      </div>
    </div>
  )
            }
