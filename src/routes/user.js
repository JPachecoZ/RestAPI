const express = require('express')
const { createUser, showUser, updateUser } = require('../controllers/userControllers')

const userRouter = express.Router()

//create user
userRouter.post('/users', createUser)

//show
userRouter.get('/profile', showUser)

//update user
userRouter.patch('/profile', updateUser)

module.exports = userRouter