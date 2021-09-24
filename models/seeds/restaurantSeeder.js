const restaurant = require('../restaurant') // 載入餐廳 model
const restaurantData = require('./restaurantData') // 載入餐廳 model

//設定資料庫連線
const db = require('../../config/mongoose')

db.once('open', ()=>{
    console.log('mongodb connected!')
    restaurant.insertMany(restaurantData.results)
    console.log('create seed data!')
})


