const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  authorId: { type: String, required: true },
  releaseTime: { type: Number, required: true },
  updateTime: { type: Number, required: true },
  email: { type: String, required: true },
  status: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  photo: { type: String },
  price: { type: Number },
  phone: { type: String },
  location: { type: String },
  version: { type: Number, required: true },
});

module.exports = mongoose.model('Post', postSchema);
