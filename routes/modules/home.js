const experss = require('express')
const router = experss.Router()
const restaurant = require('../../models/restaurant')

//首頁
router.get('/', (req, res) => {
    restaurant.find()
    .lean()
    .then(restaurants => res.render('index', {restaurants}))
    .catch(error => console.log(error))
})

//顯現搜尋結果
router.post('/search', (req, res) => {
    const keyword = req.body.keyword
    restaurant.find({ $or:[
        { name: {$regex : keyword, $options:'i'} },
        { category: {$regex : keyword, $options:'i'} },
        ]})
    .lean()
    .then(restaurants => res.render('index', {restaurants, keyword}))
    .catch(error => console.log(error))
})

module.exports = router