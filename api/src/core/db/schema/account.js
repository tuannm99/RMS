const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  username: { required: true, unique: true, type: String },
  password: { required: true, type: String },
  email: { unique: true, type: String },
  date: { type: Date, default: Date.now },
  avatar: String,
  role: { type: String, default: 'user' },
  rtoken: { type: String },
});

module.exports = mongoose.model('Account', accountSchema);
