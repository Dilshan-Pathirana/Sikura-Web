import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import connectMongoose from '../../../../lib/mongoose'
import Admin from '../../../../models/Admin'
import { verifyToken, COOKIE_NAME } from '../../../../lib/auth'
import bcrypt from 'bcryptjs'

export async function PUT(req: Request) {
    try {
        const cookieStore = cookies()
        const token = cookieStore.get(COOKIE_NAME)?.value
        const payload = (await verifyToken(token)) as any

        if (!payload || !payload.username) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { username, password } = await req.json()
        const updateData: any = {}

        if (username) updateData.username = username
        if (password) {
            const salt = await bcrypt.genSalt(10)
            updateData.passwordHash = await bcrypt.hash(password, salt)
        }

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json({ message: 'No changes provided' })
        }

        await connectMongoose()

        // Find admin by the username in the token
        const admin = await Admin.findOne({ username: payload.username })

        if (!admin) {
            return NextResponse.json({ error: 'Admin account not found' }, { status: 404 })
        }

        // Update fields
        if (updateData.username) admin.username = updateData.username
        if (updateData.passwordHash) admin.passwordHash = updateData.passwordHash

        await admin.save()

        return NextResponse.json({ message: 'Profile updated successfully' })
    } catch (error) {
        console.error('Profile update error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
