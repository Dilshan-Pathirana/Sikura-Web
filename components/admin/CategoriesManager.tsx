"use client"
import React, { useState } from 'react'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { toast } from 'sonner'

export default function CategoriesManager({ initial }: { initial: any[] }) {
  const [categories, setCategories] = useState(initial || [])
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [editing, setEditing] = useState<any | null>(null)

  const openCreate = () => { setEditing(null); setName(''); setSlug(''); setDescription(''); setThumbnail(''); setOpen(true) }

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!name.trim() || !slug.trim()) return toast.error('Name and slug required')
    const body = { name, slug, description, thumbnail }
    try {
      if (editing) {
        // edit
        const res = await fetch(`/api/admin/categories/${editing._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
        if (!res.ok) throw new Error('Update failed')
        setCategories(categories.map(c => c._id === editing._id ? { ...c, ...body } : c))
        toast.success('Updated')
      } else {
        const res = await fetch('/api/admin/categories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
        if (!res.ok) throw new Error('Create failed')
        const created = await res.json()
        setCategories([created, ...categories])
        toast.success('Created')
      }
      setOpen(false)
    } catch (err) {
      toast.error(String(err))
    }
  }

  const startEdit = (c: any) => { setEditing(c); setName(c.name); setSlug(c.slug); setDescription(c.description || ''); setThumbnail(c.thumbnail || ''); setOpen(true) }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-white uppercase tracking-tight">Machine Types</h2>
        <Button onClick={openCreate} className="px-6 h-10 text-xs font-black uppercase tracking-widest">New Type</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map(c => (
          <div key={c._id} className="bg-navy-900/50 border border-white/5 rounded-2xl p-5 flex items-center justify-between hover:bg-navy-900 hover:border-white/10 transition-all duration-300 group shadow-lg">
            <div>
              <div className="text-sm font-black text-white uppercase tracking-tight">{c.name}</div>
              <div className="text-[10px] text-navy-500 font-mono mt-1 opacity-50 uppercase tracking-tighter">{c.slug}</div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => startEdit(c)} className="h-8 px-4 text-[10px] font-black uppercase tracking-widest border-white/10 hover:bg-white/5">Edit</Button>
              <Button variant="danger" size="sm" onClick={async () => { if (!confirm('Delete?')) return; const res = await fetch(`/api/admin/categories/${c._id}`, { method: 'DELETE' }); if (res.ok) { setCategories(categories.filter(x => x._id !== c._id)); toast.success('Deleted') } else toast.error('Delete failed') }} className="h-8 px-4 text-[10px] font-black uppercase tracking-widest">Delete</Button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)} title={`${editing ? 'Edit' : 'Create'} Category`}>
        <form onSubmit={submit}>
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-navy-400 uppercase tracking-widest pl-1">Name</label>
              <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Lockstitch" className="bg-navy-950/50 border-white/10 text-white focus:border-primary" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-navy-400 uppercase tracking-widest pl-1">Slug</label>
              <Input value={slug} onChange={e => setSlug(e.target.value)} placeholder="e.g., lockstitch" className="bg-navy-950/50 border-white/10 text-white focus:border-primary font-mono" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-navy-400 uppercase tracking-widest pl-1">Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description of the machine type..." className="w-full p-3 bg-navy-950/50 border border-white/10 text-white rounded-xl focus:border-primary focus:outline-none min-h-[100px] transition-all" />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-8">
            <Button variant="ghost" type="button" onClick={() => setOpen(false)} className="text-xs font-bold uppercase tracking-widest text-navy-400 hover:text-white">Cancel</Button>
            <Button type="submit" className="px-8 h-10 text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20">{editing ? 'Save Changes' : 'Create Machine Type'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
