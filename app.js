//載入相關套件、資料
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

const app = express()
const port = 3000

//設定模板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

//資料庫連線設定
mongoose.connect('mongodb://localhost/restaurant-list') //連線到目標資料庫
const db = mongoose.connection  //取得連線資料
//確認連線狀態
db.on('error', ()=>{
    console.log('mongodb error !')
})
db.once('open', ()=>{
    console.log('mongodb connented !')
})
//取出餐廳 model
const restaurant = require('./models/restaurant') 

//網站路由設定
//首頁
app.get('/', (req, res) => {
    restaurant.find()
    .lean()
    .then(restaurants => res.render('index', {restaurants}))
    .catch(error => console.log(error))
})
//個別餐廳詳細資訊
app.get('/restaurants/:id/detail', (req, res) => {
    const id = req.params.id
    restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', {restaurant}))
    .catch(error => console.log(error))
})

// app.get('/search', (req, res) => {
//     const keyword = req.query.keyword
//     const n1 = restaurantList.results.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()))
//     const n2 = restaurantList.results.filter(item =>item.category.toLowerCase().includes(keyword.toLowerCase()))
//     const restaurants = n1.concat(n2)
//     res.render('index', {restaurants, keyword})
// })

app.listen(port, ()=>{
    console.log(`localhost:${port}`)
})