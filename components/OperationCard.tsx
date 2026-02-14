"use client"
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Play, Clock, Eye } from 'lucide-react'
import Card from './ui/Card'
import Badge from './ui/Badge'

export default function OperationCard({ op }: { op: any }) {
  return (
    <Link href={`/operations/${op.slug}`} className="block h-full">
      <Card hover noPadding className="h-full flex flex-col group border-navy-800 bg-navy-900/40">
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

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-brand-600/90 backdrop-blur-md p-3 rounded-full shadow-[0_0_20px_rgba(124,58,237,0.4)] transform scale-90 group-hover:scale-100 transition-transform">
              <Play className="w-5 h-5 text-white fill-current ml-0.5" />
            </div>
          </div>
        </div>

        <div className="p-4 flex flex-col grow relative">
          <div className="relative z-10 flex flex-col grow">
            <h3 className="text-base font-bold text-white mb-2 line-clamp-1 group-hover:text-brand-400 transition-colors">
              {op.title}
            </h3>

            <p className="text-xs text-navy-400 line-clamp-2 mb-4 grow">
              {op.description || 'No description available for this protocol.'}
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
