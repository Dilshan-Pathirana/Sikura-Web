'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Play,
  Clock,
  Eye,
  ChevronRight,
  Shield,
  Lock,
  Search,
  Activity,
  Zap,
  Globe,
  Server
} from 'lucide-react'
import Link from 'next/link'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

interface Category {
  _id: string
  name: string
  slug: string
  description: string
}

interface Operation {
  _id: string
  title: string
  slug: string
  description: string
  categoryName: string
  videoUrl: string
  thumbnail?: string
  duration?: string
  viewCount: number
  createdAt: string
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([])
  const [operations, setOperations] = useState<Operation[]>([])


  useEffect(() => {
    fetch('/api/videos')
      .then(res => res.json())
      .then(data => setOperations(data.slice(0, 4)))
      .catch(err => console.error('Failed to load operations:', err))

    fetch('/api/admin/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Failed to load categories:', err))
  }, [])

  const featuredOperation = operations[0]
  const recentOperations = operations.slice(1, 4)

  return (
    <div className="space-y-24 pb-24 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        {/* Abstract Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-accent-green/10 rounded-full blur-[100px] mix-blend-screen" />
          <div className="absolute top-1/2 left-0 w-[600px] h-[500px] bg-primary/10 rounded-full blur-[100px] mix-blend-screen" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="max-w-2xl"
            >
              <Badge className="mb-8 border-primary/30 bg-primary/10 text-primary shadow-[0_0_15px_rgba(37,99,235,0.2)] backdrop-blur-md px-4 py-1.5 text-sm uppercase tracking-widest font-bold">
                <Zap className="w-3.5 h-3.5 mr-2 inline-block text-accent-green" />
                Intelligent Skill Matrix Portal
              </Badge>

              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-white">
                MAS Kreeda <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-accent-green">Skill Matrix Portal</span>
              </h1>

              <p className="text-xl text-navy-300 mb-10 leading-relaxed border-l-4 border-primary pl-6 max-w-xl">
                An intelligent Skill Matrix system that connects operation categories with structured video learning — enabling clear competency tracking, faster upskilling, and continuous performance improvement.
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <Link href="/categories">
                  <Button size="lg" variant="glow" className="bg-primary hover:bg-primary-hover shadow-primary/40" icon={<ChevronRight className="w-5 h-5" />}>
                    Explore Machine Types
                  </Button>
                </Link>
                <Link href="#recent">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/10 hover:bg-white/5 hover:border-white/20 text-white transition-all duration-300"
                  >
                    View Recent Training
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-brand-500/10 rounded-full blur-3xl animate-pulse" />
              <div className="relative glass-card rounded-2xl p-2 border border-white/10 shadow-2xl shadow-brand-900/50">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-navy-950">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-navy-950 opacity-90" />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl shadow-primary/20 group cursor-pointer hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-white fill-current ml-1" />
                    </div>
                  </div>

                  {/* Fake UI Elements */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                    <span className="text-xs font-mono text-accent-green">SYSTEM READY</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 h-1 bg-navy-800 rounded-full overflow-hidden">
                    <div className="w-2/3 h-full bg-primary" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: 'Active Protocols',
                value: operations.length > 0 ? `${operations.length}+` : 'Loading...',
                icon: Shield,
                color: 'text-brand-400',
                bg: 'bg-brand-500/10'
              },
              {
                label: 'Security Clearance',
                value: 'Level 5',
                icon: Lock,
                color: 'text-accent-teal',
                bg: 'bg-accent-teal/10'
              },
              {
                label: 'System Uptime',
                value: '99.9%',
                icon: Activity,
                color: 'text-accent-pink',
                bg: 'bg-accent-pink/10'
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 rounded-2xl flex items-center gap-5 hover:border-brand-500/30 transition-colors"
                whileHover={{ y: -5 }}
              >
                <div className={`p-4 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-navy-400 font-medium uppercase tracking-wider mb-1">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-white tracking-tight">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Operations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
              Recent Training Videos
            </h2>
            <p className="text-navy-400">Latest operational procedures and updates.</p>
          </div>
          <Link
            href="/categories"
            className="flex items-center gap-2 text-primary font-bold hover:text-primary-hover transition-colors group px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20"
          >
            Explore All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentOperations.length > 0 ? (
            recentOperations.map((op, i) => (
              <motion.div
                key={op._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/operations/${op.slug}`}>
                  <Card hover noPadding className="h-full flex flex-col group border-navy-800 bg-navy-900/40">
                    <div className="relative aspect-video overflow-hidden bg-navy-950">
                      <img
                        src={op.thumbnail || 'https://via.placeholder.com/400x225/0f172a/1e293b?text=Encrypted+Feed'}
                        alt={op.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-80" />

                      <div className="absolute top-3 right-3">
                        <Badge className="bg-black/60 text-white backdrop-blur-md border-white/10">
                          <Clock className="w-3 h-3 mr-1" /> {op.duration || 'N/A'}
                        </Badge>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-brand-600/90 backdrop-blur-md p-4 rounded-full shadow-[0_0_30px_rgba(124,58,237,0.4)] transform scale-90 group-hover:scale-100 transition-transform">
                          <Play className="w-6 h-6 text-white fill-current ml-1" />
                        </div>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col grow relative">
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-b from-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                      <div className="relative z-10 flex flex-col grow">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge
                            variant="neutral"
                            className="bg-navy-800 text-brand-300 border-navy-700 text-[10px] uppercase tracking-wider"
                          >
                            {op.categoryName}
                          </Badge>
                          <span className="text-xs text-navy-500 flex items-center gap-1 ml-auto">
                            <Eye className="w-3 h-3" /> {op.viewCount}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-brand-400 transition-colors">
                          {op.title}
                        </h3>

                        <p className="text-sm text-navy-400 line-clamp-2 mb-6 grow">
                          {op.description}
                        </p>

                        <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-navy-500 font-mono">
                          <span>ID: {op._id.substring(0, 8)}...</span>
                          <span suppressHydrationWarning>{new Date(op.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))
          ) : (
            // Skeleton Loading State
            [1, 2, 3].map((n) => (
              <div key={n} className="h-[400px] w-full rounded-2xl bg-navy-900/50 animate-pulse border border-white/5" />
            ))
          )}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-900/50 skew-y-3 scale-110" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
              Machine Types
            </h2>
            <p className="text-navy-400 text-lg max-w-xl mx-auto">
              Select a category to access structured training videos and standard operating procedures.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.length > 0 ? (
              categories.map((cat, i) => (
                <motion.div
                  key={cat._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={`/categories/${cat.slug}`}>
                    <Card hover className="h-full border-t-4 border-t-primary bg-white group-hover:shadow-2xl transition-all duration-500">
                      <div className="flex items-start justify-between mb-8">
                        <div className="p-4 bg-primary/10 rounded-2xl text-primary border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                          <Activity className="w-7 h-7" />
                        </div>
                        <Badge variant="neutral" className="bg-navy-50 text-navy-600 border-navy-100 font-bold px-3 py-1">
                          {cat.description?.includes('operation') ? cat.description.match(/\d+/)?.[0] || '0' : '0'} Ops
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-black text-navy-950 mb-3 group-hover:text-primary transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-navy-500 leading-relaxed font-medium">Standard training modules for {cat.name} machinery.</p>

                      <div className="mt-8 flex items-center gap-2 text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                        View Operations <ChevronRight className="w-4 h-4" />
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))
            ) : (
              [1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="h-[200px] w-full rounded-xl bg-navy-900/30 animate-pulse border border-white/5" />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
