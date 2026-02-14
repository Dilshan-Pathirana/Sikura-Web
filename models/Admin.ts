import mongoose, { Schema } from 'mongoose'

export interface IAdmin {
  username: string
  passwordHash: string
  role: string
  createdAt?: Date
  updatedAt?: Date
}

const AdminSchema = new Schema<IAdmin>(
  {
    username: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, required: true, default: 'admin' }
  },
  { timestamps: true }
)

AdminSchema.index({ username: 1 }, { unique: true })

const Admin = (mongoose.models.Admin as mongoose.Model<IAdmin>) || mongoose.model<IAdmin>('Admin', AdminSchema)

export default Admin
