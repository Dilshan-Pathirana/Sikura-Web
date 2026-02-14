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
    <nav className="px-4">
      <ul className="space-y-2">
        <li>
          <Link href="/admin" className="block px-3 py-2 rounded hover:bg-navy-100">Dashboard</Link>
        </li>
        <li>
          <Link href="/admin/categories" className="block px-3 py-2 rounded hover:bg-navy-100">Categories</Link>
        </li>
        <li>
          <Link href="/admin/operations" className="block px-3 py-2 rounded hover:bg-navy-100">Operations</Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            disabled={loading}
            className="w-full text-left px-3 py-2 rounded hover:bg-navy-100"
          >
            {loading ? 'Logging out...' : 'Logout'}
          </button>
        </li>
      </ul>
    </nav>
  )
}
