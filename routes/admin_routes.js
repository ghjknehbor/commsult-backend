const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({dest: 'assets/'})

router.post('/upload', upload.single('image'), (req, res) => {
    res.json({ filename: req.file.filename })
})

module.exports = router