var express = require('express');
var router = express.Router();
const handleErrorAsync = require('../service/handleErrorAsync.js')
const songController = require('../controller/songController.js')

router.get('/', handleErrorAsync(songController.getSongList))
router.post('/', handleErrorAsync(songController.addNewSong))
router.delete('/:id', handleErrorAsync(songController.deleteSong))
router.patch('/:id', handleErrorAsync(songController.updateSong))

module.exports = router;
