var express = require('express');
var router = express.Router();
const handleErrorAsync = require('../service/handleErrorAsync.js')
const luckyDrawController = require('../controller/luckyDrawController.js')
const isAuth = require('../service/isAuth.js')

router.get('/', handleErrorAsync(luckyDrawController.getDrawList))
router.post('/', handleErrorAsync(luckyDrawController.addNewDraw))
router.delete('/:id', handleErrorAsync(luckyDrawController.deleteDraw))
router.patch('/:id', handleErrorAsync(luckyDrawController.updateDraw))

module.exports = router;
