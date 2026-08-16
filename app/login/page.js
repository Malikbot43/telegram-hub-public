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
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '0 16px 40px' }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 0',
          marginBottom: 28,
        }}
      >
        <h1 style={{ fontSize: 24, margin: 0 }}>
          📡 <span style={{ color: '#1a1a2e' }}>Telegram</span>
          <span style={{ color: '#4f46e5' }}>Hub</span>
        </h1>

        {user ? (
          <span style={{ fontSize: 14, opacity: 0.7 }}>
            {user.user_metadata?.full_name || user.user_metadata?.name || user.email}
          </span>
        ) : (
          <a
            href="/login"
            style={{
              display: 'inline-block',
              background: '#4f46e5',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: 14,
              padding: '10px 18px',
              borderRadius: 999,
            }}
          >
            Sign in
          </a>
        )}
      </header>

      <LinkList initialLinks={links || []} />
    </main>
  )
            }
            
