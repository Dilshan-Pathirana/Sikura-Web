import { NextResponse } from 'next/server'
import connectMongoose from '../../../../lib/mongoose'
import Admin from '../../../../models/Admin'
import bcrypt from 'bcryptjs'

function isEnabled() {
  return process.env.ENABLE_TEST_API === '1' || process.env.NODE_ENV === 'test'
}

export async function POST(req: Request) {
  if (!isEnabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const { username, password, role } = await req.json()
  if (!username || !password) return NextResponse.json({ error: 'invalid' }, { status: 400 })
  await connectMongoose()
  const existing = await Admin.findOne({ username }).lean()
  if (existing) return NextResponse.json({ ok: true, id: existing._id })
  const passwordHash = await bcrypt.hash(password, 10)
  const created = await Admin.create({ username, passwordHash, role: role || 'admin' })
  return NextResponse.json({ ok: true, id: created._id })
}
