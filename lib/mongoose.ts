import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: MongooseCache | undefined
}

const cache: MongooseCache = global._mongooseCache || { conn: null, promise: null }

if (process.env.NODE_ENV === 'development') {
  global._mongooseCache = cache
}

export async function connectMongoose() {
  if (cache.conn) {
    return cache.conn
  }

  if (!cache.promise) {
    const opts = {
      // Recommended options for serverless
      bufferCommands: false,
      // Use unified topology and new URL parser by default in mongoose 6+
    }
    cache.promise = mongoose.connect(MONGODB_URI!, opts).then(() => mongoose)
  }

  cache.conn = await cache.promise
  return cache.conn
}

export async function disconnectMongoose() {
  if (cache.conn) {
    await mongoose.disconnect()
    cache.conn = null
    cache.promise = null
  }
}

export default connectMongoose
