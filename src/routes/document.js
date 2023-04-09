const express = require('express')
const validateApiKey = require('../middlewares/validateApiKey');
const { createSignRequest,  } = require('../controllers/documentControllers')
const { receiveSignedDocument } = require('../controllers/documentControllers')

const documentRouter = express.Router()

//create documentRequest
documentRouter.post('/document', validateApiKey, createSignRequest)
documentRouter.post('/webhook', receiveSignedDocument)

module.exports = documentRouter