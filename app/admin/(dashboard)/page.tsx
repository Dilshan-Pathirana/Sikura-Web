'use client'
import React, { useEffect, useState } from 'react'
import { FolderOpen, FileVideo, Users, Activity } from 'lucide-react'
import Link from 'next/link'

interface DashboardStats {
  categoriesCount: number
  operationsCount: number
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    categoriesCount: 0,
    operationsCount: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch categories count
        const catRes = await fetch('/api/admin/categories')
        const categories = await catRes.json()

        // Fetch operations count - assume we need an endpoint or can misuse the public video endpoint temporarily
        // Ideally we should have /api/admin/stats
        const opRes = await fetch('/api/videos') // This returns operations
        const operations = await opRes.json()

        setStats({
          categoriesCount: Array.isArray(categories) ? categories.length : 0,
          operationsCount: Array.isArray(operations) ? operations.length : 0
        })
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-navy-400">Welcome back, Administrator.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Categories"
          value={loading ? '...' : stats.categoriesCount}
          icon={FolderOpen}
          href="/admin/categories"
          color="text-brand-400"
          bg="bg-brand-500/10"
        />
        <StatsCard
          title="Total Operations"
          value={loading ? '...' : stats.operationsCount}
          icon={FileVideo}
          href="/admin/operations"
          color="text-accent-cyan"
          bg="bg-accent-cyan/10"
        />
        <StatsCard
          title="Active Admins"
          value="1"
          icon={Users}
          color="text-accent-pink"
          bg="bg-accent-pink/10"
        />
        <StatsCard
          title="System Status"
          value="Online"
          icon={Activity}
          color="text-emerald-400"
          bg="bg-emerald-500/10"
        />
      </div>
    </div>
  )
}

function StatsCard({ title, value, icon: Icon, href, color, bg }: any) {
  const CardContent = (
    <div className="bg-navy-900 border border-navy-800 p-6 rounded-xl flex items-center gap-4 hover:border-navy-700 transition-colors">
      <div className={`p-3 rounded-lg ${bg}`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div>
        <p className="text-navy-400 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  )

  if (href) {
    return <Link href={href} className="block">{CardContent}</Link>
  }
  return CardContent
}
