export const metadata = {
  title: 'Telegram Hub',
  description: 'Browse and join Telegram groups & channels',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="bg-gray-50 text-gray-800 font-sans">{children}</body>
    </html>
  )
}
