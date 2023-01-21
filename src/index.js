const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8000

app.get('/', (req, res) => {
    res.send('Welcome to my API')
})

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB Atlas')
})
.catch((error) => {
    console.error(error)
})

app.listen(port, () =>{
    console.log('Server listening at port', port)
})