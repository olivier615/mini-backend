const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    account: {
      type: String,
      required: [true, '請輸入帳號'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, '請輸入密碼'],
      minlength: 6,
      select: false
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

const User = mongoose.model('user', userSchema)

module.exports = User