type Bucket = number[]

declare global {
  // eslint-disable-next-line no-var
  var _rateLimitStore: Map<string, Bucket> | undefined
}

const store: Map<string, Bucket> = global._rateLimitStore || new Map()
if (process.env.NODE_ENV === 'development') global._rateLimitStore = store

export function isAllowed(key: string, limit = 5, windowMs = 60_000) {
  const now = Date.now()
  const windowStart = now - windowMs
  const bucket = store.get(key) || []
  // drop old timestamps
  const recent = bucket.filter(ts => ts > windowStart)
  if (recent.length >= limit) {
    // not allowed
    store.set(key, recent)
    return false
  }
  recent.push(now)
  store.set(key, recent)
  return true
}
