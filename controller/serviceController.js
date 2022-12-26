const appError = require('../service/appError.js')
const Service = require('../models/serviceModel.js')
const handelSuccess = require('../service/handelResponse.js')

exports.getServiceList = async (req, res ,next) => {
  const serviceList = await Service.find()
  handelSuccess(res, serviceList)
}

exports.addNewService = async (req, res ,next) => {
  const { name, account, type, group } = req.body
  if (name === undefined || name === null || name.trim() === '') {
    return next(appError(400, '未填寫客服名稱', next))
  }
  if (account === undefined || account === null || account.trim() === '') {
    return next(appError(400, '未填寫客服帳號', next))
  }
  if (type === undefined || type === null || type.trim() === '') {
    return next(appError(400, '未選擇 App 類別', next))
  }
  if (type !== 'weChat' && type !== 'QQ' && type !== 'bat') {
    return next(appError(400, 'App 類別有誤', next))
  }
  const newService = await Service.create({
    name,
    account,
    type,
    group
  })
  handelSuccess(res, newService)
}

exports.deleteService = async (req, res, next) => {
  const { id } = req.params
  await Service.findByIdAndRemove(id)
  handelSuccess(res)
}

exports.updateService = async (req, res, next) => {
  const { id } = req.params
  const { name, account, type, group } = req.body
  if (name === undefined || name === null || name.trim() === '') {
    return next(appError(400, '未填寫客服名稱', next))
  }
  if (account === undefined || account === null || account.trim() === '') {
    return next(appError(400, '未填寫客服帳號', next))
  }
  if (type === undefined || type === null || type.trim() === '') {
    return next(appError(400, '未選擇 App 類別', next))
  }
  if (type !== 'weChat' && type !== 'QQ' && type !== 'bat') {
    return next(appError(400, 'App 類別有誤', next))
  }
  const newData = { name, account, type, group }
  await Service.findByIdAndUpdate(id, newData)
  const editPost = await Service.find({
    _id: id
  })
  handelSuccess(res, editPost)
}
