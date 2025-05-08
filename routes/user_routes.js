const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/app_ctrl')

router.get('/movies', ctrl.getMovies)
router.get('/movie/:id', ctrl.getMovie)
router.get('/autocomplete', ctrl.autocomplete)

module.exports = router