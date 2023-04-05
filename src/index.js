const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const fetch = require("node-fetch")
const cors = require('cors')
require('dotenv').config()
const validateApiKey = require('./middlewares/validateApiKey');
const documentRouter = require('./routes/document')
// const validateToken = require('./middlewares/validateToken')
// const sessionRouter = require('./routes/session')

//setup
const app = express()
const port = process.env.PORT || 8000
mongoose.set('strictQuery', true)

//middleware
app.use(cors())
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
// app.use('/api', sessionRouter)
// app.use('/api', validateToken, documentRouter)

app.get('/private-route', validateApiKey, (req, res) => {
    res.json({ message: 'Bienvenido a la ruta protegida' });
});

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
    fetch(`${process.env.SIGN_BASE_URL}${process.env.SIGN_AUTH_ENDPOINT}`,{
        method: "POST",
        body: JSON.stringify({username: process.env.SIGN_USERNAME, password: process.env.SIGN_PASSWORD})
    })
    .then((response) => {
        process.env.SIGN_AUTH_KEY = (response.headers.get("Authorization"))
    })
    .catch((error)=>{
        console.error(error)
    })
})