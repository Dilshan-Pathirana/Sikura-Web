import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import connectMongoose from '../../../../lib/mongoose'
import Category from '../../../../models/Category'

export async function GET() {
  await connectMongoose()
  try {
    const categories = await Category.find().sort({ name: 1 }).lean()
    return NextResponse.json(categories)
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const body = await req.json()
  await connectMongoose()
  try {
    const created = await Category.create(body)
    // Revalidate public and admin category pages so the deployed site shows the update
    try {
      revalidatePath('/categories')
      revalidatePath('/')
      revalidatePath('/admin/(dashboard)/categories')
    } catch (e) {
      // ignore revalidation errors
    }
    return NextResponse.json(created)
  } catch (e) {
    return NextResponse.json({ error: 'Create failed' }, { status: 500 })
  }
}
