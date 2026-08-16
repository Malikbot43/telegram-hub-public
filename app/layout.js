export const metadata = {
  title: 'Telegram Hub',
  description: 'Browse and join Telegram groups & channels',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#f5f6fb', color: '#1a1a2e' }}>
        {children}
      </body>
    </html>
  )
}
