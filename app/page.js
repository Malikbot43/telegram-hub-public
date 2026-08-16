import { createClient } from '../lib/supabase-server'
import LinkList from './LinkList'
import UpdatesPanel from './UpdatesPanel'

export default async function HomePage() {
  const supabase = createClient()

  const [{ data: links }, { data: updates }] = await Promise.all([
    supabase
      .from('telegram_links')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false }),
    supabase.from('admin_updates').select('*').order('created_at', { ascending: false }).limit(10),
  ])

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-satellite-dish text-indigo-600 text-2xl"></i>
            <span className="text-xl font-bold tracking-wide">
              Telegram<span className="text-indigo-600">Hub</span>
            </span>
          </div>

          <nav className="hidden md:flex space-x-6 font-medium text-sm">
            <a href="#home" className="hover:text-indigo-600">Home</a>
            <a href="#directories" className="hover:text-indigo-600">Directories</a>
            <a href="#updates" className="hover:text-indigo-600">Updates</a>
          </nav>

          {user ? (
            <span className="text-sm text-gray-600">
              {user.user_metadata?.full_name || user.user_metadata?.name || user.email}
            </span>
          ) : (
            <a
              href="/login"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              <i className="fa-solid fa-user-plus mr-1"></i> Sign in
            </a>
          )}
        </div>
      </header>

      <section id="home" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 text-center px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
            Discover the Best Telegram Communities
          </h1>
          <p className="text-indigo-100">
            Active groups and channels, all in one place.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div id="directories" className="lg:col-span-2">
          <LinkList initialLinks={links || []} />
        </div>

        <div id="updates">
          <UpdatesPanel updates={updates || []} />
        </div>
      </main>
    </>
  )
    }
    
