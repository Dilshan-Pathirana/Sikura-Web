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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Categories</h2>
        <Button onClick={openCreate}>New</Button>
      </div>

      <div className="space-y-2">
        {categories.map(c => (
          <div key={c._id} className="bg-card border border-border rounded p-3 flex items-center justify-between">
            <div>
              <div className="font-semibold">{c.name}</div>
              <div className="text-sm text-muted">{c.slug}</div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => startEdit(c)}>Edit</Button>
              <Button variant="danger" onClick={async () => { if (!confirm('Delete?')) return; const res = await fetch(`/api/admin/categories/${c._id}`, { method: 'DELETE' }); if (res.ok) { setCategories(categories.filter(x => x._id !== c._id)); toast.success('Deleted') } else toast.error('Delete failed') }}>Delete</Button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)} title={`${editing ? 'Edit' : 'Create'} Category`}>
        <form onSubmit={submit}>
          <div className="space-y-4">
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="bg-navy-800 border-navy-700 text-white" />
            <Input value={slug} onChange={e => setSlug(e.target.value)} placeholder="Slug" className="bg-navy-800 border-navy-700 text-white" />
            <Input value={thumbnail} onChange={e => setThumbnail(e.target.value)} placeholder="Thumbnail URL" className="bg-navy-800 border-navy-700 text-white" />
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="w-full p-2 bg-navy-800 border border-navy-700 text-white rounded focus:border-brand-500 focus:outline-none" />
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="ghost" type="button" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">{editing ? 'Save' : 'Create'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
