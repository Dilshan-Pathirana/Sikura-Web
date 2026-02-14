import { NextResponse } from 'next/server'
import connectMongoose from '../../../../lib/mongoose'
import Category from '../../../../models/Category'

function isEnabled() {
  return process.env.ENABLE_TEST_API === '1' || process.env.NODE_ENV === 'test'
}

export async function GET() {
  if (!isEnabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  await connectMongoose()
  const items = await Category.find().lean()
  return NextResponse.json(items)
}

export async function POST(req: Request) {
  if (!isEnabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const body = await req.json()
  await connectMongoose()
  const created = await Category.create(body)
  return NextResponse.json(created)
}
