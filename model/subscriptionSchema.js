const mongoose = require('mongoose')



const subscriptionSchema = new mongoose.Schema({
    MemberID: String,
    MovieID: String,
    Date: Date
})


module.exports = mongoose.model('subscriptions', subscriptionSchema)