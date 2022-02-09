import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  username: { required: true, type: String, unique: true },
  password: { required: true, type: String },
  email: { type: String, unique: true },
  date: { type: Date, default: Date.now },
  avatar: String,
  role: { type: String, default: 'user' },
  rtoken: { type: String },
});

export const Account = mongoose.model('Account', accountSchema);
