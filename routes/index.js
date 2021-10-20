const experss = require('express')
const router = experss.Router()

const home = require('./modules/home')
router.use('/', home)

const restaurant = require('./modules/restaurant')
router.use('/restaurant', restaurant)

const users = require('./modules/users')
router.use('/users', users)

module.exports = router