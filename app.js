//載入相關套件、資料
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override') 
const session = require('express-session')
const routes = require('./routes')
const usePassport = require('./config/passport')
const flash = require('connect-flash')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

//設定連線路由
const app = express()
const port = process.env.PORT

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

//登入功能設定
app.use(session({
    secret: process.env.SESSION_SECRET,
    name: 'user',
    resave: false,
    saveUninitialized: true
}))
usePassport(app)

//儲存中間訊息
app.use(flash())
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    res.locals.success_msg = req.flash('success_msg')  
    res.locals.warning_msg = req.flash('warning_msg')  
    next()
})

//資料庫連線設定
require('./config/mongoose')

//網站路由設定
app.use(routes)

app.listen(port, ()=>{
    console.log(`localhost:${port}`)
})