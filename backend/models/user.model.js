const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  email: { type: String, required: true },
  displayName: { type: String, required: true },
  admin: { type: Boolean, required: true },
  provider: { type: String, required: true, enum: ['google'] },
  photo: { type: String, default: '' },
});

module.exports = mongoose.model('User', userSchema);
