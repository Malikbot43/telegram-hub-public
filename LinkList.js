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
        style={{
          width: '100%',
          padding: '10px 14px',
          borderRadius: 8,
          border: '1px solid #333',
          background: '#1a1a1d',
          color: '#fff',
          marginBottom: 24,
          boxSizing: 'border-box',
        }}
      />

      {filtered.length === 0 && <p style={{ opacity: 0.6 }}>No links found.</p>}

      <div style={{ display: 'grid', gap: 12 }}>
        {filtered.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              padding: 16,
              borderRadius: 10,
              background: '#1a1a1d',
              border: '1px solid #2a2a2e',
              textDecoration: 'none',
              color: '#fff',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong>{link.title}</strong>
              <span style={{ fontSize: 12, opacity: 0.5 }}>{link.category}</span>
            </div>
            {link.description && (
              <p style={{ margin: '6px 0 0', fontSize: 14, opacity: 0.75 }}>{link.description}</p>
            )}
          </a>
        ))}
      </div>
    </div>
  )
}
