import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import connectMongoose from '../../../../../lib/mongoose'
import Category from '../../../../../models/Category'

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectMongoose()
  const { id } = params
  try {
    const deleted = await Category.findByIdAndDelete(id)
    if (!deleted) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    try {
      revalidatePath('/categories')
      revalidatePath('/')
      revalidatePath('/admin/(dashboard)/categories')
    } catch (e) {
      // ignore
    }
    return NextResponse.json({ ok: true })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Category delete error:', (e as any)?.message || e)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json()
  await connectMongoose()
  try {
    const updated = await Category.findByIdAndUpdate(params.id, body)
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    try {
      revalidatePath('/categories')
      revalidatePath('/')
      revalidatePath('/admin/(dashboard)/categories')
    } catch (e) {}
    return NextResponse.json({ ok: true })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Category update/delete error:', (e as any)?.message || e)
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}
