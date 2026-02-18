import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import connectMongoose from '../../../../../lib/mongoose'
import Operation from '../../../../../models/Operation'

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectMongoose()
  try {
    const deleted = await Operation.findByIdAndDelete(params.id)
    if (!deleted) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    try {
      revalidatePath('/operations')
      revalidatePath('/')
      revalidatePath('/admin/(dashboard)/operations')
    } catch (e) {}
    return NextResponse.json({ ok: true })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Operation delete error:', (e as any)?.message || e)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json()
  await connectMongoose()
  try {
    const updated = await Operation.findByIdAndUpdate(params.id, body, { runValidators: true, new: true })
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    try {
      revalidatePath('/operations')
      revalidatePath('/')
      revalidatePath('/admin/(dashboard)/operations')
    } catch (e) {}
    return NextResponse.json({ ok: true })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Operation update/delete error:', (e as any)?.message || e)
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}
