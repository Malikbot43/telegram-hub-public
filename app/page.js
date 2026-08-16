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
          <span style={{ fontSize: 14, opacity: 0.8 }}>Signed in as {user.email || user.phone}</span>
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
