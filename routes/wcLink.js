var express = require('express');
var router = express.Router();
const handleErrorAsync = require('../service/handleErrorAsync.js')
const wcLinkController = require('../controller/wcLinkController.js')
const isAuth = require('../service/isAuth.js')

router.get('/', handleErrorAsync(wcLinkController.getWcLinkList))
router.post('/', isAuth, handleErrorAsync(wcLinkController.addNewWcLink))
router.delete('/:id', isAuth, handleErrorAsync(wcLinkController.deleteWcLink))
router.patch('/:id', isAuth, handleErrorAsync(wcLinkController.updateWcLink))

module.exports = router;
