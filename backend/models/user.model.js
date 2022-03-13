const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: '',
  },
  displayName: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  provider: {
    type: String,
    required: true,
    enum: ['google', 'facebook'],
  },
  photo: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('User', userSchema);
