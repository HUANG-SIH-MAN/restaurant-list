//載入套件
const bcrypt = require('bcryptjs')

// 載入 model
const Restaurant = require('../restaurant') 
const User = require('../user')

// 載入json資料
const restaurantData = require('./restaurantData').results
const userData = require('./userData').results

//設定資料庫連線
const db = require('../../config/mongoose')

db.once('open', ()=>{
    Promise.all(
        Array.from(userData, user => {
        return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(user.password, salt))
        .then(hash => User.create({
            name: user.name,
            email: user.email,
            password: hash
        }))
        .then(seedUser => {
            const userId = seedUser._id
            const restaurantList = []
            Array.from(user.restaurant_index, index => {
                restaurantData[index].userId = userId
                restaurantList.push(restaurantData[index])
            })
            return Restaurant.create(restaurantList)
        })
    }))
    .then(()=>{
        console.log('create seed data!')
        process.exit()
    })
    .catch(err => console.log(err))
})



