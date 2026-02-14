import React from 'react'

export default function AdminTopbar({ title }: { title?: string }) {
  return (
    <div className="flex items-center justify-between w-full">
      <h2 className="text-xl font-extrabold text-white tracking-tight">{title || 'Dashboard'}</h2>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
          <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
          <span className="text-xs font-bold text-navy-400 uppercase tracking-widest">Active Session</span>
        </div>
      </div>
    </div>
  )
}
