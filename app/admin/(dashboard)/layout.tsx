import React from 'react'
import AdminSidebar from '../../../components/AdminSidebar'
import AdminTopbar from '../../../components/AdminTopbar'

export const metadata = { title: 'Admin - MAS Kreeda' }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r border-white/5 bg-navy-900 hidden lg:flex flex-col">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg">M</div>
            <h2 className="text-lg font-extrabold text-white tracking-tight">MAS Admin</h2>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <AdminSidebar />
        </div>
      </aside>
      <div className="flex-1 flex flex-col bg-navy-950">
        <header className="bg-navy-900 border-b border-white/5 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <AdminTopbar />
          </div>
        </header>
        <main className="p-6 max-w-7xl mx-auto w-full">{children}</main>
      </div>
    </div>
  )
}
