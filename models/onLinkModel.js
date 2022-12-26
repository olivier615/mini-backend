const mongoose = require('mongoose')
const onLinkSchema = new mongoose.Schema(
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

const OnLink = mongoose.model('onlink', onLinkSchema)

module.exports = OnLink