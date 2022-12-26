var express = require('express');
var router = express.Router();
const handleErrorAsync = require('../service/handleErrorAsync.js')
const h5LinkController = require('../controller/h5LinkController.js')
const isAuth = require('../service/isAuth.js')

router.get('/', handleErrorAsync(h5LinkController.getH5LinkList))
router.post('/', isAuth, handleErrorAsync(h5LinkController.addNewH5Link))
router.delete('/:id', isAuth, handleErrorAsync(h5LinkController.deleteH5Link))
router.patch('/:id', isAuth, handleErrorAsync(h5LinkController.updateH5Link))

module.exports = router;
