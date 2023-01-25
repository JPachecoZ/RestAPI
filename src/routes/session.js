const express = require('express')
const { login, logout } = require('../controllers/sessionController')

const sessionRouter = express.Router()

//login
sessionRouter.post('/login', login)

//logout
sessionRouter.delete('/logout', logout)

module.exports = sessionRouter