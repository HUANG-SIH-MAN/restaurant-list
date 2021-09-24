const experss = require('express')
const router = experss.Router()

const home = require('./modules/home')
router.use('/', home)

const restaurant = require('./modules/restaurant')
router.use('/restaurant', restaurant)

module.exports = router