import { NextResponse } from 'next/server'
import connectMongoose from '../../../../../lib/mongoose'
import Operation from '../../../../../models/Operation'

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectMongoose()
  try {
    await Operation.findByIdAndDelete(params.id)
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json()
  await connectMongoose()
  try {
    await Operation.findByIdAndUpdate(params.id, body)
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}
