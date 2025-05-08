const repo = require('../repository/app_repo')
const express = require('express')
const { Movie } = require('../models/app_models')

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

function getMovies(req, res) {
    console.log('getting movies')
    repo.findMovies().then(results => {
        res.status(200).json(results)
    })
    .catch(() => {
        res.status(500).json({ message: "internal server error" })
    })
}

function getMovie(req, res) {
    const id = req.params.id
    console.log(`id as of url params: ${id}`)
    repo.findMovie(id)
    .then(results => {
        res.status(200).json(results)
    })
    .catch(() => {
        res.status(500).json({ message: "internal server error" })
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

function getRates(req, res) {
    var id = req.body.id
    repo.findRatings(id)
    .then((results) => {
        res.status(200).json(results)
    })
    .catch(() => {
        res.status(500).json({ message: "internal server error" })
    })
}

function addRate(req, res) {
    var newData = req.body
    repo.addRating(newData)
    .then(results => {
        res.status(201).json(results)
    })
    .catch(() => {
        res.status(500).json({ message: "internal server error" })
    })
}

function delRate(req, res) {
    var id = req.body.id
    repo.deleteRating(id)
    .then(() => {
        res.status(200).json({ message: `removed rating ${id}` })
    })
    .catch(() => {
        res.status(500).json({ message: "internal server error" })
    })
}

async function autocomplete(req, res) {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ error: 'Missing search query' });
        }
        const results = await Movie.aggregate([
            {
                $search: {
                    index: 'titles',
                    autocomplete: {
                        query: query,
                        path: 'title',
                        fuzzy: {
                            maxEdits: 1,
                            prefixLength: 0,
                            maxExpansions: 50
                        }
                    }
                }
            },
            {
                $limit: 5
            }
        ]);
        res.json(results);
    } catch (error) {
        console.error('Error during autocomplete search:', error);
        res.status(500).json({ error: 'Server error' });
    }
};


module.exports = { getMovies, getMovie, addMovie, delMovie, getRates, addRate, delRate, autocomplete }