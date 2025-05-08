const { Movie, Rating } = require('../models/app_models')
const mongoose = require('mongoose')


async function findMovies() {
    try {
        const movies = await Movie.find()
        return movies
    } catch (error) {
        console.error(`Error getting movies: ${error}`)
        return error
    }
}

async function findMovie(id) {
    if (!id) {
        return { message: "no id provided" }
    }
    try {
        const movies = await Movie.findById(id)
        return movies
    } catch (error) {
        console.error(`Error getting movie: ${error}`)
        return error
    }
}

async function addMovie(newMovie) {
    if (!newMovie) {
        return { message: "no movie or malformed request" }
    }

    try {
        var movies = new Movie(newMovie)
        const savedMovie = await movies.save()
        return savedMovie
    } catch (error) {
        console.error(`Error adding movie: ${error}`)
        return error
    }
}

async function delMovie(id) {
    if (!id) {
        return { message: "no id provided" }
    }

    try {
        const success = await Movie.deleteOne(id)
        return success
    } catch (error) {
        console.error(`Error deleting movie: ${error}`)
        return error
    }
}

async function findRatings(data) {
    var movie = mongoose.Types.ObjectId.createFromHexString(data)
    try {
        const results = await Rating.find(movie)
        return results
    } catch (error) {
        return error
    }
}

async function addRating(rate) {
    var newRating = new Rating(rate)
    try {
        const results = await newRating.save()
        return results
    } catch (error) {
        console.log(error)
    }
}

async function deleteRating(id) {
    try {
        await Rating.findByIdAndDelete(id)
        return 0
    } catch (error) {
        return error
    }
}

module.exports = { findMovies, findMovie, addMovie, delMovie, findRatings, addRating, deleteRating }