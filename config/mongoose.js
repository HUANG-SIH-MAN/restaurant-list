const mongoose = require('mongoose')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

//資料庫連線設定
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI) 
const db = mongoose.connection  
db.on('error', ()=>{    
    console.log('mongodb error !')
})
db.once('open', ()=>{
    console.log('mongodb connented !')
})

module.exports = db