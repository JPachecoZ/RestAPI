const orderSchema = require('../models/order')

const createOrder = async (req, res) =>{
    const order = orderSchema(req.body)
    order
      .save()
      .then((data) => res.json(data))
      .catch((error)=>{res.json({message: error})})
}

const getOrders = async (req, res) => {
    orderSchema
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }))
}

module.exports = {
    createOrder,
    getOrders
}