const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const sessionRouter = require('./routes/session')
const orderRouter = require('./routes/order')
const userRouter = require('./routes/user')
const productRouter = require('./routes/product')

//setup
const app = express()
const port = process.env.PORT || 8000
mongoose.set('strictQuery', true)

//middleware
app.use(express.json())
app.use('/api', userRouter)
app.use('/api', orderRouter)
app.use('/api', sessionRouter)
app.use('/api', productRouter)

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