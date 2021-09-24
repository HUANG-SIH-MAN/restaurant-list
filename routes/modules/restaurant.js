const express = require('express')
const router = express.Router()
const restaurant = require('../../models/restaurant')

//個別餐廳詳細資訊
router.get('/:id/detail', (req, res) => {
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
router.put('/:id/edit', (req, res) => {
    const id = req.params.id
    restaurant.findByIdAndUpdate(id, { $set: req.body })
    .then(()=> res.redirect(`/restaurant/${id}/detail`))
    .catch(error => console.log(error))
})

//新增餐廳資料    
router.get('/create', (req, res) => {
    res.render('create')
})

//接收新增的餐廳資料
router.post('/create', (req, res) => {
    restaurant.create(req.body)
    .then(()=> res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router