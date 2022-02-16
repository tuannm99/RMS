const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  username: { required: true, type: String, unique: true },
  password: { required: true, type: String },
  email: { type: String},
  date: { type: Date, default: Date.now },
  avatar: String,
  role: { type: String, default: 'user' },
  rtoken: { type: String },
});

module.exports = mongoose.model('Account', accountSchema);
