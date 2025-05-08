const { Movie, Rating } = require('../models/app_models')
const mongoose = require('mongoose')


function findMovies() {
    var movies = Movie.find()
    if (!movies) {
        return { message: "no movies" }
    } else {
        return movies
    }
}

function findMovie(id) {
    if (!id) {
        return { message: "no id provided" }
    }
    var movies = Movie.findById(id)
    if (!movies) {
        return { message: "no movies" }
    } else {
        return movies
    }
}

function addMovie(newMovie) {
    if (!newMovie) {
        return { message: "no movie or malformed request" }
    }
    var movies = new Movie(newMovie)
    movies.save().then(savedMovie => {
        return savedMovie
    }).catch(error => {
        return { message: error }
    })
}

function delMovie(id) {
    if (!id) {
        return { message: "no id provided" }
    }
    Movie.deleteOne(id)
    .then(() => {
        return 0
    })
    .catch((error) => {
        return error
    })
}

function findRatings(data) {
    var movie = mongoose.Types.ObjectId.createFromHexString(data)
    Rating.find(movie)
    .then(ratings => {
        return ratings
    })
    .catch(error => {
        return error
    })
}

function createRating(rate) {
    var newRating = new Rating(rate)
    newRating.save().then(saved => {
        return saved
    }).catch(error => {
        return error
    })
}

function deleteRating(id) {
    Rating.findByIdAndDelete(id)
    .then(() => {
        return 0
    })
    .catch((error) => {
        return error
    })
}