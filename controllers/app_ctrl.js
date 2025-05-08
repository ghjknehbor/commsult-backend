const repo = require('../repository/app_repo')
const express = require('express')

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

function getMovies(req, res) {
    repo.findMovies()
    .then(movies => {
        res.status(200).json(movies)
    })
    .catch(error => {
        res.status(500).json(error)
    })
}

function getMovie(req, res) {
    id = req.body.id
    repo.findMovie(id)
    .then(result => {
        return result
    })
    .catch(error => {
        return error
    })
}

function addMovie(req, res) {
    var newData = req.body
    repo.addMovie(newData)
    .then(result => {
        res.status(201).json(result)
    }).catch(() => {
        res.status(500).json({ message: "internal server error" })
    })
}

function delMovie(req, res) {
    var id = req.body.id
    repo.delMovie(id)
    .then(() => {
        res.status(201).json({ message: `removed movie ${id}` })
    }).catch(() => {
        res.status(500).json({ message: "internal server error" })
    })
}