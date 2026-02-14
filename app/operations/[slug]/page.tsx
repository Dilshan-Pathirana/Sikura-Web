import React from 'react'
export const dynamic = 'force-dynamic'
import connectMongoose from '../../../lib/mongoose'
import Operation from '../../../models/Operation'
import RelatedOperations from '../../../components/RelatedOperations'
import VideoPlayer from '../../../components/VideoPlayer'
import { ChevronRight, FileText, Calendar, Eye } from 'lucide-react'
import Link from 'next/link'
import Badge from '../../../components/ui/Badge'

type Props = { params: { slug: string } }

function getYouTubeEmbedUrl(url?: string) {
  if (!url) return null
  const ytMatch = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{6,11})/)
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`
  return null
}

export default async function OperationPage({ params }: Props) {
  const { slug } = params
  let op: any = null
  let related: any[] = []
  try {
    await connectMongoose()
    op = await Operation.findOne({ slug }).lean()
    if (op) {
      related = await Operation.find({ categoryId: op.categoryId, _id: { $ne: op._id } }).limit(6).lean()
    }
  } catch (err) {
    console.error('DB unavailable when loading operation page:', (err as any)?.message || err)
    op = null
  }

  if (!op) return (
    <div className="min-h-[50vh] flex items-center justify-center p-6 text-navy-400">
      Operation not found or database unavailable
    </div>
  )

  const embed = getYouTubeEmbedUrl(op.videoUrl)

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-navy-500 mb-8 font-medium overflow-x-auto pb-2">
        <Link href="/" className="hover:text-white transition-colors whitespace-nowrap">Home</Link>
        <ChevronRight className="w-4 h-4 shrink-0" />
        <Link href={`/categories/${op.categorySlug}`} className="hover:text-white transition-colors whitespace-nowrap">
          {op.categoryName || 'Category'}
        </Link>
        <ChevronRight className="w-4 h-4 shrink-0" />
        <span className="text-brand-400 whitespace-nowrap">{op.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Video Area */}
          <div>
            {embed ? (
              <VideoPlayer videoUrl={embed} title={op.title} />
            ) : (
              <div className="aspect-video bg-navy-900 rounded-xl border border-navy-800 flex items-center justify-center text-navy-400">
                <div className="text-center">
                  <p className="mb-2">Direct Video Link:</p>
                  <a href={op.videoUrl} className="text-brand-400 hover:text-brand-300 underline break-all">{op.videoUrl}</a>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant="neutral" className="bg-brand-500/10 text-brand-300 border-brand-500/20">
                  {op.categoryName || 'General Protocol'}
                </Badge>
                {op.duration && (
                  <Badge variant="neutral" className="bg-navy-800 border-navy-700">
                    <span className="opacity-70 mr-1">Duration:</span> {op.duration}
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold text-white mb-4 leading-tight">{op.title}</h1>

              <div className="flex items-center gap-6 text-sm text-navy-400 border-b border-navy-800 pb-6 mb-6">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {new Date(op.createdAt).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  {op.viewCount || 0} views
                </span>
              </div>

              <div className="prose prose-invert max-w-none prose-p:text-navy-300 prose-headings:text-white">
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-brand-500" />
                  Operational Briefing
                </h3>
                <p className="leafing-relaxed">
                  {op.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <RelatedOperations operations={related} currentOperationId={op._id} />
          </div>
        </aside>
      </div>
    </main>
  )
}
