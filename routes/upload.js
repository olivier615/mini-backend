const express = require('express')
const router = express.Router()
const appError = require("../service/appError")
const handleErrorAsync = require("../service/handleErrorAsync")
const upload = require('../service/image.js')
const uploadController = require('../controller/uploadController.js')
const checkDimensions = require('../service/checkDimensions.js')
const isAuth = require('../service/isAuth.js')

router.post('/', isAuth, upload, checkDimensions, handleErrorAsync(uploadController.uploadPhoto))

module.exports = router