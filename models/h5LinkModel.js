const mongoose = require('mongoose')
const h5LinkSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      required: [true, '未填入連結']
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false
    },
    group: {
      type: [String],
    }
  },
  {
    versionKey: false
  }
)

const H5Link = mongoose.model('h5link', h5LinkSchema)

module.exports = H5Link