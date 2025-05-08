import * as mongoose from 'mongoose'
const { Schema } = mongoose

const movieSchema = new Schema({
    title: String,
    director: String,
    date:{ type: Date, default: Date.now },
    rating: Number
})

const ratingSchema = new Schema({
    movie_id: mongoose.SchemaTypes.ObjectId,
    name: String,
    rating: Number
})

export { movieSchema, ratingSchema }