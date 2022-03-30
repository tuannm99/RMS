const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate, preDate } = require('./plugins');
const { ROLES } = require('../../../constants');

const userSchema = mongoose.Schema({
  username: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
    trim: true,
    minlength: 8,
    validate(value) {
      if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        throw new Error('Password must contain at least one letter and one number');
      }
    },
    private: true, // toJSON plugin not read this field
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email');
      }
    },
  },

  firstName: { type: String },
  lastName: { type: String },
  middleName: { type: String },
  fullName: { type: String },
  address: { type: String },
  phone: { type: Number },
  dateOfBirth: { type: Date },
  languages: { type: String },
  materialStatus: { type: String },

  avatar: {
    mimetype: String,
    originalname: String,
    encoding: String,
    destination: String,
    filename: String,
    path: String,
    imageBuffer: Buffer,
  },
  role: {
    type: String,
    enum: [ROLES.employee, ROLES.hiringManager, ROLES.admin, ROLES.guest],
    default: ROLES.employee,
  },
  jobStatus: {
    employeeStatus: { type: String },
    employeeType: { type: String },
    dateOfJoining: { type: Date, default: Date.now },
    department: { type: String },
    primaryTeam: { type: String },
    level: { type: String },
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

userSchema.plugin(toJSON);
userSchema.plugin(paginate);
userSchema.plugin(preDate);

/**
 * Check if username is taken
 * @param {string} username - The user's username
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isUsernameTaken = async function (username, excludeUserId) {
  const user = await this.findOne({ username, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
