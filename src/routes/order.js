const express = require('express')
const { createOrder, getOrders } = require('../controllers/orderControllers')

const orderRouter = express.Router()

//get all orders
orderRouter.get('/orders', getOrders)

//create order
orderRouter.post('/orders', createOrder)

module.exports = orderRouter