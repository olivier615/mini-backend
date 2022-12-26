const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({path:'./config.env'})

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

// DB 在開發初期可用本機 port
// mongodb://localhost:27017/hc-index
// hotel = database

mongoose.connect(DB)
.then(() => console.log("連線資料成功132"));