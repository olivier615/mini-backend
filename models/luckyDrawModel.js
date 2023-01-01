const mongoose = require('mongoose')
const luckyDrawSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, '未填寫獎品描述']
    },
    winner: {
      type: String,
      default: ''
    },
    order: {
      type: Number,
      required: [true, '未填寫獎品排序']
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