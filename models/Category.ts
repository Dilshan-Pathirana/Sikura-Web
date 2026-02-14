import mongoose, { Schema } from 'mongoose'

export interface ICategory {
  name: string
  slug: string
  description?: string
  thumbnail?: string
  createdAt?: Date
  updatedAt?: Date
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String },
    thumbnail: { type: String }
  },
  { timestamps: true }
)

CategorySchema.index({ slug: 1 }, { unique: true })

const Category = (mongoose.models.Category as mongoose.Model<ICategory>) || mongoose.model<ICategory>('Category', CategorySchema)

export default Category
