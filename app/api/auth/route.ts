import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import connectMongoose from '../../../lib/mongoose'
import Admin from '../../../models/Admin'
import bcrypt from 'bcryptjs'
import { signToken } from '../../../lib/auth'
import { z } from 'zod'
import { isAllowed } from '../../../lib/rateLimit'

export async function POST(req: Request | NextRequest) {
  // rate limit by IP
  const ip = (req as any).headers?.get?.('x-forwarded-for')?.split(',')[0].trim() || (req as any).headers?.get?.('x-real-ip') || '127.0.0.1'
  if (!isAllowed(`auth:${ip}`, 6, 60_000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  const loginSchema = z.object({ username: z.string().min(1), password: z.string().min(1) })

  const contentType = (req as any).headers?.get?.('content-type') || ''
  let parsed: any = {}
  if (contentType.includes('application/json')) parsed = await req.json()
  else {
    try {
      const form = await (req as NextRequest).formData()
      parsed.username = form.get('username') || form.get('email')
      parsed.password = form.get('password')
    } catch (e) {
      parsed = await req.json().catch(() => ({}))
    }
  }

  const result = loginSchema.safeParse(parsed)
  if (!result.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 })

  const { username, password } = result.data

  await connectMongoose()
  const admin = await Admin.findOne({ username }).lean()
  if (!admin) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

  const match = await bcrypt.compare(password, admin.passwordHash)
  if (!match) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

  const token = await signToken({ id: admin._id.toString(), username: admin.username, role: admin.role })
  const res = NextResponse.json({ ok: true, user: { username: admin.username, role: admin.role } })
  res.cookies.set('token', token, {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7
  })
  return res
}
