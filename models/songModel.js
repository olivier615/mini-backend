const mongoose = require('mongoose')
const songSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '歌曲名稱未填']
    },
    singer: {
      type: String,
      required: [true, '演唱者未填']
    },
    order: {
      type: Number,
      required: [true, '未填寫排序']
    },
    play: {
      type: Boolean,
      default: false
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

const Song = mongoose.model('song', songSchema)

module.exports = Song