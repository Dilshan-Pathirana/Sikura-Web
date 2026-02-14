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
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-black text-white mb-2 tracking-tight uppercase">System Overview</h1>
        <p className="text-navy-400 font-medium">Monitor and manage the Skill Matrix infrastructure.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatsCard
          title="Machine Types"
          value={loading ? '...' : stats.categoriesCount}
          icon={FolderOpen}
          href="/admin/categories"
          color="text-primary"
          bg="bg-primary/10"
        />
        <StatsCard
          title="Training Operations"
          value={loading ? '...' : stats.operationsCount}
          icon={FileVideo}
          href="/admin/operations"
          color="text-accent-green"
          bg="bg-accent-green/10"
        />
        <StatsCard
          title="Security Clearance"
          value="Level 5"
          icon={Users}
          color="text-blue-400"
          bg="bg-blue-400/10"
        />
        <StatsCard
          title="System Health"
          value="OPTIMAL"
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
    <div className="bg-navy-900/50 border border-white/5 p-8 rounded-2xl flex flex-col gap-6 hover:bg-navy-900 hover:border-white/10 transition-all duration-300 group shadow-lg">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${bg} ${color} border border-white/5 group-hover:scale-110`}>
        <Icon className="w-7 h-7" />
      </div>
      <div>
        <p className="text-navy-400 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
        <p className="text-3xl font-black text-white tracking-tight">{value}</p>
      </div>
    </div>
  )

  if (href) {
    return <Link href={href} className="block">{CardContent}</Link>
  }
  return CardContent
}
