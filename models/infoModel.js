const mongoose = require('mongoose')
const infoSchema = new mongoose.Schema(
  {
    info: {
      type: String,
      required: [true, '未填入通知訊息']
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

const Info = mongoose.model('info', infoSchema)

module.exports = Info