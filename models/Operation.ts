import mongoose, { Schema } from 'mongoose'
import { isGoogleDriveSharedLink } from '../lib/videoUrl'

export interface IOperation {
  title: string
  slug: string
  categoryId: mongoose.Types.ObjectId
  videoUrl: string
  description?: string
  thumbnail?: string
  createdAt?: Date
  updatedAt?: Date
}

const OperationSchema = new Schema<IOperation>(
  {
    title: { type: String, required: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
    videoUrl: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => isGoogleDriveSharedLink(value),
        message: 'videoUrl must be a valid Google Drive shared file link'
      }
    },
    description: { type: String },
    thumbnail: { type: String }
  },
  { timestamps: true }
)

// Useful text index for searching
OperationSchema.index({ title: 'text', description: 'text' })
OperationSchema.index({ slug: 1 }, { unique: true })

const Operation = (mongoose.models.Operation as mongoose.Model<IOperation>) || mongoose.model<IOperation>('Operation', OperationSchema)

export default Operation
