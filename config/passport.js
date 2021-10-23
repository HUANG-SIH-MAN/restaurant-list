const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const facebookStrategy = require('passport-facebook')
const GoogleStrategy = require('passport-google-oauth20').Strategy

module.exports = app => {
    // 初始化 Passport 模組
    app.use(passport.initialize())
    app.use(passport.session())
    
    //設定本地登入策略
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        User.findOne({ email })
        .then(user => {
            if (!user) {
                return done(null, false, { message: 'That email is not registered!' })
            }
            return bcrypt.compare(password, user.password)
            .then(isMath => {
                if (!isMath) return done(null, false, { message: 'Email or Password incorrect.' })
                return done(null, user)
            })
        })
        .catch(err => done(err, false))
    }))

    //設定Facebook登入策略
    passport.use(new facebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ['email', 'displayName']  //從FB取得資料
    }, (accessToken, refreshToken, profile, done) => {
        const { name, email } = profile._json
        User.findOne({ email })
        .then(user => {
            if (user) return done(null, user)
            const randomPassword = Math.random().toString(36).slice(-8)
            bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(randomPassword, salt))
            .then(hash => {
                User.create({
                    name,
                    email,
                    password: hash
                })
                .then(()=> done(null, user))
                .catch(err => done(err, false))
            })

        })
        .catch(err => done(err, false))
    }))

    //設定Google登入策略
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK
      },(accessToken, refreshToken, profile, cb) => {
          //未設定無法使用，卡在google驗證
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });
      }
    ))

    // 設定序列化與反序列化
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        User.findById(id)
          .lean()
          .then(user => done(null, user))
          .catch(err => done(err, null))
    })
}




