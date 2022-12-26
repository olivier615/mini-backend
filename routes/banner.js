var express = require('express');
var router = express.Router();
const handleErrorAsync = require('../service/handleErrorAsync.js')
const bannerController = require('../controller/bannerController.js')
const isAuth = require('../service/isAuth.js')

router.get('/', handleErrorAsync(bannerController.getBannerList))
router.post('/', isAuth, handleErrorAsync(bannerController.addNewBanner))
router.delete('/:id', isAuth, handleErrorAsync(bannerController.deleteBanner))
router.patch('/:id', isAuth, handleErrorAsync(bannerController.updateBanner))

module.exports = router;
