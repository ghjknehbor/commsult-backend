const repo = require('../repository/app_repo')
const express = require('express')

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
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