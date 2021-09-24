//載入相關套件、資料
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override') 
const routes = require('./routes')

//設定連線路由
const app = express()
const port = 3000

// express 相關設定
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//資料庫連線設定
mongoose.connect('mongodb://localhost/restaurant-list') //連線到目標資料庫
const db = mongoose.connection  //取得連線資料
db.on('error', ()=>{    //確認連線狀態
    console.log('mongodb error !')
})
db.once('open', ()=>{
    console.log('mongodb connented !')
})
const restaurant = require('./models/restaurant') //取出餐廳 model

//網站路由設定
app.use(routes)

app.listen(port, ()=>{
    console.log(`localhost:${port}`)
})