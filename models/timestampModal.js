const mongoose = require('mongoose')
const timestampSchema = new mongoose.Schema(
  {
    timestamp: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false
  }
)

const Timestamp = mongoose.model('timestamp', timestampSchema)

module.exports = Timestamp