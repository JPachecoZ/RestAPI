const productSchema = require('../models/product')

const getAllProducts = async (req, res) => {
    productSchema
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }))
  }

const getProductById = async (req, res) => {
    const { id } = req.params
    productSchema
      .findById(id)
      .then((data) => res.json(data))
      .catch((error) => {
        res.status(404).json({message: error.message})
    })
  }

const createProduct = async (req, res) =>{
    const user = productSchema(req.body)
    user
      .save()
      .then((data) => res.json(data))
      .catch((error)=>{res.json({message: error})})
}

const updateProduct = async (req, res) => {
    const { id } = req.params
    const { name, price, category, description, picture_url } = req.body
    productSchema
      .updateOne({ _id: id }, { $set: {name, price, category, description, picture_url} })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error.message }))
}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    productSchema
      .remove({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }))
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}