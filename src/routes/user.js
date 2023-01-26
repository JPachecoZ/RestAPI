const express = require('express')
const validateToken = require('../middlewares/validateToken')
const { createUser, showUser, updateUser } = require('../controllers/userControllers')

const userRouter = express.Router()

//create user
userRouter.post('/users', createUser)

//show
userRouter.get('/profile/:id', validateToken, showUser)

//update user
userRouter.put('/profile/:id', validateToken, updateUser)

module.exports = userRouter