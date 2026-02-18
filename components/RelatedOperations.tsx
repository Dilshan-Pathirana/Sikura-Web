import React from 'react'
import Link from 'next/link'
import { Play, Clock } from 'lucide-react'
import Card from './ui/Card'
import Badge from './ui/Badge'

interface Operation {
  _id: string
  title: string
  slug: string
  thumbnail?: string
  duration?: string
  categoryName?: string
}

interface RelatedOperationsProps {
  operations: Operation[]
  currentOperationId: string
}

export default function RelatedOperations({
  operations,
  currentOperationId,
}: RelatedOperationsProps) {
  const related = operations
    .filter((op) => op._id !== currentOperationId)
    .slice(0, 5)

  if (related.length === 0) return null

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-extrabold text-white mb-6 flex items-center gap-3">
        <span className="w-1.5 h-7 bg-primary rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]" />
        Related Procedures
      </h3>
      {related.map((op) => (
        <Link key={op._id} href={`/operations/${encodeURIComponent(op.slug || op._id)}`} className="block group">
          <Card
            noPadding
            hover
            className="flex gap-3 p-3 items-center transition-all duration-200 border-navy-800/50 bg-navy-900/40 hover:bg-navy-800"
          >
            <div className="relative w-28 h-20 shrink-0 bg-navy-950 rounded-xl overflow-hidden border border-white/5">
              <img
                src={op.thumbnail || 'https://via.placeholder.com/400x225/0f172a/1e293b?text=Operation'}
                alt={op.title}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-primary/90 p-2 rounded-full group-hover:scale-110 transition-all duration-300 shadow-xl shadow-primary/40">
                  <Play className="w-3.5 h-3.5 text-white fill-current ml-0.5" />
                </div>
              </div>
            </div>
            <div className="flex-1 min-w-0 pr-1">
              <h4 className="text-sm font-bold text-white line-clamp-2 group-hover:text-primary transition-colors mb-2 leading-tight">
                {op.title}
              </h4>
              <div className="flex items-center gap-2 text-xs text-navy-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {op.duration || 'N/A'}
                </span>
                {op.categoryName && (
                  <Badge variant="neutral" className="text-[10px] px-1.5 py-0 bg-navy-950 border-navy-800">
                    {op.categoryName}
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
