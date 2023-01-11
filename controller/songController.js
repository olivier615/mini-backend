const appError = require('../service/appError.js')
const Song = require('../models/songModel.js')
const handelSuccess = require('../service/handelResponse.js')

exports.getSongList = async (req, res ,next) => {
  const songList = await Song.find()
  handelSuccess(res, songList)
}

exports.addNewSong = async (req, res ,next) => {
  const { name, singer, order } = req.body
  if (name.trim() === '' || singer.trim() === '' || order === undefined) {
    return next(appError(400, '項目未填寫完整', next))
  }
  const newSong = await Song.create({
    name,
    singer,
    order
  })
  handelSuccess(res, newSong)
}

exports.deleteSong = async (req, res, next) => {
  const { id } = req.params
  await Song.findByIdAndRemove(id)
  handelSuccess(res)
}

exports.updateSong = async (req, res, next) => {
  const { id } = req.params
  const { name, singer, order, play } = req.body
  if (name.trim() === '' || singer.trim() === '' || order === undefined || play === undefined) {
    return next(appError(400, '項目未填寫完整', next))
  }
  const newData =  await Song.findByIdAndUpdate(id, {
    name, singer, order, play
  }, { new: true })
  handelSuccess(res, newData)
}
