import { NextResponse } from 'next/server'
import connectMongoose from '../../../../../lib/mongoose'
import Category from '../../../../../models/Category'

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectMongoose()
  const { id } = params
  try {
    await Category.findByIdAndDelete(id)
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json()
  await connectMongoose()
  try {
    await Category.findByIdAndUpdate(params.id, body)
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}
