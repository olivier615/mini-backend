const mongoose = require('mongoose')
const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '未填入客服名稱']
    },
    type: {
      type: String,
      enum: ["weChat", "QQ", "bat"],
      required: [true, '必須選擇 App 名稱']
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false
    },
    account: {
      type: String,
      required: [true, '未填入客服帳號']
    },
    group: {
      type: [String],
    }
  },
  {
    versionKey: false
  }
)

const Service = mongoose.model('service', serviceSchema)

module.exports = Service