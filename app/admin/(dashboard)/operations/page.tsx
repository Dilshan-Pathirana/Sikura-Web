import React from 'react'
import { revalidatePath } from 'next/cache'
import connectMongoose from '../../../../lib/mongoose'
import Operation from '../../../../models/Operation'
import Category from '../../../../models/Category'
import { z } from 'zod'
import Card from '../../../../components/ui/Card'
import AddOperationForm from '../../../../components/AddOperationForm'
import OperationsRepository from '../../../../components/admin/OperationsRepository'
import { isGoogleDriveSharedLink } from '../../../../lib/videoUrl'

export const metadata = { title: 'Operations - Admin' }

const OperationSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  categoryId: z.string().min(1),
  videoUrl: z
    .string()
    .url('Video URL must be a valid URL')
    .refine((value) => isGoogleDriveSharedLink(value), 'Video URL must be a valid Google Drive shared file link'),
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

      <OperationsRepository initialOps={ops} categories={categories} />
    </div>
  )
}
