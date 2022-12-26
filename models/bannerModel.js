const mongoose = require('mongoose')
const bannerSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, '必須輸入圖片網址']
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

const Banner = mongoose.model('banner', bannerSchema)

module.exports = Banner