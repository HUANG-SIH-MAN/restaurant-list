//載入相關套件、資料
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override') 
const routes = require('./routes')

//設定連線路由
const app = express()
const port = 3000

// express 相關設定
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    helpers:{
        equal: function (a, b) {
            if (a === b) return 'selected'
        }
    }
    }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//資料庫連線設定
require('./config/mongoose')

//網站路由設定
app.use(routes)

app.listen(port, ()=>{
    console.log(`localhost:${port}`)
})