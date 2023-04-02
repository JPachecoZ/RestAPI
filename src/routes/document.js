const express = require('express')
const validateToken = require('../middlewares/validateToken')
const { createUser, showUser, updateUser } = require('../controllers/userControllers')

const documentRouter = express.Router()

//create documentRequest
documentRouter.post('/documents', createUser)

//show
documentRouter.get('/profile/:id', validateToken, showUser)

//update user
documentRouter.put('/profile/:id', validateToken, updateUser)

module.exports = documentRouter