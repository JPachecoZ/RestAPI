const express = require('express')
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productControllers')

const productRouter = express.Router()

//get all products
productRouter.get('/products', getAllProducts)

//get one product
productRouter.get('/products/:id', getProductById)

//create product
productRouter.post('/products', createProduct)

//update product
productRouter.put('/products/:id', updateProduct)

//delete product
productRouter.delete('/products/:id', deleteProduct)

module.exports = productRouter