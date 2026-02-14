'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  FolderOpen,
  FileVideo,
  Settings,
  LogOut
} from 'lucide-react'

export default function AdminSidebar() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout failed', error)
    }
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Categories', href: '/admin/categories', icon: FolderOpen },
    { name: 'Operations', href: '/admin/operations', icon: FileVideo },
    { name: 'Profile Settings', href: '/admin/profile', icon: Settings },
  ]

  return (
    <nav className="px-4 py-6">
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-navy-300 hover:text-white hover:bg-navy-800 transition-all group"
            >
              <item.icon className="w-5 h-5 group-hover:text-brand-400 transition-colors" />
              <span className="font-medium">{item.name}</span>
            </Link>
          </li>
        ))}

        <li className="pt-4 mt-4 border-t border-navy-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all group"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  )
}
