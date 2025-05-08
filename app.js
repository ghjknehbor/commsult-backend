const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const app = express()

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