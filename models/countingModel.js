const mongoose = require('mongoose')
const countingSchema = new mongoose.Schema(
  {
    ticket: {
      type: Number,
      required: [true, '必須輸入摸彩券流水號']
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false
    },
    donate: [
      {
        sponsor: {
          type: String,
          required: [true, '必須輸入贊助人']
        },
        bonus: {
          type: Number,
          required: [true, '必須輸贊助金額']
        }
      }
    ],
    manual: {
      type: Number,
      default: 0
    },
    activeManual: {
      type: Boolean,
      default: false
    },
    basic: {
      type: Number,
      default: 0
    }
  },
  {
    versionKey: false
  }
)

const Counting = mongoose.model('counting', countingSchema)

module.exports = Counting