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
          padding: '12px 16px',
          borderRadius: 10,
          border: '1px solid #e2e2ec',
          background: '#fff',
          color: '#1a1a2e',
          marginBottom: 24,
          boxSizing: 'border-box',
          fontSize: 14,
        }}
      />

      {filtered.length === 0 && (
        <p style={{ opacity: 0.5, textAlign: 'center', marginTop: 40 }}>No links found.</p>
      )}

      <div style={{ display: 'grid', gap: 14 }}>
        {filtered.map((link) => (
          <div
            key={link.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 16,
              padding: '20px',
              borderRadius: 14,
              background: '#fff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  flexShrink: 0,
                  borderRadius: 10,
                  background: '#e8ecff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                }}
              >
                📡
              </div>

              <div>
                {link.category && (
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#4f46e5',
                      background: '#eef0ff',
                      padding: '3px 10px',
                      borderRadius: 999,
                      marginBottom: 6,
                    }}
                  >
                    {link.category}
                  </span>
                )}
                <h3 style={{ margin: '2px 0 4px', fontSize: 17 }}>{link.title}</h3>
                {link.description && (
                  <p style={{ margin: 0, fontSize: 13.5, color: '#6b6b80', maxWidth: 420 }}>
                    {link.description}
                  </p>
                )}
              </div>
            </div>

            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flexShrink: 0,
                background: '#2563eb',
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: 13.5,
                padding: '9px 18px',
                borderRadius: 8,
              }}
            >
              Join
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
