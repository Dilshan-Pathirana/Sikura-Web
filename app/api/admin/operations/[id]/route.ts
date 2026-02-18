import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import connectMongoose from '../../../../../lib/mongoose'
import Operation from '../../../../../models/Operation'
import { isGoogleDriveSharedLink } from '../../../../../lib/videoUrl'

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
      revalidatePath('/admin/operations')
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
    const payload = {
      title: String(body?.title || '').trim(),
      slug: String(body?.slug || '').trim(),
      categoryId: String(body?.categoryId || '').trim(),
      videoUrl: String(body?.videoUrl || '').trim(),
      description: String(body?.description || '').trim(),
      thumbnail: String(body?.thumbnail || '').trim()
    }

    if (!payload.title || !payload.slug || !payload.categoryId || !payload.videoUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!isGoogleDriveSharedLink(payload.videoUrl)) {
      return NextResponse.json({ error: 'Video URL must be a valid Google Drive shared file link' }, { status: 400 })
    }

    const updated = await Operation.findByIdAndUpdate(params.id, payload, { runValidators: true, new: true })
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    try {
      revalidatePath('/operations')
      revalidatePath('/')
      revalidatePath('/admin/operations')
    } catch (e) {}
    return NextResponse.json({ ok: true })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Operation update/delete error:', (e as any)?.message || e)
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}
