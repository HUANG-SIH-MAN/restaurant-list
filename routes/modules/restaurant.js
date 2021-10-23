const express = require('express')
const router = express.Router()
const restaurant = require('../../models/restaurant')
const multer = require('multer')
const fs = require('fs')
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = 'd99dd1de304981e'

//上傳檔案設定
const upload = multer({ dest: 'temp/' })

//個別餐廳詳細資訊
router.get('/:id', (req, res) => {
    const id = req.params.id
    restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//刪除餐廳資料
router.delete('/:id', (req, res) => {
    const id = req.params.id
    restaurant.findByIdAndRemove(id)
    .then(()=> res.redirect('/'))
    .catch(error => console.log(error))
})

//編輯餐廳資料
router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

//接收編輯後的餐廳資料
router.put('/:id', (req, res) => {
    const id = req.params.id
    restaurant.findByIdAndUpdate(id, { $set: req.body })
    .then(()=> res.redirect(`/restaurant/${id}`))
    .catch(error => console.log(error))
})

//新增餐廳資料    
router.get('/create', (req, res) => {
    res.render('create')
})

//接收新增的餐廳資料
router.post('/create', upload.single('image'), (req, res) => {
    const { file } = req
    const {name, name_en, category, location, phone, google_map, rating, description} = req.body
    const userId = req.user._id
    fs.readFile(file.path, (err, data) => {
        if (err) console.log('Error: ', err)
        imgur.setClientID(IMGUR_CLIENT_ID);
        imgur.upload(file.path, (err, img) => {
              return restaurant.create({
                name,
                name_en,
                category,
                image: img.data.link,
                location,
                phone,
                google_map,
                rating,
                description,
                userId
            })
            .then(()=> res.redirect('/'))
            .catch(error => console.log(error))
        })
    })
})

module.exports = router