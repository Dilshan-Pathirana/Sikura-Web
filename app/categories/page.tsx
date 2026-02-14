
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
            <div className="relative bg-navy-950 border-b border-white/5 pt-24 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 uppercase tracking-widest font-bold px-4 py-1.5">
                        Skill Matrix Library
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                        Machine Types
                    </h1>
                    <p className="text-xl text-navy-300 max-w-2xl mx-auto leading-relaxed">
                        Comprehensive training resources for apparel manufacturing machinery. Select a machine type to browse specific operations.
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
                            <Link key={String(cat._id)} href={`/categories/${cat.slug}`} className="block h-full group">
                                <Card hover className="h-full border-t-4 border-t-primary bg-white group-hover:shadow-2xl transition-all duration-500">
                                    <div className="mb-8 flex items-start justify-between">
                                        <div className="p-4 bg-primary/10 rounded-2xl text-primary border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <Shield className="w-8 h-8" />
                                        </div>
                                    </div>

                                    <h2 className="text-2xl font-black text-navy-950 mb-3 group-hover:text-primary transition-colors">
                                        {cat.name}
                                    </h2>

                                    <p className="text-navy-500 mb-8 line-clamp-3 font-medium leading-relaxed">
                                        {cat.description || `Standard operating procedures and training videos for ${cat.name} machinery.`}
                                    </p>

                                    <div className="flex items-center text-primary font-bold text-sm mt-auto opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                        View Operations <ChevronRight className="w-4 h-4 ml-1" />
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
