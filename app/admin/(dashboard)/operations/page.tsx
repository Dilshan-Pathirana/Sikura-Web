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
        <h1 className="text-2xl font-semibold">Operations</h1>
      </div>

      <section>
        <Card className="p-4">
          <h2 className="text-lg font-medium mb-3">Add Operation</h2>
          <AddOperationForm categories={categories} action={createOperation} />
        </Card>
      </section>

      <section>
        <h2 className="text-lg font-medium mb-2">Operations List</h2>
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-navy-800">
              <thead className="bg-navy-900">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Title</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Video</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-800">
                {ops.map(op => (
                  <tr key={op._id} className="hover:bg-navy-800/20 transition-colors">
                    <td className="px-4 py-3 text-sm text-navy-200">{op.title}</td>
                    <td className="px-4 py-3 text-sm text-navy-200">
                      <span className="bg-navy-800 px-2 py-1 rounded text-xs">
                        {((categories.find(c => c._id.toString() === op.categoryId.toString()) || {}) as any).name}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <a
                        className="text-brand-400 hover:text-brand-300 underline underline-offset-4 truncate block max-w-[200px]"
                        href={op.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {op.videoUrl}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        {/* 
                          The Edit feature needs a proper form/modal to be useful.
                          Currently, it just crashes because of missing fields.
                          I'll disable the action for now and just show it as a secondary button.
                        */}
                        <Button variant="secondary" size="sm" disabled>
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
