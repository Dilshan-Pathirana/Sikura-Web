import React from 'react'
import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/5 bg-navy-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-navy-800 flex items-center justify-center text-white font-bold text-xl border border-white/10">
              M
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg leading-none">MAS Kreeda</span>
              <span className="text-navy-500 text-xs mt-1">Skill Matrix Portal</span>
            </div>
          </div>

          <div className="flex items-center gap-8 text-sm font-medium text-navy-400">
            <Link href="#" className="hover:text-white transition-colors">Contact</Link>
            <Link href="#" className="hover:text-white transition-colors">About</Link>
            <Link href="#" className="hover:text-white transition-colors">Support</Link>
          </div>

          <div className="text-sm text-navy-500 font-medium">
            © {year} MAS Kreeda. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

