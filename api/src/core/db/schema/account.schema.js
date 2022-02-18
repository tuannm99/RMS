const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const accountSchema = new mongoose.Schema({
  username: { required: true, type: String, unique: true },
  password: { required: true, type: String },
  email: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  avatar: String,
  role: { type: String, default: 'user' },
  rtoken: { type: String },
});

accountSchema.plugin(toJSON);
accountSchema.plugin(paginate);

module.exports = mongoose.model('Account', accountSchema);
