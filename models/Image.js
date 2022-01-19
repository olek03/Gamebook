const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
  owner: String,
  coverImage: Buffer,
  coverImageType: String,
  createdAt: {
    type: Number,
    immutable: true
  },
})

imageSchema.virtual('coverImagePath').get(function () {
  if (this.coverImage != null && this.coverImageType != null) {
    return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
  }
})

imageSchema.virtual('thisid').get(function () {
  if (this.coverImage != null && this.coverImageType != null) {
    return this._id
  }
})

module.exports = mongoose.model('images', imageSchema)