import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-border">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white font-semibold">S</div>
            <span className="text-text font-semibold">Sikura</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-muted">
          <Link href="/" className="hover:text-primary">Home</Link>
          <Link href="/categories" className="hover:text-primary">Categories</Link>
          <Link href="/admin/login" className="px-3 py-2 rounded-md bg-primary text-white hover:bg-primary-hover">Admin</Link>
        </nav>

        <div className="md:hidden">
          <Link href="/admin/login" className="px-3 py-2 rounded-md bg-primary text-white">Admin</Link>
        </div>
      </div>
    </header>
  )
}
