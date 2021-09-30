const mongoose = require('mongoose')

//資料庫連線設定
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/restaurant-list'
mongoose.connect(MONGODB_URI) 
const db = mongoose.connection  
db.on('error', ()=>{    
    console.log('mongodb error !')
})
db.once('open', ()=>{
    console.log('mongodb connented !')
})

module.exports = db