var express = require('express');
var router = express.Router();
const handleErrorAsync = require('../service/handleErrorAsync.js')
const onLinkController = require('../controller/onLinkController.js')
const isAuth = require('../service/isAuth.js')

router.get('/', handleErrorAsync(onLinkController.getOnLinkList))
router.post('/', isAuth, handleErrorAsync(onLinkController.addNewOnLink))
router.delete('/:id', isAuth, handleErrorAsync(onLinkController.deleteOnLink))
router.patch('/:id', isAuth, handleErrorAsync(onLinkController.updateOnLink))

module.exports = router;
