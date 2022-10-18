const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    FullName: String,
    UserName: String,
    Password: String
})

module.exports = mongoose.model('users', usersSchema)