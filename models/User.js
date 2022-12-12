import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String },
  role: { type: String },
})
export const User = mongoose.model('user', UserSchema)
