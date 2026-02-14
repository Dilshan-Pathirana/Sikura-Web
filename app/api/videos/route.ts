import { NextResponse } from 'next/server'
import connectMongoose from '../../../lib/mongoose'
import Operation from '../../../models/Operation'

export async function GET() {
  await connectMongoose()
  const videos = await Operation.find({}).limit(50).lean()
  return NextResponse.json(videos)
}

export async function POST(req: Request) {
  const data = await req.json()
  await connectMongoose()
  const operation = new Operation(data)
  await operation.save()
  return NextResponse.json({ insertedId: operation._id })
}
