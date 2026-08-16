'use client'

import { useMemo, useState } from 'react'

export default function LinkList({ initialLinks }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return initialLinks
    const q = query.toLowerCase()
    return initialLinks.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.category?.toLowerCase().includes(q) ||
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
        {filtered.map((link) => (
          <div
            key={link.id}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between hover:shadow-md transition"
          >
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-lg text-2xl">
                <i className="fa-brands fa-telegram"></i>
              </div>
              <div>
                {link.category && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
                    {link.category}
                  </span>
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
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 self-center whitespace-nowrap"
            >
              Join
            </a>
          </div>
        ))}
      </div>
    </div>
  )
              }
