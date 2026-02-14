"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdminSidebar() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    try {
      setLoading(true)
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/admin/login')
    } catch (e) {
      console.error('Logout failed', e)
      setLoading(false)
    }
  }

  return (
    <nav className="px-3">
      <ul className="space-y-1">
        <li>
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-navy-300 hover:text-white hover:bg-white/5 font-medium">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/admin/categories" className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-navy-300 hover:text-white hover:bg-white/5 font-medium">
            Machine Types
          </Link>
        </li>
        <li>
          <Link href="/admin/operations" className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-navy-300 hover:text-white hover:bg-white/5 font-medium">
            Operations
          </Link>
        </li>
        <li className="pt-4 mt-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            disabled={loading}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-red-400 hover:text-red-300 hover:bg-red-500/5 font-medium"
          >
            {loading ? 'Logging out...' : 'Logout'}
          </button>
        </li>
      </ul>
    </nav>
  )
}
