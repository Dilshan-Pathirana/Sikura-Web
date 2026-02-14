const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') })
const mongoose = require('mongoose')

async function main() {
  const file = path.join(process.cwd(), 'data', 'sample-data.json')
  if (!fs.existsSync(file)) {
    console.error('data/sample-data.json not found')
    process.exit(1)
  }
  const raw = fs.readFileSync(file, 'utf8')
  const json = JSON.parse(raw)

  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('MONGODB_URI not set in .env.local')
    process.exit(1)
  }

  try {
    console.log('Connecting to MongoDB via Mongoose...')
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 30000 })

    // Explicitly wait for connection if not ready
    if (mongoose.connection.readyState !== 1) {
      console.log('Waiting for connection to be ready...')
      await new Promise((resolve, reject) => {
        mongoose.connection.once('open', resolve)
        mongoose.connection.once('error', reject)
      })
    }
    console.log('Connected. State:', mongoose.connection.readyState)

    // Schemas
    const CategorySchema = new mongoose.Schema({
      name: String, slug: String, description: String, thumbnail: String
    }, { timestamps: true, strict: false })
    const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema)

    const OperationSchema = new mongoose.Schema({
      title: String, slug: String, categoryId: mongoose.Schema.Types.ObjectId,
      videoUrl: String, description: String, thumbnail: String, viewCount: Number, duration: String
    }, { timestamps: true, strict: false })
    const Operation = mongoose.models.Operation || mongoose.model('Operation', OperationSchema)

    // Upsert categories
    const insertedCategories = {}
    for (const c of json.categories || []) {
      try {
        const existing = await Category.findOne({ slug: c.slug })
        if (existing) {
          console.log('Category exists:', c.slug)
          insertedCategories[c.slug] = existing._id
        } else {
          const toInsert = { ...c }
          if (!toInsert.createdAt) toInsert.createdAt = new Date()
          if (!toInsert.updatedAt) toInsert.updatedAt = new Date()
          const res = await Category.create(toInsert)
          console.log('Inserted category:', c.slug)
          insertedCategories[c.slug] = res._id
        }
      } catch (err) {
        console.error('Error inserting category:', c.slug, err)
      }
    }

    // Insert operations
    for (const o of json.operations || []) {
      try {
        const categoryId = insertedCategories[o.categorySlug]
        if (!categoryId) {
          console.warn('Skipping op, missing category:', o.categorySlug)
          continue
        }
        const existing = await Operation.findOne({ slug: o.slug })
        if (existing) {
          console.log('Operation exists:', o.slug)
          continue
        }
        const opDoc = { ...o, categoryId }
        delete opDoc.categorySlug
        if (!opDoc.createdAt) opDoc.createdAt = new Date()
        if (!opDoc.updatedAt) opDoc.updatedAt = new Date()
        await Operation.create(opDoc)
        console.log('Inserted operation:', o.slug)
      } catch (err) {
        console.error('Error inserting operation:', o.slug, err)
      }
    }

    console.log('Import complete')
  } catch (e) {
    console.error('Import error:', e)
    process.exitCode = 1
  } finally {
    await mongoose.disconnect()
  }
}

main()
