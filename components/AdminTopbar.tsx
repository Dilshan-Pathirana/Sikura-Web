import React from 'react'

export default function AdminTopbar({ title }: { title?: string }) {
  return (
    <header className="flex items-center justify-between p-4 border-b border-navy-800 bg-navy-900">
      <h2 className="text-lg font-semibold text-white">{title || 'Dashboard'}</h2>
      <div className="flex items-center gap-3">
        <div className="text-sm text-navy-400">Signed in</div>
      </div>
    </header>
  )
}
