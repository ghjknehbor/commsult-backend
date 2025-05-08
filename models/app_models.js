const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title: String,
    director: String,
    date:{ type: Date, default: Date.now },
    rating: Number,
    thumb: String
})

const ratingSchema = new mongoose.Schema({
    movie_id: mongoose.SchemaTypes.ObjectId,
    name: String,
    rating: Number
})

const Movie = mongoose.model('Movie', movieSchema)
const Rating = mongoose.model('Rating', ratingSchema)

module.exports = { Movie, Rating }