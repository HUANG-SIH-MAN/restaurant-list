const mongoose = require('mongoose')

//資料庫連線設定
mongoose.connect('mongodb://localhost/restaurant-list') 
const db = mongoose.connection  
db.on('error', ()=>{    
    console.log('mongodb error !')
})
db.once('open', ()=>{
    console.log('mongodb connented !')
})

module.exports = db