const experss = require('express')
const router = experss.Router()
const restaurant = require('../../models/restaurant')

//首頁
router.get('/', (req, res) => {
    const userId = req.user._id
    restaurant.find({ userId })
    .lean()
    .sort({name: 'asc'})
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

//顯現搜尋結果
router.post('/search', (req, res) => {
    const keyword = req.body.keyword
    const userId = req.user._id
    restaurant.find({ userId, $or:[
        { name: {$regex : keyword, $options:'i'} },
        { category: {$regex : keyword, $options:'i'} },
        { location: {$regex : keyword, $options:'i'} }
        ]})
    .lean()
    .then(restaurants => {
        return res.render('index', {restaurants, keyword})
    })
    .catch(error => console.log(error))
})

//顯現排序結果
router.put('/sort', (req,res) =>{
    const {sort, rating} = req.body
    const userId = req.user._id
    const sortData = {
        nameA: {name: 'asc'},
        nameZ: {name: 'desc'},
        category: {category: 'asc'},
        location: {location: 'asc'}
    }
    restaurant.find({ userId, rating: {$gte: rating}})
    .lean()
    .sort(sortData[sort])
    .then(restaurants => res.render('index', { restaurants, sort, rating }))
})

module.exports = router