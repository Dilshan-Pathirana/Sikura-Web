import React from 'react'
import connectMongoose from '../../../../lib/mongoose'
import Category from '../../../../models/Category'
import { z } from 'zod'
import Card from '../../../../components/ui/Card'
import Input from '../../../../components/ui/Input'
import Button from '../../../../components/ui/Button'

import FormValidator from '../../../../components/FormValidator'
import CategoriesManager from '../../../../components/admin/CategoriesManager'


export const metadata = { title: 'Categories - Admin' }

export default async function CategoriesPage() {
  let categories: any[] = []
  try {
    await connectMongoose()
    categories = await Category.find().sort({ createdAt: -1 }).lean()
    categories = JSON.parse(JSON.stringify(categories))
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('DB unavailable when loading admin categories:', (err as any)?.message || err)
    categories = []
  }

  const CategorySchema = z.object({ name: z.string().min(1), slug: z.string().min(1), description: z.string().optional().nullable() })

  async function createCategory(formData: FormData) {
    'use server'
    const input = {
      name: String(formData.get('name') || ''),
      slug: String(formData.get('slug') || ''),
      description: String(formData.get('description') || '')
    }
    const parsed = CategorySchema.parse(input)
    await connectMongoose()
    await Category.create(parsed)
  }

  async function editCategory(formData: FormData) {
    'use server'
    const id = String(formData.get('id') || '')
    const input = {
      name: String(formData.get('name') || ''),
      slug: String(formData.get('slug') || ''),
      description: String(formData.get('description') || '')
    }
    const parsed = CategorySchema.parse(input)
    await connectMongoose()
    await Category.findByIdAndUpdate(id, parsed)
  }

  return (
    <div>
      <CategoriesManager initial={categories} />
    </div>
  )
}
