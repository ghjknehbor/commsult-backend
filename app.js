const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

async function startserver() {

    const app = express()

    app.use(express.json)
    app.use(
        express.urlencoded({
            extended: true
        })
    )

    var testroutes = require('./user_routes')

    app.use('/user', testroutes)

    try {
        await mongoose.connect(process.env.MONGO_ENV, {
        });
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB Connection Error:', err);
        process.exit(1);
    }

    app.listen(3000, () => {
        console.log('Server started on port 3000')
    })

}

startserver().catch(err => {
    console.error(`Failed to start server: ${err}`)
})