const mongoose = require('mongoose')
const schema = mongoose.Schema
const userSchema = new schema({
    name: {
        type: String,
        require: false
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('user', userSchema)