const User = require('../models/userModel')
const handelSuccess = require('../service/handelResponse.js')
const generateSendJWT = require('../service/generateSendJWT.js')
const appError = require('../service/appError.js')
const validator = require('validator')
const bcrypt = require('bcryptjs')

exports.checkUser = async (req, res, next) => {
  res.status(200).send({
    status: 'success',
    message: '登入狀態正常'
  })
}

exports.userSign_up = async (req, res, next) => {
  let { account, password, confirmPassword } = req.body
  if (!account || !password || !confirmPassword) {
    return next(appError('400', '欄位未填寫正確', next))
  }
  const checkAccount = await User.findOne({ account })
  if (checkAccount) {
    return next(appError('400', '此帳號已註冊', next))
  }
  if (password !== confirmPassword) {
    return next(appError('400', '密碼不一致', next))
  }
  if (!validator.isLength(password, { min: 6 })) {
    return next(appError('400', '密碼不能少於 6 碼', next))
  }
  password = await bcrypt.hash(password, 12)
  const newUser = await User.create({
    account,
    password
  })
  generateSendJWT(newUser, 201, res)
}

exports.userSign_in = async (req, res, next) => {
  const { account, password } = req.body
  if (!account || !password) {
    return next(appError('400', '帳號密碼不能為空', next))
  }
  const user = await User.findOne({ account }).select('+password')
  if (!user) {
    return next(appError('400', '帳號或密碼錯誤', next))
  }
  const auth = await bcrypt.compare(password, user.password)
  if (!auth) {
    return next(appError('400', '帳號或密碼錯誤', next))
  }
  generateSendJWT(user, 201, res)
}

exports.updatePassword = async (req, res, next) => {
  let { password, confirmPassword } = req.body
  if (password !== confirmPassword) {
    return next(appError('400', '密碼不一致', next))
  }
  if (!validator.isLength(password, { min: 6 })) {
    return next(appError('400', '密碼不能少於 6 碼', next))
  }
  const { id } = req.params
  const newPassword = await bcrypt.hash(password, 12)
  const editPassword = await User.findByIdAndUpdate(id, {
    password: newPassword
  })
  generateSendJWT(editPassword, 201, res)
  // 使用 generateSendJWT 將加密過的密碼混入環境變數，並回傳新的 token
}

