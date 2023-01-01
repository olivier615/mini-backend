const appError = require('../service/appError.js')
const Timestamp = require('../models/timestampModel.js')
const handelSuccess = require('../service/handelResponse.js')

exports.getTimestamp = async (req, res ,next) => {
  const timestamp = await Timestamp.find()
  handelSuccess(res, timestamp)
}

exports.addTimestamp = async (req, res ,next) => {
  const { timestamp } = req.body
  if (timestamp.trim() === '' || timestamp === null || timestamp === undefined) {
    return next(appError(400, '未填寫時間紀錄', next))
  }
  const newTimestamp = await Timestamp.create({
    timestamp
  })
  handelSuccess(res, newTimestamp)
}


exports.deleteTimestamp = async (req, res ,next) => {
  const { id } = req.params
  await Timestamp.findByIdAndRemove(id)
  handelSuccess(res)
}

exports.updateTimestamp = async (req, res ,next) => {
  const { id } = req.params
  const { timestamp } = req.body
  if (timestamp.trim() === '' || timestamp === null || timestamp === undefined) {
    return next(appError(400, '未填寫時間紀錄', next))
  }
  const newData =  await Timestamp.findByIdAndUpdate(id, { timestamp }, { new: true })
  handelSuccess(res, newData)
}