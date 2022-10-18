const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    Name: String,
    premiered: Number,
    Genres: [String],
    Img: String
})


module.exports = mongoose.model('movies', movieSchema)