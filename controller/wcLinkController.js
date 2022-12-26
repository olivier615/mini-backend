const appError = require('../service/appError.js')
const WcLink = require('../models/wcLinkModel.js')
const handelSuccess = require('../service/handelResponse.js')

exports.getWcLinkList = async (req, res ,next) => {
  const wcLinkList = await WcLink.find()
  handelSuccess(res, wcLinkList)
}

exports.addNewWcLink = async (req, res ,next) => {
  const { link, group } = req.body
  if (link === undefined || link === null || link.trim() === '') {
    return next(appError(400, '未填寫鏈接', next))
  }
  const newWclink = await WcLink.create({
    link,
    group
  })
  handelSuccess(res, newWclink)
}

exports.deleteWcLink = async (req, res, next) => {
  const { id } = req.params
  await WcLink.findByIdAndRemove(id)
  handelSuccess(res)
}

exports.updateWcLink = async (req, res, next) => {
  const { id } = req.params
  const { link, group } = req.body
  if (link === undefined || link === null || link.trim() === '') {
    return next(appError(400, '未填寫鏈接', next))
  }
  const newData = { link, group }
  await WcLink.findByIdAndUpdate(id, newData)
  const editPost = await WcLink.find({
    _id: id
  })
  handelSuccess(res, editPost)
}