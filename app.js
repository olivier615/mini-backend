const createError = require('http-errors')
var express = require('express');
var http = require("http");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

var bannerRouter = require('./routes/banner');
var infoRouter = require('./routes/info');
var uploadRouter = require('./routes/upload');
var h5LinkRouter = require('./routes/h5Link');
var wcLinkRouter = require('./routes/wcLink');
var onLinkRouter = require('./routes/onLink');
var serviceRouter = require('./routes/service');
var userRouter = require('./routes/user');
var timestampRouter = require('./routes/timestamp');
var countingRouter = require('./routes/counting');
var luckyDrawRouter = require('./routes/luckyDraw');
var songRouter = require('./routes/song');

const appError = require('./service/appError.js')

process.on('uncaughtException', err => {
  // 記錄錯誤下來，等到服務都處理完後，停掉該 process
	console.error('Uncaughted Exception!')
	console.error(err);
	process.exit(1);
});

require('./connection/connection.js')
const cors = require('cors')
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/banner', bannerRouter);
app.use('/upload', uploadRouter);
app.use('/info', infoRouter);
app.use('/h5Link', h5LinkRouter);
app.use('/wcLink', wcLinkRouter);
app.use('/onLink', onLinkRouter);
app.use('/service', serviceRouter);
app.use('/user', userRouter);
app.use('/timestamp', timestampRouter);
app.use('/counting', countingRouter);
app.use('/luckyDraw', luckyDrawRouter);
app.use('/song', songRouter);

app.use(function(req,res,next){
  res.status(404).send({
      status:"false",
      message:"您的路由不存在"
  })
})

// 正式環境錯誤處理
const resErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).send({
      message: err.message
    })
  } else {
    console.error('出現重大錯誤', err)
    res.status(500).send({
      status: 'error',
      message: '系統錯誤，請洽系統管理員'
    })
  }
}

// 開發環境錯誤處理
const resErrorDev = (err, res) => {
  res.status(err.statusCode).send({
    message: err.message,
    error: err,
    stack: err.stack
  })
}

// 錯誤處理
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  // 開發環境
  if (process.env.NODE_ENV === 'dev') {
    return resErrorDev(err, res)
  }
  // 正式環境
  if (err.name === 'SyntaxError') {
    err.message = '資料格式未填寫正確'
    err.isOperational = true
    return resErrorProd(err, res)
  }
  if (err.name === 'ValidationError') {
    err.message = '資料欄位未填寫正確'
    err.isOperational = true
    return resErrorProd(err, res)
  }
  if (err.name === 'MulterError' && err.message === 'File too large') {
    err.message = '圖片檔案限 2mb 以下'
    err.isOperational = true
    return resErrorProd(err, res)
  }
  resErrorProd(err, res)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('未捕捉到的 rejection: ', promise, '原因: ', reason);
  // 記錄於 log 上
});

module.exports = app;
