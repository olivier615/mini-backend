const appError = require('../service/appError.js')
const H5Link = require('../models/h5LinkModel.js')
const handelSuccess = require('../service/handelResponse.js')

exports.getH5LinkList = async (req, res ,next) => {
  const h5LinkList = await H5Link.find()
  handelSuccess(res, h5LinkList)
}

exports.addNewH5Link = async (req, res ,next) => {
  const { link, group } = req.body
  if (link === undefined || link === null || link.trim() === '') {
    return next(appError(400, '未填寫鏈接', next))
  }
  const newH5link = await H5Link.create({
    link,
    group
  })
  handelSuccess(res, newH5link)
}

exports.deleteH5Link = async (req, res, next) => {
  const { id } = req.params
  await H5Link.findByIdAndRemove(id)
  handelSuccess(res)
}

exports.updateH5Link = async (req, res, next) => {
  const { id } = req.params
  const { link, group } = req.body
  if (link === undefined || link === null || link.trim() === '') {
    return next(appError(400, '未填寫鏈接', next))
  }
  const newData = { link, group }
  await H5Link.findByIdAndUpdate(id, newData)
  const editPost = await H5Link.find({
    _id: id
  })
  handelSuccess(res, editPost)
}