const appError = require('../service/appError.js')
const LuckyDraw = require('../models/luckyDrawModel.js')
const handelSuccess = require('../service/handelResponse.js')

exports.getDrawList = async (req, res ,next) => {
  const luckyDraw = await LuckyDraw.find()
  handelSuccess(res, luckyDraw)
}

exports.addNewDraw = async (req, res ,next) => {
  const { content } = req.body
  if (content === undefined || content === '' || content.trim() === '') {
    return next(appError(400, '未填寫獎品描述', next))
  }
  const newDraw = await LuckyDraw.create({ content })
  handelSuccess(res, newDraw)
}

exports.deleteDraw = async (req, res ,next) => {
  const { id } = req.params
  await LuckyDraw.findByIdAndRemove(id)
  handelSuccess(res)
}

exports.updateDraw = async (req, res ,next) => {
  const { id } = req.params
  const { content, winner } = req.body
  if (content === undefined || winner === undefined) {
    return next(appError(400, '獎品序號、內容或得獎者有誤', next))
  }
  if (content === '' || content.trim() === '') {
    return next(appError(400, '未填寫獎品描述', next))
  }
  const newData =  await LuckyDraw.findByIdAndUpdate(id, {
    content,
    winner
  }, { new: true })
  handelSuccess(res, newData)
}