const experss = require('express')
const router = experss.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    if (password !== confirmPassword) {
        return res.render('register', { error: '密碼與確認密碼不符!!', name, email, password, confirmPassword })
    }
    User.findOne({ email })
    .then(user => {
        if (user) {
            return res.render('register', { error: '使用者已經註冊過了',name, email, password, confirmPassword })
        } 
        return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => {
            User.create({ name, email, password: hash })
            .then(() => res.redirect('/'))
            .catch(error => console.log(error))       
        })

    })
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
}))

router.get('/logout', (req, res) => {
    req.logOut()
    req.flash('success_msg', '你已經成功登出。')
    res.redirect('/users/login')
})

module.exports = router