/*
  Usage:
    node scripts/create-admin.js <username> <password> [role]

  Requires MONGODB_URI in environment or in a .env file.
*/
const path = require('path')
const dotenv = require('dotenv')
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

async function main() {
  const [, , username, password, role = 'admin'] = process.argv
  if (!username || !password) {
    console.error('Usage: node scripts/create-admin.js <username> <password> [role]')
    process.exit(1)
  }

  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('Please set MONGODB_URI in environment or .env file')
    process.exit(1)
  }

  await mongoose.connect(uri, { bufferCommands: false })
  try {
    const passwordHash = await bcrypt.hash(password, 10)
    const admins = mongoose.connection.collection('admins')
    const now = new Date()
    const result = await admins.insertOne({ username, passwordHash, role, createdAt: now, updatedAt: now })
    console.log('Admin created with id', result.insertedId.toString())
  } catch (err) {
    console.error('Error creating admin:', err.message || err)
  } finally {
    await mongoose.disconnect()
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
