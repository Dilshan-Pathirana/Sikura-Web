"use client"
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Play, Clock, Eye } from 'lucide-react'
import Card from './ui/Card'
import Badge from './ui/Badge'

export default function OperationCard({ op }: { op: any }) {
  return (
    <Link href={`/operations/${op.slug}`} className="block h-full group">
      <Card hover noPadding className="h-full flex flex-col border-white/5 bg-navy-900/20 group-hover:bg-navy-900/40 transition-all duration-500">
        <div className="relative aspect-video overflow-hidden bg-navy-950">
          <img
            src={op.thumbnail || 'https://via.placeholder.com/400x225/0f172a/1e293b?text=Encrypted+Feed'}
            alt={op.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-80" />

          <div className="absolute bottom-3 right-3">
            <Badge className="bg-black/60 text-white backdrop-blur-md border-white/10 px-2 py-0.5 text-[10px]">
              <Clock className="w-3 h-3 mr-1" /> {op.duration || 'N/A'}
            </Badge>
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="bg-primary/90 backdrop-blur-md p-4 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.4)] transform scale-75 group-hover:scale-100 transition-all duration-500">
              <Play className="w-6 h-6 text-white fill-current ml-1" />
            </div>
          </div>
        </div>

        <div className="p-4 flex flex-col grow relative">
          <div className="relative z-10 flex flex-col grow">
            <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
              {op.title}
            </h3>

            <p className="text-sm text-navy-400 line-clamp-2 mb-6 grow leading-relaxed">
              {op.description || 'Standard industrial operating procedure for this operation.'}
            </p>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-navy-500 font-mono">
              <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {op.viewCount || 0}</span>
              <span suppressHydrationWarning>{op.createdAt ? new Date(op.createdAt).toLocaleDateString() : 'Unknown'}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
