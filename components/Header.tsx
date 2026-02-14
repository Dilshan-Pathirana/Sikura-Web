import React from 'react'
import Link from 'next/link'

export default function Header() {
  return (
    <header style={{ padding: 12, borderBottom: '1px solid #eee' }}>
      <nav>
        <Link href="/">Home</Link> | <Link href="/videos">Videos</Link> | <Link href="/admin">Admin</Link>
      </nav>
    </header>
  )
}
