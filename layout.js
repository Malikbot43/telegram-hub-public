export const metadata = {
  title: 'Telegram Hub',
  description: 'Browse and join Telegram groups & channels',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#0e0e10', color: '#f2f2f2' }}>
        {children}
      </body>
    </html>
  )
}
