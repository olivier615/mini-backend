var express = require('express');
var router = express.Router();
const handleErrorAsync = require('../service/handleErrorAsync.js')
const countingController = require('../controller/countingController.js')

router.get('/', handleErrorAsync(countingController.getJackpot))
router.post('/', handleErrorAsync(countingController.addJackpot))
router.delete('/:id', handleErrorAsync(countingController.deleteJackpot))
router.patch('/:id', handleErrorAsync(countingController.updateJackpot))

module.exports = router;
