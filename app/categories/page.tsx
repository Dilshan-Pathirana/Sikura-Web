
import React from 'react'
import connectMongoose from '../../lib/mongoose'
import Category from '../../models/Category'
import Link from 'next/link'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { Shield, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import * as M from '../../components/ui/motion'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Categories - Operational Protocols' }

export default async function CategoriesIndexPage() {
    let categories: any[] = []
    try {
        await connectMongoose()
        categories = await Category.find().sort({ name: 1 }).lean()
        categories = JSON.parse(JSON.stringify(categories))
    } catch (err) {
        console.error('DB error loading categories:', err)
    }

    return (
        <main className="min-h-screen bg-navy-950 pb-20">
            <div className="relative bg-navy-900 border-b border-navy-800 pt-24 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Badge className="mb-6 bg-brand-500/10 text-brand-300 border-brand-500/20">
                        <Shield className="w-3.5 h-3.5 mr-2" />
                        Protocol Library
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Operational Categories
                    </h1>
                    <p className="text-xl text-navy-300 max-w-2xl mx-auto">
                        Browse our comprehensive database of security protocols and operational procedures by domain.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.length > 0 ? (
                        categories.map((cat, i) => (
                            // <M.MotionDiv
                            //     key={String(cat._id)}
                            //     initial={{ opacity: 0, y: 20 }}
                            //     animate={{ opacity: 1, y: 0 }}
                            //     transition={{ delay: i * 0.1 }}
                            // >
                            <Link key={String(cat._id)} href={`/categories/${cat.slug}`} className="block h-full">
                                <Card hover className="h-full border-t-4 border-t-brand-500 bg-navy-900/60 hover:bg-navy-800 transition-all group">
                                    <div className="mb-6 flex items-start justify-between">
                                        <div className="p-3 bg-navy-950 rounded-xl border border-navy-800 group-hover:border-brand-500/30 transition-colors">
                                            <Shield className="w-8 h-8 text-brand-500" />
                                        </div>
                                    </div>

                                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-400 transition-colors">
                                        {cat.name}
                                    </h2>

                                    <p className="text-navy-400 mb-6 line-clamp-3">
                                        {cat.description || 'No description available for this category.'}
                                    </p>

                                    <div className="flex items-center text-brand-400 font-medium text-sm mt-auto">
                                        View Protocols <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Card>
                            </Link>
                            // </M.MotionDiv>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center">
                            <p className="text-navy-400 text-lg">No categories found.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}
