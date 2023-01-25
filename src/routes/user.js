const express = require('express')
const { createUser, showUser, updateUser } = require('../controllers/userControllers')

const userRouter = express.Router()

//create user
userRouter.post('/users', createUser)

//show
userRouter.get('/profile/:id', showUser)

//update user
userRouter.put('/profile/:id', updateUser)

module.exports = userRouter