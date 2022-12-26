const appError = require('../service/appError.js')
const Counting = require('../models/countingModel.js')
const handelSuccess = require('../service/handelResponse.js')
const validator = require('validator')

exports.getJackpot = async (req, res ,next) => {
  const jackpot = await Counting.find()
  handelSuccess(res, jackpot)
}

exports.addJackpot = async (req, res, next) => {
  const { ticket, donate, manual, basic, activeManual } = req.body
  if (ticket === undefined || ticket < 0) {
    return next(appError(400, 'ticket 數量有誤', next))
  }
  if (donate === undefined) {
    return next(appError(400, 'sponsor 有誤', next))
  }
  // if (manual === undefined || manual < 0) {
  //   return next(appError(400, 'manual 有誤', next))
  // }
  const data = await Counting.create({
    ticket,
    donate,
    manual,
    basic,
    activeManual
  })
  handelSuccess(res, data)
}

exports.deleteJackpot = async (req, res, next) => {
  const { id } = req.params
  await Counting.findByIdAndRemove(id)
  handelSuccess(res)
}

exports.updateJackpot = async (req, res, next) => {
  const { id } = req.params
  const { ticket, donate, manual, basic, activeManual } = req.body
  if (ticket === undefined || ticket < 0) {
    return next(appError(400, 'ticket 數量有誤', next))
  }
  if (donate === undefined) {
    return next(appError(400, 'sponsor 有誤', next))
  }
  const newData = { 
    ticket,
    donate,
    manual,
    basic,
    activeManual
  }
  const editedData = await Counting.findByIdAndUpdate(id, newData, { new: true })
  handelSuccess(res, editedData)
}
