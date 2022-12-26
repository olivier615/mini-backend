const appError = require('../service/appError.js')
const Banner = require('../models/bannerModel.js')
const handelSuccess = require('../service/handelResponse.js')
const validator = require('validator')

exports.getBannerList = async (req, res ,next) => {
  const bannerList = await Banner.find()
  handelSuccess(res, bannerList)
}

exports.addNewBanner = async (req, res ,next) => {
  const { url, group } = req.body
  if (url === undefined || url === null || url.trim() === '') {
    return next(appError(400, '未填寫 Banner 網址', next))
  }
  if (url && !validator.isURL(url, { protocols: ['https'] })){
    return next(appError(400, '圖片網址必須為 https 開頭', next));
  }
  const newBanner = await Banner.create({
    url,
    group
  })
  handelSuccess(res, newBanner)
}

exports.deleteBanner = async (req, res, next) => {
  const { id } = req.params
  await Banner.findByIdAndRemove(id)
  handelSuccess(res)
}

exports.updateBanner = async (req, res, next) => {
  const { id } = req.params
  const { url, group } = req.body
  if (url === undefined || url === null || url.trim() === '') {
    return next(appError(400, '未填寫 Banner 網址', next))
  }
  if (url && !validator.isURL(url, { protocols: ['https'] })){
    return next(appError(400, '圖片網址必須為 https 開頭', next));
  }
  const newData = { url, group }
  await Banner.findByIdAndUpdate(id, newData)
  const editPost = await Banner.find({
    _id: id
  })
  handelSuccess(res, editPost)
}
