"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

export default function AdminHeader() {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <div className="flex items-center justify-between">
      <div className="text-lg font-medium">Dashboard</div>
      <div className="flex items-center gap-3">
        <button onClick={() => router.push('/admin')} className="px-3 py-1 rounded bg-navy-100">Home</button>
        <button onClick={handleLogout} className="px-3 py-1 rounded bg-red-500 text-white">Logout</button>
      </div>
    </div>
  )
}
