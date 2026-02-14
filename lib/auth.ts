import { SignJWT, jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret')

export async function signToken(payload: Record<string, unknown>) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(SECRET)
}

export async function verifyToken(token?: string) {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return payload
  } catch (e) {
    return null
  }
}

export const COOKIE_NAME = 'token'
