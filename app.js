//載入相關套件、資料
const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

const app = express()
const port = 3000

//設定模板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
    const restaurants = restaurantList.results
    res.render('index', {restaurants})
})

app.get('/restaurants/:id', (req, res) => {
    const restaurant = restaurantList.results.find(item => String(item.id) === req.params.id)
    res.render('show', {restaurant})
})

app.get('/search', (req, res) => {
    const keyword = req.query.keyword
    const n1 = restaurantList.results.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()))
    const n2 = restaurantList.results.filter(item =>item.category.toLowerCase().includes(keyword.toLowerCase()))
    const restaurants = n1.concat(n2)
    res.render('index', {restaurants, keyword})
})

app.listen(port, ()=>{
    console.log(`localhost:${port}`)
})