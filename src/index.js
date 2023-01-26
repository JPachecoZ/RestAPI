const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const validateToken = require('./middlewares/validateToken')
const sessionRouter = require('./routes/session')
const orderRouter = require('./routes/order')
const userRouter = require('./routes/user')
const productRouter = require('./routes/product')

//setup
const app = express()
const port = process.env.PORT || 8000
mongoose.set('strictQuery', true)

//middleware
app.use(cors())
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
app.use('/api', sessionRouter)
app.use('/api', userRouter)
app.use('/api', validateToken, orderRouter)
app.use('/api', validateToken, productRouter)

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