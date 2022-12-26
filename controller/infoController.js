const appError = require('../service/appError.js')
const Info = require('../models/infoModel.js')
const handelSuccess = require('../service/handelResponse.js')
const validator = require('validator')

exports.getInfoList = async (req, res ,next) => {
  const infoList = await Info.find()
  handelSuccess(res, infoList)
}

exports.addNewInfo = async (req, res ,next) => {
  const { info, group } = req.body
  if (info === undefined || info === null || info.trim() === '') {
    return next(appError(400, '未填寫通知訊息', next))
  }
  const newInfo = await Info.create({
    info,
    group
  })
  handelSuccess(res, newInfo)
}

exports.deleteInfo = async (req, res, next) => {
  const { id } = req.params
  await Info.findByIdAndRemove(id)
  handelSuccess(res)
}

exports.updateInfo = async (req, res, next) => {
  const { id } = req.params
  const { info, group } = req.body
  if (info === undefined || info === null || info.trim() === '') {
    return next(appError(400, '未填寫通知訊息', next))
  }
  const newData = { info, group }
  await Info.findByIdAndUpdate(id, newData)
  const editInfo = await Info.find({
    _id: id
  })
  handelSuccess(res, editInfo)
}
