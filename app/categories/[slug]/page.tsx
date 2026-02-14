import React from 'react'
export const dynamic = 'force-dynamic'
import connectMongoose from '../../../lib/mongoose'
import Category from '../../../models/Category'
import Operation from '../../../models/Operation'
import Link from 'next/link'
import OperationGrid from '../../../components/OperationGrid'
import { ChevronRight, Shield } from 'lucide-react'

type Props = { params: { slug: string } }

export default async function CategoryPage({ params }: Props) {
  const { slug } = params
  let category: any = null
  let ops: any[] = []
  try {
    await connectMongoose()
    category = await Category.findOne({ slug }).lean()
    if (category) {
      ops = await Operation.find({ categoryId: category._id }).sort({ createdAt: -1 }).lean()
    }
  } catch (err) {
    console.error('DB unavailable when loading category page:', (err as any)?.message || err)
    category = null
    ops = []
  }

  if (!category) return (
    <div className="min-h-[50vh] flex items-center justify-center p-6 text-navy-400">
      Category not found or database unavailable
    </div>
  )

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3 text-sm text-navy-500 mb-10 font-bold tracking-wide uppercase">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4 text-navy-700" />
        <Link href="/categories" className="hover:text-white transition-colors">Machine Types</Link>
        <ChevronRight className="w-4 h-4 text-navy-700" />
        <span className="text-primary">{category.name}</span>
      </div>

      <header className="mb-12 relative overflow-hidden rounded-2xl bg-navy-900 border border-navy-800 p-8 sm:p-12">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-8">
            <Shield className="w-4 h-4" />
            Machine Type Protocol
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-8 tracking-tight">
            {category.name}
          </h1>
          <p className="text-xl text-navy-300 leading-relaxed max-w-2xl border-l-4 border-primary pl-8">
            {category.description || `Comprehensive list of operational procedures and training guides for ${category.name} machines.`}
          </p>
        </div>

        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-green/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      </header>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">
            Available Protocols <span className="text-navy-500 ml-2 text-sm font-normal">({ops.length})</span>
          </h2>
        </div>
        <OperationGrid ops={ops} />
      </section>
    </main>
  )
}
