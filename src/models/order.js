const mongoose = require('mongoose')
const { Schema } = mongoose

const orderSchema = new Schema({
    delivery_address: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    items: [
        {
            product_id: {
                type: String,
            },
            order_id: {
                type: String
            },
            quantity: {
                type: Number
            }
        }
    ]
}
)

module.exports = mongoose.model('Order', orderSchema)