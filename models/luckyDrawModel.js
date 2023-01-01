const mongoose = require('mongoose')
const luckyDrawSchema = new mongoose.Schema(
  {
    order: {
      type: Number,
      required: [true, '獎品序未填或錯誤']
    },
    content: {
      type: String,
      required: [true, '未填寫獎品描述']
    },
    winner: {
      type: String,
      default: ''
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false
    }
  },
  {
    versionKey: false
  }
)

const LuckyDraw = mongoose.model('LuckyDraw', luckyDrawSchema)

module.exports = LuckyDraw