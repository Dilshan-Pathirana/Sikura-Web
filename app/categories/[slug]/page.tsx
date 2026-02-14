import React from 'react'
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
      <div className="flex items-center gap-2 text-sm text-navy-500 mb-8 font-medium">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/categories" className="hover:text-white transition-colors">Categories</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-brand-400">{category.name}</span>
      </div>

      <header className="mb-12 relative overflow-hidden rounded-2xl bg-navy-900 border border-navy-800 p-8 sm:p-12">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Operational Category
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {category.name}
          </h1>
          <p className="text-lg text-navy-300 leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-teal/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
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
