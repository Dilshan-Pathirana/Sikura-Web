import Link from 'next/link'
import React from 'react'
import Button from './ui/Button' // Assuming Button component exists, or I will use standard HTML button if not sure, but line 20 in page.tsx imports it.

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-navy-950/80 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-600 to-brand-700 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-500/20 group-hover:shadow-brand-500/40 transition-all">
              M
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg leading-none tracking-tight">MAS Kreeda</span>
              <span className="text-navy-400 text-xs font-medium tracking-wide">Skill Matrix Portal</span>
            </div>
          </Link>

          {/* Right Side Actions */}
          <div className="flex items-center gap-6">
            <Link href="/admin/login">
              <button className="px-6 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                <span>Admin Login</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-in"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" x2="3" y1="12" y2="12" /></svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
