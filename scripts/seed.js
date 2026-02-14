/* Seed script: inserts example categories into the 'categories' collection.
   Usage: node scripts/seed.js
   It reads MONGODB_URI from environment or .env.local via dotenv.
*/
const dotenv = require('dotenv')
dotenv.config()

const { MongoClient } = require('mongodb')

async function main() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('MONGODB_URI not set')
    process.exit(1)
  }

  const client = new MongoClient(uri)
  try {
    await client.connect()
    const db = client.db()
    const categories = [
      { name: 'Trauma', slug: 'trauma', description: 'Trauma management operations', thumbnail: '', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cardiac', slug: 'cardiac', description: 'Cardiac procedures and operations', thumbnail: '', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Orthopedics', slug: 'orthopedics', description: 'Bone and joint operations', thumbnail: '', createdAt: new Date(), updatedAt: new Date() }
    ]

    const res = await db.collection('categories').insertMany(categories)
    console.log('Inserted categories:', Object.values(res.insertedIds))
  } catch (err) {
    console.error('Seed error:', err)
    process.exitCode = 1
  } finally {
    await client.close()
  }
}

main()
