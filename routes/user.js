var express = require('express');
var router = express.Router();
const usersController = require('../controller/userController.js')
const handleErrorAsync = require('../service/handleErrorAsync.js')
const isAuth = require('../service/isAuth.js')

router.get('/', isAuth, handleErrorAsync(usersController.checkUser))

router.post('/sign_up', handleErrorAsync(usersController.userSign_up))
router.post('/sign_in', handleErrorAsync(usersController.userSign_in))
router.patch('/updatePassword/:id', isAuth, handleErrorAsync(usersController.updatePassword))

module.exports = router