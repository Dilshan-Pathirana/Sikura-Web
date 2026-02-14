import { NextResponse } from 'next/server'
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
    return NextResponse.json(created)
  } catch (e) {
    return NextResponse.json({ error: 'Create failed' }, { status: 500 })
  }
}
