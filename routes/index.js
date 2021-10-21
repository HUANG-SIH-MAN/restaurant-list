const experss = require('express')
const router = experss.Router()

const home = require('./modules/home')
const restaurant = require('./modules/restaurant')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')

router.use('/users', users)
//經過登入驗證後，才能查看餐廳清單
router.use('/restaurant', authenticator, restaurant)
router.use('/', authenticator, home)

module.exports = router