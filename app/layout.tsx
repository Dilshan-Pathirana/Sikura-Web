import React from 'react'
import ClientLayout from '../components/ClientLayout'

export const metadata = {
  title: 'Sikura',
  description: 'Video browsing app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
