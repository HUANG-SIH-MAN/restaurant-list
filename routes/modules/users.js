const experss = require('express')
const router = experss.Router()
const User = require('../../models/user')

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    User.findOne({ email })
    .then(user => {
        if (user) {
            console.log('使用者已經註冊過了')
            res.render('register', { name, email, password, confirmPassword })
        } else {
            User.create({ name, email, password })
            .then(() => res.redirect('/'))
            .catch(error => console.log(error))
        }
    })
})

router.get('/login', (req, res) => {
    res.render('login')
})


module.exports = router