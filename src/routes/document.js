const express = require('express')
const { createSignRequest } = require('../controllers/documentControllers')

const documentRouter = express.Router()

//create documentRequest
documentRouter.post('/document', createSignRequest)

module.exports = documentRouter