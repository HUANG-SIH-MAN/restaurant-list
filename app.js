//載入相關套件、資料
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
//const multer = require('multer')

//設定連線路由
const app = express()
const port = 3000

//設定模板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

//設定上傳檔案物件
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'public')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now())
//     }
// })
// var upload = multer({storage: storage})

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
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//刪除餐廳資料
app.get('/restaurants/:id/delete', (req, res) => {
    const id = req.params.id
    restaurant.findByIdAndRemove(id)
    .then(()=> res.redirect('/'))
    .catch(error => console.log(error))
})

//編輯餐廳資料
app.get('/restaurants/:id/edit', (req, res) => {
    const id = req.params.id
    restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

//接收編輯後的餐廳資料
app.post('/restaurants/:id/edit', (req, res) => {
    const id = req.params.id
    restaurant.findByIdAndUpdate(id, { $set: req.body })
    .then(()=> res.redirect(`/restaurants/${id}/detail`))
    .catch(error => console.log(error))
})

//新增餐廳資料    
app.get('/createRestaurant', (req, res) => {
    res.render('create')
})

//接收新增的餐廳資料
app.post('/createRestaurant', (req, res) => {
    restaurant.create(req.body)
    .then(()=> res.redirect('/'))
    .catch(error => console.log(error))
})

app.post('/search', (req, res) => {
    const keyword = req.body.keyword
    // restaurant.find({ name:  })
    // .lean()
    // .then(restaurants => res.render('index', {restaurants, keyword}))
    // .then(restaurants => console.log(restaurants))
    // .catch(error => console.log(error))
})

app.listen(port, ()=>{
    console.log(`localhost:${port}`)
})