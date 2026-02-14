import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '../../../../lib/auth'
import connectMongoose from '../../../../lib/mongoose'
import Admin from '../../../../models/Admin'

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const payload: any = await verifyToken(token)
  if (!payload || !payload.id) return NextResponse.json({ user: null })
  await connectMongoose()
  const admin = await Admin.findById(payload.id).lean()
  if (!admin) return NextResponse.json({ user: null })
  return NextResponse.json({ user: { id: admin._id.toString(), username: admin.username, role: admin.role } })
}
