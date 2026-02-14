import React from 'react'
import { revalidatePath } from 'next/cache'
import connectMongoose from '../../../../lib/mongoose'
import Operation from '../../../../models/Operation'
import Category from '../../../../models/Category'
import { z } from 'zod'
import Card from '../../../../components/ui/Card'
import Input from '../../../../components/ui/Input'
import Button from '../../../../components/ui/Button'
import DeleteButton from '../../../../components/DeleteButton'
import AddOperationForm from '../../../../components/AddOperationForm'

export const metadata = { title: 'Operations - Admin' }

const OperationSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  categoryId: z.string().min(1),
  videoUrl: z.string().min(1),
  description: z.string().optional().nullable(),
  thumbnail: z.string().optional().nullable()
})

export default async function OperationsPage() {
  let ops: any[] = []
  let categories: any[] = []
  try {
    await connectMongoose()
    const res = await Promise.all([
      Operation.find().sort({ createdAt: -1 }).lean(),
      Category.find().sort({ name: 1 }).lean()
    ])
    ops = JSON.parse(JSON.stringify(res[0]))
    categories = JSON.parse(JSON.stringify(res[1]))
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('DB unavailable when loading admin operations:', (err as any)?.message || err)
    ops = []
    categories = []
  }

  async function createOperation(formData: FormData) {
    'use server'
    try {
      const input = {
        title: String(formData.get('title') || ''),
        slug: String(formData.get('slug') || ''),
        categoryId: String(formData.get('categoryId') || ''),
        videoUrl: String(formData.get('videoUrl') || ''),
        description: String(formData.get('description') || ''),
        thumbnail: String(formData.get('thumbnail') || '')
      }
      const parsed = OperationSchema.parse(input)
      await connectMongoose()
      await Operation.create(parsed)
      revalidatePath('/admin/operations')
    } catch (err) {
      console.error('Create operation failed:', err)
      throw err // Rethrow so client can catch it
    }
  }

  async function editOperation(formData: FormData) {
    'use server'
    try {
      const id = String(formData.get('id') || '')
      const input = {
        title: String(formData.get('title') || ''),
        slug: String(formData.get('slug') || ''),
        categoryId: String(formData.get('categoryId') || ''),
        videoUrl: String(formData.get('videoUrl') || ''),
        description: String(formData.get('description') || ''),
        thumbnail: String(formData.get('thumbnail') || '')
      }
      const parsed = OperationSchema.parse(input)
      await connectMongoose()
      await Operation.findByIdAndUpdate(id, parsed)
      revalidatePath('/admin/operations')
    } catch (err) {
      console.error('Edit operation failed:', err)
      throw err // Rethrow so client can catch it
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-white uppercase tracking-tight">Manage Operations</h1>
      </div>

      <section>
        <Card className="p-8 border-white/5 bg-navy-900/40">
          <h2 className="text-xl font-extrabold text-white mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-primary rounded-full" />
            New Operation
          </h2>
          <AddOperationForm categories={categories} action={createOperation} />
        </Card>
      </section>

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
                  <th className="px-6 py-4 text-left text-xs font-black text-navy-400 uppercase tracking-widest">Video Source</th>
                  <th className="px-6 py-4 text-center text-xs font-black text-navy-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {ops.map(op => (
                  <tr key={op._id} className="hover:bg-white/5 transition-all duration-200">
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-white">{op.title}</div>
                      <div className="text-[10px] text-navy-500 font-mono mt-1 opacity-50 uppercase">{op.slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tight">
                        {((categories.find(c => c._id.toString() === op.categoryId.toString()) || {}) as any).name}
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
                        <Button variant="outline" size="sm" className="h-8 px-4 text-xs font-bold uppercase tracking-tighter border-white/10 hover:bg-white/5" disabled title="Feature in maintenance">
                          Edit
                        </Button>
                        <DeleteButton url={`/api/admin/operations/${String(op._id)}`} reloadOnSuccess />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </div>
  )
}
