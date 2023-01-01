const appError = require('../service/appError.js')
const LuckyDraw = require('../models/luckyDrawModel.js')
const handelSuccess = require('../service/handelResponse.js')

exports.getDrawList = async (req, res ,next) => {
  const luckyDraw = await LuckyDraw.find()
  handelSuccess(res, luckyDraw)
}

exports.addNewDraw = async (req, res ,next) => {
  const { content, order } = req.body
  if (content === undefined || content === '' || content.trim() === '') {
    return next(appError(400, '未填寫獎品描述', next))
  }
  const checkOrder = await LuckyDraw.find({ order })
  if (order === undefined || checkOrder.length !== 0) {
    return next(appError(400, '獎品排序重複或未填寫', next))
  }
  const newDraw = await LuckyDraw.create({ content, order })
  handelSuccess(res, newDraw)
}

exports.deleteDraw = async (req, res ,next) => {
  const { id } = req.params
  await LuckyDraw.findByIdAndRemove(id)
  handelSuccess(res)
}

exports.updateDraw = async (req, res ,next) => {
  const { id } = req.params
  const { content, winner, order } = req.body
  if (content === undefined || winner === undefined) {
    return next(appError(400, '獎品序號、內容或得獎者有誤', next))
  }
  if (content === '' || content.trim() === '') {
    return next(appError(400, '未填寫獎品描述', next))
  }
  const checkOrder = await LuckyDraw.find({ order })
  if (order === undefined || checkOrder.length !== 0) {
    return next(appError(400, '獎品排序重複或未填寫', next))
  }
  const newData =  await LuckyDraw.findByIdAndUpdate(id, {
    content,
    winner,
    order
  }, { new: true })
  handelSuccess(res, newData)
}