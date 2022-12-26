var express = require('express');
var router = express.Router();
const handleErrorAsync = require('../service/handleErrorAsync.js')
const infoController = require('../controller/infoController.js')
const isAuth = require('../service/isAuth.js')

router.get('/', handleErrorAsync(infoController.getInfoList))
router.post('/', isAuth, handleErrorAsync(infoController.addNewInfo))
router.delete('/:id', isAuth, handleErrorAsync(infoController.deleteInfo))
router.patch('/:id', isAuth, handleErrorAsync(infoController.updateInfo))

module.exports = router;
