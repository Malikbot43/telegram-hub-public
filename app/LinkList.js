'use client'

import { useMemo, useState } from 'react'

const PLATFORM_STYLES = {
  telegram: { icon: 'fa-brands fa-telegram', iconBg: 'bg-sky-100 text-sky-600', badge: 'bg-sky-100 text-sky-700', button: 'bg-sky-600 hover:bg-sky-700' },
  whatsapp: { icon: 'fa-brands fa-whatsapp', iconBg: 'bg-green-100 text-green-600', badge: 'bg-green-100 text-green-700', button: 'bg-green-600 hover:bg-green-700' },
  facebook: { icon: 'fa-brands fa-facebook', iconBg: 'bg-blue-100 text-blue-600', badge: 'bg-blue-100 text-blue-700', button: 'bg-blue-600 hover:bg-blue-700' },
  twitter: { icon: 'fa-brands fa-x-twitter', iconBg: 'bg-gray-200 text-gray-800', badge: 'bg-gray-200 text-gray-800', button: 'bg-gray-900 hover:bg-black' },
  instagram: { icon: 'fa-brands fa-instagram', iconBg: 'bg-pink-100 text-pink-600', badge: 'bg-pink-100 text-pink-700', button: 'bg-pink-600 hover:bg-pink-700' },
  youtube: { icon: 'fa-brands fa-youtube', iconBg: 'bg-red-100 text-red-600', badge: 'bg-red-100 text-red-700', button: 'bg-red-600 hover:bg-red-700' },
  other: { icon: 'fa-solid fa-link', iconBg: 'bg-indigo-100 text-indigo-600', badge: 'bg-indigo-100 text-indigo-700', button: 'bg-indigo-600 hover:bg-indigo-700' },
}

function styleFor(platform) {
  return PLATFORM_STYLES[platform] || PLATFORM_STYLES.other
}

export default function LinkList({ initialLinks }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return initialLinks
    const q = query.toLowerCase()
    return initialLinks.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.category?.toLowerCase().includes(q) ||
        l.platform?.toLowerCase().includes(q) ||
        l.description?.toLowerCase().includes(q)
    )
  }, [query, initialLinks])

  return (
    <div>
      <input
        placeholder="Search groups & channels..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-gray-200 mb-6 text-sm focus:ring-indigo-500 focus:border-indigo-500 outline-none"
      />

      <h2 className="text-xl font-bold border-b pb-2 mb-4">
        <i className="fa-solid fa-compass text-indigo-600 mr-2"></i>
        Active Community Links
      </h2>

      {filtered.length === 0 && (
        <p className="text-gray-400 text-center mt-10">No links found.</p>
      )}

      <div className="space-y-4">
        {filtered.map((link) => {
          const style = styleFor(link.platform)
          return (
            <div
              key={link.id}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between hover:shadow-md transition"
            >
              <div className="flex items-start space-x-4">
                <div className={`${style.iconBg} p-3 rounded-lg text-2xl`}>
                  <i className={style.icon}></i>
                </div>
                <div>
                  <span className={`text-xs ${style.badge} px-2 py-0.5 rounded-full font-semibold capitalize`}>
                    {link.platform || 'telegram'}
                  </span>
                  {link.category && (
                    <span className="text-xs text-gray-400 ml-2">{link.category}</span>
                  )}
                  <h3 className="text-lg font-bold mt-1">{link.title}</h3>
                  {link.description && (
                    <p className="text-gray-600 text-sm mt-1">{link.description}</p>
                  )}
                </div>
              </div>

              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${style.button} text-white px-4 py-2 rounded-lg text-sm font-medium self-center whitespace-nowrap transition`}
              >
                Join
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}
