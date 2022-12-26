const appError = require('../service/appError.js')
const OnLink = require('../models/onLinkModel.js')
const handelSuccess = require('../service/handelResponse.js')

exports.getOnLinkList = async (req, res ,next) => {
  const onLinkList = await OnLink.find()
  handelSuccess(res, onLinkList)
}

exports.addNewOnLink = async (req, res ,next) => {
  const { link, group } = req.body
  if (link === undefined || link === null || link.trim() === '') {
    return next(appError(400, '未填寫鏈接', next))
  }
  const newOnlink = await OnLink.create({
    link,
    group
  })
  handelSuccess(res, newOnlink)
}

exports.deleteOnLink = async (req, res, next) => {
  const { id } = req.params
  await OnLink.findByIdAndRemove(id)
  handelSuccess(res)
}

exports.updateOnLink = async (req, res, next) => {
  const { id } = req.params
  const { link, group } = req.body
  if (link === undefined || link === null || link.trim() === '') {
    return next(appError(400, '未填寫鏈接', next))
  }
  const newData = { link, group }
  await OnLink.findByIdAndUpdate(id, newData)
  const editPost = await OnLink.find({
    _id: id
  })
  handelSuccess(res, editPost)
}