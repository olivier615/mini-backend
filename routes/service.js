var express = require('express');
var router = express.Router();
const handleErrorAsync = require('../service/handleErrorAsync.js')
const serviceController = require('../controller/serviceController.js')
const isAuth = require('../service/isAuth.js')

router.get('/', handleErrorAsync(serviceController.getServiceList))
router.post('/', isAuth, handleErrorAsync(serviceController.addNewService))
router.delete('/:id', isAuth, handleErrorAsync(serviceController.deleteService))
router.patch('/:id', isAuth, handleErrorAsync(serviceController.updateService))

module.exports = router;
