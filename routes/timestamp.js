var express = require('express');
var router = express.Router();
const handleErrorAsync = require('../service/handleErrorAsync.js')
const timestampController = require('../controller/timestampController.js')
const isAuth = require('../service/isAuth.js')

router.get('/', handleErrorAsync(timestampController.getTimestamp))
router.post('/', isAuth, handleErrorAsync(timestampController.addTimestamp))
router.delete('/:id', isAuth, handleErrorAsync(timestampController.deleteTimestamp))
router.patch('/:id', isAuth, handleErrorAsync(timestampController.updateTimestamp))

module.exports = router;
