//透過 schema 定義資料的格式
const mongoose = require('mongoose')
const schema = mongoose.Schema
const restaurantSchema = new schema({
    "name": {
        type: String,    
        required: true
    },
    "name_en":{
        type: String,    
        required: true
    },
    "category":{
        type: String,    
        required: true
    },
    "image":{
        type: String,    
        required: true
    },
    "location":{
        type: String,    
        required: true
    },
    "phone":{
        type: String,    
        required: true
    },
    "google_map":{
        type: String,    
        required: true
    },
    "rating":{
        type: Number,    
        required: true
    },
    "description":{
        type: String,    
        required: true
    }
})

//透過 module.exports 把這個 schema 輸出
module.exports = mongoose.model('restaurant', restaurantSchema)
