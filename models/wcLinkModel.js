const mongoose = require('mongoose')
const wcLinkSchema = new mongoose.Schema(
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

const WcLink = mongoose.model('wclink', wcLinkSchema)

module.exports = WcLink