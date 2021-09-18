const mongoose = require('mongoose')
const restaurant = require('../restaurant') // 載入餐廳 model
const restaurantData = require('./restaurantData') // 載入餐廳 model

//設定資料庫連線
mongoose.connect('mongodb://localhost/restaurant-list') 
const db = mongoose.connection
db.on('error', ()=>{
    console.log('mongodb error!')
})
db.once('open', ()=>{
    console.log('mongodb connected!')
    const restaurants = restaurantData.results
    restaurants.forEach(item => {
        restaurant.create({
            "name": item.name,
            "name_en": item.name_en,
            "category": item.category,
            "image": item.image,
            "location": item.location,
            "phone": item.phone,
            "google_map": item.google_map,
            "rating": item.rating,
            "description": item.description
        })
    });
})


