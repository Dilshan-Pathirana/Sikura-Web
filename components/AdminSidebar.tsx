import React from 'react'
import Link from 'next/link'

export default function AdminSidebar() {
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
      </ul>
    </nav>
  )
}
