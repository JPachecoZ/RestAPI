const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const userRoutes = require('./routes/user')

//setup
const app = express()
const port = process.env.PORT || 8000
mongoose.set('strictQuery', true)

//middleware
app.use(express.json())
app.use('/api', userRoutes)

app.get('/', (req, res) => {
    res.send('Welcome to my API')
})

mongoose.connect(process.env.MONGODB_URI, {dbName: 'MyApp'})
.then(() => {
    console.log('Connected to MongoDB Atlas')
})
.catch((error) => {
    console.error(error)
})

app.listen(port, () =>{
    console.log('Server listening at port', port)
})