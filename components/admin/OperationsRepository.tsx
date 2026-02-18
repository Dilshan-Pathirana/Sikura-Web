"use client"
import React, { useMemo, useState } from 'react'
import { toast } from 'sonner'
import Card from '../ui/Card'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Modal from '../ui/Modal'
import DeleteButton from '../DeleteButton'
import { isGoogleDriveSharedLink } from '../../lib/videoUrl'

interface CategoryItem {
  _id: string
  name: string
}

interface OperationItem {
  _id: string
  title: string
  slug: string
  categoryId: string
  videoUrl: string
  description?: string
  thumbnail?: string
}

export default function OperationsRepository({ initialOps, categories }: { initialOps: OperationItem[]; categories: CategoryItem[] }) {
  const [operations, setOperations] = useState(initialOps || [])
  const [editing, setEditing] = useState<OperationItem | null>(null)
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)

  const categoryById = useMemo(() => {
    const index = new Map<string, string>()
    categories.forEach((cat) => index.set(String(cat._id), cat.name))
    return index
  }, [categories])

  const openEdit = (op: OperationItem) => {
    setEditing(op)
    setTitle(op.title || '')
    setSlug(op.slug || '')
    setCategoryId(String(op.categoryId || ''))
    setVideoUrl(op.videoUrl || '')
    setThumbnail(op.thumbnail || '')
    setDescription(op.description || '')
  }

  const closeModal = () => {
    setEditing(null)
    setTitle('')
    setSlug('')
    setCategoryId('')
    setVideoUrl('')
    setThumbnail('')
    setDescription('')
    setSaving(false)
  }

  const submitEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editing) return

    const nextTitle = title.trim()
    const nextSlug = slug.trim()
    const nextCategoryId = categoryId.trim()
    const nextVideoUrl = videoUrl.trim()

    if (!nextTitle || !nextSlug || !nextCategoryId || !nextVideoUrl) {
      toast.error('Title, slug, machine type, and video URL are required')
      return
    }

    if (!isGoogleDriveSharedLink(nextVideoUrl)) {
      toast.error('Video URL must be a valid Google Drive shared file link')
      return
    }

    const payload = {
      title: nextTitle,
      slug: nextSlug,
      categoryId: nextCategoryId,
      videoUrl: nextVideoUrl,
      thumbnail: thumbnail.trim(),
      description: description.trim()
    }

    setSaving(true)
    try {
      const res = await fetch(`/api/admin/operations/${editing._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Update failed')
      }

      setOperations((prev) => prev.map((op) => (op._id === editing._id ? { ...op, ...payload } : op)))
      toast.success('Operation updated successfully')
      closeModal()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update operation')
      setSaving(false)
    }
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
        <span className="w-1.5 h-6 bg-accent-green rounded-full" />
        Operations Repository
      </h2>
      <Card className="border-white/5 overflow-hidden bg-navy-900/40">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-navy-950 border-b border-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-black text-navy-400 uppercase tracking-widest">Title</th>
                <th className="px-6 py-4 text-left text-xs font-black text-navy-400 uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 text-left text-xs font-black text-navy-400 uppercase tracking-widest">Video Instruction</th>
                <th className="px-6 py-4 text-center text-xs font-black text-navy-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {operations.map((op) => (
                <tr key={op._id} className="hover:bg-white/5 transition-all duration-200">
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-white">{op.title}</div>
                    <div className="text-[10px] text-navy-500 font-mono mt-1 opacity-50 uppercase">{op.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tight">
                      {categoryById.get(String(op.categoryId)) || 'Unassigned'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      className="text-primary hover:text-white transition-colors text-xs font-medium underline underline-offset-4 truncate block max-w-[150px]"
                      href={op.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {op.videoUrl}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-4 text-xs font-bold uppercase tracking-tighter border-white/10 hover:bg-white/5"
                        onClick={() => openEdit(op)}
                      >
                        Edit
                      </Button>
                      <DeleteButton
                        url={`/api/admin/operations/${String(op._id)}`}
                        onSuccess={() => setOperations((prev) => prev.filter((item) => item._id !== op._id))}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={Boolean(editing)} onClose={closeModal} title="Edit Operation" maxWidth="2xl">
        <form onSubmit={submitEdit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-black text-navy-400 uppercase tracking-widest pl-1">Operation Title</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Pocket Sewing" className="bg-navy-950/50 border-white/10 focus:border-primary" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-navy-400 uppercase tracking-widest pl-1">URL Slug</label>
              <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="e.g., pocket-sewing" className="bg-navy-950/50 border-white/10 focus:border-primary font-mono" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-navy-400 uppercase tracking-widest pl-1">Machine Type</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full p-2.5 border border-white/10 bg-navy-950/50 text-white rounded-xl focus:border-primary focus:outline-none transition-all duration-200"
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c._id} value={String(c._id)}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-black text-navy-400 uppercase tracking-widest pl-1">Google Drive Video Link (Shared)</label>
              <Input
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
                className="bg-navy-950/50 border-white/10 focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-navy-400 uppercase tracking-widest pl-1">Thumbnail Preview URL (Optional)</label>
              <Input value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} placeholder="https://..." className="bg-navy-950/50 border-white/10 focus:border-primary" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-navy-400 uppercase tracking-widest pl-1">Operational Briefing</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed instructions..."
                className="w-full p-2.5 border border-white/10 bg-navy-950/50 text-white rounded-xl focus:border-primary focus:outline-none min-h-[100px] transition-all duration-200"
              />
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-white/5">
            <Button type="button" variant="ghost" onClick={closeModal} className="text-xs font-bold uppercase tracking-widest text-navy-400 hover:text-white">
              Cancel
            </Button>
            <Button type="submit" isLoading={saving} className="px-8 h-11 text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  )
}
